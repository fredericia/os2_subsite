<?php

/**
 * Defines how the locations should be rendered
 */
function fhist_json_process_app_map($node) {
  geophp_load();
  $output = array('type' => 'map', 'resources' => array());
  $wrapper = entity_metadata_wrapper('node', $node);

  // Title and text
  $output['title'] = $wrapper->title->value();
  // $output['text'] = $wrapper->body->value->value();

  // Map center
  $output['center'] = array();

  $location = $wrapper->field_app_center->value();
  if (!empty($location['geom'])) {
    $geo = GeoPHP::load($location['geom'],'wkt');
    if ($geo->components) {
      foreach ($geo->components as $component) {
        if ( $component->getGeomType() == 'Point' ) {
          $output['center'] = $component->coords;
        }

        if ( $component->getGeomType() == 'LineString' ) {
          $output['path'] = array();
          foreach( $component->getPoints() as $point)
            $output['path'][] = $point->coords;
        }
      }
    } else if ($location['geo_type'] == 'point') { //For newer versions of geophp module?
      $output['center'] = array(
        (double)$location['lon'],
        (double)$location['lat']
        );
    }
  }


   $output['zoom_level'] = $wrapper->field_app_zoom_level->value();

  if ($wrapper->field_app_offline_map_default->value()) {
    $output['offline_map_default'] = TRUE;
  } else {
    $output['offline_map_default'] = FALSE;
    try {
      $offline_map = $wrapper->field_app_offline_map->value();
      $output['offline_map'] = fhist_json_rewrite_uri($offline_map['uri'],true);
      $output['resources'][] = fhist_json_rewrite_uri($offline_map['uri']);
      $output['offline_map_left_lon'] = $wrapper->field_app_bounds->left->value();
      $output['offline_map_right_lon'] = $wrapper->field_app_bounds->right->value();
      $output['offline_map_bottom_lat'] = $wrapper->field_app_bounds->bottom->value();
      $output['offline_map_top_lat'] = $wrapper->field_app_bounds->top->value();
    } catch(Exception $e) {
      //Do nothing
    }
  }

  foreach ($wrapper->field_locations as $location) {
    $location = fhist_json_process_app_location($location->nid->value(),false);
    $output['resources'] = array_merge($output['resources'],$location['resources']);
    unset($location['resources']);
    $output['locations'][] = $location;
  }

  fhist_json_output($output);
}


?>
