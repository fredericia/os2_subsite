<?php
/**
 * @file
 * imagestyles.features.inc
 */

/**
 * Implements hook_image_default_styles().
 */
function imagestyles_image_default_styles() {
  $styles = array();

  // Exported image style: app-gallery.
  $styles['app-gallery'] = array(
    'effects' => array(
      22 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 960,
          'height' => 640,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'app-gallery',
  );

  // Exported image style: app-tile-1.
  $styles['app-tile-1'] = array(
    'effects' => array(
      15 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 425,
          'height' => 185,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'app-tile-1',
  );

  // Exported image style: app-tile-2.
  $styles['app-tile-2'] = array(
    'effects' => array(
      16 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 426,
          'height' => 368,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'app-tile-2',
  );

  // Exported image style: app-tile-3.
  $styles['app-tile-3'] = array(
    'effects' => array(
      17 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 214,
          'height' => 368,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'app-tile-3',
  );

  // Exported image style: app-tile-4.
  $styles['app-tile-4'] = array(
    'effects' => array(
      18 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 215,
          'height' => 185,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'app-tile-4',
  );

  // Exported image style: app_list.
  $styles['app_list'] = array(
    'effects' => array(
      19 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 115,
          'height' => 115,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'app_list',
  );

  // Exported image style: body-center-img_phone.
  $styles['body-center-img_phone'] = array(
    'effects' => array(
      13 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 330,
          'height' => 250,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'body-center-img_phone',
  );

  // Exported image style: body-center-img_standard.
  $styles['body-center-img_standard'] = array(
    'effects' => array(
      7 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 660,
          'height' => 500,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'body-center-img_standard',
  );

  // Exported image style: front-tile-1.
  $styles['front-tile-1'] = array(
    'effects' => array(
      2 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 660,
          'height' => 240,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'front-tile-1',
  );

  // Exported image style: front-tile-2.
  $styles['front-tile-2'] = array(
    'effects' => array(
      3 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 325,
          'height' => 300,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'front-tile-2',
  );

  // Exported image style: front-tile-3.
  $styles['front-tile-3'] = array(
    'effects' => array(
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 325,
          'height' => 500,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'front-tile-3',
  );

  // Exported image style: front-tile-4.
  $styles['front-tile-4'] = array(
    'effects' => array(
      5 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 660,
          'height' => 500,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'front-tile-4',
  );

  // Exported image style: front-tile-5.
  $styles['front-tile-5'] = array(
    'effects' => array(
      6 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 335,
          'height' => 300,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'front-tile-5',
  );

  // Exported image style: gallery_phone.
  $styles['gallery_phone'] = array(
    'effects' => array(
      21 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 700,
          'height' => 450,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'gallery_phone',
  );

  // Exported image style: gallery_standard.
  $styles['gallery_standard'] = array(
    'effects' => array(
      20 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 1400,
          'height' => 900,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'gallery_standard',
  );

  // Exported image style: link_bg.
  $styles['link_bg'] = array(
    'label' => 'Link bg',
    'effects' => array(
      24 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 320,
          'height' => 320,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: sidebar_box_image.
  $styles['sidebar_box_image'] = array(
    'effects' => array(
      14 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 325,
          'height' => 455,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'sidebar_box_image',
  );

  // Exported image style: topimage_phone.
  $styles['topimage_phone'] = array(
    'effects' => array(
      12 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 740,
          'height' => 264,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'topimage_phone',
  );

  // Exported image style: topimage_standard.
  $styles['topimage_standard'] = array(
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 1400,
          'height' => 400,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'topimage_standard',
  );

  return $styles;
}
