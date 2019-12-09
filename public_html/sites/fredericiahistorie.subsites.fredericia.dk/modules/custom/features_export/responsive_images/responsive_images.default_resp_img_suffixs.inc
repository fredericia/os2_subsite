<?php
/**
 * @file
 * responsive_images.default_resp_img_suffixs.inc
 */

/**
 * Implements hook_default_resp_img_suffixs().
 */
function responsive_images_default_resp_img_suffixs() {
  $export = array();

  $resp_img_suffix = new stdClass();
  $resp_img_suffix->disabled = FALSE; /* Edit this to true to make a default resp_img_suffix disabled initially */
  $resp_img_suffix->api_version = 1;
  $resp_img_suffix->name = 'phone';
  $resp_img_suffix->label = 'Phone';
  $resp_img_suffix->suffix = '_phone';
  $resp_img_suffix->breakpoint = 0;
  $export['phone'] = $resp_img_suffix;

  $resp_img_suffix = new stdClass();
  $resp_img_suffix->disabled = FALSE; /* Edit this to true to make a default resp_img_suffix disabled initially */
  $resp_img_suffix->api_version = 1;
  $resp_img_suffix->name = 'standard';
  $resp_img_suffix->label = 'Standard';
  $resp_img_suffix->suffix = '_standard';
  $resp_img_suffix->breakpoint = 740;
  $export['standard'] = $resp_img_suffix;

  return $export;
}
