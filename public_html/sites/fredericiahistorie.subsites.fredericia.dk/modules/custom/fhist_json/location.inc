<?php 

/**
 * Defines how the locations should be rendered
 */
function fhist_json_process_app_location($node,$output_json = TRUE) {
  geophp_load();
  $output = array('type' => 'location');
  $wrapper = entity_metadata_wrapper('node', $node);

  // Title and text
  $output['title'] = $wrapper->title->value();
  try {
    $output['text'] = strip_tags($wrapper->body->value->value());
  } catch (Exception $e) {
    $output['text'] = '';
  }
  
  // Icon
  $icon = $wrapper->field_icon->value();
  $output['icon'] = fhist_json_rewrite_uri($icon['uri'],true);

  // Link
  try {
    $output['link'] = fhis_json_rewrite_nid($wrapper->field_reference->nid->value()); 
  } catch (Exception $e) {
    //Do nothing
  }
  
  // Thumbnail
  $thumbnail = $wrapper->field_reference_thumbnail->value();
  $output['thumbnail'] = fhist_json_rewrite_uri($thumbnail['uri'],true);
  $output['resources'][] = fhist_json_rewrite_uri($thumbnail['uri']);

  // Coordinates
  $location = $wrapper->field_location->value();
  $geo = GeoPHP::load($location['geom'],'wkt');
  if (method_exists($geo, 'getPoints')) {
    foreach ($geo->getPoints() as $point) {
      $output['coordinates'][] = $point->coords;
    }
  }
  $output['resources'][] =  fhist_json_rewrite_uri($icon['uri']);
  
  if ($output_json)
    fhist_json_output($output);
  else
    return $output;
}
?>
