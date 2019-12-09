<?php
/**
 * @file
 * views_sidebar.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_sidebar_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'sidebar';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Sidebar';
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
  $handler->display->display_options['relationships']['reverse_field_sidebar_node']['id'] = 'reverse_field_sidebar_node';
  $handler->display->display_options['relationships']['reverse_field_sidebar_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_sidebar_node']['field'] = 'reverse_field_sidebar_node';
  $handler->display->display_options['relationships']['reverse_field_sidebar_node']['required'] = TRUE;
  /* Field: Content: Eksternt link */
  $handler->display->display_options['fields']['field_external_link_sidebar']['id'] = 'field_external_link_sidebar';
  $handler->display->display_options['fields']['field_external_link_sidebar']['table'] = 'field_data_field_external_link_sidebar';
  $handler->display->display_options['fields']['field_external_link_sidebar']['field'] = 'field_external_link_sidebar';
  $handler->display->display_options['fields']['field_external_link_sidebar']['label'] = '';
  $handler->display->display_options['fields']['field_external_link_sidebar']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_external_link_sidebar']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_external_link_sidebar']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_external_link_sidebar']['type'] = 'link_with_target';
  /* Field: Content: Internt link */
  $handler->display->display_options['fields']['field_internal_link_sidebar']['id'] = 'field_internal_link_sidebar';
  $handler->display->display_options['fields']['field_internal_link_sidebar']['table'] = 'field_data_field_internal_link_sidebar';
  $handler->display->display_options['fields']['field_internal_link_sidebar']['field'] = 'field_internal_link_sidebar';
  $handler->display->display_options['fields']['field_internal_link_sidebar']['label'] = '';
  $handler->display->display_options['fields']['field_internal_link_sidebar']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_internal_link_sidebar']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_internal_link_sidebar']['type'] = 'entityreference_pathalias';
  $handler->display->display_options['fields']['field_internal_link_sidebar']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Overskrift */
  $handler->display->display_options['fields']['field_heading']['id'] = 'field_heading';
  $handler->display->display_options['fields']['field_heading']['table'] = 'field_data_field_heading';
  $handler->display->display_options['fields']['field_heading']['field'] = 'field_heading';
  $handler->display->display_options['fields']['field_heading']['label'] = '';
  $handler->display->display_options['fields']['field_heading']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_heading']['alter']['text'] = '<a href="[field_external_link_sidebar][field_internal_link_sidebar]">
<h3>[field_heading]</h3>
</a>';
  $handler->display->display_options['fields']['field_heading']['element_type'] = 'h3';
  $handler->display->display_options['fields']['field_heading']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_heading']['element_default_classes'] = FALSE;
  /* Field: Content: Tekst */
  $handler->display->display_options['fields']['field_sidebar_text']['id'] = 'field_sidebar_text';
  $handler->display->display_options['fields']['field_sidebar_text']['table'] = 'field_data_field_sidebar_text';
  $handler->display->display_options['fields']['field_sidebar_text']['field'] = 'field_sidebar_text';
  $handler->display->display_options['fields']['field_sidebar_text']['label'] = '';
  $handler->display->display_options['fields']['field_sidebar_text']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_sidebar_text']['alter']['text'] = '<a href="[field_external_link_sidebar][field_internal_link_sidebar]">
[field_sidebar_text]
<div class="readmore">Læs mere</div>
</a>';
  $handler->display->display_options['fields']['field_sidebar_text']['element_label_colon'] = FALSE;
  /* Field: Content: Billede */
  $handler->display->display_options['fields']['field_sidebar_image']['id'] = 'field_sidebar_image';
  $handler->display->display_options['fields']['field_sidebar_image']['table'] = 'field_data_field_sidebar_image';
  $handler->display->display_options['fields']['field_sidebar_image']['field'] = 'field_sidebar_image';
  $handler->display->display_options['fields']['field_sidebar_image']['label'] = '';
  $handler->display->display_options['fields']['field_sidebar_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_sidebar_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_sidebar_image']['settings'] = array(
    'image_style' => 'sidebar_box_image',
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
  $handler->display->display_options['arguments']['nid']['relationship'] = 'reverse_field_sidebar_node';
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
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  $export['sidebar'] = $view;

  return $export;
}
