<?php

/**
 * Implements theme_preprocess_html().
 */
function site_preprocess_html(&$variables) {
  $current_theme = variable_get('theme_default', 'none');

  // Paths
  $variables['path_js']   = base_path() . drupal_get_path('theme', $current_theme) . '/dist/js';
  $variables['path_img']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img';
  $variables['path_css']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/css';
  $variables['path_font'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/fonts';

  // Add out fonts from Google Fonts API.
  drupal_add_css(
    'https://fonts.googleapis.com/css?family=Raleway:300,400,600,700',
    array('type' => 'external')
  );

  // Live reload.
  if (variable_get('environment', FALSE) == 'local') {
    $live_reload_file = 'http://127.0.0.1:35729/livereload.js';
    drupal_add_js(
      $live_reload_file,
      array(
        'group' => JS_LIBRARY,
      )
    );
  }

  // Body classes
  $variables['classes_array'][] = 'footer-attached';

  // Load jQuery UI
  drupal_add_library('system', 'ui');

  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/*
 * Implements hook_preprocess_page().
 */
function site_preprocess_page(&$variables) {

  // Tabs
  $variables['tabs_primary'] = $variables['tabs'];
  $variables['tabs_secondary'] = $variables['tabs'];
  unset($variables['tabs_primary']['#secondary']);
  unset($variables['tabs_secondary']['#primary']);

  // Color
  if (module_exists('color')) {
    _color_page_alter($variables);
  }
}

/**
 * Implements template_preprocess_node.
 */
function site_preprocess_node(&$variables) {
  $node = $variables['node'];

  // Optionally, run node-type-specific preprocess functions, like
  // foo_preprocess_node_page() or foo_preprocess_node_story().
  $function_node_type = __FUNCTION__ . '__' . $node->type;
  $function_view_mode = __FUNCTION__ . '__' . $variables['view_mode'];
  if (function_exists($function_node_type)) {
    $function_node_type($variables);
  }
  if (function_exists($function_view_mode)) {
    $function_view_mode($variables);
  }
}
