<?php
/**
 * @file
 * os2web_news_page.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2web_news_page_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function os2web_news_page_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_menu_position_default_menu_positions().
 */
function os2web_news_page_menu_position_default_menu_positions() {
  $items = array(
    'nyheder' => FALSE,
  );
  return $items;
}
