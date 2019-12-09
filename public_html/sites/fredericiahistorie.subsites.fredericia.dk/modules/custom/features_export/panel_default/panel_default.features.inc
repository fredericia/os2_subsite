<?php
/**
 * @file
 * panel_default.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function panel_default_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}
