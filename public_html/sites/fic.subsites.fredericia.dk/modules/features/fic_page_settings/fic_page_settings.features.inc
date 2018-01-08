<?php
/**
 * @file
 * fic_page_settings.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function fic_page_settings_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function fic_page_settings_node_info() {
  $items = array(
    'personale' => array(
      'name' => t('Personale'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

/**
 * Implements hook_paragraphs_info().
 */
function fic_page_settings_paragraphs_info() {
  $items = array(
    'personale' => array(
      'name' => 'Afsnit med personale',
      'bundle' => 'personale',
      'locked' => '1',
    ),
  );
  return $items;
}
