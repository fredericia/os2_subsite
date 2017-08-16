<?php

/**
 * Implements theme_preprocess_html().
 */
function subsite_2_preprocess_page(&$variables){
  $search_box = drupal_render(drupal_get_form('search_form'));
  $variables['search_box'] = $search_box;
}

function subsite_2_preprocess_html(&$variables) {
  $theme_path = path_to_theme();

  // Add conditional stylesheets for IE9 and lower.
  drupal_add_css($theme_path . '/dist/css/stylesheet.css', array(
    'group'      => CSS_THEME,
  ));
  drupal_add_css($theme_path . '/dist/css/stylesheet-ie9-1.css', array(
    'group'      => CSS_THEME,
    'browsers'   => array('IE' => 'lte IE 9', '!IE' => FALSE),
  ));
  drupal_add_css($theme_path . '/dist/css/stylesheet-ie9-2.css', array(
    'group'      => CSS_THEME,
    'browsers'   => array('IE' => 'lte IE 9', '!IE' => FALSE),
  ));
  drupal_add_js($theme_path . '/dist/js/modernizr.js', array(
    'group'      => JS_LIBRARY,
  ));
  drupal_add_js($theme_path . '/dist/js/app.js', array(
    'group'      => JS_THEME,
  ));
  drupal_add_js($theme_path . '/dist/js/ie9.js', array(
    'group'      => JS_THEME,
    'browsers'   => array('IE' => 'lte IE 9', '!IE' => FALSE),
  ));

  // Add out fonts from Google Fonts API.

  drupal_add_html_head(array(
    '#tag'        => 'link',
    '#attributes' => array(
      'href' => 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i|PT+Mono',
      'rel'  => 'stylesheet',
      'type' => 'text/css',
    ),
  ), 'google_font_subsite_2');

  // Body classes
  // $variables['classes_array'][] = 'footer-attached';

  $variables['classes_array'][] = 'simple-navigation-enabled-xs';
  $variables['classes_array'][] = 'main-navigation-enabled-sm';
  $variables['classes_array'][] = 'main-navigation-enabled-md';
  $variables['classes_array'][] = 'main-navigation-enabled-lg';

  // Load jQuery UI
  drupal_add_library('system', 'ui');
}

/**
 * Implements template_preprocess_node.
 */
function subsite_2_preprocess_node(&$variables) {

  // Optionally, run node-type-specific preprocess functions, like
  // foo_preprocess_node_page() or foo_preprocess_node_story().
  $function_node_type = __FUNCTION__ . '__' . $variables['node']->type;
  $function_view_mode = __FUNCTION__ . '__' . $variables['view_mode'];
  if (function_exists($function_node_type)) {
    $function_node_type($variables);
  }
  if (function_exists($function_view_mode)) {
    $function_view_mode($variables);
  }
}

/*
 * Implements template_preprocess_comment().
 */
function subsite_2_preprocess_comment(&$variables) {
}

/*
 * Full node
 * Implements hook_preprocess_node().
 */
function subsite_2_preprocess_node__full(&$variables) {
}
/*
function subsite_2_menu_local_task($variables) {
  $link = $variables['element']['#link'];
  $link_text = $link['title'];

  $page_args = unserialize($link['page_arguments']); // Gets the view name and display type
  // Could be useful if we want to restrict it to certain views and displays.

  $view = views_get_view($page_args[0]);
  $view->set_display($page_args[1]);
  $output = $view->preview();
/* If result is empty return here this hides the tab from showing up. However the page will still be visible when someone tries to visit the page directly. If we want to completely hide the view then the above solution is more appropriate.
*/
/* if (empty($view->result)) {
    return;
  }
   // code to genrate your li or however the theme creates tab markup

  return "<li>" . l($link_text, $link['href'], $link['localized_options']) . "</li>";
}
*/
