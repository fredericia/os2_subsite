<?php
/**
 * @file
 * os2web_taxonomies.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function os2web_taxonomies_taxonomy_default_vocabularies() {
  return array(
    'os2web_taxonomies_tax_comittee' => array(
      'name' => 'AcadreMMComittee',
      'machine_name' => 'os2web_taxonomies_tax_comittee',
      'description' => 'Taxonomi indeholdende diverse udvalg med system-id fra Acadre MM. Bruges til mapning af dagsordensvisning på web.',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_taxonomies_tax_editor_tag' => array(
      'name' => 'Stikord',
      'machine_name' => 'os2web_taxonomies_tax_editor_tag',
      'description' => 'Taksonomi til at opsamle redaktørers egne tags',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_taxonomies_tax_kle' => array(
      'name' => 'KLE',
      'machine_name' => 'os2web_taxonomies_tax_kle',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_taxonomies_tax_org' => array(
      'name' => 'Organisation',
      'machine_name' => 'os2web_taxonomies_tax_org',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_taxonomies_tax_places' => array(
      'name' => 'Egennavne/stednavne',
      'machine_name' => 'os2web_taxonomies_tax_places',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_taxonomies_tax_politics' => array(
      'name' => 'Politik',
      'machine_name' => 'os2web_taxonomies_tax_politics',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_taxonomies_tax_portal_cat' => array(
      'name' => 'Portalkategori',
      'machine_name' => 'os2web_taxonomies_tax_portal_cat',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_taxonomies_tax_user_pos' => array(
      'name' => 'User position',
      'machine_name' => 'os2web_taxonomies_tax_user_pos',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'tags' => array(
      'name' => 'Tags',
      'machine_name' => 'tags',
      'description' => 'Use tags to group articles on similar topics into categories.',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
