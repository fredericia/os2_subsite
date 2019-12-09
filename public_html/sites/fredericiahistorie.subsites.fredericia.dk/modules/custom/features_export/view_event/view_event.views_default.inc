<?php
/**
 * @file
 * view_event.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function view_event_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'event';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Event';
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
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
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

  /* Display: Event date */
  $handler = $view->new_display('panel_pane', 'Event date', 'panel_pane_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Klokkeslæt */
  $handler->display->display_options['fields']['field_time']['id'] = 'field_time';
  $handler->display->display_options['fields']['field_time']['table'] = 'field_data_field_time';
  $handler->display->display_options['fields']['field_time']['field'] = 'field_time';
  $handler->display->display_options['fields']['field_time']['label'] = '';
  $handler->display->display_options['fields']['field_time']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_time']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_time']['alter']['text'] = '- [field_time]';
  $handler->display->display_options['fields']['field_time']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_time']['hide_empty'] = TRUE;
  /* Field: Content: Afholdelsesdato */
  $handler->display->display_options['fields']['field_date_of_event']['id'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['field'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['label'] = '';
  $handler->display->display_options['fields']['field_date_of_event']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_date_of_event']['alter']['text'] = '[field_date_of_event] [field_time]';
  $handler->display->display_options['fields']['field_date_of_event']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_date_of_event']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  $handler->display->display_options['defaults']['arguments'] = FALSE;
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

  /* Display: Event list */
  $handler = $view->new_display('panel_pane', 'Event list', 'panel_pane_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['group_by'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« Første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ Forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'Næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'Sidste »';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_wrapper_type'] = 'h2';
  /* Field: Content: Klokkeslæt */
  $handler->display->display_options['fields']['field_time']['id'] = 'field_time';
  $handler->display->display_options['fields']['field_time']['table'] = 'field_data_field_time';
  $handler->display->display_options['fields']['field_time']['field'] = 'field_time';
  $handler->display->display_options['fields']['field_time']['label'] = '';
  $handler->display->display_options['fields']['field_time']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_time']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_time']['alter']['text'] = '- [field_time]';
  $handler->display->display_options['fields']['field_time']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_time']['hide_empty'] = TRUE;
  /* Field: Content: Sted */
  $handler->display->display_options['fields']['field_place']['id'] = 'field_place';
  $handler->display->display_options['fields']['field_place']['table'] = 'field_data_field_place';
  $handler->display->display_options['fields']['field_place']['field'] = 'field_place';
  $handler->display->display_options['fields']['field_place']['label'] = '';
  $handler->display->display_options['fields']['field_place']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_place']['alter']['text'] = 'adf asdf asfd as fasf asfasas as fasfas asf';
  $handler->display->display_options['fields']['field_place']['element_label_colon'] = FALSE;
  /* Field: Content: Afholdelsesdato */
  $handler->display->display_options['fields']['field_date_of_event']['id'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['field'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['label'] = '';
  $handler->display->display_options['fields']['field_date_of_event']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_date_of_event']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_date_of_event']['alter']['text'] = '[field_date_of_event] [field_time] | [field_place]';
  $handler->display->display_options['fields']['field_date_of_event']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_date_of_event']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['max_length'] = '150';
  $handler->display->display_options['fields']['body']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['preserve_tags'] = '<b> <strong> <br> <i> <a>';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  /* Field: Content: Listevisning billede */
  $handler->display->display_options['fields']['field_list_img']['id'] = 'field_list_img';
  $handler->display->display_options['fields']['field_list_img']['table'] = 'field_data_field_list_img';
  $handler->display->display_options['fields']['field_list_img']['field'] = 'field_list_img';
  $handler->display->display_options['fields']['field_list_img']['label'] = '';
  $handler->display->display_options['fields']['field_list_img']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_list_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_list_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_list_img']['settings'] = array(
    'image_style' => 'event_list',
    'image_link' => '',
  );
  /* Field: Rewrite */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['ui_name'] = 'Rewrite';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<div class="image">
<a href="[path]">[field_list_img]</a>
</div>
<div class="content">
<h2>[title]</h2>
<div class="views-field-field-date-event">[field_date_of_event]</div>
<div class="views-field-body"><a href="[path]">[body]</a></div>
<a class="to-event" href="[path]">Gå til begivenhed</a>
</div>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Afholdelsesdato -  start date (field_date_of_event) */
  $handler->display->display_options['sorts']['field_date_of_event_value']['id'] = 'field_date_of_event_value';
  $handler->display->display_options['sorts']['field_date_of_event_value']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['sorts']['field_date_of_event_value']['field'] = 'field_date_of_event_value';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
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
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Afholdelsesdato - end date (field_date_of_event:value2) */
  $handler->display->display_options['filters']['field_date_of_event_value2']['id'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['filters']['field_date_of_event_value2']['field'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_date_of_event_value2']['group'] = 2;
  $handler->display->display_options['filters']['field_date_of_event_value2']['default_date'] = 'now';

  /* Display: Event price */
  $handler = $view->new_display('panel_pane', 'Event price', 'panel_pane_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content: Priser (field_priser) */
  $handler->display->display_options['relationships']['field_priser_value']['id'] = 'field_priser_value';
  $handler->display->display_options['relationships']['field_priser_value']['table'] = 'field_data_field_priser';
  $handler->display->display_options['relationships']['field_priser_value']['field'] = 'field_priser_value';
  $handler->display->display_options['relationships']['field_priser_value']['delta'] = '-1';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field collection item: Label */
  $handler->display->display_options['fields']['field_price_label']['id'] = 'field_price_label';
  $handler->display->display_options['fields']['field_price_label']['table'] = 'field_data_field_price_label';
  $handler->display->display_options['fields']['field_price_label']['field'] = 'field_price_label';
  $handler->display->display_options['fields']['field_price_label']['relationship'] = 'field_priser_value';
  $handler->display->display_options['fields']['field_price_label']['label'] = '';
  $handler->display->display_options['fields']['field_price_label']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_price_label']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_price_label']['alter']['text'] = '[field_price_label]: ';
  $handler->display->display_options['fields']['field_price_label']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_price_label']['hide_empty'] = TRUE;
  /* Field: Field collection item: Pris */
  $handler->display->display_options['fields']['field_price']['id'] = 'field_price';
  $handler->display->display_options['fields']['field_price']['table'] = 'field_data_field_price';
  $handler->display->display_options['fields']['field_price']['field'] = 'field_price';
  $handler->display->display_options['fields']['field_price']['relationship'] = 'field_priser_value';
  $handler->display->display_options['fields']['field_price']['label'] = '';
  $handler->display->display_options['fields']['field_price']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_price']['alter']['text'] = '[field_price_label][field_price]';
  $handler->display->display_options['fields']['field_price']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_price']['empty'] = '[field_price_label]Gratis';
  $handler->display->display_options['fields']['field_price']['type'] = 'text_plain';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
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

  /* Display: Featured Links */
  $handler = $view->new_display('panel_pane', 'Featured Links', 'panel_pane_4');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_date_for_event']['id'] = 'field_date_for_event';
  $handler->display->display_options['fields']['field_date_for_event']['table'] = 'field_data_field_date_for_event';
  $handler->display->display_options['fields']['field_date_for_event']['field'] = 'field_date_for_event';
  $handler->display->display_options['fields']['field_date_for_event']['ui_name'] = 'Rewrite';
  $handler->display->display_options['fields']['field_date_for_event']['label'] = '';
  $handler->display->display_options['fields']['field_date_for_event']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_date_for_event']['alter']['text'] = '<div class="title">[title]</div>
<div class="date"><a href="[path]">[field_date_for_event]</a></div>';
  $handler->display->display_options['fields']['field_date_for_event']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Afholdelsesdato -  start date (field_date_of_event) */
  $handler->display->display_options['sorts']['field_date_of_event_value']['id'] = 'field_date_of_event_value';
  $handler->display->display_options['sorts']['field_date_of_event_value']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['sorts']['field_date_of_event_value']['field'] = 'field_date_of_event_value';
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
  /* Filter criterion: Content: Afholdelsesdato -  start date (field_date_of_event) */
  $handler->display->display_options['filters']['field_date_of_event_value']['id'] = 'field_date_of_event_value';
  $handler->display->display_options['filters']['field_date_of_event_value']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['filters']['field_date_of_event_value']['field'] = 'field_date_of_event_value';
  $handler->display->display_options['filters']['field_date_of_event_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_date_of_event_value']['default_date'] = 'now';
  $export['event'] = $view;

  return $export;
}
