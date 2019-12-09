<?php
/**
 * @file
 * responsive_images.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function responsive_images_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "resp_img" && $api == "default_resp_img_suffixs") {
    return array("version" => "1");
  }
}
