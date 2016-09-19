<?php
/**
 * @file
 * os2web_taxon_api.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function os2web_taxon_api_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_button_text';
  $strongarm->value = 'Klassificér med Taxon';
  $export['os2web_taxon_taxonomy_button_text'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_button_text_wait';
  $strongarm->value = 'Klassificerer...';
  $export['os2web_taxon_taxonomy_button_text_wait'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_ckeditor_field';
  $strongarm->value = 'edit-body-und-0-value';
  $export['os2web_taxon_taxonomy_ckeditor_field'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_field_name';
  $strongarm->value = '#edit-field-os2web-base-field-kle-ref-und';
  $export['os2web_taxon_taxonomy_field_name'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_not_selected_image';
  $strongarm->value = '/profiles/os2web/modules/os2web_taxon_taxonomy/images/not_selected_png';
  $export['os2web_taxon_taxonomy_not_selected_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_number_results_returned';
  $strongarm->value = '5';
  $export['os2web_taxon_taxonomy_number_results_returned'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_selected_image';
  $strongarm->value = '/profiles/os2web/modules/os2web_taxon_taxonomy/images/selected_png';
  $export['os2web_taxon_taxonomy_selected_image'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_taxonomy_name';
  $strongarm->value = 'os2web_taxonomies_tax_kle';
  $export['os2web_taxon_taxonomy_taxonomy_name'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_taxon_url';
  $strongarm->value = '10.1.1.182/Taxon/taxon-ws.php';
  $export['os2web_taxon_taxonomy_taxon_url'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'os2web_taxon_taxonomy_wait_image';
  $strongarm->value = '/profiles/os2web/modules/os2web_taxon_taxonomy/images/wait.gif';
  $export['os2web_taxon_taxonomy_wait_image'] = $strongarm;

  return $export;
}
