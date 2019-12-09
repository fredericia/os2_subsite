<?php
/**
 * @file
 * contenttype_audio_guide.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_audio_guide_node_info() {
  $items = array(
    'audio_guide' => array(
      'name' => t('Audio Guide'),
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
