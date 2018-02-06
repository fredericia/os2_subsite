<?php
/**
 * @file
 * fic_blocks_settings.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function fic_blocks_settings_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_logo_paths';
  $strongarm->value = array(
    14 => '',
    8 => 'svoem-leg
svoemleg
svoemleg/*',
    9 => 'ficness
ficness/*',
    10 => 'moeder-konferencer
moederkonferencer/*',
    11 => 'haller-sport
hallersport/*',
    12 => 'bowling-kegler
bowlingkegler/*',
    13 => 'ude-faciliteter
udefaciliteter/*',
  );
  $export['os2web_logo_paths'] = $strongarm;

  return $export;
}
