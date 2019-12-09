<?php
/**
 * @file
 * views_be_app_pages.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_be_app_pages_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'be_app_pages';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'BE app pages';
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
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Reference title */
  $handler->display->display_options['fields']['field_reference_title']['id'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['table'] = 'field_data_field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['field'] = 'field_reference_title';
  $handler->display->display_options['fields']['field_reference_title']['label'] = '';
  $handler->display->display_options['fields']['field_reference_title']['element_label_colon'] = FALSE;
  /* Field: Content: Reference thumbnail */
  $handler->display->display_options['fields']['field_reference_thumbnail']['id'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['table'] = 'field_data_field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['field'] = 'field_reference_thumbnail';
  $handler->display->display_options['fields']['field_reference_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_reference_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_reference_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_reference_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
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
    'app_calendar' => 'app_calendar',
    'app_game' => 'app_game',
    'app_hotspot' => 'app_hotspot',
    'app_qr_scan' => 'app_qr_scan',
    'app_video' => 'app_video',
    'app_frontpage' => 'app_frontpage',
    'app_gallery' => 'app_gallery',
    'app_list' => 'app_list',
    'app_map' => 'app_map',
    'audio_guide' => 'audio_guide',
    'page' => 'page',
  );

  /* Display: Entity Reference */
  $handler = $view->new_display('entityreference', 'Entity Reference', 'entityreference_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'entityreference_style';
  $handler->display->display_options['style_options']['search_fields'] = array(
    'field_reference_title' => 'field_reference_title',
    'title' => 'title',
    'rendered_entity' => 0,
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entityreference_fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;

  /* Display: Locations */
  $handler = $view->new_display('entityreference', 'Locations', 'entityreference_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'entityreference_style';
  $handler->display->display_options['style_options']['search_fields'] = array(
    'field_reference_title' => 'field_reference_title',
    'title' => 'title',
    'rendered_entity' => 0,
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entityreference_fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
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
    'app_location' => 'app_location',
  );
  $export['be_app_pages'] = $view;

  return $export;
}
