<?php 
/**
 * Defines how the gallery should be rendered
 */
function fhist_json_process_app_gallery($node) {

  $output = array('type' => 'gallery');
  $wrapper = entity_metadata_wrapper('node', $node);
  $output['title'] = $wrapper->title->value();
  foreach ($wrapper->field_app_gallery_image_elements->getIterator() as $delta => $term_wrapper) {
    $image = $term_wrapper->field_img_element_image->value();
    $description = $term_wrapper->field_img_element_description->value();
    $link = $term_wrapper->field_img_element_link->value();

    $output['images'][] = fhist_json_rewrite_uri($image['uri'],true,'app-gallery');
    $output['texts'][] = $description;
    $output['links'][] = $link ? $link->nid : '';
    $output['resources'][] = fhist_json_rewrite_uri($image['uri'],false,'app-gallery');
  }
  
  fhist_json_output($output);
}

?>