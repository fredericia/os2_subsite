<?php

/**
 * @file
 * This file contains the main theme functions hooks and overrides.
 */

/**
 * Implements theme_preprocess_html().
 */
function site_fic_preprocess_html(&$variables) {
  $current_theme = variable_get('theme_default', 'none');

  // Paths.
  $variables['path_js'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/js';
  $variables['path_img'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img';
  $variables['path_css'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/css';
  $variables['path_font'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/fonts';

  // Add out fonts from Google Fonts API.
  drupal_add_css(
    'https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i',
    array('type' => 'external')
    );
//
//  // Live reload.
//  if (variable_get('environment', FALSE) == 'local') {
//    $live_reload_file = 'http://127.0.0.1:35729/livereload.js';
//    drupal_add_js(
//      $live_reload_file,
//      array(
//        'group' => JS_LIBRARY,
//      )
//    );
//  }

  // Body classes.
  $variables['classes_array'][] = 'footer-attached';

  // Load jQuery UI.
  drupal_add_library('system', 'ui');

  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/**
 * Implements hook_preprocess_page().
 */
function site_fic_preprocess_page(&$variables) {
  $search_form = drupal_get_form('search_form');
  $search_box = drupal_render($search_form);
  $variables['search_box'] = $search_box;
  $current_theme = variable_get('theme_default', 'none');
  $primary_navigation_name = variable_get('menu_main_links_source', 'main-menu');
  $secondary_navigation_name = variable_get('menu_secondary_links_source', 'user-menu');

  // Tabs.
  $variables['tabs_primary'] = $variables['tabs'];
  $variables['tabs_secondary'] = $variables['tabs'];
  unset($variables['tabs_primary']['#secondary']);
  unset($variables['tabs_secondary']['#primary']);

  // Tabbed navigation.
  $variables['tabbed_navigation'] = _bellcom_generate_menu($primary_navigation_name, 'tabbed', 1);

  // Color.
  if (module_exists('color')) {
    _color_page_alter($variables);
  }

  // Render section logo image.
  if (isset($variables['section_logo_image']['uri'])) {
    $section_logo_uri = $variables['section_logo_image']['uri'];
    $variables['section_logo'] = theme('image_style', array(
      // @TODO replace image_style_name.
      'style_name' => 'thumbnail',
      'path' => $section_logo_uri,
    ));
  }

  if (drupal_is_front_page()) {
    $backstretch_data = &drupal_static('backstretch_data');
    drupal_add_js(drupal_get_path('module', 'backstretch') . '/js/jquery.backstretch.min.js');
    drupal_add_js(array('ficBackstretch' => $backstretch_data), 'setting');
  }
}

/**
 * Implements template_preprocess_node.
 */
function site_fic_preprocess_node(&$variables) {
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

/**
 * Implements template_preprocess_taxonomy_term.
 */
function site_fic_preprocess_taxonomy_term(&$variables) {
  $function_view_mode = __FUNCTION__ . '__' . $variables['view_mode'];
  if (function_exists($function_view_mode)) {
    $function_view_mode($variables);
  }
}

/**
 * Implements template_preprocess_block.
 */
function site_fic_preprocess_block(&$variables) {
  $variables['theme_hook_suggestions'][] = 'block__' . $variables['block']->region;
  $variables['theme_hook_suggestions'][] = 'block__' . $variables['block']->module;
  $variables['theme_hook_suggestions'][] = 'block__' . $variables['block']->delta;
  // Add block description as template suggestion.
  $block = block_custom_block_get($variables['block']->delta);
  // Transform block description to a valid machine name.
  if (!empty($block['info'])) {
    // Required for iconv().
    setlocale(LC_ALL, 'en_US');
    $variables['theme_hook_suggestions'][] = 'block__' . str_replace(' ', '_', strtolower(iconv('UTF-8', 'ASCII//TRANSLIT', $block['info'])));
  }
}

/**
 * Implements theme_menu_local_tasks().
 *
 * Overriding base theme menu_local_tasks. Base theme - Bellcom
 * overriding with bootstrap original
 *
 * @param array $variables
 *   Input variables array.
 *
 * @return string
 *   The constructed HTML.
 */
function site_fic_menu_local_tasks(&$variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="tabs--primary nav nav-tabs">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }

  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs--secondary pagination pagination-sm">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/**
 * Returns HTML for a menu link and submenu.
 *
 * @param array $variables
 *   An associative array containing:
 *   - element: Structured array data for a menu link.
 *
 * @return string
 *   The constructed HTML.
 *
 * @see theme_menu_link()
 *
 * @ingroup theme_functions
 */
function site_fic_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }
    elseif ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] == 1)) {
      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      // Generate as standard dropdown.
      $element['#title'] .= ' <span class="caret"></span>';
      $element['#attributes']['class'][] = 'dropdown';
      $element['#localized_options']['html'] = TRUE;

      // Set dropdown trigger element to # to prevent inadvertant page loading
      // when a submenu link is clicked.
      $element['#localized_options']['attributes']['data-target'] = '#';
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';
    }
  }
  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }
  $element['#localized_options']['attributes']['title'] = $element['#title'];

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Custom preprocess function for fic_header view mode.
 */
function site_fic_preprocess_taxonomy_term__fic_header(&$vars) {
  if (empty($vars['field_os2web_base_field_image'])) {
    return;
  }

  $backstretch_data = &drupal_static('backstretch_data');
  if (empty($backstretch_data)) {
    $backstretch_data = array();
  }

  $backstretch_data[$vars['tid']] = image_style_url(
    'os2web_cover',
    $vars['field_os2web_base_field_image'][LANGUAGE_NONE][0]['uri']
  );
}
