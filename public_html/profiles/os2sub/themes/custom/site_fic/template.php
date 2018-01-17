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
  $theme_path = path_to_theme();

  // Paths.
  $variables['path_js'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/js';
  $variables['path_img'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img';
  $variables['path_css'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/css';
  $variables['path_font'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/fonts';

  // Add out fonts from Google Fonts API.
  drupal_add_css('https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,700i', array('type' => 'external'));

  drupal_add_js($theme_path . '/dist/js/modernizr.js', [
    'type' => 'file',
    'scope' => 'footer',
    'group' => JS_LIBRARY,
  ]);
  drupal_add_js($theme_path . '/dist/js/core.js', [
    'type' => 'file',
    'scope' => 'footer',
    'group' => JS_THEME,
  ]);

  // Body classes.
  $variables['classes_array'][] = 'footer-attached';

  // Load jQuery UI.
  drupal_add_library('system', 'ui');

  $backstretch_data = &drupal_static('backstretch_data');
  if (!empty($backstretch_data)) {
    drupal_add_js(drupal_get_path('module', 'backstretch') . '/js/jquery.backstretch.min.js');
    drupal_add_js(array('ficBackstretch' => $backstretch_data), 'setting');
    $variables['classes_array'][] = 'backstretched';
  }
}

/**
 * Override or insert variables into the page template for HTML output.
 */
function site_fic_process_html(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/**
 * Implements hook_preprocess_page().
 */
function site_fic_preprocess_page(&$variables) {

  $current_theme = variable_get('theme_default', 'none');
  $primary_navigation_name = variable_get('menu_main_links_source', 'main-menu');
  $secondary_navigation_name = variable_get('menu_secondary_links_source', 'user-menu');
  $variables['menu_slinky__primary'] = _bellcom_generate_menu($primary_navigation_name, 'slinky', true);

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

  $book_node_reference = variable_get('book_node_reference', FALSE);
  if ($book_node_reference) {
    $node = node_load($book_node_reference);
    _site_fic_get_node_translation($node);

    $variables['page']['navigation']['book_link'] = array(
      '#type' => 'container',
      '#attributes' => array('class' => array('book-link')),
      array(
        '#theme' => 'link',
        '#text' => t('Book'),
        '#path' => 'node/' . $node->nid,
      )
    );
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
function site_fic_preprocess_node__fic_header(&$vars) {
  $field_baggrund = field_get_items('node', $vars['node'], 'field_baggrund');
  _site_fic_set_backstretch_background($vars['nid'], $field_baggrund);
}

/**
 * Custom preprocess function for os2web_base_contentpage CT.
 */
function site_fic_preprocess_node__os2web_base_contentpage(&$vars) {
  // Remove ajax destination from modal popups.
  if (arg(3) == 'ajax' && arg(0) == 'modal') {
    $vars['theme_hook_suggestions'][] = 'node__os2web_base_contentpage__modal';
  }
}

/**
 * Custom preprocess function for fic_header view mode.
 */
function site_fic_preprocess_taxonomy_term__fic_header(&$vars) {
  // Processing modal contact field.
  $contact_link_url = &drupal_static('contact_link_url');
  if (empty($contact_link_url)) {
    $field_contact_value = field_get_items('taxonomy_term', $vars['term'], 'field_os2web_base_field_contact');
    if (!empty($field_contact_value)) {
      $contact_node_reference = node_load($field_contact_value[0]['nid']);
      _site_fic_get_node_translation($contact_node_reference);
      $contact_link_url = url('modal/node/' . $contact_node_reference->nid . '/nojs');
    }
  }
  $vars['contact_link_url'] = $contact_link_url;

  // Opening hours processing.
  $opening_hours_node_reference = variable_get('opening_hours_node_reference', FALSE);
  $opening_hours_url = &drupal_static('opening_hours_url');
  if ($opening_hours_node_reference && empty($opening_hours_url)) {
    $opening_hours_node = node_load($opening_hours_node_reference);
    if (!empty($opening_hours_node)) {
      _site_fic_get_node_translation($opening_hours_node);
      $opening_hours_url = url('modal/node/' . $opening_hours_node->nid . '/nojs');
    }
  }
  $vars['opening_hours_url'] = $opening_hours_url;

  $field_os2web_base_field_image = field_get_items('taxonomy_term', $vars['term'], 'field_os2web_base_field_image');

  // On frontpage we need just put term image to background.
  // Another things will be done on FIC Header view side.
  if (drupal_is_front_page()) {
    _site_fic_set_backstretch_background($vars['tid'], $field_os2web_base_field_image);
    return;
  }

  // For taxonomy page we need to render full slideshow markup.
  if (current_path() == 'taxonomy/term/' . $vars['tid']) {
    // Prepare term default slide.
    $slide_id = 'term-' . $vars['tid'];
    $slideshow = array(
      $slide_id => _site_fic_cycle_slideshow_slide(
        $slide_id,
        'Term name',
        'taxonomy/term/' . $vars['tid'],
        $vars['content'],
        $field_os2web_base_field_image
      ),
    );

    // Prepare related node slides.
    $field_os2web_base_field_related = field_get_items('taxonomy_term', $vars['term'], 'field_os2web_base_field_related');
    if (!empty($field_os2web_base_field_related)) {
      foreach ($field_os2web_base_field_related as $value) {
        if (empty($value['nid'])) {
          continue;
        }
        $related_node = node_load($value['nid']);
        _site_fic_get_node_translation($related_node);
        $content = node_view($related_node, 'fic_header');
        $slide_content = array();
        foreach (element_children($content) as $element) {
          $slide_content[] = $content[$element];
        }
        $field_baggrund = field_get_items('node', $related_node, 'field_baggrund');
        $slide_id = 'node-' . $related_node->nid;
        $slideshow[$slide_id] = _site_fic_cycle_slideshow_slide(
          $slide_id,
          $related_node->title,
          url('node/' . $related_node->nid),
          $slide_content,
          $field_baggrund
        );
      }
    }

    // Description field already rendered in default slide.
    hide($vars['content']['description_field']);

    // Load jQuery Cycle.
    if ($cycle_path = _views_slideshow_cycle_library_path()) {
      drupal_add_js($cycle_path);
    }

    return $vars['slideshow'] = theme(
      'cycle_slideshow',
      array('cycle_slideshow' => $slideshow)
    );
  }

  // When page is section content node just show background image.
  $node = menu_get_object();
  if (empty($node->field_sektion) || $node->type != 'os2web_base_contentpage') {
    return;
  }

  // By default for content section node render image
  // from term field field_os2web_base_field_banner.
  $fic_header_image = field_get_items('taxonomy_term', $vars['term'], 'field_os2web_base_field_banner');

  // But it's possible to override it from  content section node.
  if (!empty($node->field_baggrund)) {
    $fic_header_image = field_get_items('node', $node, 'field_baggrund');
  }

  if (!empty($fic_header_image)) {
    _site_fic_set_backstretch_background($vars['tid'], $fic_header_image);
  }
  else {
    // Hide description from rendering if background image is empty.
    hide($vars['content']['description_field']);
  }

  // Hide readmore link for node pages FIC header.
  if (!empty($vars['content']['field_os2web_base_field_ext_link'])) {
    hide($vars['content']['field_os2web_base_field_ext_link']);
  }
}

/**
 * Put image to backstretch background.
 */
function _site_fic_set_backstretch_background($id ,$image) {
  if (isset($image[0]['uri'])) {
    $image = reset($image);
  }

  if (empty($image['uri'])) {
    return;
  }

  $backstretch_data = &drupal_static('backstretch_data');
  if (empty($backstretch_data)) {
    $backstretch_data = array();
  }

  $backstretch_data[] = array(
    'id' => $id,
    'url' => image_style_url(
      'os2web_cover',
      $image['uri']
    ),
  );
}

/**
 * Custom theme function function for field_os2web_base_field_contact field.
 */
function site_fic_field__field_os2web_base_field_contact(&$vars) {
  if (empty($vars['items']) ||
    $vars['element']['#bundle'] != 'os2web_base_tax_site_structure') {
    return;
  }

  $term = $vars['element']['#object'];

  $field_value = field_get_items('taxonomy_term', $term, 'field_os2web_base_field_contact');
  $nid = $field_value[0]['nid'];
  $output = l(t('Contact'), 'modal/node/' . $nid . '/nojs', array(
    'attributes' => array(
      'class' => array(
        'modal-link',
        'ctools-modal-contact-modal-style',
        'ctools-use-modal',
        'contact',
      ),
    ),
  ));

  return $output;
}

/**
 * Custom theme function function for field_citat field.
 */
function site_fic_field__field_citat(&$vars) {
  $entity = $vars['element']['#object'];

  $field_value = field_get_items('paragraphs_item', $entity, 'field_citat');
  $output = field_view_value('paragraphs_item', $entity, 'field_citat', $field_value[0]);
  $output['#prefix'] = '<blockquote>';
  $output['#suffix'] = '</blockquote>';
  return render($output);
}

/**
 * Custom fields preprocess function.
 */
function site_fic_preprocess_field(&$vars) {
  if ($vars['element']['#field_name'] != 'field_os2web_base_field_related') {
    return;
  }

  // Add counter class to have ability customize styles.
  $vars['classes_array'][] = 'num-items-' . count($vars['items']);
  foreach ($vars['items'] as &$item) {
    $item['#title'] = '<span>' . $item['#title'] . '</span>';
    $item['#options']['html'] = TRUE;
  }
}

/**
 * Override Views Slideshow: pager field item field.
 */
function site_fic_preprocess_views_slideshow_pager_field_field(&$vars) {
  $view = $vars['view'];
  if ($view->name != 'fic_header_banners') {
    return;
  }
  $tid = $view->result[$vars['count']]->tid;
  $link_text = $view->result[$vars['count']]->field_name_field_et[0]['raw']['safe_value'];
  $vars['field_rendered'] = "<a href='" . url('taxonomy/term/' . $tid) . "'><span>$link_text</span></a>";
}

/**
 * Helper function to get right translation nid by given nid.
 */
function _site_fic_get_node_translation(&$node) {
  if (!module_exists('translation') || empty($node)) {
    return;
  }

  global $language;
  $lang = $language->language;
  $translations = translation_node_get_translations($node->tnid);
  if (isset($translations[$lang])) {
    $node = $translations[$lang];
  }
}

/**
 * Implements hook_views_pre_render().
 */
function site_fic_preprocess_views_view(&$vars) {
  switch($vars['name']) {
    case 'fic_header_banners':
      switch($vars['display_id']) {
        case 'block_1':
          $vars['classes_array'][] = 'num-slides-' . count($vars['view']->result);
          break;
      }
      break;
  }
}

/**
 * Implements hook_theme().
 */
function site_fic_theme() {
  return array(
    'cycle_slideshow' => array(
      'slides' => '',
      'template' => 'templates/custom/cycle-slideshow',
    ),
    'cycle_slide' => array(
      'variables' => array(),
      'template' => 'templates/custom/cycle-slide',
    ),
  );
}

/**
 * Preprocess function for cycle slideshow implementation.
 */
function site_fic_preprocess_cycle_slideshow(&$vars) {
  $vars['slideshow'] = $vars['pager'] = array();
  if (!empty($vars['cycle_slideshow'])) {
    foreach ($vars['cycle_slideshow'] as $slide) {
      $vars['slideshow'][] = theme('cycle_slide', array(
        'slide' => drupal_render($slide['content']),
        'name' => $slide['pager']['name'],
        'url' => $slide['pager']['url'],
        'id' => $slide['pager']['id'],
      ));
    }
  }
}

/**
 * Cycle slide definition().
 */
function _site_fic_cycle_slideshow_slide($slide_id, $name, $url, $content, $background) {
  _site_fic_set_backstretch_background($slide_id, $background);
  return array(
    'content' => $content,
    'pager' => array(
      'name' => $name,
      'url' => $url,
      'id' => $slide_id,
    ),
  );
}
