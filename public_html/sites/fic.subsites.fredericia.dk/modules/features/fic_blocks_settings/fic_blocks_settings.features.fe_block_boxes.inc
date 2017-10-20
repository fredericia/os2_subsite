<?php
/**
 * @file
 * fic_blocks_settings.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function fic_blocks_settings_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Footer text';
  $fe_block_boxes->format = 'plain_text';
  $fe_block_boxes->machine_name = 'footer_text';
  $fe_block_boxes->body = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s
';

  $export['footer_text'] = $fe_block_boxes;

  return $export;
}
