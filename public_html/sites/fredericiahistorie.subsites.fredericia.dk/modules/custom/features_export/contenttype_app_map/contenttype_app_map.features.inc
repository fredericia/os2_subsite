<?php
/**
 * @file
 * contenttype_app_map.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function contenttype_app_map_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function contenttype_app_map_node_info() {
  $items = array(
    'app_map' => array(
      'name' => t('App map'),
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
