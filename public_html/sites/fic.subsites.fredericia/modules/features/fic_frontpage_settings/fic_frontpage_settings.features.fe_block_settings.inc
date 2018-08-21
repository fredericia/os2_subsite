<?php
/**
 * @file
 * fic_frontpage_settings.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function fic_frontpage_settings_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['views-instagram_billeder-block'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'instagram_billeder-block',
    'i18n_block_language' => array(),
    'i18n_mode' => 0,
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'bellcom' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bellcom',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'site' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'site',
        'weight' => 0,
      ),
      'site_fic' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'site_fic',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
