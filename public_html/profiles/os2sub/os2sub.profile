<?php

/**
 * @file
 * This file includes all hooks to proper set up profile during install
 */

/**
 * Name of profile; visible in profile selection form.
 */
define('PROFILE_NAME', 'OS2sub');

/**
 * Description of profile; visible in profile selection form.
 */
define('PROFILE_DESCRIPTION', 'Generisk Installation af OS2sub.');

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * Allows the profile to alter the site configuration form.
 */
function os2sub_form_install_configure_form_alter(&$form, $form_state) {
  // Pre-populate the site name with the server name.
  $form['site_information']['site_name']['#default_value'] = 'OS2sub Test';
  $form['update_notifications']['update_status_module']['#default_value'] = array(0, 0);
  $form['server_settings']['site_default_country']['#default_value'] = 'DK';
  $form['server_settings']['#access'] = FALSE;
  $form['update_notifications']['#access'] = FALSE;
  $form['admin_account']['account']['name']['#default_value'] = 'admin';
}

/**
 * Sets the default language to danish.
 */
function os2sub_profile_details() {
  return array(
    'name' => PROFILE_NAME,
    'description' => PROFILE_DESCRIPTION,
    'language' => "da",
  );
}
