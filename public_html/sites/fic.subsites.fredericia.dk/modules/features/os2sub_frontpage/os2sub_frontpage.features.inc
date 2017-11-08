<?php
/**
 * @file
 * os2sub_frontpage.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2sub_frontpage_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "ds" && $api == "ds") {
    return array("version" => "1");
  }
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function os2sub_frontpage_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function os2sub_frontpage_image_default_styles() {
  $styles = array();

  // Exported image style: os2web_cover.
  $styles['os2web_cover'] = array(
    'label' => 'os2web cover',
    'effects' => array(
      11 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 1920,
          'height' => '',
          'upscale' => 0,
        ),
        'weight' => 1,
      ),
      15 => array(
        'name' => 'canvasactions_file2canvas',
        'data' => array(
          'xpos' => 0,
          'ypos' => 0,
          'alpha' => 100,
          'scale' => '',
          'path' => 'profiles/os2sub/themes/custom/site_fic/dist/img/fic-header-overlay.png',
        ),
        'weight' => 3,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function os2sub_frontpage_node_info() {
  $items = array(
    'velkomst' => array(
      'name' => t('Velkomst'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
