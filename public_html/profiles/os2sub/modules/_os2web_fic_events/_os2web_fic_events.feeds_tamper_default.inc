<?php
/**
 * @file
 * _os2web_fic_events.feeds_tamper_default.inc
 */

/**
 * Implements hook_feeds_tamper_default().
 */
function _os2web_fic_events_feeds_tamper_default() {
  $export = array();

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = TRUE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'fic_begivenheder-xpathparser_21-strtotime';
  $feeds_tamper->importer = 'fic_begivenheder';
  $feeds_tamper->source = 'xpathparser:21';
  $feeds_tamper->plugin_id = 'strtotime';
  $feeds_tamper->settings = array();
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'String to Unix timestamp';
  $export['fic_begivenheder-xpathparser_21-strtotime'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'fic_begivenheder-xpathparser_27-explode';
  $feeds_tamper->importer = 'fic_begivenheder';
  $feeds_tamper->source = 'xpathparser:27';
  $feeds_tamper->plugin_id = 'explode';
  $feeds_tamper->settings = array(
    'separator' => ',',
    'limit' => '',
    'real_separator' => ',',
  );
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'Explode';
  $export['fic_begivenheder-xpathparser_27-explode'] = $feeds_tamper;

  return $export;
}
