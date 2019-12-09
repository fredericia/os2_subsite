<?php
/**
 * @file
 * views_featuredlinks.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_featuredlinks_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'featured_links';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Featured links';
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
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_featured_links_node']['id'] = 'reverse_field_featured_links_node';
  $handler->display->display_options['relationships']['reverse_field_featured_links_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_featured_links_node']['field'] = 'reverse_field_featured_links_node';
  $handler->display->display_options['relationships']['reverse_field_featured_links_node']['required'] = TRUE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Link background image */
  $handler->display->display_options['fields']['field_link_background_image']['id'] = 'field_link_background_image';
  $handler->display->display_options['fields']['field_link_background_image']['table'] = 'field_data_field_link_background_image';
  $handler->display->display_options['fields']['field_link_background_image']['field'] = 'field_link_background_image';
  $handler->display->display_options['fields']['field_link_background_image']['label'] = '';
  $handler->display->display_options['fields']['field_link_background_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_link_background_image']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_link_background_image']['empty_zero'] = TRUE;
  $handler->display->display_options['fields']['field_link_background_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_link_background_image']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_link_background_image']['settings'] = array(
    'image_style' => 'link_bg',
    'image_link' => '',
  );
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'reverse_field_featured_links_node';
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

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_pane_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $export['featured_links'] = $view;

  return $export;
}
