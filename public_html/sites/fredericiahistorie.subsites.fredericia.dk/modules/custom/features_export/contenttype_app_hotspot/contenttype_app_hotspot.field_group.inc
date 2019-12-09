<?php
/**
 * @file
 * contenttype_app_hotspot.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function contenttype_app_hotspot_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_audio|node|app_hotspot|form';
  $field_group->group_name = 'group_audio';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_hotspot';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Lyd',
    'weight' => '7',
    'children' => array(
      0 => 'field_audiofile',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_audio|node|app_hotspot|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_center_billede|node|app_hotspot|form';
  $field_group->group_name = 'group_center_billede';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_hotspot';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_page_content';
  $field_group->data = array(
    'label' => 'Center billede',
    'weight' => '13',
    'children' => array(
      0 => 'field_body_center_img',
      1 => 'field_center_img_text',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_center_billede|node|app_hotspot|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_hotspot|node|app_hotspot|form';
  $field_group->group_name = 'group_hotspot';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_hotspot';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Hotspot',
    'weight' => '5',
    'children' => array(
      0 => 'field_app_hotspot_image',
      1 => 'field_app_hotspot_icone',
      2 => 'field_app_hotspot_elements',
      3 => 'field_app_hotspot_landscape',
      4 => 'field_reference_title',
      5 => 'field_reference_thumbnail',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_hotspot|node|app_hotspot|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_page_content|node|app_hotspot|form';
  $field_group->group_name = 'group_page_content';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_hotspot';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Page content',
    'weight' => '6',
    'children' => array(
      0 => 'field_page_body',
      1 => 'field_page_body_second',
      2 => 'group_center_billede',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_page_content|node|app_hotspot|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tabs|node|app_hotspot|form';
  $field_group->group_name = 'group_tabs';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'app_hotspot';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Tabs',
    'weight' => '4',
    'children' => array(
      0 => 'group_hotspot',
      1 => 'group_page_content',
      2 => 'group_audio',
    ),
    'format_type' => 'tabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => '',
      ),
    ),
  );
  $export['group_tabs|node|app_hotspot|form'] = $field_group;

  return $export;
}
