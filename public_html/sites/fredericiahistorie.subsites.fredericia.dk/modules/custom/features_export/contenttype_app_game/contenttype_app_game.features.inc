<?php
/**
 * @file
 * contenttype_app_game.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_game_node_info() {
  $items = array(
    'app_game' => array(
      'name' => t('App Game'),
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
