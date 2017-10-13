<?php
/**
 * @file
 * fic_page_settings.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function fic_page_settings_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}
