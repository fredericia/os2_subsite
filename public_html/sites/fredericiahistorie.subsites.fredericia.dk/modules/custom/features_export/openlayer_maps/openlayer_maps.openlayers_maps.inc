<?php
/**
 * @file
 * openlayer_maps.openlayers_maps.inc
 */

/**
 * Implements hook_openlayers_maps().
 */
function openlayer_maps_openlayers_maps() {
  $export = array();

  $openlayers_maps = new stdClass();
  $openlayers_maps->disabled = FALSE; /* Edit this to true to make a default openlayers_maps disabled initially */
  $openlayers_maps->api_version = 1;
  $openlayers_maps->name = 'clone_of_fredericia_pagemap';
  $openlayers_maps->title = 'Fredericia page map (second)';
  $openlayers_maps->description = 'Fredericia page map';
  $openlayers_maps->data = array(
    'width' => 'auto',
    'height' => '400px',
    'image_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/img/',
    'css_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/style.css',
    'proxy_host' => '',
    'hide_empty_map' => 1,
    'center' => array(
      'initial' => array(
        'centerpoint' => '9.739379717553744, 55.62489394606068',
        'zoom' => '10',
      ),
      'restrict' => array(
        'restrictextent' => 0,
        'restrictedExtent' => '',
      ),
    ),
    'behaviors' => array(
      'openlayers_behavior_keyboarddefaults' => array(),
      'openlayers_behavior_navigation' => array(
        'zoomWheelEnabled' => 0,
        'zoomBoxEnabled' => 0,
        'documentDrag' => 0,
      ),
      'openlayers_behavior_panzoombar' => array(
        'zoomWorldIcon' => 0,
        'panIcons' => 1,
      ),
      'openlayers_behavior_popup' => array(
        'layers' => array(
          'page_map_openlayers_2' => 'page_map_openlayers_2',
        ),
        'popupAtPosition' => 'mouse',
        'panMapIfOutOfView' => 0,
        'keepInMap' => 1,
      ),
      'openlayers_behavior_zoomtolayer' => array(
        'zoomtolayer' => array(
          'page_map_openlayers_2' => 'page_map_openlayers_2',
          'google_normal' => 0,
        ),
        'point_zoom_level' => '15',
        'zoomtolayer_scale' => '1.5',
      ),
    ),
    'default_layer' => 'google_normal',
    'layers' => array(
      'google_normal' => 'google_normal',
      'page_map_openlayers_2' => 'page_map_openlayers_2',
    ),
    'layer_weight' => array(
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'geofield_formatter' => '0',
      'frontpage_map_openlayers_1' => '0',
    ),
    'layer_styles' => array(
      'frontpage_map_openlayers_1' => 'orange_marker',
      'geofield_formatter' => 'default_marker_black',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => 'orange_marker',
      'page_map_openlayers_2' => 'orange_marker',
    ),
    'layer_styles_select' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_styles_temporary' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_activated' => array(
      'page_map_openlayers_2' => 'page_map_openlayers_2',
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
    ),
    'layer_switcher' => array(
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'projection' => 'EPSG:900913',
    'displayProjection' => 'EPSG:4326',
    'styles' => array(
      'default' => 'default_marker_black',
      'select' => 'default_select',
      'temporary' => 'default',
    ),
  );
  $export['clone_of_fredericia_pagemap'] = $openlayers_maps;

  $openlayers_maps = new stdClass();
  $openlayers_maps->disabled = FALSE; /* Edit this to true to make a default openlayers_maps disabled initially */
  $openlayers_maps->api_version = 1;
  $openlayers_maps->name = 'fredericia_be';
  $openlayers_maps->title = 'Fredericia BE';
  $openlayers_maps->description = 'Map for backend use';
  $openlayers_maps->data = array(
    'width' => 'auto',
    'height' => '400px',
    'image_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/img/',
    'css_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/style.css',
    'proxy_host' => '',
    'hide_empty_map' => 0,
    'center' => array(
      'initial' => array(
        'centerpoint' => '9.728393389614629, 55.56436827964745',
        'zoom' => '11',
      ),
      'restrict' => array(
        'restrictextent' => 0,
        'restrictedExtent' => '',
      ),
    ),
    'behaviors' => array(
      'openlayers_behavior_geofield' => array(),
      'openlayers_behavior_keyboarddefaults' => array(),
      'openlayers_behavior_attribution' => array(
        'separator' => '',
      ),
      'openlayers_behavior_layerswitcher' => array(
        'ascending' => 1,
        'sortBaseLayer' => '0',
        'roundedCorner' => 1,
        'roundedCornerColor' => '#222222',
        'maximizeDefault' => 0,
        'div' => '',
      ),
      'openlayers_behavior_dragpan' => array(),
      'openlayers_behavior_panzoombar' => array(
        'zoomWorldIcon' => 0,
        'panIcons' => 1,
      ),
    ),
    'default_layer' => 'google_normal',
    'layers' => array(
      'google_hybrid' => 'google_hybrid',
      'google_normal' => 'google_normal',
    ),
    'layer_weight' => array(
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'geofield_formatter' => '0',
      'frontpage_map_openlayers_1' => '0',
    ),
    'layer_styles' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_styles_select' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_styles_temporary' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_activated' => array(
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'layer_switcher' => array(
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'projection' => 'EPSG:900913',
    'displayProjection' => 'EPSG:4326',
    'styles' => array(
      'default' => 'default',
      'select' => 'default_select',
      'temporary' => 'default',
    ),
  );
  $export['fredericia_be'] = $openlayers_maps;

  $openlayers_maps = new stdClass();
  $openlayers_maps->disabled = FALSE; /* Edit this to true to make a default openlayers_maps disabled initially */
  $openlayers_maps->api_version = 1;
  $openlayers_maps->name = 'fredericia_be_app_map';
  $openlayers_maps->title = 'Fredericia BE App map';
  $openlayers_maps->description = 'Map for backend use - App map';
  $openlayers_maps->data = array(
    'width' => 'auto',
    'height' => '400px',
    'image_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/img/',
    'css_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/style.css',
    'proxy_host' => '',
    'hide_empty_map' => 0,
    'center' => array(
      'initial' => array(
        'centerpoint' => '9.728393389614629, 55.56436827964745',
        'zoom' => '11',
      ),
      'restrict' => array(
        'restrictextent' => 0,
        'restrictedExtent' => '',
      ),
    ),
    'behaviors' => array(
      'openlayers_behavior_geofield' => array(),
      'openlayers_behavior_keyboarddefaults' => array(),
      'openlayers_behavior_attribution' => array(
        'separator' => '',
      ),
      'openlayers_behavior_dragpan' => array(),
      'openlayers_behavior_panzoombar' => array(
        'zoomWorldIcon' => 0,
        'panIcons' => 1,
      ),
    ),
    'default_layer' => 'google_normal',
    'layers' => array(
      'google_normal' => 'google_normal',
    ),
    'layer_weight' => array(
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'geofield_formatter' => '0',
      'frontpage_map_openlayers_1' => '0',
    ),
    'layer_styles' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_styles_select' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_styles_temporary' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
    ),
    'layer_activated' => array(
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'layer_switcher' => array(
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'projection' => 'EPSG:900913',
    'displayProjection' => 'EPSG:4326',
    'styles' => array(
      'default' => 'default',
      'select' => 'default_select',
      'temporary' => 'default',
    ),
  );
  $export['fredericia_be_app_map'] = $openlayers_maps;

  $openlayers_maps = new stdClass();
  $openlayers_maps->disabled = FALSE; /* Edit this to true to make a default openlayers_maps disabled initially */
  $openlayers_maps->api_version = 1;
  $openlayers_maps->name = 'fredericia_fe';
  $openlayers_maps->title = 'Fredericia FE';
  $openlayers_maps->description = 'Map for frontend use';
  $openlayers_maps->data = array(
    'width' => 'auto',
    'height' => '400px',
    'image_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/img/',
    'css_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/style.css',
    'proxy_host' => '',
    'hide_empty_map' => 0,
    'center' => array(
      'initial' => array(
        'centerpoint' => '9.739379717553744, 55.62489394606068',
        'zoom' => '10',
      ),
      'restrict' => array(
        'restrictextent' => 0,
        'restrictedExtent' => '',
      ),
    ),
    'behaviors' => array(
      'openlayers_behavior_keyboarddefaults' => array(),
      'openlayers_behavior_navigation' => array(
        'zoomWheelEnabled' => 0,
        'zoomBoxEnabled' => 1,
        'documentDrag' => 0,
      ),
      'openlayers_behavior_panzoombar' => array(
        'zoomWorldIcon' => 0,
        'panIcons' => 1,
      ),
      'openlayers_behavior_popup' => array(
        'layers' => array(
          'frontpage_map_openlayers_1' => 'frontpage_map_openlayers_1',
        ),
        'popupAtPosition' => 'mouse',
        'panMapIfOutOfView' => 0,
        'keepInMap' => 1,
      ),
      'openlayers_behavior_zoomtolayer' => array(
        'zoomtolayer' => array(
          'frontpage_map_openlayers_1' => 'frontpage_map_openlayers_1',
        ),
        'point_zoom_level' => '6',
        'zoomtolayer_scale' => '1.5',
      ),
    ),
    'default_layer' => 'google_normal',
    'layers' => array(
      'google_normal' => 'google_normal',
      'frontpage_map_openlayers_1' => 'frontpage_map_openlayers_1',
    ),
    'layer_weight' => array(
      'page_map_openlayers_2' => '0',
      'frontpage_map_openlayers_1' => '0',
      'page_map_openlayers_1' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'geofield_formatter' => '0',
    ),
    'layer_styles' => array(
      'geofield_formatter' => 'default_marker_black',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
      'frontpage_map_openlayers_1' => 'orange_marker',
    ),
    'layer_styles_select' => array(
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
      'frontpage_map_openlayers_1' => '0',
    ),
    'layer_styles_temporary' => array(
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_1' => '0',
      'page_map_openlayers_2' => '0',
      'frontpage_map_openlayers_1' => '0',
    ),
    'layer_activated' => array(
      'frontpage_map_openlayers_1' => 'frontpage_map_openlayers_1',
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'layer_switcher' => array(
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'projection' => 'EPSG:900913',
    'displayProjection' => 'EPSG:4326',
    'styles' => array(
      'default' => 'default_marker_black',
      'select' => 'default_select',
      'temporary' => 'default',
    ),
  );
  $export['fredericia_fe'] = $openlayers_maps;

  $openlayers_maps = new stdClass();
  $openlayers_maps->disabled = FALSE; /* Edit this to true to make a default openlayers_maps disabled initially */
  $openlayers_maps->api_version = 1;
  $openlayers_maps->name = 'fredericia_pagemap';
  $openlayers_maps->title = 'Fredericia page map';
  $openlayers_maps->description = 'Fredericia page map';
  $openlayers_maps->data = array(
    'width' => 'auto',
    'height' => '400px',
    'image_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/img/',
    'css_path' => 'profiles/fredhist/modules/contrib/openlayers/themes/default_dark/style.css',
    'proxy_host' => '',
    'hide_empty_map' => 1,
    'center' => array(
      'initial' => array(
        'centerpoint' => '9.739379717553744, 55.62489394606068',
        'zoom' => '10',
      ),
      'restrict' => array(
        'restrictextent' => 0,
        'restrictedExtent' => '',
      ),
    ),
    'behaviors' => array(
      'openlayers_behavior_keyboarddefaults' => array(),
      'openlayers_behavior_navigation' => array(
        'zoomWheelEnabled' => 0,
        'zoomBoxEnabled' => 0,
        'documentDrag' => 0,
      ),
      'openlayers_behavior_panzoombar' => array(
        'zoomWorldIcon' => 0,
        'panIcons' => 1,
      ),
      'openlayers_behavior_popup' => array(
        'layers' => array(
          'page_map_openlayers_1' => 'page_map_openlayers_1',
        ),
        'popupAtPosition' => 'mouse',
        'panMapIfOutOfView' => 0,
        'keepInMap' => 1,
      ),
      'openlayers_behavior_zoomtolayer' => array(
        'zoomtolayer' => array(
          'page_map_openlayers_1' => 'page_map_openlayers_1',
          'google_normal' => 0,
        ),
        'point_zoom_level' => '15',
        'zoomtolayer_scale' => '1.5',
      ),
    ),
    'default_layer' => 'google_normal',
    'layers' => array(
      'google_normal' => 'google_normal',
      'page_map_openlayers_1' => 'page_map_openlayers_1',
    ),
    'layer_weight' => array(
      'page_map_openlayers_2' => '0',
      'page_map_openlayers_1' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'geofield_formatter' => '0',
      'frontpage_map_openlayers_1' => '0',
    ),
    'layer_styles' => array(
      'frontpage_map_openlayers_1' => 'orange_marker',
      'geofield_formatter' => 'default_marker_black',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_2' => '0',
      'page_map_openlayers_1' => 'orange_marker',
    ),
    'layer_styles_select' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_2' => '0',
      'page_map_openlayers_1' => '0',
    ),
    'layer_styles_temporary' => array(
      'frontpage_map_openlayers_1' => '0',
      'geofield_formatter' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'page_map_openlayers_2' => '0',
      'page_map_openlayers_1' => '0',
    ),
    'layer_activated' => array(
      'page_map_openlayers_1' => 'page_map_openlayers_1',
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'layer_switcher' => array(
      'frontpage_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
      'openlayers_kml_example' => 0,
      'page_map_openlayers_1' => 0,
      'page_map_openlayers_2' => 0,
    ),
    'projection' => 'EPSG:900913',
    'displayProjection' => 'EPSG:4326',
    'styles' => array(
      'default' => 'default_marker_black',
      'select' => 'default_select',
      'temporary' => 'default',
    ),
  );
  $export['fredericia_pagemap'] = $openlayers_maps;

  return $export;
}
