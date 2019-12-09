<?php
/**
 * @file
 * contenttype_app_map.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function contenttype_app_map_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_audio|node|app_map|form';
  $field_group->group_name = 'group_audio';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Lyd',
    'weight' => '4',
    'children' => array(
      0 => 'field_audiofile',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-audio field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_audio|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_center_img|node|app_map|form';
  $field_group->group_name = 'group_center_img';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_reference';
  $field_group->data = array(
    'label' => 'Center billede',
    'weight' => '4',
    'children' => array(
      0 => 'field_body_center_img',
      1 => 'field_center_img_text',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-center-img field-group-fieldset',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_center_img|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_first_map|node|app_map|form';
  $field_group->group_name = 'group_first_map';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_map';
  $field_group->data = array(
    'label' => 'First map',
    'weight' => '15',
    'children' => array(
      0 => 'field_locations',
      1 => 'field_app_center',
      2 => 'field_app_zoom_level',
      3 => 'field_map_title',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'First map',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => ' group-first-map field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_first_map|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_map_material|node|app_map|form';
  $field_group->group_name = 'group_map_material';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Map canvas',
    'weight' => '7',
    'children' => array(
      0 => 'field_app_bounds',
      1 => 'field_app_offline_map',
      2 => 'field_app_offline_map_default',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Map canvas',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => ' group-map-material field-group-tab',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_map_material|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_map|node|app_map|form';
  $field_group->group_name = 'group_map';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Map data',
    'weight' => '0',
    'children' => array(
      0 => 'field_display_second_map',
      1 => 'group_second_map',
      2 => 'group_first_map',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-map field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_map|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_reference|node|app_map|form';
  $field_group->group_name = 'group_reference';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Content and reference',
    'weight' => '2',
    'children' => array(
      0 => 'field_reference_title',
      1 => 'field_reference_thumbnail',
      2 => 'field_reference_summary',
      3 => 'field_body',
      4 => 'field_page_body_second',
      5 => 'title',
      6 => 'group_center_img',
      7 => 'group_top_img',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Content and reference',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => ' group-reference field-group-tab',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_reference|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_second_map|node|app_map|form';
  $field_group->group_name = 'group_second_map';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_map';
  $field_group->data = array(
    'label' => 'Second map',
    'weight' => '17',
    'children' => array(
      0 => 'field_app_center_second',
      1 => 'field_app_zoom_level_second',
      2 => 'field_locations_second',
      3 => 'field_map_title_second',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Second map',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => ' group-second-map field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_second_map|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_sidebar|node|app_map|form';
  $field_group->group_name = 'group_sidebar';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Sidebar',
    'weight' => '5',
    'children' => array(
      0 => 'field_sidebar',
      1 => 'field_featured_links',
      2 => 'field_link_background_image',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-sidebar field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_sidebar|node|app_map|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_top_img|node|app_map|form';
  $field_group->group_name = 'group_top_img';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_map';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_reference';
  $field_group->data = array(
    'label' => 'Topbillede',
    'weight' => '1',
    'children' => array(
      0 => 'field_topimage',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-top-img field-group-fieldset',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_top_img|node|app_map|form'] = $field_group;

  return $export;
}
