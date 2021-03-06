<?php

/**
 * Implements hook_css_alter().
 * @TODO: Once http://drupal.org/node/901062 is resolved, determine whether
 * this can be implemented in the .info file instead.
 *
 * Omitted:
 * - color.css
 * - contextual.css
 * - dashboard.css
 * - field_ui.css
 * - image.css
 * - locale.css
 * - shortcut.css
 * - simpletest.css
 * - toolbar.css
 */

function fredhist_theme($existing, $type, $theme, $path){
  return array(
    'user_login' => array(
      'render element' => 'form',
      'template' => 'templates/user-login',
    ),
  );
}

/**
 * Implements hook_preprocess_page()
 */
function fredhist_preprocess_page(&$variables) {

  // add js to 'hotspot' contenttype
  if (isset($variables['node']) && $variables['node']->type == 'app_hotspot') {
    // Add js
    drupal_add_js(drupal_get_path('theme', 'fredhist') . '/js/hotspot.js');
    $variables['scripts'] = drupal_get_js();
  }
}


/**
 * Implements theme_preprocess_html().
 */
function fredhist_preprocess_html(&$variables) {

  // Add out fonts from Google Fonts API.
  drupal_add_html_head(array(
    '#tag'        => 'link',
    '#attributes' => array(
      'href' => 'https://fonts.googleapis.com/css?family=Raleway:500,600,700',
      'rel'  => 'stylesheet',
      'type' => 'text/css',
    ),
  ), 'google_font_fki');
}
