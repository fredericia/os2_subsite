<?php
/**
 * @file
 * os2web_news_page_archive.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function os2web_news_page_archive_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance:
  // 'node-os2web_base_news-field_os2web_news_page_archive'.
  $field_instances['node-os2web_base_news-field_os2web_news_page_archive'] = array(
    'bundle' => 'os2web_base_news',
    'deleted' => 0,
    'description' => 'Vælg en dato hvor denne nyheds skal arkiveres. Arkivering af en nyhed gør at den ikke optræder i de normale oversigter, men udelukkende i nyheds arkivet.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 6,
      ),
      'search_index' => array(
        'label' => 'above',
        'module' => 'date',
        'settings' => array(
          'format_type' => 'long',
          'fromto' => 'both',
          'multiple_from' => '',
          'multiple_number' => '',
          'multiple_to' => '',
          'show_remaining_days' => FALSE,
        ),
        'type' => 'date_default',
        'weight' => 5,
      ),
      'search_result' => array(
        'label' => 'above',
        'module' => 'date',
        'settings' => array(
          'format_type' => 'long',
          'fromto' => 'both',
          'multiple_from' => '',
          'multiple_number' => '',
          'multiple_to' => '',
          'show_remaining_days' => FALSE,
        ),
        'type' => 'date_default',
        'weight' => 5,
      ),
      'spotbox' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 18,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_os2web_news_page_archive',
    'label' => 'Arkiveringsdato',
    'required' => 0,
    'settings' => array(
      'default_value' => 'blank',
      'default_value2' => 'same',
      'default_value_code' => '',
      'default_value_code2' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'date',
      'settings' => array(
        'increment' => 15,
        'input_format' => 'd/m/Y - H:i:s',
        'input_format_custom' => '',
        'label_position' => 'above',
        'text_parts' => array(),
        'year_range' => '-3:+3',
      ),
      'type' => 'date_popup',
      'weight' => 53,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Arkiveringsdato');
  t('Vælg en dato hvor denne nyheds skal arkiveres. Arkivering af en nyhed gør at den ikke optræder i de normale oversigter, men udelukkende i nyheds arkivet.');

  return $field_instances;
}
