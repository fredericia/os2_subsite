<?php
/**
 * @file
 * views_frontpage_tiles.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_frontpage_tiles_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'frontpage_tiles';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Frontpage Tiles';
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
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_date']['id'] = 'field_date';
  $handler->display->display_options['fields']['field_date']['table'] = 'field_data_field_date';
  $handler->display->display_options['fields']['field_date']['field'] = 'field_date';
  $handler->display->display_options['fields']['field_date']['label'] = '';
  $handler->display->display_options['fields']['field_date']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_date']['element_label_colon'] = FALSE;
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_date_1']['id'] = 'field_date_1';
  $handler->display->display_options['fields']['field_date_1']['table'] = 'field_data_field_date';
  $handler->display->display_options['fields']['field_date_1']['field'] = 'field_date';
  $handler->display->display_options['fields']['field_date_1']['label'] = '';
  $handler->display->display_options['fields']['field_date_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_date_1']['element_label_colon'] = FALSE;
  /* Field: Content: Eksternt link */
  $handler->display->display_options['fields']['field_external_link']['id'] = 'field_external_link';
  $handler->display->display_options['fields']['field_external_link']['table'] = 'field_data_field_external_link';
  $handler->display->display_options['fields']['field_external_link']['field'] = 'field_external_link';
  $handler->display->display_options['fields']['field_external_link']['label'] = '';
  $handler->display->display_options['fields']['field_external_link']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_external_link']['element_label_colon'] = FALSE;
  /* Field: Content: Kort tekst */
  $handler->display->display_options['fields']['field_short_text']['id'] = 'field_short_text';
  $handler->display->display_options['fields']['field_short_text']['table'] = 'field_data_field_short_text';
  $handler->display->display_options['fields']['field_short_text']['field'] = 'field_short_text';
  $handler->display->display_options['fields']['field_short_text']['label'] = '';
  $handler->display->display_options['fields']['field_short_text']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_short_text']['alter']['text'] = '<a href="[field_internal_link][field_external_link]">
