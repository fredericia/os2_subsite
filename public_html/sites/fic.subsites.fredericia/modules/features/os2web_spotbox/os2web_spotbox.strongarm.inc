<?php
/**
 * @file
 * os2web_spotbox.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function os2web_spotbox_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_os2web_spotbox_box_pattern';
  $strongarm->value = '';
  $export['pathauto_node_os2web_spotbox_box_pattern'] = $strongarm;

  return $export;
}
