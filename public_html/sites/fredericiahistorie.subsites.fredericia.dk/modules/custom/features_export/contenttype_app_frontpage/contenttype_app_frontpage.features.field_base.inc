<?php
/**
 * @file
 * contenttype_app_frontpage.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function contenttype_app_frontpage_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_references_9'
  $field_bases['field_references_9'] = array(
    'active' => 1,
    'cardinality' => 9,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_references_9',
    'indexes' => array(
      'target_id' => array(
        0 => 'target_id',
      ),
    ),
    'locked' => 0,
    'module' => 'entityreference',
    'settings' => array(
      'handler' => 'views',
      'handler_settings' => array(
        'behaviors' => array(
          'views-select-list' => array(
            'status' => 0,
          ),
        ),
        'view' => array(
          'args' => array(),
          'display_name' => 'entityreference_1',
          'view_name' => 'be_app_pages',
        ),
      ),
      'target_type' => 'node',
    ),
    'translatable' => 0,
    'type' => 'entityreference',
  );

  return $field_bases;
}
