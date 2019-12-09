<?php
/**
 * @file
 * contenttype_app_video.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_video_node_info() {
  $items = array(
    'app_video' => array(
      'name' => t('App Video'),
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
