<?php
/**
 * @file
 * fic_frontpage_settings.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function fic_frontpage_settings_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_file_instagram_pattern';
  $strongarm->value = '';
  $export['pathauto_file_instagram_pattern'] = $strongarm;

  return $export;
}
