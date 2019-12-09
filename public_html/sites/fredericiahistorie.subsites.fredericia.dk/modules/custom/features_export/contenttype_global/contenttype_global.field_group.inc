<?php
/**
 * @file
 * contenttype_global.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function contenttype_global_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_default_topimg|node|global|form';
  $field_group->group_name = 'group_default_topimg';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'global';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Default topbillede',
    'weight' => '49',
    'children' => array(
      0 => 'field_topimage',
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
  $export['group_default_topimg|node|global|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_topimage_events|node|global|form';
  $field_group->group_name = 'group_topimage_events';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'global';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Topbillede',
    'weight' => '46',
    'children' => array(
      0 => 'field_events_topimg',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Topbillede',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => 'Topbillede der vises på liste over begivenheder',
      ),
      'formatter' => 'collapsible',
    ),
  );
  $export['group_topimage_events|node|global|form'] = $field_group;

  return $export;
}
