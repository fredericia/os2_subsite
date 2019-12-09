<?php
/**
 * @file
 * contenttype_app_gallery.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_gallery_node_info() {
  $items = array(
    'app_gallery' => array(
      'name' => t('App gallery'),
      'base' => 'node_content',
      'description' => t('Indicates that the app should open a gallery'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
