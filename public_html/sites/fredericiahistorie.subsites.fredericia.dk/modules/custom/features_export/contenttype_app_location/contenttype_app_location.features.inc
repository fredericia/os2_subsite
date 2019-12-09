<?php
/**
 * @file
 * contenttype_app_location.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_location_node_info() {
  $items = array(
    'app_location' => array(
      'name' => t('App location'),
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
