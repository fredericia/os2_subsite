<?php
/**
 * @file
 * views_references_app.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_references_app_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'references_app';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'References - app';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_references_node']['id'] = 'reverse_field_references_node';
  $handler->display->display_options['relationships']['reverse_field_references_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_references_node']['field'] = 'reverse_field_references_node';
  $handler->display->display_options['relationships']['reverse_field_references_node']['required'] = TRUE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_wrapper_class'] = 'thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'app_list',
    'image_link' => '',
  );
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_wrapper_class'] = 'content';
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>
<div class="arrow"></div>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['path']['element_wrapper_class'] = 'path';
  $handler->display->display_options['fields']['path']['element_default_classes'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'reverse_field_references_node';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['nid']['specify_validation'] = TRUE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'app_calendar' => 'app_calendar',
    'app_game' => 'app_game',
    'app_hotspot' => 'app_hotspot',
    'app_qr_scan' => 'app_qr_scan',
    'app_video' => 'app_video',
    'app_gallery' => 'app_gallery',
    'app_list' => 'app_list',
    'app_map' => 'app_map',
    'audio_guide' => 'audio_guide',
    'page' => 'page',
  );

  /* Display: List */
  $handler = $view->new_display('panel_pane', 'List', 'panel_pane_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $export['references_app'] = $view;

  return $export;
}
