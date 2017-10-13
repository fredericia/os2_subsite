<?php
/**
 * @file
 * fic_page_settings.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function fic_page_settings_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_sektion'.
  $field_bases['field_sektion'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_sektion',
    'indexes' => array(
      'tid' => array(
        0 => 'tid',
      ),
    ),
    'locked' => 0,
    'module' => 'taxonomy',
    'settings' => array(
      'allowed_values' => array(
        0 => array(
          'vocabulary' => 'os2web_base_tax_site_structure',
          'parent' => 0,
          'depth' => '',
        ),
      ),
      'options_list_callback' => 'content_taxonomy_allowed_values',
    ),
    'translatable' => 0,
    'type' => 'taxonomy_term_reference',
  );

  return $field_bases;
}
