<?php

/**
 * @file
 * Extends the MediaInternetBaseHandler class to handle Instagram objects.
 */

/**
 * Implementation of MediaInternetBaseHandler.
 */
class MediaInternetInstagramHandler extends MediaInternetBaseHandler {
  private $instagramUrl = 'https://instagram.com/p';
  private $oembedUrl = 'http://api.instagram.com/publicapi/oembed/';
  private $uri = FALSE;

  /**
   * Override MediaInternetBaseHandler::__construct().
   */
  public function __construct($url) {
    parent::__construct($url);

    $patterns = array(
      '@instagram\.com/p/([^"\&\? ]+)@i',
      '@instagr\.am/p/([^"\&\? ]+)@i',
    );

    foreach ($patterns as $pattern) {
      preg_match($pattern, $url, $matches);
      if (isset($matches[1])) {
        $short_code = rtrim($matches[1], '/');
        if ($this->isValidShortCode($short_code)) {
          $this->uri = file_stream_wrapper_uri_normalize('instagram://p/' . $short_code);
          break;
        }
      }
    }
  }

  /**
   * Override MediaInternetBaseHandler::claim().
   */
  public function claim($url) {
    if ($this->uri) {
      return TRUE;
    }
    return FALSE;
  }

  /**
   * Override MediaInternetBaseHandler::getFileObject().
   */
  public function getFileObject() {
    $file = file_uri_to_object($this->uri, TRUE);

    // Try to default the file name instagram object title.
    if (empty($file->fid) && $data = $this->getEmbed()) {
      $filename = $this->removeEmoji($data['title']);
      $filename = check_plain($filename);
      $file->filename = truncate_utf8(trim($filename), 255);
    }

    return $file;
  }

  /**
   * Return an URI by making it syntactically correct.
   *
   * @return string
   *   The normalized URI or FALSE.
   */
  public function parse() {
    return $this->uri;
  }

  /**
   * Returns information about the media.
   *
   * @param array $query
   *   Query params for request. You can see supported params here:
   *   https://instagram.com/developer/embedding/#oembed.
   *
   * @return array
   *   If oEmbed information is available, an array containing 'title', 'type',
   *   'url', and other information as specified by the oEmbed standard.
   *   Otherwise, NULL.
   */
  public function getEmbed($query = array()) {
    if ($this->uri) {
      $query['url'] = file_create_url($this->uri);
      $url = url($this->oembedUrl, array('query' => $query));
      $response = drupal_http_request($url);
      if (!isset($response->error)) {
        return drupal_json_decode($response->data);
      }
    }

    return FALSE;
  }

  /**
   * Get original thumbnail path for instagram object.
   *
   * @return bool|string
   *   The original thumbnail path if no errors, FALSE otherwise.
   */
  public function getOriginalThumbnailPath() {
    if ($this->uri) {
      $query['url'] = file_create_url($this->uri);
      $url = url($this->oembedUrl, array('query' => $query));
      $response = drupal_http_request($url);
      if (!isset($response->error)) {
        $data = drupal_json_decode($response->data);
        return $data['thumbnail_url'];
      }
    }

    return FALSE;
  }

  /**
   * Get local thumbnail path for instagram object.
   *
   * @return bool|string
   *   The local thumbnail path if no errors, FALSE otherwise.
   */
  public function getLocalThumbnailPath() {
    if ($this->uri) {
      $wrapper = file_stream_wrapper_get_instance_by_uri($this->uri);
      $parts = $wrapper->get_parameters();

      // There's no need to hide thumbnails, always use the public system rather
      // than file_default_scheme().
      $local_path = 'public://instagram/' . check_plain($parts['p']) . '.jpg';
      if (!file_exists($local_path)) {
        $original_thumbnail_path = $this->getOriginalThumbnailPath();

        $directory = drupal_dirname($local_path);
        file_prepare_directory($directory, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS);
        $response = drupal_http_request($original_thumbnail_path);

        if (!isset($response->error)) {
          file_unmanaged_save_data($response->data, $local_path, TRUE);
        }
        else {
          @copy($original_thumbnail_path, $local_path);
        }
      }

      return $local_path;
    }

    return FALSE;
  }

  /**
   * Check if a Instagram url is valid.
   *
   * @param string $short_code
   *   The sort code of the Instagram object.
   *
   * @return bool
   *   TRUE if the url is valid, FALSE otherwise.
   */
  private function isValidShortCode($short_code) {
    $query = array('url' => $this->instagramUrl . '/' . $short_code);
    $url = url($this->oembedUrl, array('query' => $query));
    $response = drupal_http_request($url);

    if ($response->code == 401) {
      watchdog('php', 'Instagram object has been disabled.', array(), WATCHDOG_ERROR);
      return FALSE;
    }
    if ($response->code != 200) {
      watchdog('php', 'The path is invalid or the instagram object was deleted.', array(), WATCHDOG_ERROR);
      return FALSE;
    }

    return TRUE;
  }

  /**
   * Remove Emoji characters from instagram filename.
   *
   * @param string $filename
   *   The filename to remove emoji.
   *
   * @return string
   *   The clean filename.
   */
  private function removeEmoji($filename) {
    // Match Emoticons.
    $regex_emoticons = '/[\x{1F600}-\x{1F64F}]/u';
    $clean_filename = preg_replace($regex_emoticons, '', $filename);

    // Match Miscellaneous Symbols and Pictographs.
    $regex_symbols = '/[\x{1F300}-\x{1F5FF}]/u';
    $clean_filename = preg_replace($regex_symbols, '', $clean_filename);

    // Match Transport And Map Symbols.
    $regex_transport = '/[\x{1F680}-\x{1F6FF}]/u';
    $clean_filename = preg_replace($regex_transport, '', $clean_filename);

    // Match Miscellaneous Symbols.
    $regex_misc = '/[\x{2600}-\x{26FF}]/u';
    $clean_filename = preg_replace($regex_misc, '', $clean_filename);

    // Match Dingbats.
    $regex_dingbats = '/[\x{2700}-\x{27BF}]/u';
    $clean_filename = preg_replace($regex_dingbats, '', $clean_filename);

    return $clean_filename;
  }
}
