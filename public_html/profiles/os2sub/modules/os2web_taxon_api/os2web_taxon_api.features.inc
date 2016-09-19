<?php
/**
 * @file
 * os2web_taxon_api.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2web_taxon_api_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
