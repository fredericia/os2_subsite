<?php

/* Adapt mobile content pack */

function adapt_app_conf_get_content($base_url, &$context) {
  //crawl($base_url);
}

function crawl($dir, $baseurl, $records, &$context) {
  include_once(DRUPAL_ROOT . '/profiles/fredhist/includes/simple_html_dom.php');

  if (empty($context['sandbox'])) {
    $context['sandbox']['progress'] = 0;
    $context['sandbox']['max'] = count($records) - 1;
  }

  $resources =  $context['results'];

  $key = $context['sandbox']['progress'];

  if ($records[$key]->type != 'page' || $records[$key]->inclusive) {

    $records[$key]->alias .= '/';
    $url = $baseurl . '/' . $records[$key]->alias;
    $level = substr_count($records[$key]->alias, '/');
    $prefix = str_repeat('../', $level);

    $site_context = stream_context_create(
      array('http' => array(
        'header' => "Accept: text/html, application/json\r\n" .
                    "User-Agent:pack\r\n"
      ))
    );

    $data = file_get_contents($url, NULL, $site_context);

    foreach ($http_response_header as $value) {
      $m = array();
      if (preg_match('/^Content-Type:(.+)/i', $value, $m)) {
        $content_type = trim(reset(explode(';', $m[1])));
      }
    }

    $output = '';
    if ('application/json' == $content_type) {
      $json = json_decode($data);
      if ($json && !empty($json->resources)) {
        foreach ($json->resources as $resource) {
          $resources[$baseurl . $resource] = $resource;
        }
        unset($json->resources);
      }
      $output = json_encode($json);
    }
    else {
      $output = str_get_html($data);
      parse_html($output, $resources, $prefix, $baseurl);
    }

    $new_dir = $dir . $records[$key]->alias;
    $filename = $new_dir . 'index.html';
    if ($records[$key]->alias && !is_dir($new_dir)) {
      file_prepare_directory($new_dir, FILE_CREATE_DIRECTORY);
    }

    file_put_contents($filename, $output);
  }
  $context['sandbox']['progress']++;
  $context['message'] = t('Processed:').' '.$context['sandbox']['progress'].' / '.$context['sandbox']['max'];

  if ($context['sandbox']['progress'] != $context['sandbox']['max']) {
    $context['finished'] = $context['sandbox']['progress'] / $context['sandbox']['max'];
  }
  $context['results'] = $resources;
}

function get_resources($dir, $baseurl, &$context) {
  $resources = $context['results'];
  // Look for images in CSS files.
  foreach ($resources as $url => $path) {
    if (preg_match('/.+\.css/', $path)) {
      $parts = explode('/', $path);
      array_pop($parts);
      $path = join('/', $parts);
      $css_res = css_images($url);
      foreach ($css_res as $res) {
        $resources["$baseurl$path/$res"] = $path . '/' . $res;
      }
    }
  }
  $context['results'] = $resources;
}

function create_paths($dir, $baseurl, &$context) {
  $resources =  $context['results'];
  // Create array with directories to be created.
  $paths = array();
  foreach ($resources as $url => $path) {
    $parts = explode('/', $path);
    $filename = array_pop($parts);
    $path = join('/', $parts);
    $paths[$path] = 1;
  }

  // Create the directories.
  foreach ($paths as $key => $value) {
    $new_dir = $dir . $key;
    if (!is_dir($new_dir)) {
      file_prepare_directory($new_dir, FILE_CREATE_DIRECTORY);
    }
  }
}

function fetch_resources($dir, $baseurl, &$context) {
  // Fetch images, stylesheets and javascript and save them.
  $resources = $context['results'];
  foreach ($resources as $url => $path) {
    $img = file_get_contents($url);
    $real_path = $path;
    $token_index = strpos($path, '?itok=');
    if ($token_index != FALSE) {
      $real_path = substr($real_path, 0, $token_index - strlen($real_path));
    }
    file_put_contents($dir . $real_path, $img);
    if (preg_match('/.+\.zip/', $path)) {
      unzip_resource($dir, $path, $baseurl);
    }
  }

  /* Fetch map zip file and unpack it in the app folder */
  unzip_map_assets($dir, $baseurl);
}

function unzip_resource($dir, $path, $baseurl) {
  $zip = new ZipArchive;
  $url = $baseurl . $path;
  $zipfile = file_get_contents("$url");
  $zipfilename = tempnam('/tmp', 'resources');
  file_put_contents($zipfilename, $zipfile);
  $res = $zip->open($zipfilename);
  if ($res === TRUE) {
    $zip->extractTo($dir . '../resources');
    $zip->close();
  }
  unlink($zipfilename);
}

