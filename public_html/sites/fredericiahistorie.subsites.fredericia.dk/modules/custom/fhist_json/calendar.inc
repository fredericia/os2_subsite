<?php 
/**
 * Defines how the QR scan should be rendered
 */
function fhist_json_process_app_calendar($node) {
  $wrapper = entity_metadata_wrapper('node', $node);
  $output = array('title' => $wrapper->title->value());  
  $output['type'] = 'calendar';
   
  fhist_json_output($output);
}
?>