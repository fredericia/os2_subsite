<?php
/**
 * @file
 * os2web_kulturnaut_events.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function os2web_kulturnaut_events_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'os2sub_venues';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'OS2Sub Venues';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Steder og lokaliter';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-6 col-md-4';
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_list';
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['label'] = '';
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['name']['link_to_taxonomy'] = TRUE;
  /* Sort criterion: Taxonomy term: Weight */
  $handler->display->display_options['sorts']['weight']['id'] = 'weight';
  $handler->display->display_options['sorts']['weight']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['sorts']['weight']['field'] = 'weight';
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'os2web_kulturnaut_venue' => 'os2web_kulturnaut_venue',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'os2web_kulturnaut_venue' => 'os2web_kulturnaut_venue',
  );
  /* Filter criterion: Taxonomy term: Vis på siden Steder (field_os2web_kult_venue_enable) */
  $handler->display->display_options['filters']['field_os2web_kult_venue_enable_value']['id'] = 'field_os2web_kult_venue_enable_value';
  $handler->display->display_options['filters']['field_os2web_kult_venue_enable_value']['table'] = 'field_data_field_os2web_kult_venue_enable';
  $handler->display->display_options['filters']['field_os2web_kult_venue_enable_value']['field'] = 'field_os2web_kult_venue_enable_value';
  $handler->display->display_options['filters']['field_os2web_kult_venue_enable_value']['value'] = array(
    1 => '1',
  );
  $handler->display->display_options['path'] = 'steder';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'pane_venues_for_tag');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-6 col-md-4';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_list';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Field: Stikord (field_os2web_base_field_edi_tags) */
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['id'] = 'field_os2web_base_field_edi_tags_tid';
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['table'] = 'field_data_field_os2web_base_field_edi_tags';
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['field'] = 'field_os2web_base_field_edi_tags_tid';
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['default_argument_type'] = 'taxonomy_tid';
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_base_field_edi_tags_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_base_field_edi_tags_tid' => array(
      'type' => 'context',
      'context' => 'entity:taxonomy_term.tid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Field: Stikord (field_os2web_base_field_edi_tags)',
    ),
  );

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'pane_venues_for_tema');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-6 col-md-4';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_list';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Field: Tema (field_os2web_kulturnaut_tema) */
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['id'] = 'field_os2web_kulturnaut_tema_tid';
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['table'] = 'field_data_field_os2web_kulturnaut_tema';
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['field'] = 'field_os2web_kulturnaut_tema_tid';
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['default_argument_type'] = 'taxonomy_tid';
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_kulturnaut_tema_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_kulturnaut_tema_tid' => array(
      'type' => 'context',
      'context' => 'entity:taxonomy_term.tid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Field: Tema (field_os2web_kulturnaut_tema)',
    ),
  );
  $translatables['os2sub_venues'] = array(
    t('Master'),
    t('Steder og lokaliter'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Page'),
    t('Content pane'),
    t('All'),
    t('View panes'),
  );
  $export['os2sub_venues'] = $view;

  $view = new view();
  $view->name = 'os2web_kulturnaut_events_lists';
  $view->description = 'Side, block og andre visninger af Kulturnaut begivenheder fra Kulturnaut.';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Kulturnaut begivenheder lister';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Arrangementer fra KulturauT';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['query']['options']['pure_distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-md-3';
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  /* Field: Content: Slideshow */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['id'] = 'field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['table'] = 'field_data_field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['field'] = 'field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['type'] = 'single_image';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['settings'] = array(
    'image_style' => 'os2sub_full_width',
    'image_link' => '',
    'single_image_delta' => '',
  );
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href=[field_os2web_kulturnaut_homepage] title=[title]>[title]</a>';
  $handler->display->display_options['fields']['title']['alter']['path'] = '[field_os2web_kulturnaut_homepage]';
  $handler->display->display_options['fields']['title']['alter']['external'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['alt'] = '[title]';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Link */
  $handler->display->display_options['fields']['view_node']['id'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['view_node']['field'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['label'] = '';
  $handler->display->display_options['fields']['view_node']['element_label_colon'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  /* Sort criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'kulturnaut-begivenheder';

  /* Display: Block - contentpage */
  $handler = $view->new_display('block', 'Block - contentpage', 'block_kulturnaut_events');
  $handler->display->display_options['enabled'] = FALSE;
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';

  /* Display: Content pane - related activities */
  $handler = $view->new_display('panel_pane', 'Content pane - related activities', 'pane_related_articles');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Relaterede begivenheder';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Indlæs flere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-3';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 0;
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'nid' => array(
      'type' => 'context',
      'context' => 'entity:node.nid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
  );

  /* Display: Block - activities slideshow */
  $handler = $view->new_display('block', 'Block - activities slideshow', 'block_slideshow');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Block - Activities Slideshow';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'slideshow';
  $handler->display->display_options['style_options']['slideshow_type'] = 'views_slideshow_cycle';
  $handler->display->display_options['style_options']['slideshow_skin'] = 'default';
  $handler->display->display_options['style_options']['skin_info'] = array(
    'class' => 'default',
    'name' => 'Default',
    'module' => 'views_slideshow',
    'path' => '',
    'stylesheets' => array(),
  );
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['type'] = 'views_slideshow_pager_fields';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['views_slideshow_pager_fields_fields'] = array(
    'nid' => 'nid',
    'field_os2web_kulturnaut_slidesho' => 0,
    'title' => 0,
    'field_os2web_kulturnaut_sname' => 0,
    'view_node' => 0,
    'field_os2web_kulturnaut_date' => 0,
    'field_os2web_base_field_edi_tags' => 0,
  );
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_controls']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_controls']['type'] = 'views_slideshow_controls_text';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_slide_counter']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['enable'] = 1;
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['type'] = 'views_slideshow_pager_fields';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['views_slideshow_pager_fields_fields'] = array(
    'nid' => 'nid',
    'field_os2web_kulturnaut_slidesho' => 0,
    'title' => 0,
    'field_os2web_kulturnaut_sname' => 0,
    'view_node' => 0,
    'field_os2web_kulturnaut_date' => 0,
    'field_os2web_base_field_edi_tags' => 0,
  );
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_controls']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_controls']['type'] = 'views_slideshow_controls_text';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_slide_counter']['weight'] = '1';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['timeout'] = '5000';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['speed'] = '700';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['delay'] = '0';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['action_advanced'] = 1;
  $handler->display->display_options['style_options']['views_slideshow_cycle']['remember_slide_days'] = '1';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['nowrap'] = 1;
  $handler->display->display_options['style_options']['views_slideshow_cycle']['items_per_slide'] = '1';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['wait_for_image_load_timeout'] = '3000';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['cleartype'] = 0;
  $handler->display->display_options['style_options']['views_slideshow_cycle']['cleartypenobg'] = 0;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'field_os2web_kulturnaut_sname' => 'field_os2web_kulturnaut_sname',
    'field_os2web_kulturnaut_date' => 'field_os2web_kulturnaut_date',
  );
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_front_slideshow' => 'os2sub_front_slideshow',
    'test' => 0,
    'os2sub_calendar_right' => 0,
    'os2sub_focus' => 0,
  );
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Slideshow */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['id'] = 'field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['table'] = 'field_data_field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['field'] = 'field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['type'] = 'single_image';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['settings'] = array(
    'image_style' => 'os2sub_full_width',
    'image_link' => '',
    'single_image_delta' => '',
  );
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href=[field_os2web_kulturnaut_homepage] title=[title]>[title]</a>';
  $handler->display->display_options['fields']['title']['alter']['path'] = '[field_os2web_kulturnaut_homepage]';
  $handler->display->display_options['fields']['title']['alter']['external'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['alt'] = '[title]';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Sted navn */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['id'] = 'field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['table'] = 'field_data_field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['field'] = 'field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['element_label_colon'] = FALSE;
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['id'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['text'] = '- [field_os2web_kulturnaut_date] ';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['settings'] = array(
    'format_type' => 'long',
    'custom_date_format' => '',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Field: Stikord */
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['id'] = 'field_os2web_base_field_edi_tags';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['table'] = 'field_data_field_os2web_base_field_edi_tags';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['field'] = 'field_os2web_base_field_edi_tags';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['alter']['text'] = '#[field_os2web_base_field_edi_tags]';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['separator'] = ' ';
  /* Field: Content: Link */
  $handler->display->display_options['fields']['view_node']['id'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['view_node']['field'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['label'] = '';
  $handler->display->display_options['fields']['view_node']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['view_node']['alter']['link_class'] = 'btn btn-primary pull-left';
  $handler->display->display_options['fields']['view_node']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['view_node']['text'] = 'Læs mere';
  /* Field: Content: Link */
  $handler->display->display_options['fields']['view_node_1']['id'] = 'view_node_1';
  $handler->display->display_options['fields']['view_node_1']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['view_node_1']['field'] = 'view_node';
  $handler->display->display_options['fields']['view_node_1']['label'] = '';
  $handler->display->display_options['fields']['view_node_1']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['view_node_1']['alter']['link_class'] = 'btn btn-quaternary hidden-sm hidden-xs';
  $handler->display->display_options['fields']['view_node_1']['alter']['target'] = '#';
  $handler->display->display_options['fields']['view_node_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['view_node_1']['text'] = '+Tilføj til kalender';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Nodequeue: In queue */
  $handler->display->display_options['filters']['in_queue']['id'] = 'in_queue';
  $handler->display->display_options['filters']['in_queue']['table'] = 'nodequeue_nodes';
  $handler->display->display_options['filters']['in_queue']['field'] = 'in_queue';
  $handler->display->display_options['filters']['in_queue']['relationship'] = 'nodequeue_rel';
  $handler->display->display_options['filters']['in_queue']['value'] = '1';
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';

  /* Display: Content pane - Activities list (4) */
  $handler = $view->new_display('panel_pane', 'Content pane - Activities list (4)', 'pane_activities_list_4');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Activities list (4)';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-6';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['empty'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_calendar_right' => 'os2sub_calendar_right',
    'test' => 0,
  );
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;

  /* Display: Content pane - activities list (5+load more) */
  $handler = $view->new_display('panel_pane', 'Content pane - activities list (5+load more)', 'pane_activities_list_5_load_more');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Content pane - activities list (5+load more)';
  $handler->display->display_options['defaults']['use_ajax'] = FALSE;
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Indlæs flere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-6 col-md-4';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['empty'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_front_load_more' => 'os2sub_front_load_more',
    'os2sub_calendar_right' => 0,
    'os2sub_focus' => 0,
    'os2sub_front_slideshow' => 0,
  );
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['operator_id'] = 'field_os2web_kulturnaut_date_value2_op';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['label'] = 'Dato - end date (field_os2web_kulturnaut_date:value2)';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['operator'] = 'field_os2web_kulturnaut_date_value2_op';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['identifier'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'nid' => array(
      'type' => 'context',
      'context' => 'entity:node.nid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
  );

  /* Display: Content pane - activities list (2+3) */
  $handler = $view->new_display('panel_pane', 'Content pane - activities list (2+3)', 'pane_activities_list_2_3');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Content pane - activities list (2+3)';
  $handler->display->display_options['defaults']['use_ajax'] = FALSE;
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '2';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-6';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_mini';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_focus' => 'os2sub_focus',
    'test' => 0,
    'os2sub_calendar_right' => 0,
  );
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Nodequeue: In queue */
  $handler->display->display_options['sorts']['in_queue']['id'] = 'in_queue';
  $handler->display->display_options['sorts']['in_queue']['table'] = 'nodequeue_nodes';
  $handler->display->display_options['sorts']['in_queue']['field'] = 'in_queue';
  $handler->display->display_options['sorts']['in_queue']['relationship'] = 'nodequeue_rel';
  /* Sort criterion: Content: Dato -  start date (field_os2web_kulturnaut_date) */
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'nid' => array(
      'type' => 'context',
      'context' => 'entity:node.nid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
  );

  /* Display: Attachment activities 3 (skip 2) */
  $handler = $view->new_display('attachment', 'Attachment activities 3 (skip 2)', 'attachment_activities_list_3_2');
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '2';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'view_node' => 'view_node',
    'field_os2web_kulturnaut_date' => 'field_os2web_kulturnaut_date',
  );
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_focus' => 'os2sub_focus',
    'test' => 0,
    'os2sub_calendar_right' => 0,
  );
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href=[field_os2web_kulturnaut_homepage] title=[title]>[title]</a>';
  $handler->display->display_options['fields']['title']['alter']['path'] = '[field_os2web_kulturnaut_homepage]';
  $handler->display->display_options['fields']['title']['alter']['external'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['alt'] = '[title]';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['id'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['text'] = '[field_os2web_kulturnaut_date]  |';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['settings'] = array(
    'format_type' => 'os2sub_minimal_second',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Content: Link */
  $handler->display->display_options['fields']['view_node']['id'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['view_node']['field'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['label'] = '';
  $handler->display->display_options['fields']['view_node']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['view_node']['alter']['text'] = 'Læs mere';
  $handler->display->display_options['fields']['view_node']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Nodequeue: In queue */
  $handler->display->display_options['sorts']['in_queue']['id'] = 'in_queue';
  $handler->display->display_options['sorts']['in_queue']['table'] = 'nodequeue_nodes';
  $handler->display->display_options['sorts']['in_queue']['field'] = 'in_queue';
  $handler->display->display_options['sorts']['in_queue']['relationship'] = 'nodequeue_rel';
  /* Sort criterion: Content: Dato -  start date (field_os2web_kulturnaut_date) */
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['displays'] = array(
    'pane_activities_list_2_3' => 'pane_activities_list_2_3',
    'default' => 0,
    'page' => 0,
    'block_kulturnaut_events' => 0,
    'pane_related_articles' => 0,
    'block_slideshow' => 0,
    'pane_activities_list_4' => 0,
    'pane_activities_list_5_load_more' => 0,
  );
  $handler->display->display_options['attachment_position'] = 'after';

  /* Display: Content pane - Activities for tag */
  $handler = $view->new_display('panel_pane', 'Content pane - Activities for tag', 'pane_activities_for_tag');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Relaterede begivenheder for tag';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Indlæs flere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'search_result';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Field: Stikord (field_os2web_base_field_edi_tags) */
  $handler->display->display_options['relationships']['field_os2web_base_field_edi_tags_tid']['id'] = 'field_os2web_base_field_edi_tags_tid';
  $handler->display->display_options['relationships']['field_os2web_base_field_edi_tags_tid']['table'] = 'field_data_field_os2web_base_field_edi_tags';
  $handler->display->display_options['relationships']['field_os2web_base_field_edi_tags_tid']['field'] = 'field_os2web_base_field_edi_tags_tid';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Has taxonomy term ID (with depth) */
  $handler->display->display_options['arguments']['term_node_tid_depth']['id'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['table'] = 'node';
  $handler->display->display_options['arguments']['term_node_tid_depth']['field'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['term_node_tid_depth']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['term_node_tid_depth']['depth'] = '0';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'term_node_tid_depth' => array(
      'type' => 'context',
      'context' => 'entity:taxonomy_term.tid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Has taxonomy term ID (with depth)',
    ),
  );

  /* Display: Page - kulturnaut activities administration */
  $handler = $view->new_display('page', 'Page - kulturnaut activities administration', 'page_activities_administration');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Page - kulturnaut activities administration';
  $handler->display->display_options['defaults']['use_ajax'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '25';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'created' => 'created',
    'changed' => 'changed',
    'status' => 'status',
    'publishcontent' => 'publishcontent',
  );
  $handler->display->display_options['style_options']['default'] = 'created';
  $handler->display->display_options['style_options']['info'] = array(
    'title' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'created' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'changed' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'status' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'publishcontent' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['date_format'] = 'short';
  $handler->display->display_options['fields']['created']['second_date_format'] = 'os2web_base_date_only';
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed']['id'] = 'changed';
  $handler->display->display_options['fields']['changed']['table'] = 'node';
  $handler->display->display_options['fields']['changed']['field'] = 'changed';
  $handler->display->display_options['fields']['changed']['date_format'] = 'short';
  $handler->display->display_options['fields']['changed']['second_date_format'] = 'os2web_base_date_only';
  /* Field: Content: Published */
  $handler->display->display_options['fields']['status']['id'] = 'status';
  $handler->display->display_options['fields']['status']['table'] = 'node';
  $handler->display->display_options['fields']['status']['field'] = 'status';
  $handler->display->display_options['fields']['status']['type'] = 'published-notpublished';
  $handler->display->display_options['fields']['status']['not'] = 0;
  /* Field: Content: Publish link */
  $handler->display->display_options['fields']['publishcontent']['id'] = 'publishcontent';
  $handler->display->display_options['fields']['publishcontent']['table'] = 'node';
  $handler->display->display_options['fields']['publishcontent']['field'] = 'publishcontent';
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  $handler->display->display_options['path'] = 'kulturnaut-list';

  /* Display: Content pane - Activities for venue */
  $handler = $view->new_display('panel_pane', 'Content pane - Activities for venue', 'pane_activities_for_venue');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Relaterede begivenheder for venue';
  $handler->display->display_options['defaults']['query'] = FALSE;
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['query']['options']['pure_distinct'] = TRUE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Indlæs flere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'search_result';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content: Venue (field_os2web_kulturnaut_venue) */
  $handler->display->display_options['relationships']['field_os2web_kulturnaut_venue_tid']['id'] = 'field_os2web_kulturnaut_venue_tid';
  $handler->display->display_options['relationships']['field_os2web_kulturnaut_venue_tid']['table'] = 'field_data_field_os2web_kulturnaut_venue';
  $handler->display->display_options['relationships']['field_os2web_kulturnaut_venue_tid']['field'] = 'field_os2web_kulturnaut_venue_tid';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Has taxonomy term ID (with depth) */
  $handler->display->display_options['arguments']['term_node_tid_depth']['id'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['table'] = 'node';
  $handler->display->display_options['arguments']['term_node_tid_depth']['field'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['term_node_tid_depth']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['term_node_tid_depth']['depth'] = '0';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filterkriterie: Indhold: Udgivet */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filterkriterie: Indhold: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filterkriterie: Indhold: Dato - slutdato (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'term_node_tid_depth' => array(
      'type' => 'context',
      'context' => 'entity:taxonomy_term.tid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Has taxonomy term ID (with depth)',
    ),
  );

  /* Display: Content pane - Activities for tema */
  $handler = $view->new_display('panel_pane', 'Content pane - Activities for tema', 'pane_activities_for_tema');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Relaterede begivenheder for tema';
  $handler->display->display_options['defaults']['query'] = FALSE;
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['query']['options']['pure_distinct'] = TRUE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Læs mere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'search_result';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Field: Tema (field_os2web_kulturnaut_tema) */
  $handler->display->display_options['relationships']['field_os2web_kulturnaut_tema_tid']['id'] = 'field_os2web_kulturnaut_tema_tid';
  $handler->display->display_options['relationships']['field_os2web_kulturnaut_tema_tid']['table'] = 'field_data_field_os2web_kulturnaut_tema';
  $handler->display->display_options['relationships']['field_os2web_kulturnaut_tema_tid']['field'] = 'field_os2web_kulturnaut_tema_tid';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Has taxonomy term ID (with depth) */
  $handler->display->display_options['arguments']['term_node_tid_depth']['id'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['table'] = 'node';
  $handler->display->display_options['arguments']['term_node_tid_depth']['field'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['term_node_tid_depth']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['term_node_tid_depth']['depth'] = '10';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filterkriterie: Indhold: Udgivet */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filterkriterie: Indhold: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filterkriterie: Indhold: Dato - slutdato (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'term_node_tid_depth' => array(
      'type' => 'context',
      'context' => 'entity:taxonomy_term.tid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Has taxonomy term ID (with depth)',
    ),
  );

  /* Display: Content pane - activities list (4 mini) */
  $handler = $view->new_display('panel_pane', 'Content pane - activities list (4 mini)', 'pane_activities_list_4_mini');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-6 col-md-3';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_teaser_mini';
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Data source (field_os2web_kulturnaut_source) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_source_value']['id'] = 'field_os2web_kulturnaut_source_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_source_value']['table'] = 'field_data_field_os2web_kulturnaut_source';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_source_value']['field'] = 'field_os2web_kulturnaut_source_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_source_value']['value'] = array(
    'feed' => 'feed',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';

  /* Display: Content pane - kultunaut events */
  $handler = $view->new_display('panel_pane', 'Content pane - kultunaut events', 'pane_kultunaut_events');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Content pane - kultunaut events';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Indlæs flere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'search_result';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Result summary */
  $handler->display->display_options['header']['result']['id'] = 'result';
  $handler->display->display_options['header']['result']['table'] = 'views';
  $handler->display->display_options['header']['result']['field'] = 'result';
  $handler->display->display_options['header']['result']['content'] = '@total resultater';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_kulturnaut_venue_tid' => array(
      'type' => 'context',
      'context' => 'entity:taxonomy_term.tid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Venue (field_os2web_kulturnaut_venue)',
    ),
  );

  /* Display: Content pane - activities list (single) */
  $handler = $view->new_display('panel_pane', 'Content pane - activities list (single)', 'panel_pane_activities_list_single');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-md-3';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['empty'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['required'] = TRUE;
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_front_1_single' => 'os2sub_front_1_single',
    'os2sub_calendar_right' => 0,
    'os2sub_focus' => 0,
    'os2sub_front_slideshow' => 0,
    'os2sub_front_load_more' => 0,
    'os2sub_front_4_mini' => 0,
  );

  /* Display: Content pane - Activities list (4) - empty */
  $handler = $view->new_display('panel_pane', 'Content pane - Activities list (4) - empty', 'panel_pane_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Activities list (4) - empty';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-6';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_calendar_right' => 'os2sub_calendar_right',
    'test' => 0,
  );
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;

  /* Display: Content pane - activities list (5+load more) - empty */
  $handler = $view->new_display('panel_pane', 'Content pane - activities list (5+load more) - empty', 'panel_pane_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Content pane - activities list (5+load more) - empty';
  $handler->display->display_options['defaults']['use_ajax'] = FALSE;
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Indlæs flere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-6 col-md-4';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Nodequeue: Queue */
  $handler->display->display_options['relationships']['nodequeue_rel']['id'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['nodequeue_rel']['field'] = 'nodequeue_rel';
  $handler->display->display_options['relationships']['nodequeue_rel']['limit'] = 1;
  $handler->display->display_options['relationships']['nodequeue_rel']['names'] = array(
    'os2sub_front_load_more' => 'os2sub_front_load_more',
    'os2sub_calendar_right' => 0,
    'os2sub_focus' => 0,
    'os2sub_front_slideshow' => 0,
  );
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
    'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['operator_id'] = 'field_os2web_kulturnaut_date_value2_op';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['label'] = 'Dato - end date (field_os2web_kulturnaut_date:value2)';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['operator'] = 'field_os2web_kulturnaut_date_value2_op';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['expose']['identifier'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'nid' => array(
      'type' => 'context',
      'context' => 'entity:node.nid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
  );

  /* Display: Content pane - activities list (single) - emty */
  $handler = $view->new_display('panel_pane', 'Content pane - activities list (single) - emty', 'panel_pane_3');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-md-3';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $translatables['os2web_kulturnaut_events_lists'] = array(
    t('Master'),
    t('Arrangementer fra KulturauT'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('<a href=[field_os2web_kulturnaut_homepage] title=[title]>[title]</a>'),
    t('[title]'),
    t('Nid'),
    t('Page'),
    t('more'),
    t('Block - contentpage'),
    t('Content pane - related activities'),
    t('Relaterede begivenheder'),
    t('Indlæs flere'),
    t('View panes'),
    t('Block - activities slideshow'),
    t('Block - Activities Slideshow'),
    t('queue'),
    t('- [field_os2web_kulturnaut_date] '),
    t('#[field_os2web_base_field_edi_tags]'),
    t('Læs mere'),
    t('+Tilføj til kalender'),
    t('Content pane - Activities list (4)'),
    t('Activities list (4)'),
    t('Content pane - activities list (5+load more)'),
    t('Dato - end date (field_os2web_kulturnaut_date:value2)'),
    t('Content pane - activities list (2+3)'),
    t('Attachment activities 3 (skip 2)'),
    t('[field_os2web_kulturnaut_date]  |'),
    t('Content pane - Activities for tag'),
    t('Relaterede begivenheder for tag'),
    t('term from field_os2web_base_field_edi_tags'),
    t('Alle'),
    t('Page - kulturnaut activities administration'),
    t('Antal elementer'),
    t('- Alle -'),
    t('Forskydning'),
    t('« første'),
    t('‹ forrige'),
    t('næste ›'),
    t('sidste »'),
    t('Title'),
    t('Post date'),
    t('Updated date'),
    t('Published'),
    t('Publish link'),
    t('Content pane - Activities for venue'),
    t('Relaterede begivenheder for venue'),
    t('term from field_os2web_kulturnaut_venue'),
    t('Content pane - Activities for tema'),
    t('Relaterede begivenheder for tema'),
    t('term from field_os2web_kulturnaut_tema'),
    t('Content pane - activities list (4 mini)'),
    t('Content pane - kultunaut events'),
    t('@total resultater'),
    t('Content pane - activities list (single)'),
    t('Content pane - Activities list (4) - empty'),
    t('Activities list (4) - empty'),
    t('Content pane - activities list (5+load more) - empty'),
    t('Content pane - activities list (single) - emty'),
  );
  $export['os2web_kulturnaut_events_lists'] = $view;

  $view = new view();
  $view->name = 'os2web_taxonomies_tax_editor_tag_list';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'Editor tags (stikord)';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Populære <span>tags</span>';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['group_by'] = TRUE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Taxonomy term: Content using Stikord */
  $handler->display->display_options['relationships']['reverse_field_os2web_base_field_edi_tags_node']['id'] = 'reverse_field_os2web_base_field_edi_tags_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_base_field_edi_tags_node']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_os2web_base_field_edi_tags_node']['field'] = 'reverse_field_os2web_base_field_edi_tags_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_base_field_edi_tags_node']['required'] = TRUE;
  $handler->display->display_options['relationships']['reverse_field_os2web_base_field_edi_tags_node']['label'] = 'Content using Stikord';
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['label'] = '';
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['name']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['name']['link_to_taxonomy'] = TRUE;
  /* Sort criterion: COUNT(DISTINCT Content: Title) */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['sorts']['title']['relationship'] = 'reverse_field_os2web_base_field_edi_tags_node';
  $handler->display->display_options['sorts']['title']['group_type'] = 'count_distinct';
  $handler->display->display_options['sorts']['title']['order'] = 'DESC';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'OR',
  );
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['id'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['relationship'] = 'reverse_field_os2web_base_field_edi_tags_node';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['group'] = 1;
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2']['default_date'] = 'now';
  /* Filter criterion: Content: Dato - end date (field_os2web_kulturnaut_date:value2) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2_1']['id'] = 'field_os2web_kulturnaut_date_value2_1';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2_1']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2_1']['field'] = 'field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2_1']['relationship'] = 'reverse_field_os2web_base_field_edi_tags_node';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2_1']['operator'] = 'empty';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value2_1']['group'] = 1;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $translatables['os2web_taxonomies_tax_editor_tag_list'] = array(
    t('Master'),
    t('Populære <span>tags</span>'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Content using Stikord'),
    t('Block'),
  );
  $export['os2web_taxonomies_tax_editor_tag_list'] = $view;

  return $export;
}
