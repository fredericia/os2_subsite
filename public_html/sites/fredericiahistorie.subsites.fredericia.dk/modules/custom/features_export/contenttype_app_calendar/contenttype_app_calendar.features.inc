<?php
/**
 * @file
 * contenttype_app_calendar.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_calendar_node_info() {
  $items = array(
    'app_calendar' => array(
      'name' => t('App Calendar'),
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
