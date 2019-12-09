<?php 
/**
 * Defines how the video should be rendered
 */
function fhist_json_process_audio_guide($node) {
  $output = array('type' => 'audio');
  $wrapper = entity_metadata_wrapper('node', $node);
  $output['title'] = $wrapper->title->value();
  $output['description'] = $wrapper->field_audio_description->value();
  
  $audio_src = $wrapper->field_audio_src->value();
  $output['audio'] =  fhist_json_rewrite_uri($audio_src['uri'],true);
  $output['resources'][] =  fhist_json_rewrite_uri($audio_src['uri']);

  $img_src = $wrapper->field_audio_image->value();
  $output['image'] = fhist_json_rewrite_uri($img_src['uri'],true);
  $output['resources'][] = fhist_json_rewrite_uri($img_src['uri']);
  
  fhist_json_output($output);
}
?>