<?php
/**
 * @file
 * contenttype_app_list.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_list_node_info() {
  $items = array(
    'app_list' => array(
      'name' => t('App list'),
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
