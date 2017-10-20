<?php
/**
 * @file
 * fic_blocks_settings.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function fic_blocks_settings_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['block-footer_text'] = array(
    'cache' => -1,
    'custom' => 0,
    'machine_name' => 'footer_text',
    'module' => 'block',
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
        'region' => 'footer5',
        'status' => 1,
        'theme' => 'site_fic',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['fic_common-fic_header_term_view'] = array(
    'cache' => 4,
    'custom' => 0,
    'delta' => 'fic_header_term_view',
    'module' => 'fic_common',
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
        'region' => 'header',
        'status' => 1,
        'theme' => 'site_fic',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['locale-language_content'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'language_content',
    'module' => 'locale',
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

  $export['menu-menu-genveje'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'menu-genveje',
    'module' => 'menu',
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
        'region' => 'footer4',
        'status' => 1,
        'theme' => 'site_fic',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['os2web_logo-os2web_logo'] = array(
    'cache' => 4,
    'custom' => 0,
    'delta' => 'os2web_logo',
    'module' => 'os2web_logo',
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
        'region' => 'footer5',
        'status' => 1,
        'theme' => 'site_fic',
        'weight' => 0,
      ),
    ),
    'title' => '<none>',
    'visibility' => 0,
  );

  return $export;
}
