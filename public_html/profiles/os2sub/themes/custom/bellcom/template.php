<?php
include( dirname(__FILE__) . '/include/menu.inc');
include( dirname(__FILE__) . '/include/helpers.inc');

/**
 * Implements theme_preprocess_html().
 */
function bellcom_preprocess_html(&$variables) {
  $current_theme = variable_get('theme_default','none');

  // Paths
  $variables['path_js']   = base_path() . drupal_get_path('theme', $current_theme) . '/dist/js';
  $variables['path_img']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img';
  $variables['path_css']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/css';
  $variables['path_font'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/font';
}

/*
 * Implements theme_preprocess_page().
 */
function bellcom_preprocess_page(&$variables) {
  $current_theme = variable_get('theme_default','none');
  $primary_navigation_name = variable_get('menu_main_links_source', 'main-menu');
  $secondary_navigation_name = variable_get('menu_secondary_links_source', 'user-menu');

  // Navigation
  $variables['navigation_list_primary'] = _bellcom_generate_menu($primary_navigation_name, 'navigation-list', false);
  $variables['navigation_list_secondary'] = _bellcom_generate_menu($secondary_navigation_name, 'navigation-list', false);
  $variables['sidebar_primary'] = _bellcom_generate_menu($primary_navigation_name, 'sidebar', false);
  $variables['sidebar_secondary'] = _bellcom_generate_menu($secondary_navigation_name, 'sidebar', false);

  // Paths
  $variables['path_js']   = base_path() . drupal_get_path('theme', $current_theme) . '/dist/js';
  $variables['path_img']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img';
  $variables['path_css']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/css';
  $variables['path_font'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/font';

  // Theme settings
  $variables['theme_settings'] = _bellcom_collect_theme_settings();
}

/**
 * Implements template_preprocess_node().
 */
function bellcom_preprocess_node(&$variables) {

  // Add node--view_mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['view_mode'];

  // Make "node--NODETYPE--VIEWMODE.tpl.php" templates available for nodes.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__' . $variables['view_mode'];

  // Add a class for the view mode.
  $variables['classes_array'][] = 'view-mode-' . $variables['view_mode'];

  // Add css class "node--NODETYPE--VIEWMODE" to nodes.
  $variables['classes_array'][] = 'node--' . $variables['type'] . '--' . $variables['view_mode'];

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

  // Title (shortened)
  $variables['title_shortened'] = _bellcom_text_shortener($variables['title'], 50);

  // Updated at
  if ($updated_at = $variables['node']->changed) {
    $variables['updated_at_short'] = format_date($updated_at, 'short');
    $variables['updated_at_medium'] = format_date($updated_at, 'medium');
    $variables['updated_at_long'] = format_date($updated_at, 'long');
    $variables['updated_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $updated_at))));;
    $variables['updated_at_seperated'] = _bellcom_seperated_dates($updated_at);
  }

  // Created at
  if ($created_at = $variables['node']->created) {
    $variables['created_at_short'] = format_date($created_at, 'short');
    $variables['created_at_medium'] = format_date($created_at, 'medium');
    $variables['created_at_long'] = format_date($created_at, 'long');
    $variables['created_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $created_at))));
    $variables['created_at_seperated'] = _bellcom_seperated_dates($created_at);
  }
}

/*
 * Implements template_preprocess_comment().
 */
function bellcom_preprocess_comment(&$variables) {

  // Updated at
  if ($updated_at = $variables['comment']->changed) {
    $variables['updated_at_short'] = format_date($updated_at, 'short');
    $variables['updated_at_medium'] = format_date($updated_at, 'medium');
    $variables['updated_at_long'] = format_date($updated_at, 'long');
    $variables['updated_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $updated_at))));
    $variables['updated_at_seperated'] = _bellcom_seperated_dates($updated_at);
  }

  // Created at
  if ($created_at = $variables['comment']->created) {
    $variables['created_at_short'] = format_date($created_at, 'short');
    $variables['created_at_medium'] = format_date($created_at, 'medium');
    $variables['created_at_long'] = format_date($created_at, 'long');
    $variables['created_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $created_at))));
    $variables['created_at_seperated'] = _bellcom_seperated_dates($created_at);
  }
}

/*
 * Implements template_preprocess_taxonomy_term().
 */
function bellcom_preprocess_taxonomy_term(&$variables) {

  // Add taxonomy-term--view_mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'taxonomy_term__' . $variables['view_mode'];

  // Make "taxonomy-term--TERMTYPE--VIEWMODE.tpl.php" templates available for terms.
  $variables['theme_hook_suggestions'][] = 'taxonomy_term__' . $variables['vocabulary_machine_name'] . '__' . $variables['view_mode'];

  // Add a class for the view mode.
  $variables['classes_array'][] = 'view-mode-' . $variables['view_mode'];

  // Optionally, run node-type-specific preprocess functions, like
  // foo_preprocess_taxonomy_term_page() or foo_preprocess_taxonomy_term_story().
  $function_taxonomy_term_type = __FUNCTION__ . '__' . $variables['vocabulary_machine_name'];
  $function_view_mode = __FUNCTION__ . '__' . $variables['view_mode'];
  if (function_exists($function_taxonomy_term_type)) {
    $function_taxonomy_term_type($variables);
  }
  if (function_exists($function_view_mode)) {
    $function_view_mode($variables);
  }
}

/**
 * Implements template_menu_local_tasks().
 */
function bellcom_menu_local_tasks(&$variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="tabs--primary">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }

  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs--secondary">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/*
 * Implements template_preprocess_field().
 */
function bellcom_preprocess_field(&$variables, $hook) {
}

/*
 * Implements hook_preprocess_region().
 */
function bellcom_preprocess_region(&$variables, $hook) {
}

/*
 * Implements theme_preprocess_block().
 */
function bellcom_preprocess_block(&$variables) {

  $variables ['classes_array'][] = drupal_html_class('block-' . $variables ['block']->module);
}

/*
 * Implements theme_menu_tree().
 * For main navigation.
 */
function bellcom_menu_tree__navigation_list(&$variables) {
  return '<ul class="navigation-list">' . $variables['tree'] . '</ul>';
}

/*
 * Implements theme_menu_tree().
 * For sidebar menu types.
 */
function bellcom_menu_tree__sidebar(&$variables) {
  return '<ul class="sidebar-navigation">' . $variables['tree'] . '</ul>';
}

/*
 * Implements theme_menu_link().
 */
function bellcom_menu_link__navigation_list(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }
    elseif ((!empty($element['#original_link']['depth']))) {

      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="navigation-list-item-dropdown-menu">' . drupal_render($element['#below']) . '</ul>';

      // Generate as dropdown.
      $element['#attributes']['class'][] = 'navigation-list-item-dropdown';
      $element['#localized_options']['html'] = TRUE;
    }
  }

  $element['#attributes']['class'][] = 'navigation-list-item';

  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }

  // If this item is active and/or in the active trail, add necessary classes.
  $active_classes = _bellcom_in_active_trail($element['#href']);
  if (isset($element['#attributes']['class'])) {
    $element['#attributes']['class'] = array_merge($element['#attributes']['class'], $active_classes);
  }
  else {
    $element['#attributes']['class'] = $active_classes;
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/*
 * Implements theme_menu_link().
 */
function bellcom_menu_link__sidebar(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {

    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }

    elseif ((!empty($element['#original_link']['depth']))) {

      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);

      // Submenu classes
      $sub_menu_attributes['element']['class'] = array();
      $sub_menu_attributes['element']['class'][] = 'sidebar-navigation-dropdown-menu';
      if (in_array('active', $element['#attributes']['class']) or in_array('active-trail', $element['#attributes']['class'])) {
        $sub_menu_attributes['element']['class'][] = 'active';
      }

      $sub_menu = ' <ul' . drupal_attributes($sub_menu_attributes['element']) . '>' . drupal_render($element['#below']) . '</ul>';

      // Generate as dropdown.
      $element['#title'] .= ' <span class="sidebar-navigation-dropdown-toggle"></span>';
      $element['#attributes']['class'][] = 'sidebar-navigation-dropdown';
      $element['#localized_options']['html'] = TRUE;
    }
  }
  else {
    $element['#attributes']['class'][] = 'sidebar-navigation-link';
  }

  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }

  // Link title class
  $convert_characters = array('/', '_', 'æ', 'ø', 'å');
  $element['#attributes']['class'][] = str_replace('/', '-', $element['#href']);

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Implements hook_field_widget_form_alter().
 */
function bellcom_field_widget_form_alter(&$element, &$form_state, $context) {

  // Make input groups work on BS3
  if (!empty($element['value']['#field_prefix']) || !empty($element['value']['#field_suffix'])) {
    $element['value']['#input_group'] = TRUE;
  }
}

/*
 * Implements template_preprocess_views_view_table().
 */
function bellcom_preprocess_views_view_table(&$variables) {
  $view = $variables['view'];

  // Add responsive class to the table
  $variables['classes_array'][] = 'table-responsive-stacked';

  $result = $variables['result'] = $variables['rows'];
  $options = $view->style_plugin->options;
  $handler = $view->style_plugin;
  $fields = &$view->field;
  $columns = $handler->sanitize_columns($options['columns'], $fields);

  foreach ($columns as $field => $column) {

    // Render each field into its appropriate column.
    foreach ($result as $num => $row) {

      if (!empty($fields[$field]) && empty($fields[$field]->options['exclude'])) {
        $label = check_plain(!empty($fields[$field]) ? $fields[$field]->label() : '');

        $variables['field_attributes'][$field][$num]['data-title'] = $label;
      }
    }
  }
}
