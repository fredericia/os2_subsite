<?php
/**
 * @file
 * fic_frontpage_settings.ds.inc
 */

/**
 * Implements hook_ds_view_modes_info().
 */
function fic_frontpage_settings_ds_view_modes_info() {
  $export = array();

  $ds_view_mode = new stdClass();
  $ds_view_mode->api_version = 1;
  $ds_view_mode->view_mode = 'fic_header';
  $ds_view_mode->label = 'FIC Header';
  $ds_view_mode->entities = array(
    'taxonomy_term' => 'taxonomy_term',
  );
  $export['fic_header'] = $ds_view_mode;

  return $export;
}
