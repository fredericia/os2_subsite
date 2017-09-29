<?php
/**
 * @file
 * oplev_search.ds.inc
 */

/**
 * Implements hook_ds_view_modes_info().
 */
function oplev_search_ds_view_modes_info() {
  $export = array();

  $ds_view_mode = new stdClass();
  $ds_view_mode->api_version = 1;
  $ds_view_mode->view_mode = 'os2sub_term_search_result';
  $ds_view_mode->label = 'OS2Sub term search result';
  $ds_view_mode->entities = array(
    'taxonomy_term' => 'taxonomy_term',
  );
  $export['os2sub_term_search_result'] = $ds_view_mode;

  return $export;
}
