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
  $fe_block_boxes->body = 'Fredericia Idrætscenter forener sport, kultur, sundhed og erhverv i et bredt udvalg af aktiviteter og arrangementer.
';

  $export['footer_text'] = $fe_block_boxes;

  return $export;
}