<div class="container">
<div class="date"><span class="day">[field_date]</span><span class="month">[field_date_1]</span></div>
<div class="description">[field_short_text]</div>
<div class="arrow"></div>
</div>
</a>';
  $handler->display->display_options['fields']['field_short_text']['element_label_colon'] = FALSE;
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
    'front' => 'front',
  );

  /* Display: Topbillede */
  $handler = $view->new_display('panel_pane', 'Topbillede', 'panel_pane_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Day */
  $handler->display->display_options['fields']['field_date_of_event']['id'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['field'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['ui_name'] = 'Day';
  $handler->display->display_options['fields']['field_date_of_event']['label'] = '';
  $handler->display->display_options['fields']['field_date_of_event']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_date_of_event']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_date_of_event']['settings'] = array(
    'format_type' => 'day',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: month */
  $handler->display->display_options['fields']['field_date_of_event_1']['id'] = 'field_date_of_event_1';
  $handler->display->display_options['fields']['field_date_of_event_1']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event_1']['field'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event_1']['ui_name'] = 'month';
  $handler->display->display_options['fields']['field_date_of_event_1']['label'] = '';
  $handler->display->display_options['fields']['field_date_of_event_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_date_of_event_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_date_of_event_1']['settings'] = array(
    'format_type' => 'month',
    'fromto' => 'value',
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
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href="[path]">
<div class="container">
<div class="date"><span class="day">[field_date_of_event]</span><span class="month">[field_date_of_event_1]</span></div>
<div class="description">[title]</div>
<div class="arrow"></div>
</div>
</a>';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
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
  /* Filter criterion: Content: Afholdelsesdato - end date (field_date_of_event:value2) */
  $handler->display->display_options['filters']['field_date_of_event_value2']['id'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['filters']['field_date_of_event_value2']['field'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_date_of_event_value2']['default_date'] = 'now';

  /* Display: Top left */
  $handler = $view->new_display('panel_pane', 'Top left', 'panel_pane_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '1';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: day */
  $handler->display->display_options['fields']['field_date_of_event']['id'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['field'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event']['ui_name'] = 'day';
  $handler->display->display_options['fields']['field_date_of_event']['label'] = '';
  $handler->display->display_options['fields']['field_date_of_event']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_date_of_event']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_date_of_event']['settings'] = array(
    'format_type' => 'day',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: month */
  $handler->display->display_options['fields']['field_date_of_event_1']['id'] = 'field_date_of_event_1';
  $handler->display->display_options['fields']['field_date_of_event_1']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event_1']['field'] = 'field_date_of_event';
  $handler->display->display_options['fields']['field_date_of_event_1']['ui_name'] = 'month';
  $handler->display->display_options['fields']['field_date_of_event_1']['label'] = '';
  $handler->display->display_options['fields']['field_date_of_event_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_date_of_event_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_date_of_event_1']['settings'] = array(
    'format_type' => 'month',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Topbillede */
  $handler->display->display_options['fields']['field_topimage']['id'] = 'field_topimage';
  $handler->display->display_options['fields']['field_topimage']['table'] = 'field_data_field_topimage';
  $handler->display->display_options['fields']['field_topimage']['field'] = 'field_topimage';
  $handler->display->display_options['fields']['field_topimage']['label'] = '';
  $handler->display->display_options['fields']['field_topimage']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_topimage']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_topimage']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_topimage']['settings'] = array(
    'image_style' => 'front-tile-1',
    'image_link' => '',
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href="[path]">
<div class="container">
<div class="image">[field_topimage]</div>
<div class="date"><span class="day">[field_date_of_event]</span><span class="month">[field_date_of_event_1] </span></div>
<div class="description">[title]</div>
<div class="arrow"></div>
</div>
</a>';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
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
  /* Filter criterion: Content: Afholdelsesdato - end date (field_date_of_event:value2) */
  $handler->display->display_options['filters']['field_date_of_event_value2']['id'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['table'] = 'field_data_field_date_of_event';
  $handler->display->display_options['filters']['field_date_of_event_value2']['field'] = 'field_date_of_event_value2';
  $handler->display->display_options['filters']['field_date_of_event_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_date_of_event_value2']['default_date'] = 'now';

  /* Display: Top right */
  $handler = $view->new_display('panel_pane', 'Top right', 'panel_pane_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Eksternt link */
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['id'] = 'field_top_box_right_external_lin';
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['table'] = 'field_data_field_top_box_right_external_lin';
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['field'] = 'field_top_box_right_external_lin';
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['label'] = '';
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_top_box_right_external_lin']['type'] = 'link_with_target';
  /* Field: Content: Internt link */
  $handler->display->display_options['fields']['field_internal_top_box_right']['id'] = 'field_internal_top_box_right';
  $handler->display->display_options['fields']['field_internal_top_box_right']['table'] = 'field_data_field_internal_top_box_right';
  $handler->display->display_options['fields']['field_internal_top_box_right']['field'] = 'field_internal_top_box_right';
  $handler->display->display_options['fields']['field_internal_top_box_right']['label'] = '';
  $handler->display->display_options['fields']['field_internal_top_box_right']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_internal_top_box_right']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_internal_top_box_right']['type'] = 'entityreference_pathalias';
  $handler->display->display_options['fields']['field_internal_top_box_right']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Tekst */
  $handler->display->display_options['fields']['field_top_box_right_text']['id'] = 'field_top_box_right_text';
  $handler->display->display_options['fields']['field_top_box_right_text']['table'] = 'field_data_field_top_box_right_text';
  $handler->display->display_options['fields']['field_top_box_right_text']['field'] = 'field_top_box_right_text';
  $handler->display->display_options['fields']['field_top_box_right_text']['label'] = '';
  $handler->display->display_options['fields']['field_top_box_right_text']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_top_box_right_text']['alter']['text'] = '<a href="[field_internal_top_box_right][field_top_box_right_external_lin]">
<div class="container">
[field_top_box_right_text]
</div>
</a>';
  $handler->display->display_options['fields']['field_top_box_right_text']['element_label_colon'] = FALSE;

  /* Display: Center image */
  $handler = $view->new_display('panel_pane', 'Center image', 'panel_pane_4');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Eksternt link */
  $handler->display->display_options['fields']['field_eksternt_link_center']['id'] = 'field_eksternt_link_center';
  $handler->display->display_options['fields']['field_eksternt_link_center']['table'] = 'field_data_field_eksternt_link_center';
  $handler->display->display_options['fields']['field_eksternt_link_center']['field'] = 'field_eksternt_link_center';
  $handler->display->display_options['fields']['field_eksternt_link_center']['label'] = '';
  $handler->display->display_options['fields']['field_eksternt_link_center']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_eksternt_link_center']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_eksternt_link_center']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_eksternt_link_center']['type'] = 'link_with_target';
  /* Field: Content: Internt link */
  $handler->display->display_options['fields']['field_internal_center_box']['id'] = 'field_internal_center_box';
  $handler->display->display_options['fields']['field_internal_center_box']['table'] = 'field_data_field_internal_center_box';
  $handler->display->display_options['fields']['field_internal_center_box']['field'] = 'field_internal_center_box';
  $handler->display->display_options['fields']['field_internal_center_box']['label'] = '';
  $handler->display->display_options['fields']['field_internal_center_box']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_internal_center_box']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_internal_center_box']['type'] = 'entityreference_pathalias';
  $handler->display->display_options['fields']['field_internal_center_box']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Center billede */
  $handler->display->display_options['fields']['field_center_img']['id'] = 'field_center_img';
  $handler->display->display_options['fields']['field_center_img']['table'] = 'field_data_field_center_img';
  $handler->display->display_options['fields']['field_center_img']['field'] = 'field_center_img';
  $handler->display->display_options['fields']['field_center_img']['label'] = '';
  $handler->display->display_options['fields']['field_center_img']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_center_img']['alter']['text'] = '<a href="[field_internal_center_box][field_eksternt_link_center]">
[field_center_img]
</a>';
  $handler->display->display_options['fields']['field_center_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_center_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_center_img']['settings'] = array(
    'image_style' => 'front-tile-2',
    'image_link' => '',
  );

  /* Display: Bottom left */
  $handler = $view->new_display('panel_pane', 'Bottom left', 'panel_pane_5');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Eksternt link */
  $handler->display->display_options['fields']['field_external_bottom_left']['id'] = 'field_external_bottom_left';
  $handler->display->display_options['fields']['field_external_bottom_left']['table'] = 'field_data_field_external_bottom_left';
  $handler->display->display_options['fields']['field_external_bottom_left']['field'] = 'field_external_bottom_left';
  $handler->display->display_options['fields']['field_external_bottom_left']['label'] = '';
  $handler->display->display_options['fields']['field_external_bottom_left']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_external_bottom_left']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_external_bottom_left']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_external_bottom_left']['type'] = 'link_with_target';
  /* Field: Content: Internt link */
  $handler->display->display_options['fields']['field_internal_bottom_left']['id'] = 'field_internal_bottom_left';
  $handler->display->display_options['fields']['field_internal_bottom_left']['table'] = 'field_data_field_internal_bottom_left';
  $handler->display->display_options['fields']['field_internal_bottom_left']['field'] = 'field_internal_bottom_left';
  $handler->display->display_options['fields']['field_internal_bottom_left']['label'] = '';
  $handler->display->display_options['fields']['field_internal_bottom_left']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_internal_bottom_left']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_internal_bottom_left']['type'] = 'entityreference_pathalias';
  $handler->display->display_options['fields']['field_internal_bottom_left']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Billede */
  $handler->display->display_options['fields']['field_bottom_left_img']['id'] = 'field_bottom_left_img';
  $handler->display->display_options['fields']['field_bottom_left_img']['table'] = 'field_data_field_bottom_left_img';
  $handler->display->display_options['fields']['field_bottom_left_img']['field'] = 'field_bottom_left_img';
  $handler->display->display_options['fields']['field_bottom_left_img']['label'] = '';
  $handler->display->display_options['fields']['field_bottom_left_img']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_bottom_left_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_bottom_left_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_bottom_left_img']['settings'] = array(
    'image_style' => 'front-tile-3',
    'image_link' => '',
  );
  /* Field: Content: Kort tekst */
  $handler->display->display_options['fields']['field_description_bottom_left']['id'] = 'field_description_bottom_left';
  $handler->display->display_options['fields']['field_description_bottom_left']['table'] = 'field_data_field_description_bottom_left';
  $handler->display->display_options['fields']['field_description_bottom_left']['field'] = 'field_description_bottom_left';
  $handler->display->display_options['fields']['field_description_bottom_left']['label'] = '';
  $handler->display->display_options['fields']['field_description_bottom_left']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_description_bottom_left']['alter']['text'] = '<a href="[field_internal_bottom_left][field_external_bottom_left]">
<div class="container">
<div class="image">[field_bottom_left_img]</div>
<div class="description">[field_description_bottom_left]
<div class="arrow"></div>
</div>
</div>
</a>';
  $handler->display->display_options['fields']['field_description_bottom_left']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_description_bottom_left']['type'] = 'text_trimmed';
  $handler->display->display_options['fields']['field_description_bottom_left']['settings'] = array(
    'trim_length' => '600',
  );

  /* Display: Center box */
  $handler = $view->new_display('panel_pane', 'Center box', 'panel_pane_6');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Billede  */
  $handler->display->display_options['fields']['field_center_box_img']['id'] = 'field_center_box_img';
  $handler->display->display_options['fields']['field_center_box_img']['table'] = 'field_data_field_center_box_img';
  $handler->display->display_options['fields']['field_center_box_img']['field'] = 'field_center_box_img';
  $handler->display->display_options['fields']['field_center_box_img']['label'] = '';
  $handler->display->display_options['fields']['field_center_box_img']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_center_box_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_center_box_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_center_box_img']['settings'] = array(
    'image_style' => 'front-tile-4',
    'image_link' => '',
  );
  /* Field: Content: Eksternt link */
  $handler->display->display_options['fields']['field_external_center_box']['id'] = 'field_external_center_box';
  $handler->display->display_options['fields']['field_external_center_box']['table'] = 'field_data_field_external_center_box';
  $handler->display->display_options['fields']['field_external_center_box']['field'] = 'field_external_center_box';
  $handler->display->display_options['fields']['field_external_center_box']['label'] = '';
  $handler->display->display_options['fields']['field_external_center_box']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_external_center_box']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_external_center_box']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_external_center_box']['type'] = 'link_with_target';
  /* Field: Content: Internt link  */
  $handler->display->display_options['fields']['field_internal_center_box_2']['id'] = 'field_internal_center_box_2';
  $handler->display->display_options['fields']['field_internal_center_box_2']['table'] = 'field_data_field_internal_center_box_2';
  $handler->display->display_options['fields']['field_internal_center_box_2']['field'] = 'field_internal_center_box_2';
  $handler->display->display_options['fields']['field_internal_center_box_2']['label'] = '';
  $handler->display->display_options['fields']['field_internal_center_box_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_internal_center_box_2']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_internal_center_box_2']['type'] = 'entityreference_pathalias';
  $handler->display->display_options['fields']['field_internal_center_box_2']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Kort tekst */
  $handler->display->display_options['fields']['field_center_box_description']['id'] = 'field_center_box_description';
  $handler->display->display_options['fields']['field_center_box_description']['table'] = 'field_data_field_center_box_description';
  $handler->display->display_options['fields']['field_center_box_description']['field'] = 'field_center_box_description';
  $handler->display->display_options['fields']['field_center_box_description']['label'] = '';
  $handler->display->display_options['fields']['field_center_box_description']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_center_box_description']['alter']['text'] = '<a href="[field_internal_center_box_2][field_external_center_box]">
<div class="container">
<div class="image">[field_center_box_img]</div>
<div class="description">[field_center_box_description]</div>
<div class="arrow"></div>
</div>
</a>';
  $handler->display->display_options['fields']['field_center_box_description']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_center_box_description']['type'] = 'text_plain';

  /* Display: Bottom right */
  $handler = $view->new_display('panel_pane', 'Bottom right', 'panel_pane_7');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Billede - højre nederst */
  $handler->display->display_options['fields']['field_bottom_right_img']['id'] = 'field_bottom_right_img';
  $handler->display->display_options['fields']['field_bottom_right_img']['table'] = 'field_data_field_bottom_right_img';
  $handler->display->display_options['fields']['field_bottom_right_img']['field'] = 'field_bottom_right_img';
  $handler->display->display_options['fields']['field_bottom_right_img']['label'] = '';
  $handler->display->display_options['fields']['field_bottom_right_img']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_bottom_right_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_bottom_right_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_bottom_right_img']['settings'] = array(
    'image_style' => 'front-tile-5',
    'image_link' => '',
  );
  /* Field: Content: Eksternt link - højre nederst */
  $handler->display->display_options['fields']['field_external_bottom_right']['id'] = 'field_external_bottom_right';
  $handler->display->display_options['fields']['field_external_bottom_right']['table'] = 'field_data_field_external_bottom_right';
  $handler->display->display_options['fields']['field_external_bottom_right']['field'] = 'field_external_bottom_right';
  $handler->display->display_options['fields']['field_external_bottom_right']['label'] = '';
  $handler->display->display_options['fields']['field_external_bottom_right']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_external_bottom_right']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_external_bottom_right']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_external_bottom_right']['type'] = 'link_with_target';
  /* Field: Content: Internt link - højre nederst */
  $handler->display->display_options['fields']['field_internal_bottom_right']['id'] = 'field_internal_bottom_right';
  $handler->display->display_options['fields']['field_internal_bottom_right']['table'] = 'field_data_field_internal_bottom_right';
  $handler->display->display_options['fields']['field_internal_bottom_right']['field'] = 'field_internal_bottom_right';
  $handler->display->display_options['fields']['field_internal_bottom_right']['label'] = '';
  $handler->display->display_options['fields']['field_internal_bottom_right']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_internal_bottom_right']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_internal_bottom_right']['type'] = 'entityreference_pathalias';
  $handler->display->display_options['fields']['field_internal_bottom_right']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Kort tekst - højre nederst */
  $handler->display->display_options['fields']['field_description_bottom_right']['id'] = 'field_description_bottom_right';
  $handler->display->display_options['fields']['field_description_bottom_right']['table'] = 'field_data_field_description_bottom_right';
  $handler->display->display_options['fields']['field_description_bottom_right']['field'] = 'field_description_bottom_right';
  $handler->display->display_options['fields']['field_description_bottom_right']['label'] = '';
  $handler->display->display_options['fields']['field_description_bottom_right']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_description_bottom_right']['alter']['text'] = '<a href="[field_internal_bottom_right][field_external_bottom_right]">
<div class="container">
<div class="description">
<div class="content">[field_description_bottom_right]</div>
<div class="arrow"></div>
</div>
<div class="image">[field_bottom_right_img]</div>
</div>
</a>';
  $handler->display->display_options['fields']['field_description_bottom_right']['element_label_colon'] = FALSE;
  $export['frontpage_tiles'] = $view;

  return $export;
}
