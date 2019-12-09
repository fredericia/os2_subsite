<?php
/**
 * @file
 * openlayer_maps.openlayers_styles.inc
 */

/**
 * Implements hook_openlayers_styles().
 */
function openlayer_maps_openlayers_styles() {
  $export = array();

  $openlayers_styles = new stdClass();
  $openlayers_styles->disabled = FALSE; /* Edit this to true to make a default openlayers_styles disabled initially */
  $openlayers_styles->api_version = 1;
  $openlayers_styles->name = 'orange_marker';
  $openlayers_styles->title = 'Orange marker';
  $openlayers_styles->description = '';
  $openlayers_styles->data = array(
    'externalGraphic' => '/profiles/fredhist/themes/custom/fredhist/images/marker.png',
    'pointRadius' => 6,
    'fillColor' => '#EE9900',
    'strokeColor' => '#EE9900',
    'strokeWidth' => 1,
    'fillOpacity' => 1,
    'strokeOpacity' => 1,
    'strokeLinecap' => 'round',
    'strokeDashstyle' => 'solid',
    'graphicWidth' => 28,
    'graphicHeight' => 48,
    'graphicOpacity' => 1,
    'labelAlign' => 'cm',
  );
  $export['orange_marker'] = $openlayers_styles;

  return $export;
}
