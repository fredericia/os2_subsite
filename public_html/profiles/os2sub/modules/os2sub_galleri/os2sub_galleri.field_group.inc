<?php
/**
 * @file
 * os2sub_galleri.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function os2sub_galleri_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_billeder|node|os2web_base_gallery|form';
  $field_group->group_name = 'group_billeder';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_base_gallery';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_formular';
  $field_group->data = array(
    'label' => 'Billeder',
    'weight' => '3',
    'children' => array(
      0 => 'field_os2web_base_field_photo',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-billeder field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_billeder|node|os2web_base_gallery|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_formular|node|os2web_base_gallery|form';
  $field_group->group_name = 'group_formular';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_base_gallery';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Form',
    'weight' => '1',
    'children' => array(
      0 => 'group_billeder',
      1 => 'group_tekst',
      2 => 'group_os2web_base_group_taxono',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-formular field-group-htabs',
      ),
    ),
  );
  $export['group_formular|node|os2web_base_gallery|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tekst|node|os2web_base_gallery|form';
  $field_group->group_name = 'group_tekst';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_base_gallery';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_formular';
  $field_group->data = array(
    'label' => 'Tekst',
    'weight' => '4',
    'children' => array(
      0 => 'body',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-tekst field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_tekst|node|os2web_base_gallery|form'] = $field_group;

  return $export;
}
