<?php
/**
 * @file
 * os2sub_pages.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2sub_pages_ctools_plugin_api($module = NULL, $api = NULL) {
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
function os2sub_pages_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function os2sub_pages_image_default_styles() {
  $styles = array();

  // Exported image style: os2sub_full_width.
  $styles['os2sub_full_width'] = array(
    'label' => 'Forside top',
    'effects' => array(
      33 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 1920,
          'height' => 540,
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
      34 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 1920,
          'height' => '',
          'upscale' => 0,
        ),
        'weight' => -9,
      ),
    ),
  );

  // Exported image style: os2sub_spotbox_image.
  $styles['os2sub_spotbox_image'] = array(
    'label' => 'Spotbillede',
    'effects' => array(
      42 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 370,
          'height' => 370,
          'anchor' => 'center-center',
          'disable_scale' => 0,
          'jcrop_settings' => array(
            'aspect_ratio' => '',
            'bgcolor' => 'black',
            'bgopacity' => 0.6,
            'fallback' => 1,
          ),
        ),
        'weight' => -9,
      ),
      43 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 370,
          'height' => 370,
        ),
        'weight' => -8,
      ),
    ),
  );

  // Exported image style: os2sub_spotbox_mini_image.
  $styles['os2sub_spotbox_mini_image'] = array(
    'label' => 'Spotbillede Mini',
    'effects' => array(
      44 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 720,
          'height' => 330,
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
      45 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 720,
          'height' => 330,
        ),
        'weight' => -9,
      ),
    ),
  );

  // Exported image style: os2sub_spotbox_single_image.
  $styles['os2sub_spotbox_single_image'] = array(
    'label' => 'Spotbillede Alternativ',
    'effects' => array(
      46 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 720,
          'height' => 720,
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
      47 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 720,
          'height' => 720,
        ),
        'weight' => -9,
      ),
    ),
  );

  return $styles;
}
