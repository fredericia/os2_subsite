<?php 
/**
 * Defines how the QR scan should be rendered
 */
function fhist_json_process_app_game($node) {
  $wrapper = entity_metadata_wrapper('node', $node);
  
  $game_finfo = $wrapper->field_app_json->value();
  $game_file = file_get_contents(drupal_realpath($game_finfo['uri']));
  $output = json_decode($game_file);

  $zip_finfo = $wrapper->field_app_zip->value();
  $output->resources[] = fhist_json_rewrite_uri($zip_finfo['uri']);

  fhist_json_output($output);
}
?>