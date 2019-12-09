<?php
/**
 * @file
 * views_app_frontpage_subpages.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_app_frontpage_subpages_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'app_frontpage_subpages';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'App frontpage subpages';
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
  $handler->display->display_options['style_plugin'] = 'grid';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['field_subpage_2_target_id']['id'] = 'field_subpage_2_target_id';
  $handler->display->display_options['relationships']['field_subpage_2_target_id']['table'] = 'field_data_field_subpage_2';
  $handler->display->display_options['relationships']['field_subpage_2_target_id']['field'] = 'field_subpage_2_target_id';
  $handler->display->display_options['relationships']['field_subpage_2_target_id']['label'] = 'Subpage 2';
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['field_subpage_1_target_id']['id'] = 'field_subpage_1_target_id';
  $handler->display->display_options['relationships']['field_subpage_1_target_id']['table'] = 'field_data_field_subpage_1';
  $handler->display->display_options['relationships']['field_subpage_1_target_id']['field'] = 'field_subpage_1_target_id';
  $handler->display->display_options['relationships']['field_subpage_1_target_id']['label'] = 'Subpage 1';
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['relationship'] = 'field_subpage_1_target_id';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_title']['element_default_classes'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['relationship'] = 'field_subpage_1_target_id';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['alter']['text'] = '<div>
  [field_reference_thumbnail]
  [field_reference_title] 
</div>';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => 'content',
  );
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title_1']['id'] = 'field_reference_title_1';
  $handler->display->display_options['fields']['field_reference_title_1']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title_1']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title_1']['relationship'] = 'field_subpage_2_target_id';
  $handler->display->display_options['fields']['field_reference_title_1']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title_1']['element_label_colon'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['id'] = 'field_reference_thumbnail_1';
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['relationship'] = 'field_subpage_2_target_id';
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail_1']['settings'] = array(
    'image_style' => 'medium',
    'image_link' => 'content',
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
    'app_frontpage' => 'app_frontpage',
  );

  /* Display: EVA Field */
  $handler = $view->new_display('entity_view', 'EVA Field', 'entity_view_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['entity_type'] = 'node';
  $handler->display->display_options['bundles'] = array(
    0 => 'app_frontpage',
  );
  $export['app_frontpage_subpages'] = $view;

  return $export;
}
