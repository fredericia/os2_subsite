<?php
/**
 * @file
 * contenttype_app_frontpage.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_frontpage_node_info() {
  $items = array(
    'app_frontpage' => array(
      'name' => t('App frontpage'),
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
