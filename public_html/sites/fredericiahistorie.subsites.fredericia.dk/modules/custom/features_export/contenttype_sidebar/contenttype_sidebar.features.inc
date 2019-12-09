<?php
/**
 * @file
 * contenttype_sidebar.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_sidebar_node_info() {
  $items = array(
    'sidebar' => array(
      'name' => t('Sidebar'),
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
