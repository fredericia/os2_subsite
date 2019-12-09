<?php
/**
 * @file
 * contenttype_app_hotspot.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function contenttype_app_hotspot_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function contenttype_app_hotspot_node_info() {
  $items = array(
    'app_hotspot' => array(
      'name' => t('Hotspot'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
