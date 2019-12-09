<?php 
/**
 * Defines how the hotspots should be rendered
 */
function fhist_json_process_app_hotspot($node) {
  $output = array('type' => 'zone');
  $wrapper = entity_metadata_wrapper('node', $node);
  $output['title'] = $wrapper->title->value();
  foreach ($wrapper->field_app_hotspot_elements->getIterator() as $delta => $term_wrapper) {
    $output['hotspots'][] = array(
      'x'=>(int)$term_wrapper->field_app_hotspot_xpoint->value(),
      'y'=> (int)$term_wrapper->field_app_hotspot_ypoint->value(),
      'text'=> $term_wrapper->field_app_hotspot_text->value()
      );
  }
  $image = $wrapper->field_app_hotspot_image->value();
  $icon = $wrapper->field_app_hotspot_icone->value();

  $output['image'] =  fhist_json_rewrite_uri($image['uri'],true);
  $output['icon'] =  fhist_json_rewrite_uri($icon['uri'],true);
  $output['landscape'] = (int)$wrapper->field_app_hotspot_landscape->value();

  $output['resources'][] =  fhist_json_rewrite_uri($image['uri']);
  $output['resources'][] =  fhist_json_rewrite_uri($icon['uri']);
  
  fhist_json_output($output);
}
?>