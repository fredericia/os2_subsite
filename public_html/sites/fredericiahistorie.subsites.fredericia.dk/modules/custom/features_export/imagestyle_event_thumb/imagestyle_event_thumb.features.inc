<?php
/**
 * @file
 * imagestyle_event_thumb.features.inc
 */

/**
 * Implements hook_image_default_styles().
 */
function imagestyle_event_thumb_image_default_styles() {
  $styles = array();

  // Exported image style: event_thumb.
  $styles['event_thumb'] = array(
    'effects' => array(
      23 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 105,
          'height' => 105,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'event_thumb',
  );

  return $styles;
}
