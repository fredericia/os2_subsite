<?php
/**
 * @file
 * os2web_base.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2web_base_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
  if ($module == "panels" && $api == "layouts") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_image_default_styles().
 */
function os2web_base_image_default_styles() {
  $styles = array();

  // Exported image style: os2sub_220x130.
  $styles['os2sub_220x130'] = array(
    'label' => 'Forside nyhed 4 spalter',
    'effects' => array(
      3 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 220,
          'height' => 130,
          'anchor' => 'center-center',
          'jcrop_settings' => array(
            'aspect_ratio' => '',
            'bgcolor' => 'black',
            'bgopacity' => 0.6,
            'fallback' => 1,
          ),
        ),
        'weight' => 1,
      ),
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 220,
          'height' => 130,
        ),
        'weight' => 2,
      ),
    ),
  );

  // Exported image style: os2sub_300x175.
  $styles['os2sub_300x175'] = array(
    'label' => 'Forside nyhed 2 og 3 spalter',
    'effects' => array(
      1 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 300,
          'height' => 175,
          'anchor' => 'center-center',
          'jcrop_settings' => array(
            'aspect_ratio' => '',
            'bgcolor' => 'black',
            'bgopacity' => 0.6,
            'fallback' => 1,
          ),
        ),
        'weight' => 1,
      ),
      2 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 300,
          'height' => 175,
        ),
        'weight' => 2,
      ),
    ),
  );

  // Exported image style: os2sub_normal_imagesize.
  $styles['os2sub_normal_imagesize'] = array(
    'label' => 'Normal billede',
    'effects' => array(
      6 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 848,
          'height' => 410,
          'anchor' => 'center-center',
          'disable_scale' => 0,
          'jcrop_settings' => array(
            'aspect_ratio' => '',
            'bgcolor' => 'black',
            'bgopacity' => 0.6,
            'fallback' => 1,
          ),
        ),
        'weight' => 1,
      ),
      7 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 848,
          'height' => 410,
        ),
        'weight' => 2,
      ),
    ),
  );

  // Exported image style: os2sub_small_imagesize.
  $styles['os2sub_small_imagesize'] = array(
    'label' => 'Lille billede',
    'effects' => array(
      3 => array(
        'name' => 'epsacrop_crop_reuse',
        'data' => array(
          'jcrop_reuse' => 'os2sub_normal_imagesize',
        ),
        'weight' => 1,
      ),
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 285,
          'height' => 194,
        ),
        'weight' => 2,
      ),
    ),
  );

  // Exported image style: os2web_base_style_content.
  $styles['os2web_base_style_content'] = array(
    'effects' => array(
      1 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 460,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
      2 => array(
        'name' => 'image_crop',
        'data' => array(
          'width' => 460,
          'height' => 260,
          'anchor' => 'center-center',
        ),
        'weight' => 2,
      ),
    ),
    'label' => 'os2web_base_style_content',
  );

  // Exported image style: os2web_base_style_image.
  $styles['os2web_base_style_image'] = array(
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 470,
          'height' => 230,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'os2web_base_style_image',
  );

  // Exported image style: os2web_base_style_medium.
  $styles['os2web_base_style_medium'] = array(
    'effects' => array(
      5 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 460,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
      6 => array(
        'name' => 'image_crop',
        'data' => array(
          'width' => 460,
          'height' => 260,
          'anchor' => 'center-center',
        ),
        'weight' => 2,
      ),
    ),
    'label' => 'os2web_base_style_medium',
  );

  // Exported image style: os2web_base_style_news_big.
  $styles['os2web_base_style_news_big'] = array(
    'effects' => array(
      2 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 214,
          'height' => 116,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'os2web_base_style_news_big',
  );

  // Exported image style: os2web_base_style_news_medium.
  $styles['os2web_base_style_news_medium'] = array(
    'effects' => array(
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 180,
          'height' => 140,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'os2web_base_style_news_medium',
  );

  // Exported image style: os2web_base_style_news_small.
  $styles['os2web_base_style_news_small'] = array(
    'effects' => array(
      3 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 60,
          'height' => 69,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'os2web_base_style_news_small',
  );

  // Exported image style: os2web_base_style_rotating.
  $styles['os2web_base_style_rotating'] = array(
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 460,
          'height' => 260,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'os2web_base_style_rotating',
  );

  // Exported image style: os2web_base_style_rotating_small.
  $styles['os2web_base_style_rotating_small'] = array(
    'effects' => array(
      2 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 161,
          'height' => 65,
        ),
        'weight' => 1,
      ),
    ),
    'label' => 'os2web_base_style_rotating_small',
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function os2web_base_node_info() {
  $items = array(
    'media' => array(
      'name' => t('Medier'),
      'base' => 'node_content',
      'description' => t('Video og audio.'),
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
    'os2web_base_contentpage' => array(
      'name' => t('Indholdsside'),
      'base' => 'node_content',
      'description' => t('Almindelig webside til generel brug på sitet.'),
      'has_title' => '1',
      'title_label' => t('Overskrift'),
      'help' => '',
    ),
    'os2web_base_news' => array(
      'name' => t('Nyhed'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Overskrift'),
      'help' => '',
    ),
    'os2web_base_selfservice_link' => array(
      'name' => t('Selvbetjening'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Kaldenavn'),
      'help' => '',
    ),
    'webform' => array(
      'name' => t('Webform'),
      'base' => 'node_content',
      'description' => t('Create a new form or questionnaire accessible to users. Submission results and statistics are recorded and accessible to privileged users.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