function unzip_map_assets($dir, $baseurl) {
  $zip = new ZipArchive;
  $mapfile = variable_get('adapt_app_conf_mapfile');
  $zipfile = file_get_contents("$baseurl/sites/default/files/$mapfile");
  $zipfilename = tempnam('/tmp', 'mapfile');
  file_put_contents($zipfilename, $zipfile);
  $res = $zip->open($zipfilename);
  if ($res === TRUE) {
    $zip->extractTo($dir . '../tiles');
    $zip->close();
  }
  unlink($zipfilename);
}

function parse_html(&$html, &$resources, $prefix, $baseurl) {
  if (isset($html) && method_exists($html, 'find')) {
    /* Images */
    foreach ($html->find('img') as $e) {
      $url = parse_url($e->src);

      if (!preg_match('/^http.+/', $e->src))
        $e->src = $baseurl . $e->src;

      $resources[$e->src] = $url['path'];
      $e->src = $prefix . trim($url['path'], '/');
    }

    /* Inline CSS images */
    foreach ($html->find('div[style*=background-image]') as $e) {
      preg_match('/background-image:\s+url\((.*)\)/', $e->style, $m);
      $relurl = str_replace($baseurl, '', $m[1]);
      $resources[$m[1]] = $relurl;
      $e->style = str_replace($baseurl . '/', $prefix, $e->style);
    }

    /* Links */
    foreach ($html->find('a') as $e) {
      // rewrite relative url's to point to local downloaded index.html files
      if (!preg_match('/^http.+/', $e->href))
        $e->href = $prefix . trim($e->href, '/') . '/index.html';
    }
    
    /* Stylesheets */
    if (!empty($html->find('head', 0))) {
      foreach ($html->find('head', 0)->find('link') as $e) {
        if (preg_match('/.+\.css$/', $e->href)) {
          $resources[$baseurl . $e->href] = $e->href;
          $e->href = $prefix . $e->href;
        }
      }
    }

    /* Javascript */
    if (!empty($html->find('head', 0))) {
      foreach ($html->find('head', 0)->find('script') as $e) {
        $resources[$baseurl . $e->src] = $e->src;
        $e->src = $prefix . $e->src;
      }
    }
  }
  
}

function make_zip_file($version) {
  $zipsource = 'public://app/app/';
  $zipdestination = 'public://app.zip';
  Zip($zipsource, $zipdestination, $version);
}

/* Parse urls from CSS */

function css_images($css) {
  $css = file_get_contents($css);
  if (!empty($css)) {
    preg_match_all('/background:\s+url\([\'|\"]{0,1}(.*?)[\'|\"]{0,1}\)/i', $css, $css_images);
    return !empty($css_images[1]) ? $css_images[1] : FALSE;
  }
}

function Zip($source, $destination, $version) {
  // Get real path for our folder
  $real_path_source = drupal_realpath($source);
  $real_path_des = drupal_realpath($destination);

  // Initialize archive object
  $zip = new ZipArchive();
  $zip->open($real_path_des, ZipArchive::CREATE | ZipArchive::OVERWRITE);

  // create table packversion ( version integer, checksum tinytext, filename text );
  $dbh = Database::getConnection();
  $sql = 'INSERT INTO packversion (version,checksum,filename) VALUES (?,?,?)';
  $stmt = $dbh->prepare($sql);

  if (is_dir($source)) {
    // Create recursive directory iterator
    $files = new RecursiveIteratorIterator(
      new RecursiveDirectoryIterator($real_path_source), RecursiveIteratorIterator::SELF_FIRST
    );

    foreach ($files as $file) {
      $filePath = $file->getRealPath();
      $relativePath = substr($filePath, strlen($real_path_source) + 1);

      if (!$file->isDir()) {
        $data = file_get_contents($filePath);
        $stmt->execute(array($version, md5($data), $relativePath));
        $zip->addFile($filePath, $relativePath);
      }
    }
  }
  else {
    $zip->addFromString(basename($real_path_source), file_get_contents($real_path_source));
  }

  return $zip->close();
}

function latest_packed_version() {
  $result = db_query('SELECT max(version) FROM packversion');
  return $result->fetchField();
}


function adapt_app_conf_finished_callback() {

}

function update_info_file($version) {
  $info_file_name = 'public://app/app/info.json';

  $info = json_decode(file_get_contents($info_file_name));

  $info->content = $version;
  if (!empty($_POST['bump_version'])) {
    variable_set('adapt_app_conf_version',$info->content);
  }

  $info->frontpage_url = wrap_local_url(variable_get('adapt_app_conf_frontpage_url'));
  $info->home_url = wrap_local_url(variable_get('adapt_app_conf_home_url'));

  file_put_contents($info_file_name, json_encode($info));
}

function wrap_local_url($url) {
  return 'content/' .$url . '/index.html';
}
