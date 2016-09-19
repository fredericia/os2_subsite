<?php
/**
 * @file
 * os2sub_galleri.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2sub_galleri_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_image_default_styles().
 */
function os2sub_galleri_image_default_styles() {
  $styles = array();

  // Exported image style: gallery.
  $styles['gallery'] = array(
    'label' => 'gallery',
    'effects' => array(
      2 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 1200,
          'height' => '',
          'upscale' => 0,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: gallery-thumb.
  $styles['gallery-thumb'] = array(
    'label' => 'gallery-thumb',
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 137,
          'height' => 92,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function os2sub_galleri_node_info() {
  $items = array(
    'os2web_base_gallery' => array(
      'name' => t('Galleri'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Overskrift'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
