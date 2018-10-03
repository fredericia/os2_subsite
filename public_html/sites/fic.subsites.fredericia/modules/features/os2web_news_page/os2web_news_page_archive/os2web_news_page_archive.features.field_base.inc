<?php
/**
 * @file
 * os2web_news_page_archive.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function os2web_news_page_archive_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_os2web_news_page_archive'.
  $field_bases['field_os2web_news_page_archive'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_os2web_news_page_archive',
    'indexes' => array(),
    'locked' => 0,
    'module' => 'date',
    'settings' => array(
      'cache_count' => 4,
      'cache_enabled' => 0,
      'granularity' => array(
        'day' => 'day',
        'hour' => 'hour',
        'minute' => 'minute',
        'month' => 'month',
        'second' => 0,
        'year' => 'year',
      ),
      'timezone_db' => 'UTC',
      'todate' => '',
      'tz_handling' => 'site',
    ),
    'translatable' => 0,
    'type' => 'datestamp',
  );

  return $field_bases;
}
