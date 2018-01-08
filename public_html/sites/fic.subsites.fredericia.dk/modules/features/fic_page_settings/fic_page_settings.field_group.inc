<?php
/**
 * @file
 * fic_page_settings.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function fic_page_settings_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_fwparagraphs|node|os2web_base_contentpage|form';
  $field_group->group_name = 'group_fwparagraphs';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_base_contentpage';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_os2web_base_group_content';
  $field_group->data = array(
    'label' => 'Brede afsnit',
    'weight' => '7',
    'children' => array(
      0 => 'field_afsnit_full_width',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-fwparagraphs field-group-htab',
        'required_fields' => 1,
      ),
    ),
  );
  $field_groups['group_fwparagraphs|node|os2web_base_contentpage|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Brede afsnit');

  return $field_groups;
}
