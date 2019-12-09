<?php
/**
 * @file
 * views_app_frontpage_tiles.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_app_frontpage_tiles_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'app_frontpage_tiles';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'App frontpage tiles';
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
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_references_9_target_id']['id'] = 'field_references_9_target_id';
  $handler->display->display_options['relationships']['field_references_9_target_id']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['relationships']['field_references_9_target_id']['field'] = 'field_references_9_target_id';
  $handler->display->display_options['relationships']['field_references_9_target_id']['label'] = 'Referenced';
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_tile_1_text']['id'] = 'field_tile_1_text';
  $handler->display->display_options['fields']['field_tile_1_text']['table'] = 'field_data_field_tile_1_text';
  $handler->display->display_options['fields']['field_tile_1_text']['field'] = 'field_tile_1_text';
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
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '1';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: Dit besøg */
  $handler = $view->new_display('panel_pane', 'Dit besøg', 'panel_pane_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['alter']['text'] = '<a href="[path]">
[field_reference_title] 
</a>';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '0';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: I nærheden */
  $handler = $view->new_display('panel_pane', 'I nærheden', 'panel_pane_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_title']['element_class'] = 'title';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_class'] = 'image';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'app-tile-1',
    'image_link' => '',
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;

  /* Display: Viden og temaer */
  $handler = $view->new_display('panel_pane', 'Viden og temaer', 'panel_pane_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_title']['element_class'] = 'title';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_class'] = 'image';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'app-tile-2',
    'image_link' => '',
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '2';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: Det sker */
  $handler = $view->new_display('panel_pane', 'Det sker', 'panel_pane_4');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['alter']['text'] = '<a href="[path]">
[field_reference_title] 
</a>';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '3';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: Ture og ruter */
  $handler = $view->new_display('panel_pane', 'Ture og ruter', 'panel_pane_5');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_title']['element_class'] = 'title';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_class'] = 'image';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'app-tile-3',
    'image_link' => '',
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '4';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: Spil */
  $handler = $view->new_display('panel_pane', 'Spil', 'panel_pane_6');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_title']['element_class'] = 'title';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_class'] = 'image';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'app-tile-4',
    'image_link' => '',
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '5';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: QR Scanner */
  $handler = $view->new_display('panel_pane', 'QR Scanner', 'panel_pane_7');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_title']['element_class'] = 'title';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '6';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: Praktisk info */
  $handler = $view->new_display('panel_pane', 'Praktisk info', 'panel_pane_8');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_title']['element_class'] = 'title';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '7';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;

  /* Display: Seværdigheder */
  $handler = $view->new_display('panel_pane', 'Seværdigheder', 'panel_pane_9');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_title']['element_class'] = 'title';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_type'] = 'div';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_class'] = 'image';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'app-tile-1',
    'image_link' => '',
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_references_9_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]"></a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: References_9 (field_references_9:delta) */
  $handler->display->display_options['filters']['delta_1']['id'] = 'delta_1';
  $handler->display->display_options['filters']['delta_1']['table'] = 'field_data_field_references_9';
  $handler->display->display_options['filters']['delta_1']['field'] = 'delta';
  $handler->display->display_options['filters']['delta_1']['value']['value'] = '8';
  $handler->display->display_options['filters']['delta_1']['group'] = 1;
  $export['app_frontpage_tiles'] = $view;

  return $export;
}
