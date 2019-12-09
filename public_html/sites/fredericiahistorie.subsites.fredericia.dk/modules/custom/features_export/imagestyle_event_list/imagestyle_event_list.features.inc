<?php
/**
 * @file
 * imagestyle_event_list.features.inc
 */

/**
 * Implements hook_image_default_styles().
 */
function imagestyle_event_list_image_default_styles() {
  $styles = array();

  // Exported image style: event_list.
  $styles['event_list'] = array(
    'effects' => array(
      24 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 220,
          'height' => 220,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'event_list',
  );

  return $styles;
}
