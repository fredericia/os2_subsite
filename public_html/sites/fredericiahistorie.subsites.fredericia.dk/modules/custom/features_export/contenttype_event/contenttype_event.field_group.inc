<?php
/**
 * @file
 * contenttype_event.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function contenttype_event_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_audio|node|event|form';
  $field_group->group_name = 'group_audio';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_event';
  $field_group->data = array(
    'label' => 'Lyd',
    'weight' => '47',
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
  $export['group_audio|node|event|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_center_img_event|node|event|form';
  $field_group->group_name = 'group_center_img_event';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_main_content_event';
  $field_group->data = array(
    'label' => 'Center billede',
    'weight' => '84',
    'children' => array(
      0 => 'field_body_center_img',
      1 => 'field_center_img_text',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-center-img-event field-group-fieldset',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_center_img_event|node|event|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_event_app|node|event|form';
  $field_group->group_name = 'group_event_app';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_event';
  $field_group->data = array(
    'label' => 'App',
    'weight' => '48',
    'children' => array(
      0 => 'field_active_body',
      1 => 'field_body_app',
      2 => 'field_reference_summary',
      3 => 'field_reference_thumbnail',
      4 => 'field_reference_title',
      5 => 'field_references',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-event-app field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_event_app|node|event|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_event_topimage|node|event|form';
  $field_group->group_name = 'group_event_topimage';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_event';
  $field_group->data = array(
    'label' => 'Topbillede',
    'weight' => '44',
    'children' => array(
      0 => 'field_topimage',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-event-topimage field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_event_topimage|node|event|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_event|node|event|form';
  $field_group->group_name = 'group_event';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Event',
    'weight' => '5',
    'children' => array(
      0 => 'group_audio',
      1 => 'group_event_app',
      2 => 'group_event_topimage',
      3 => 'group_main_content_event',
      4 => 'group_sidebar_event',
    ),
    'format_type' => 'tabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => ' group-event field-group-tabs',
      ),
    ),
  );
  $export['group_event|node|event|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_main_content_event|node|event|form';
  $field_group->group_name = 'group_main_content_event';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_event';
  $field_group->data = array(
    'label' => 'Hovedindhold',
    'weight' => '45',
    'children' => array(
      0 => 'body',
      1 => 'field_second_body',
      2 => 'field_place',
      3 => 'field_priser',
      4 => 'field_event_link',
      5 => 'field_list_img',
      6 => 'field_date_of_event',
      7 => 'field_time',
      8 => 'group_center_img_event',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Hovedindhold',
      'instance_settings' => array(
        'required_fields' => 0,
        'classes' => ' group-main-content-event field-group-tab',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_main_content_event|node|event|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_sidebar_event|node|event|form';
  $field_group->group_name = 'group_sidebar_event';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_event';
  $field_group->data = array(
    'label' => 'Sidebar',
    'weight' => '46',
    'children' => array(
      0 => 'field_featured_links',
      1 => 'field_sidebar',
      2 => 'field_link_background_image',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => ' group-sidebar-event field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_sidebar_event|node|event|form'] = $field_group;

  return $export;
}
