<?php
/**
 * @file
 * os2web_kulturnaut_events.ds.inc
 */

/**
 * Implements hook_ds_field_settings_info().
 */
function os2web_kulturnaut_events_ds_field_settings_info() {
  $export = array();

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'node|os2web_kulturnaut_knactivity|search_result';
  $ds_fieldsetting->entity_type = 'node';
  $ds_fieldsetting->bundle = 'os2web_kulturnaut_knactivity';
  $ds_fieldsetting->view_mode = 'search_result';
  $ds_fieldsetting->settings = array(
    'search_snippet' => array(
      'weight' => '4',
      'label' => 'hidden',
      'format' => 'default',
    ),
  );
  $export['node|os2web_kulturnaut_knactivity|search_result'] = $ds_fieldsetting;

  return $export;
}

/**
 * Implements hook_ds_layout_settings_info().
 */
function os2web_kulturnaut_events_ds_layout_settings_info() {
  $export = array();

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|os2web_kulturnaut_knactivity|search_result';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'os2web_kulturnaut_knactivity';
  $ds_layout->view_mode = 'search_result';
  $ds_layout->layout = 'panels-content-with-left-sidebar-4-8';
  $ds_layout->settings = array(
    'regions' => array(
      'sidebar' => array(
        0 => 'field_os2web_kulturnaut_slidesho',
      ),
      'content' => array(
        1 => 'field_sektion',
        2 => 'field_os2web_kulturnaut_date',
        3 => 'field_os2web_kulturnaut_descrip',
        4 => 'search_snippet',
      ),
    ),
    'fields' => array(
      'field_os2web_kulturnaut_slidesho' => 'sidebar',
      'field_sektion' => 'content',
      'field_os2web_kulturnaut_date' => 'content',
      'field_os2web_kulturnaut_descrip' => 'content',
      'search_snippet' => 'content',
    ),
    'classes' => array(),
    'wrappers' => array(
      'top' => 'div',
      'sidebar' => 'div',
      'content' => 'div',
      'bottom' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
    'layout_link_attribute' => 'content',
    'layout_link_custom' => '',
    'layout_disable_css' => 0,
  );
  $export['node|os2web_kulturnaut_knactivity|search_result'] = $ds_layout;

  return $export;
}

/**
 * Implements hook_ds_view_modes_info().
 */
function os2web_kulturnaut_events_ds_view_modes_info() {
  $export = array();

  $ds_view_mode = new stdClass();
  $ds_view_mode->api_version = 1;
  $ds_view_mode->view_mode = 'os2sub_spotbox_list';
  $ds_view_mode->label = 'OS2sub Spotbox list';
  $ds_view_mode->entities = array(
    'node' => 'node',
    'taxonomy_term' => 'taxonomy_term',
  );
  $export['os2sub_spotbox_list'] = $ds_view_mode;

  $ds_view_mode = new stdClass();
  $ds_view_mode->api_version = 1;
  $ds_view_mode->view_mode = 'os2sub_teaser_mini';
  $ds_view_mode->label = 'OS2sub Teaser mini';
  $ds_view_mode->entities = array(
    'node' => 'node',
  );
  $export['os2sub_teaser_mini'] = $ds_view_mode;

  return $export;
}
