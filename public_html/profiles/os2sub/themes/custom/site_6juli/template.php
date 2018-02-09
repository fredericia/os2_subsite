<?php

/**
 * Implements theme_preprocess_html().
 */
function site_6juli_preprocess_html(&$variables) {
  $theme_path = path_to_theme();

  // Add javascript files
  drupal_add_js($theme_path . '/dist/javascripts/modernizr.js',
    [
      'type' => 'file',
      'scope' => 'footer',
      'group' => JS_LIBRARY,
    ]);
  drupal_add_js($theme_path . '/dist/javascripts/app.js',
    [
      'type' => 'file',
      'scope' => 'footer',
      'group' => JS_THEME,
    ]);

  // Add fonts from Google fonts API.
  drupal_add_css('https://fonts.googleapis.com/css?family=Lato:400,700|Droid+Serif:400,700',
    ['type' => 'external']);
}

/**
 * Override or insert variables into the page template for HTML output.
 */
function site_6juli_process_html(&$variables) {

  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/*
 * Implements hook_preprocess_page().
 */
function site_6juli_preprocess_page(&$variables) {
  $current_theme = variable_get('theme_default', 'none');
  $primary_navigation_name = variable_get('menu_main_links_source', 'main-menu');
  $secondary_navigation_name = variable_get('menu_secondary_links_source', 'user-menu');

  $variables['logo'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img/logo/6-juli-dagene-fredericia.png';

  // Overriding the one set by mother theme, as we want to limit the number of levels shown
  $variables['theme_path'] = base_path() . drupal_get_path('theme', $current_theme);

  // Navigation
  $variables['flexy_navigation__primary'] = _bellcom_generate_menu($primary_navigation_name, 'flexy_navigation', FALSE, 1);

  $variables['menu_slinky__primary'] = _bellcom_generate_menu($primary_navigation_name, 'slinky', FALSE, 1);
  $variables['menu_slinky__secondary'] = _bellcom_generate_menu($secondary_navigation_name, 'slinky', FALSE, 1);

  // Tabs.
  $variables['tabs_primary'] = $variables['tabs'];
  $variables['tabs_secondary'] = $variables['tabs'];
  unset($variables['tabs_primary']['#secondary']);
  unset($variables['tabs_secondary']['#primary']);
}

/**
 * Override or insert variables into the page template.
 */
function site_6juli_process_page(&$variables) {

  // Hook into color.module.
  if (module_exists('color')) {
    _color_page_alter($variables);
  }
}

/**
 * Implements template_preprocess_node.
 */
function site_6juli_preprocess_node(&$variables) {
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

function site_6juli_preprocess_block(&$variables) {
  $variables['theme_hook_suggestions'][] = 'block__' . $variables['block']->region;
  $variables['theme_hook_suggestions'][] = 'block__' . $variables['block']->module;
  $variables['theme_hook_suggestions'][] = 'block__' . $variables['block']->delta;
  // Add block description as template suggestion
  $block = block_custom_block_get($variables['block']->delta);
  // Transform block description to a valid machine name
  if (!empty($block['info'])) {
    setlocale(LC_ALL, 'en_US'); // required for iconv()
    $variables['theme_hook_suggestions'][] = 'block__' . str_replace(' ',
        '_',
        strtolower(iconv('UTF-8', 'ASCII//TRANSLIT', $block['info'])));
  }
}
