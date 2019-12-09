<?php

/* Adapt mobile content pack */

function adapt_app_conf_get_content(&$context) {
  //define('DRUPAL_ROOT', getcwd() );
  //require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
  //drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
  variable_set('image_allow_insecure_derivatives', TRUE);

  if (!empty($_GET['version'])) {
    echo variable_get('adapt_app_conf_version');
    die("sss");
  }

  global $user;

  // websites on local env
  $websiteurl = 'http://fredhist.dk';
  $appbaseurl = 'http://app.fredhist.dk';
  // websites on test env
  if (gethostname() == 'gw.c1.test.adapt.dk') {
    $websiteurl = 'http://fredhist.c1.test.adapt.dk';
    $appbaseurl = 'http://app.fredhist.c1.test.adapt.dk';
  }
  // websites on prod env
  if (gethostname() == 'gw.c2.prod.adapt.dk') {
    $websiteurl = 'http://fredericiahistorie.dk';
    $appbaseurl = 'http://app.fredericiahistorie.dk';
  }

  crawl($websiteurl);
  update_info_file();
  make_zip_file($websiteurl);
}

function adapt_app_conf_finished_callback() {

}

function update_info_file(){
  $info_file_name = '/assets/app/info.json';

  $info = json_decode( file_get_contents($info_file_name) );

  $info->content = latest_packed_version()+1;
  if (!empty($_POST['bump_version'])) {
    variable_set('adapt_app_conf_version',$info->content);
  }

  $info->frontpage_url = wrap_local_url(variable_get('adapt_app_conf_frontpage_url'));

  $info->home_url = wrap_local_url(variable_get('adapt_app_conf_home_url'));

  file_put_contents($info_file_name,json_encode($info));
}

function wrap_local_url($url) {
  return 'content/' . $url . '/index.html';
}


