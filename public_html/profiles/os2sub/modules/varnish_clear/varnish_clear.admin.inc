<?php
/**
 * @file
 * varnish_clear.admin.inc
 */

/**
 * Implements hook_form().
 */
function varnish_clear_admin_form() {
  drupal_set_title(t('Varnish clear'));

  global $base_url;
  $temp = parse_url($base_url);
  $default_host = $temp['host'];

  $form['varnish_clear_host'] = array(
    '#type' => 'textfield',
    '#title' => t('Hostname to clear'),
    '#default_value' => $default_host,
    '#required' => FALSE,
    '#description' => t('Set to "." to clear all hostnames.'),
  );

  $form['varnish_clear_url'] = array(
    '#type' => 'textfield',
    '#title' => t('URL to clear'),
    '#default_value' => '/',
    '#required' => TRUE,
    '#description' => t('Regular expressions supported. "/" clears the entire cache. "^/$" will clear only the front page.'),
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('clear'),
  );

  return $form;
}

/**
 * Submit handler for the submit button.
 */
function varnish_clear_admin_form_submit($form, &$form_state) {
  varnish_clear_cache($form_state['values']['varnish_clear_host'], $form_state['values']['varnish_clear_url']);
  $form_state['rebuild'] = TRUE;
}

