<?php
/**
 * @file
 * views_topimage.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_topimage_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'topimage';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Topimage';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '300';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '300';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Topbillede */
  $handler->display->display_options['fields']['field_topimage']['id'] = 'field_topimage';
  $handler->display->display_options['fields']['field_topimage']['table'] = 'field_data_field_topimage';
  $handler->display->display_options['fields']['field_topimage']['field'] = 'field_topimage';
  $handler->display->display_options['fields']['field_topimage']['label'] = '';
  $handler->display->display_options['fields']['field_topimage']['alter']['text'] = '<div class="topimage" style="background: #000">Test</div>';
  $handler->display->display_options['fields']['field_topimage']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_topimage']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_topimage']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_topimage']['settings'] = array(
    'url_type' => '0',
    'image_style' => 'topimage_standard',
    'image_link' => '',
  );
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

  /* Display: Topimage */
  $handler = $view->new_display('panel_pane', 'Topimage', 'panel_pane_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;

  /* Display: Topimage - default image */
  $handler = $view->new_display('panel_pane', 'Topimage - default image', 'panel_pane_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
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
    'global' => 'global',
  );

  /* Display: Topimage app */
  $handler = $view->new_display('panel_pane', 'Topimage app', 'panel_pane_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Topbillede */
  $handler->display->display_options['fields']['field_topimage']['id'] = 'field_topimage';
  $handler->display->display_options['fields']['field_topimage']['table'] = 'field_data_field_topimage';
  $handler->display->display_options['fields']['field_topimage']['field'] = 'field_topimage';
  $handler->display->display_options['fields']['field_topimage']['label'] = '';
  $handler->display->display_options['fields']['field_topimage']['alter']['text'] = '<div class="topimage" style="background: #000">Test</div>';
  $handler->display->display_options['fields']['field_topimage']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_topimage']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_topimage']['settings'] = array(
    'image_style' => 'topimage_phone',
    'image_link' => '',
  );

  /* Display: Topimage - front */
  $handler = $view->new_display('panel_pane', 'Topimage - front', 'panel_pane_4');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Afholdelsesdato -  start date (field_date_of_event) */
  $handler->display->display_options['sorts']['field_date_of_event_value']['id'] = 'field_date_of_event_value';
  $handler->display->display_options['sorts']['field_date_of_event_value']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['sorts']['field_date_of_event_value']['field'] = 'field_date_of_event_value';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
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
  );
  /* Filter criterion: Content: Afholdelsesdato - end date (field_date_of_event:value2) */
  $handler->display->display_options['filters']['field_date_of_event_value2']['id'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['filters']['field_date_of_event_value2']['field'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_date_of_event_value2']['default_date'] = 'now';

  /* Display: Topimage - events */
  $handler = $view->new_display('panel_pane', 'Topimage - events', 'panel_pane_5');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
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
    'global' => 'global',
  );
  $export['topimage'] = $view;

  return $export;
}
