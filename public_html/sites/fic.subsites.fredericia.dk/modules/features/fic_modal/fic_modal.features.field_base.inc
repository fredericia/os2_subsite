<?php
/**
 * @file
 * fic_modal.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function fic_modal_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_node_ids'.
  $field_bases['field_node_ids'] = array(
    'active' => 1,
    'cardinality' => -1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_node_ids',
    'indexes' => array(
      'nid' => array(
        0 => 'nid',
      ),
    ),
    'locked' => 0,
    'module' => 'node_reference',
    'settings' => array(
      'entity_translation_sync' => FALSE,
      'referenceable_types' => array(
        'banner' => 0,
        'event_calendar' => 0,
        'media' => 0,
        'modal' => 0,
        'os2web_base_contentpage' => 'os2web_base_contentpage',
        'os2web_base_gallery' => 0,
        'os2web_base_news' => 'os2web_base_news',
        'os2web_base_selfservice_link' => 0,
        'os2web_contact_contact' => 0,
        'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
        'os2web_spotbox_box' => 0,
        'personale' => 0,
        'velkomst' => 0,
        'webform' => 0,
      ),
      'view' => array(
        'args' => array(),
        'display_name' => '',
        'view_name' => '',
      ),
    ),
    'translatable' => 0,
    'type' => 'node_reference',
  );

  return $field_bases;
}
