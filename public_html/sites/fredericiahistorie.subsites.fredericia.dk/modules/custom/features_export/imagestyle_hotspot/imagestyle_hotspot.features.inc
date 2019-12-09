<?php
/**
 * @file
 * imagestyle_hotspot.features.inc
 */

/**
 * Implements hook_image_default_styles().
 */
function imagestyle_hotspot_image_default_styles() {
  $styles = array();

  // Exported image style: hotspot.
  $styles['hotspot'] = array(
    'effects' => array(
      25 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 667,
          'height' => '',
          'upscale' => 0,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'hotspot',
  );

  return $styles;
}
