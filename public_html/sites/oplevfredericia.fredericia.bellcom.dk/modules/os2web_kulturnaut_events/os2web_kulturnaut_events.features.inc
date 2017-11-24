<?php
/**
 * @file
 * os2web_kulturnaut_events.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2web_kulturnaut_events_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "ds" && $api == "ds") {
    return array("version" => "1");
  }
  if ($module == "feeds" && $api == "feeds_importer_default") {
    return array("version" => "1");
  }
  if ($module == "field_group" && $api == "field_group") {
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
function os2web_kulturnaut_events_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function os2web_kulturnaut_events_image_default_styles() {
  $styles = array();

  // Exported image style: os2sub_page_slideshow.
  $styles['os2sub_page_slideshow'] = array(
    'label' => 'Diasshow',
    'effects' => array(
      33 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => ' 1170',
          'height' => 450,
          'anchor' => 'center-center',
          'disable_scale' => 1,
          'jcrop_settings' => array(
            'aspect_ratio' => '',
            'bgcolor' => 'black',
            'bgopacity' => 0.6,
            'fallback' => 1,
          ),
        ),
        'weight' => -10,
      ),
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 1170,
          'height' => 450,
        ),
        'weight' => -9,
      ),
    ),
  );

  // Exported image style: os2sub_teaser_mini_image.
  $styles['os2sub_teaser_mini_image'] = array(
    'label' => 'Normal Mini',
    'effects' => array(
      52 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 370,
          'height' => 97,
          'anchor' => 'center-center',
          'disable_scale' => 0,
          'jcrop_settings' => array(
            'aspect_ratio' => '',
            'bgcolor' => 'black',
            'bgopacity' => 0.6,
            'fallback' => 1,
          ),
        ),
        'weight' => -10,
      ),
      53 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 370,
          'height' => 97,
        ),
        'weight' => -9,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function os2web_kulturnaut_events_node_info() {
  $items = array(
    'os2web_kulturnaut_knactivity' => array(
      'name' => t('Begivenhed'),
      'base' => 'node_content',
      'description' => t('Bruges til at oprette egne begivendheder, samt til at præsentere importerede begivenheder fra Kulturnaut.'),
      'has_title' => '1',
      'title_label' => t('Overskrift'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