function crawl($baseurl) {

  include_once(DRUPAL_ROOT . '/simple_html_dom.php');

  $resources  = array();
  $dir        = '/assets/app/content/';

  // Delete old files ..
  unlinkRecursive($dir, false);
  unlinkRecursive("$dir../resources" , false);
  unlinkRecursive("$dir../tiles" , false);

  $content_types = get_app_content_types();

  if ($result = db_query("SELECT node.nid,ua.alias,node.type,include.field_include_in_app_value AS inclusive FROM node
     JOIN url_alias ua ON ua.source = CONCAT('node/',node.nid)
     LEFT JOIN field_data_field_include_in_app AS include ON node.nid=include.entity_id
     WHERE node.status = 1
     AND node.type in (:content_types)", array(':content_types'=>$content_types))) {

     $size = $result->rowCount();
     $i = 0;

    foreach ($result as $row) {
      $i++;

      if($row->type=='page') {
        if(!$row->inclusive) { //Only include specific pages
          continue;
        }
      }

      $html = false;

      $row->alias .= '/';

      $url = $baseurl . '/' . $row->alias;
      $level = substr_count($row->alias, '/');
      $prefix = str_repeat("../", $level);

      $context = stream_context_create(array('http' => array('header' => 'Accept: text/html, application/json')));
      $data = file_get_contents($url, NULL, $context);

      foreach ($http_response_header as $value) {
        if (preg_match('/^Content-Type:(.+)/i', $value,$m)) {
          $content_type = trim(reset(explode(';',$m[1])));
        }
      }

      $output = '';

      if ('application/json' == $content_type) {
        $json = json_decode($data);
        if ($json && !empty($json->resources)) {
          foreach($json->resources as $resource){
            $resources[$baseurl . $resource] = $resource;
            $path_res = $path . '/' . $res;
            if (strpos($resource, $baseurl) !== false) {
              $resources[$resource] = $resource;
            }
            else {
              $resources[$baseurl . $resource] = $resource;
            }
          }
          unset($json->resources);
        }
        $output = json_encode($json);
      }
      else {
        $output = str_get_html( $data );
        parse_html($output,$resources,$prefix,$baseurl);
        /*foreach ($resources as $url => $path) {
          if (strpos($url, $baseurl . $baseurl) !== false) {
            str_replace($baseurl . $baseurl, $baseurl, $url);
            str_replace('/' . $baseurl, '', $path);
            $resources[$url] = $path;
          }
          else {
            $resources["$baseurl$path/$res"] = $path_res;
          }
        }*/
      }
      $filename = DRUPAL_ROOT . $dir . $row->alias .'index.html';
      if ($row->alias && !is_dir($dir . $row->alias)) {
        mkdir(DRUPAL_ROOT . $dir . $row->alias,0777,true);
      }
      file_put_contents($filename, $output);
      //var_dump($resources);
    }
  }
  /* Look for images in CSS files */
  foreach ($resources as $url => $path) {
    if (preg_match('/.+\.css/',$path)) {
      $parts = explode('/',$path);
      array_pop($parts);
      $path = join('/',$parts);
      $css_res = css_images($url);
      foreach ($css_res as $res) {
        $path_res = $path . '/' . $res;
        if (strpos($path_res, $baseurl) !== false) {
          //$path_res_val = str_replace('/' . $baseurl, '', $path_res);
          $resources[$path_res] = $path_res;
        }
        else {
          $resources[$baseurl . $path_res] = $path_res;
        }
      }
     };

  }

  /* Create array with directories to be created */
  $paths = array();
  foreach ($resources as $url => $path) {
     $parts = explode('/',$path);
     $filename = array_pop($parts);
     $path = join('/',$parts);
     $paths[$path] = 1;
  }

  /* Create the directories */
  foreach ($paths as $key => $val) {
    if (!is_dir($dir . $key)) {
      mkdir($dir . $key, 0777, true);
    }
  }


  /* Fetch images, stylesheets and javascript and save them */
  foreach ($resources as $url => $path) {
    $img = file_get_contents($url);
    $real_path = $path;
    $token_index = strpos($path, '?itok=');
    if($token_index!=FALSE) { //Strip ?itok=
      $real_path = substr($real_path, 0, $token_index-strlen($real_path));
    }
    file_put_contents($dir . $real_path, $img);
    if (preg_match('/.+\.zip/',$path)) {
      unzip_resource($dir, $path);
    }
  }

  /* Fetch map zip file and unpack it in the app folder */
  unzip_map_assets ( $dir, $baseurl );
/*
  echo '<pre>';
  print_r($resources);
  echo '</pre>';
  */
}

function unzip_resource ( $dir, $path ) {
  $zip = new ZipArchive;
  $res = $zip->open($dir . $path);
  if ($res === TRUE) {
    $zip->extractTo($dir . '../resources');
    $zip->close();
  }
  unlink($dir . $path);
}

function unzip_map_assets ( $dir, $baseurl ) {
  $zip = new ZipArchive;
  $mapfile = variable_get('adapt_app_conf_mapfile');
  $zipfile = file_get_contents("$baseurl/sites/default/files/$mapfile");
  $zipfilename = tempnam('/tmp','mapfile');
  file_put_contents($zipfilename, $zipfile);
  $res = $zip->open($zipfilename);
  if ($res === TRUE) {
    $zip->extractTo($dir . '../tiles');
    $zip->close();
  }
  unlink($zipfilename);
}

function parse_html(&$html,&$resources,$prefix,$baseurl) {
  if(isset($html) && method_exists($html,'find')) {
    /* Images */
    foreach($html->find('img') as $e) {
       $url = parse_url($e->src);

       if (!preg_match('/^http.+/', $e->src))
         $e->src = $baseurl . $e->src;

       $resources[$e->src] = $url['path'];
       $e->src = $prefix . trim($url['path'],'/');
    }

    /* Inline CSS images */
    foreach($html->find('div[style*=background-image]') as $e) {
      preg_match('/background-image:\s+url\((.*)\)/', $e->style, $m);
      $relurl = str_replace($baseurl,'',$m[1]);
      $resources[$m[1]] = $relurl;
      $e->style = str_replace($baseurl . '/',$prefix,$e->style);
    }

    /* Links */
    foreach($html->find('a') as $e) {
      // rewrite relative url's to point to local downloaded index.html files
      if (!preg_match('/^http.+/', $e->href))
        $e->href = $prefix . trim($e->href,'/') . '/index.html';
    }

    /* Stylesheets */
    foreach($html->find('head',0)->find('link') as $e) {
      if (preg_match('/.+\.css$/',$e->href)) {
        if (strpos($e->href, $baseurl) !== false) {
          $href_val = str_replace($baseurl, '', $e->href);
          $resources[$e->href] = $href_val;
        }
        else {
          $resources[$baseurl . $e->href] = '/' . $e->href;
        }
         //$resources[$baseurl . $e->href] = '/' . $e->href;
         $e->href = $prefix .  preg_replace('/^\//', '', $e->href);
       }
    }

    /* Javascript */
    foreach($html->find('head',0)->find('script') as $e) {
      if (!preg_match('/^http.+/', $e->src)) {
        $resources[$baseurl . $e->src] = '/' . $e->src;
      }
      else {
        $e->src  = str_replace($baseurl, '', $e->src);
        $resources[$baseurl . $e->src] = $e->src;
      }
      $e->src = $prefix .  preg_replace('/^\//', '', $e->src);
    }
  }
}

function make_zip_file($base_url) {
  $zipsource      = DRUPAL_ROOT . '/assets/app/';
  $zipdestination = DRUPAL_ROOT . '/assets/files/app.zip';

  Zip($zipsource, $zipdestination);
}

/* Parse urls from CSS */

function css_images($css) {
  $css = file_get_contents($css);
  if (!empty($css)){
    preg_match_all('/background:\s+url\([\'|\"]{0,1}(.*?)[\'|\"]{0,1}\)/i', $css, $css_images);
    return !empty($css_images[1]) ? $css_images[1] : FALSE;
  }
}

/**
 * Recursively delete a directory
 *
 * @param string $dir Directory name
 * @param boolean $deleteRootToo Delete specified top-level directory as well
 */
function unlinkRecursive($dir, $deleteRootToo) {
  if(!$dh = @opendir($dir)) {
    return;
  }

  while (false !== ($obj = readdir($dh))) {
    if($obj == '.' || $obj == '..') {
      continue;
    }

    if (!@unlink($dir . '/' . $obj)) {
      unlinkRecursive($dir.'/'.$obj, true);
    }
  }

  closedir($dh);

  if ($deleteRootToo) {
    @rmdir($dir);
  }

  return;
}

function Zip($source, $destination)
{
  if (!extension_loaded('zip')) {
    return false;
  }
  if (!file_exists($source)) {
    return false;
  }

  $zip = new ZipArchive();

  if (!$zip->open($destination, ZIPARCHIVE::OVERWRITE)) {
    return false;
  }

   // create table packversion ( version integer, checksum tinytext, filename text );
  $dbh = Database::getConnection();
  $sql = "INSERT INTO packversion (version,checksum,filename) VALUES (?,?,?)";
  $stmt = $dbh->prepare($sql);
  $version = latest_packed_version()+1;

  $source = str_replace('\\', '/', realpath($source));

  if (is_dir($source) === true) {
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);
    foreach ($files as $file) {
      $file = str_replace('\\', '/', realpath($file));
      if (is_dir($file) === true && $file != '/assets/ftp') {
        if($zip->addEmptyDir(str_replace($source . '/', '', $file . '/'))) {

        }
        else {

        }
      }
      else if (is_file($file) === true) {
        $data = file_get_contents($file);
        $stmt->execute(array($version,md5($data),$file));
        $zip->addFromString(str_replace($source . '/', '', $file), $data);
      }
    }
  }
  else if (is_file($source) === true) {
    $zip->addFromString(basename($source),file_get_contents($source));
  }
  return $zip->close();
}

function latest_packed_version() {
  $result = db_query('SELECT max(version) FROM packversion');
  return $result->fetchField();
}

function get_app_content_types() {

  $node_types = node_type_get_types();
  $result = array();

  foreach ($node_types as $key => $node_type) {
    $include_in_app = variable_get('adapt_app_conf_' . $node_type->type . '_include_in_app');
    if ($include_in_app)
      $result[] = $node_type->type;
  }

  return $result;
}

