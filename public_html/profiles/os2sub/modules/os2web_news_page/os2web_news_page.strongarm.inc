<?php
/**
 * @file
 * os2web_news_page.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function os2web_news_page_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_term_os2web_news_page_newstypes_pattern';
  $strongarm->value = '';
  $export['pathauto_taxonomy_term_os2web_news_page_newstypes_pattern'] = $strongarm;

  return $export;
}
