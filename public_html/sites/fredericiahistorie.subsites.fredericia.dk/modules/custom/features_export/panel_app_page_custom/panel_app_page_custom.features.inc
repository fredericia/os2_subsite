<?php
/**
 * @file
 * panel_app_page_custom.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function panel_app_page_custom_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}
