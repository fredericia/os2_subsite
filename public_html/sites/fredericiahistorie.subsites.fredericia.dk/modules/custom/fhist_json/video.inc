<?php 
/**
 * Defines how the video should be rendered
 */
function fhist_json_process_app_video($node) {
  $output = array('type' => 'video');
  $wrapper = entity_metadata_wrapper('node', $node);
  $output['title'] = $wrapper->title->value();
  $video_src = $wrapper->field_app_video_src->value();
  $output['src'] =  fhist_json_rewrite_uri($video_src['uri'],true);
  $output['resources'][] =  fhist_json_rewrite_uri($video_src['uri']);
 
  fhist_json_output($output);
}
?>