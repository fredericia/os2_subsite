<?php
/**
 * @file
 * views_body_center_image.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_body_center_image_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'body_center_img';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Body center image';
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
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Center billede */
  $handler->display->display_options['fields']['field_body_center_img']['id'] = 'field_body_center_img';
  $handler->display->display_options['fields']['field_body_center_img']['table'] = 'field_data_field_body_center_img';
  $handler->display->display_options['fields']['field_body_center_img']['field'] = 'field_body_center_img';
  $handler->display->display_options['fields']['field_body_center_img']['label'] = '';
  $handler->display->display_options['fields']['field_body_center_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_body_center_img']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_body_center_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_body_center_img']['settings'] = array(
    'image_style' => 'body-center-img_phone',
    'image_link' => '',
  );
  /* Field: Content: Tekst */
  $handler->display->display_options['fields']['field_center_img_text']['id'] = 'field_center_img_text';
  $handler->display->display_options['fields']['field_center_img_text']['table'] = 'field_data_field_center_img_text';
  $handler->display->display_options['fields']['field_center_img_text']['field'] = 'field_center_img_text';
  $handler->display->display_options['fields']['field_center_img_text']['label'] = '';
  $handler->display->display_options['fields']['field_center_img_text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_center_img_text']['hide_empty'] = TRUE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
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
    'page' => 'page',
  );

  /* Display: Center image */
  $handler = $view->new_display('panel_pane', 'Center image', 'panel_pane_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'app_map' => 'app_map',
    'event' => 'event',
    'app_hotspot' => 'app_hotspot',
    'page' => 'page',
  );

  /* Display: Center image app */
  $handler = $view->new_display('panel_pane', 'Center image app', 'panel_pane_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Center billede */
  $handler->display->display_options['fields']['field_body_center_img']['id'] = 'field_body_center_img';
  $handler->display->display_options['fields']['field_body_center_img']['table'] = 'field_data_field_body_center_img';
  $handler->display->display_options['fields']['field_body_center_img']['field'] = 'field_body_center_img';
  $handler->display->display_options['fields']['field_body_center_img']['label'] = '';
  $handler->display->display_options['fields']['field_body_center_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_body_center_img']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_body_center_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_body_center_img']['settings'] = array(
    'image_style' => 'body-center-img_phone',
    'image_link' => '',
  );
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'event' => 'event',
    'page' => 'page',
  );
  $export['body_center_img'] = $view;

  return $export;
}
