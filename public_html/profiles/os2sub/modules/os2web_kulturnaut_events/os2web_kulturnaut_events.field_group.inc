<?php
/**
 * @file
 * os2web_kulturnaut_events.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function os2web_kulturnaut_events_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_hidden|node|os2web_kulturnaut_knactivity|form';
  $field_group->group_name = 'group_hidden';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_kulturnaut_knactivity';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Ikke brugte',
    'weight' => '28',
    'children' => array(
      0 => 'field_os2web_kulturnaut_homepage',
      1 => 'field_os2web_kulturnaut_shomepag',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Ikke brugte',
      'instance_settings' => array(
        'required_fields' => 1,
        'id' => '',
        'classes' => 'group-hidden field-group-div hidden',
        'description' => '',
        'show_label' => '1',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'fast',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_hidden|node|os2web_kulturnaut_knactivity|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Ikke brugte');

  return $field_groups;
}
