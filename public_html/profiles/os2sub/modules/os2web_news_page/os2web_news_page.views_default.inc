<?php
/**
 * @file
 * os2web_news_page.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function os2web_news_page_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'os2web_news_lists';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'OS2web Nyheds Lister';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['links'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Primære billede */
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['id'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['table'] = 'field_data_field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['field'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['settings'] = array(
    'image_style' => 'svendborg_content_image',
    'image_link' => 'content',
  );
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_offset'] = '0';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Broken/missing handler */
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['id'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['ui_name'] = 'Indhold: Nyhedstype (all for alle)';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate_options']['vocabularies'] = array(
    'os2web_news_page_newstypes' => 'os2web_news_page_newstypes',
  );
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate']['fail'] = 'empty';
  /* Contextual filter: Broken/missing handler */
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['id'] = 'field_os2web_news_page_type_tid_1';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['ui_name'] = 'Indhold: Nyhedstype (exclude - none for ingen)';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['exception']['value'] = 'none';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate_options']['vocabularies'] = array(
    'os2web_news_page_newstypes' => 'os2web_news_page_newstypes',
  );
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate_options']['transform'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate']['fail'] = 'empty';
  /* Contextual filter: Indhold: Portalkategori (med dybde) */
  $handler->display->display_options['arguments']['term_node_tid_depth']['id'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['table'] = 'node';
  $handler->display->display_options['arguments']['term_node_tid_depth']['field'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['ui_name'] = 'Indhold: Portalkategori (med dybde)';
  $handler->display->display_options['arguments']['term_node_tid_depth']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['term_node_tid_depth']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate_options']['vocabularies'] = array(
    'os2web_base_tax_site_structure' => 'os2web_base_tax_site_structure',
  );
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate_options']['transform'] = TRUE;
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate']['fail'] = 'empty';
  $handler->display->display_options['arguments']['term_node_tid_depth']['depth'] = '10';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
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
    'os2web_base_news' => 'os2web_base_news',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Arkiveringsdato (field_os2web_news_page_archive) */
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['id'] = 'field_os2web_news_page_archive_value';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['table'] = 'field_data_field_os2web_news_page_archive';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['field'] = 'field_os2web_news_page_archive_value';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['group'] = 2;
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['default_date'] = 'now';
  /* Filter criterion: Content: Arkiveringsdato (field_os2web_news_page_archive) */
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['id'] = 'field_os2web_news_page_archive_value_1';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['table'] = 'field_data_field_os2web_news_page_archive';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['field'] = 'field_os2web_news_page_archive_value';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['operator'] = 'empty';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['group'] = 2;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');

  /* Display: Bootstrap Carousel */
  $handler = $view->new_display('panel_pane', 'Bootstrap Carousel', 'panel_pane_1');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Primære billede */
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['id'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['table'] = 'field_data_field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['field'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['settings'] = array(
    'image_style' => 'svendborg_content_image',
    'image_link' => 'content',
  );
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_offset'] = '0';
  $handler->display->display_options['pane_category']['name'] = 'Os2web';
  $handler->display->display_options['pane_category']['weight'] = '0';
  $handler->display->display_options['allow']['use_pager'] = 'use_pager';
  $handler->display->display_options['allow']['items_per_page'] = 'items_per_page';
  $handler->display->display_options['allow']['offset'] = 'offset';
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_news_page_type_tid' => array(
      'type' => 'user',
      'context' => 'entity:user.uid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Nyhedstype (field_os2web_news_page_type)',
    ),
    'field_os2web_news_page_type_tid_1' => array(
      'type' => 'user',
      'context' => 'entity:user.uid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Nyhedstype (exclude)',
    ),
    'term_node_tid_depth' => array(
      'type' => 'user',
      'context' => 'entity:user.uid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Portalkategori (med dybde)',
    ),
  );

  /* Display: Content Pane */
  $handler = $view->new_display('panel_pane', 'Content Pane', 'panel_pane_2');
  $handler->display->display_options['display_description'] = 'Oversigt over nyheder filter v. Kategori og type';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'clearfix';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Primære billede */
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['id'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['table'] = 'field_data_field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['field'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['empty_zero'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['settings'] = array(
    'image_style' => 'termlogo',
    'image_link' => 'content',
  );
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_offset'] = '0';
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'short';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['alter']['max_length'] = '200';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['alter']['html'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['type'] = 'text_plain';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'trim_length' => '100',
  );
  /* Field: Content: Indhold */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['max_length'] = '200';
  $handler->display->display_options['fields']['body']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['html'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '200',
  );
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Broken/missing handler */
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['id'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['ui_name'] = 'Indhold: Nyhedstype (all for alle)';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate_options']['vocabularies'] = array(
    'os2web_news_page_newstypes' => 'os2web_news_page_newstypes',
  );
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate']['fail'] = 'empty';
  /* Contextual filter: Broken/missing handler */
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['id'] = 'field_os2web_news_page_type_tid_1';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['ui_name'] = 'Indhold: Nyhedstype (exclude - none for ingen)';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['exception']['value'] = 'none';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate_options']['vocabularies'] = array(
    'os2web_news_page_newstypes' => 'os2web_news_page_newstypes',
  );
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate_options']['transform'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid_1']['validate']['fail'] = 'empty';
  /* Contextual filter: Indhold: Portalkategori (med dybde) */
  $handler->display->display_options['arguments']['term_node_tid_depth']['id'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['table'] = 'node';
  $handler->display->display_options['arguments']['term_node_tid_depth']['field'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['ui_name'] = 'Indhold: Portalkategori (med dybde)';
  $handler->display->display_options['arguments']['term_node_tid_depth']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['term_node_tid_depth']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate_options']['vocabularies'] = array(
    'os2web_base_tax_site_structure' => 'os2web_base_tax_site_structure',
  );
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate_options']['transform'] = TRUE;
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate']['fail'] = 'empty';
  $handler->display->display_options['arguments']['term_node_tid_depth']['depth'] = '10';
  $handler->display->display_options['pane_category']['name'] = 'Os2web';
  $handler->display->display_options['pane_category']['weight'] = '0';
  $handler->display->display_options['allow']['use_pager'] = 'use_pager';
  $handler->display->display_options['allow']['items_per_page'] = 'items_per_page';
  $handler->display->display_options['allow']['offset'] = 'offset';
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 'title_override';
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_news_page_type_tid' => array(
      'type' => 'user',
      'context' => 'entity:user.uid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Nyhedstype (field_os2web_news_page_type)',
    ),
    'field_os2web_news_page_type_tid_1' => array(
      'type' => 'user',
      'context' => 'entity:user.uid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Nyhedstype (exclude)',
    ),
    'term_node_tid_depth' => array(
      'type' => 'user',
      'context' => 'entity:user.uid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Portalkategori (med dybde)',
    ),
  );
  $translatables['os2web_news_lists'] = array(
    t('Master'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Alle'),
    t('Block'),
    t('more'),
    t('Bootstrap Carousel'),
    t('Os2web'),
    t('Content Pane'),
    t('Oversigt over nyheder filter v. Kategori og type'),
  );
  $export['os2web_news_lists'] = $view;

  $view = new view();
  $view->name = 'os2web_news_page';
  $view->description = 'View containing all news displays for news page';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'OS2web News Page';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['css_class'] = 'quicktab-2';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '3';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'tid-[tid] tid-[tid_1] gradient';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Primære billede */
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['id'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['table'] = 'field_data_field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['field'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['type'] = 'file_rendered';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['settings'] = array(
    'file_view_mode' => 'default',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'trim_length' => '100',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  /* Sort criterion: Content: Sticky */
  $handler->display->display_options['sorts']['sticky']['id'] = 'sticky';
  $handler->display->display_options['sorts']['sticky']['table'] = 'node';
  $handler->display->display_options['sorts']['sticky']['field'] = 'sticky';
  $handler->display->display_options['sorts']['sticky']['order'] = 'DESC';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Overordnet placering (field_os2web_base_field_struct) */
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['id'] = 'field_os2web_base_field_struct_tid';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['table'] = 'field_data_field_os2web_base_field_struct';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['field'] = 'field_os2web_base_field_struct_tid';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['validate_options']['vocabularies'] = array(
    'os2web_base_tax_site_structure' => 'os2web_base_tax_site_structure',
    'os2web_taxonomies_tax_portal_cat' => 'os2web_taxonomies_tax_portal_cat',
  );
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['validate_options']['transform'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_base_field_struct_tid']['validate']['fail'] = 'ignore';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
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
    'os2web_base_news' => 'os2web_base_news',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Indhold: Arkiveringsdato større end */
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['id'] = 'field_os2web_news_page_archive_value';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['table'] = 'field_data_field_os2web_news_page_archive';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['field'] = 'field_os2web_news_page_archive_value';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['ui_name'] = 'Indhold: Arkiveringsdato større end';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['group'] = 2;
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['expose']['operator_id'] = 'field_os2web_news_page_archive_value_op';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['expose']['label'] = 'Arkiveringsdato (field_os2web_news_page_archive)';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['expose']['operator'] = 'field_os2web_news_page_archive_value_op';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['expose']['identifier'] = 'field_os2web_news_page_archive_value';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    6 => 0,
    4 => 0,
    7 => 0,
    3 => 0,
    5 => 0,
  );
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value']['default_date'] = 'now';
  /* Filter criterion: Indhold: Arkiveringsdato er tom */
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['id'] = 'field_os2web_news_page_archive_value_1';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['table'] = 'field_data_field_os2web_news_page_archive';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['field'] = 'field_os2web_news_page_archive_value';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['ui_name'] = 'Indhold: Arkiveringsdato er tom';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['operator'] = 'empty';
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['group'] = 2;
  $handler->display->display_options['filters']['field_os2web_news_page_archive_value_1']['form_type'] = 'date_text';

  /* Display: list 1 top */
  $handler = $view->new_display('panel_pane', 'list 1 top', 'panel_pane_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'list-1-top news-page-list';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'tid-[tid] tid-[tid_1]';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Primære billede */
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['id'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['table'] = 'field_data_field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['field'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['type'] = 'file_rendered';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['settings'] = array(
    'file_view_mode' => 'teaser',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'trim_length' => '100',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_base_field_struct_tid' => array(
      'type' => 'user',
      'context' => 'entity:user.picture',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Portalkategori (field_os2web_base_field_struct)',
    ),
  );

  /* Display: list 2 left */
  $handler = $view->new_display('panel_pane', 'list 2 left', 'panel_pane_2');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'list-2-left news-page-list';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '2';
  $handler->display->display_options['pager']['options']['offset'] = '1';
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_base_field_struct_tid' => array(
      'type' => 'user',
      'context' => 'entity:user.picture',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Portalkategori (field_os2web_base_field_struct)',
    ),
  );

  /* Display: list 3 right */
  $handler = $view->new_display('panel_pane', 'list 3 right', 'panel_pane_3');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'list-3-right news-page-list';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'tid-[tid] tid-[tid_1] gradient';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_base_field_struct_tid' => array(
      'type' => 'user',
      'context' => 'entity:user.picture',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Portalkategori (field_os2web_base_field_struct)',
    ),
  );

  /* Display: list 8 bottom */
  $handler = $view->new_display('panel_pane', 'list 8 bottom', 'panel_pane_4');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'list-8-bottom news-page-list';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '8';
  $handler->display->display_options['pager']['options']['offset'] = '6';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'tid-[tid] tid-[tid_1]';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Primære billede */
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['id'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['table'] = 'field_data_field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['field'] = 'field_os2web_base_field_lead_img';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => 'content',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_lead_img']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'trim_length' => '100',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_base_field_struct_tid' => array(
      'type' => 'user',
      'context' => 'entity:user.picture',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Portalkategori (field_os2web_base_field_struct)',
    ),
  );

  /* Display: most read */
  $handler = $view->new_display('panel_pane', 'most read', 'panel_pane_5');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Mest læste nyheder';
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'most-read';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '7';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed']['id'] = 'changed';
  $handler->display->display_options['fields']['changed']['table'] = 'node';
  $handler->display->display_options['fields']['changed']['field'] = 'changed';
  $handler->display->display_options['fields']['changed']['label'] = '';
  $handler->display->display_options['fields']['changed']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed']['custom_date_format'] = 'd.';
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed_1']['id'] = 'changed_1';
  $handler->display->display_options['fields']['changed_1']['table'] = 'node';
  $handler->display->display_options['fields']['changed_1']['field'] = 'changed';
  $handler->display->display_options['fields']['changed_1']['label'] = '';
  $handler->display->display_options['fields']['changed_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed_1']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed_1']['custom_date_format'] = 'M.';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'trim_length' => '100',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  $handler->display->display_options['argument_input'] = array(
    'field_os2web_base_field_struct_tid' => array(
      'type' => 'user',
      'context' => 'entity:user.picture',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Portalkategori (field_os2web_base_field_struct)',
    ),
  );

  /* Display: Høringer */
  $handler = $view->new_display('block', 'Høringer', 'block_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'quicktab-1';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed']['id'] = 'changed';
  $handler->display->display_options['fields']['changed']['table'] = 'node';
  $handler->display->display_options['fields']['changed']['field'] = 'changed';
  $handler->display->display_options['fields']['changed']['label'] = '';
  $handler->display->display_options['fields']['changed']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed']['custom_date_format'] = 'd.';
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed_1']['id'] = 'changed_1';
  $handler->display->display_options['fields']['changed_1']['table'] = 'node';
  $handler->display->display_options['fields']['changed_1']['field'] = 'changed';
  $handler->display->display_options['fields']['changed_1']['label'] = '';
  $handler->display->display_options['fields']['changed_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['changed_1']['alter']['text'] = '<div class="date-container"><span class="date">[changed]</span><span class="month">[changed_1]</span></div>';
  $handler->display->display_options['fields']['changed_1']['element_type'] = '0';
  $handler->display->display_options['fields']['changed_1']['element_label_type'] = '0';
  $handler->display->display_options['fields']['changed_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed_1']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed_1']['custom_date_format'] = 'M.';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
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
    'os2web_base_news' => 'os2web_base_news',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Broken/missing handler */
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['id'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['value'] = array(
    0 => '4054',
  );

  /* Display: Mødeaktiviteter */
  $handler = $view->new_display('block', 'Mødeaktiviteter', 'block_2');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'quicktab-2';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed']['id'] = 'changed';
  $handler->display->display_options['fields']['changed']['table'] = 'node';
  $handler->display->display_options['fields']['changed']['field'] = 'changed';
  $handler->display->display_options['fields']['changed']['label'] = '';
  $handler->display->display_options['fields']['changed']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed']['custom_date_format'] = 'd.';
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed_1']['id'] = 'changed_1';
  $handler->display->display_options['fields']['changed_1']['table'] = 'node';
  $handler->display->display_options['fields']['changed_1']['field'] = 'changed';
  $handler->display->display_options['fields']['changed_1']['label'] = '';
  $handler->display->display_options['fields']['changed_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['changed_1']['alter']['text'] = '<div class="date-container"><span class="date">[changed]</span><span class="month">[changed_1]</span></div>';
  $handler->display->display_options['fields']['changed_1']['element_type'] = '0';
  $handler->display->display_options['fields']['changed_1']['element_label_type'] = '0';
  $handler->display->display_options['fields']['changed_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed_1']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed_1']['custom_date_format'] = 'M.';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
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
    'os2web_base_news' => 'os2web_base_news',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Broken/missing handler */
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['id'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['value'] = array(
    0 => '4055',
  );

  /* Display: Udbud */
  $handler = $view->new_display('block', 'Udbud', 'block_3');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'quicktab-3';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed']['id'] = 'changed';
  $handler->display->display_options['fields']['changed']['table'] = 'node';
  $handler->display->display_options['fields']['changed']['field'] = 'changed';
  $handler->display->display_options['fields']['changed']['label'] = '';
  $handler->display->display_options['fields']['changed']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed']['custom_date_format'] = 'd.';
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed_1']['id'] = 'changed_1';
  $handler->display->display_options['fields']['changed_1']['table'] = 'node';
  $handler->display->display_options['fields']['changed_1']['field'] = 'changed';
  $handler->display->display_options['fields']['changed_1']['label'] = '';
  $handler->display->display_options['fields']['changed_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['changed_1']['alter']['text'] = '<div class="date-container"><span class="date">[changed]</span><span class="month">[changed_1]</span></div>';
  $handler->display->display_options['fields']['changed_1']['element_type'] = '0';
  $handler->display->display_options['fields']['changed_1']['element_label_type'] = '0';
  $handler->display->display_options['fields']['changed_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed_1']['date_format'] = 'custom';
  $handler->display->display_options['fields']['changed_1']['custom_date_format'] = 'M.';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Resume (maks 2 linier!) */
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['id'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['table'] = 'field_data_field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['field'] = 'field_os2web_base_field_summary';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_summary']['settings'] = array(
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
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
    'os2web_base_news' => 'os2web_base_news',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Broken/missing handler */
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['id'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['filters']['field_os2web_news_page_type_tid']['value'] = array(
    0 => '4056',
  );
  $translatables['os2web_news_page'] = array(
    t('Master'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Alle'),
    t('Arkiveringsdato (field_os2web_news_page_archive)'),
    t('list 1 top'),
    t('more'),
    t('View panes'),
    t('list 2 left'),
    t('list 3 right'),
    t('list 8 bottom'),
    t('most read'),
    t('Mest læste nyheder'),
    t('Høringer'),
    t('<div class="date-container"><span class="date">[changed]</span><span class="month">[changed_1]</span></div>'),
    t('Mødeaktiviteter'),
    t('Udbud'),
  );
  $export['os2web_news_page'] = $view;

  $view = new view();
  $view->name = 'os2web_news_page_news_feed';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'OS2web News Page News Feed';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Nyheder fra Svendborg.dk';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '300';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '300';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Content: Author */
  $handler->display->display_options['relationships']['uid']['id'] = 'uid';
  $handler->display->display_options['relationships']['uid']['table'] = 'node';
  $handler->display->display_options['relationships']['uid']['field'] = 'uid';
  $handler->display->display_options['relationships']['uid']['required'] = TRUE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Indhold */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['alter']['nl2br'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['path']['absolute'] = TRUE;
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['date_format'] = 'custom';
  $handler->display->display_options['fields']['created']['custom_date_format'] = 'D, d M Y g:i:s O';
  /* Field: User: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'users';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['relationship'] = 'uid';
  $handler->display->display_options['fields']['name']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['name']['alter']['text'] = 'Svendborg Kommune';
  $handler->display->display_options['fields']['name']['link_to_user'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Has taxonomy term ID (with depth) */
  $handler->display->display_options['arguments']['term_node_tid_depth']['id'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['table'] = 'node';
  $handler->display->display_options['arguments']['term_node_tid_depth']['field'] = 'term_node_tid_depth';
  $handler->display->display_options['arguments']['term_node_tid_depth']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['term_node_tid_depth']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['term_node_tid_depth']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['term_node_tid_depth']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['term_node_tid_depth']['validate_options']['vocabularies'] = array(
    'os2web_base_tax_site_structure' => 'os2web_base_tax_site_structure',
  );
  $handler->display->display_options['arguments']['term_node_tid_depth']['depth'] = '10';
  /* Contextual filter: Broken/missing handler */
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['id'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['table'] = 'field_data_field_os2web_news_page_type';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['field'] = 'field_os2web_news_page_type_tid';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate_options']['vocabularies'] = array(
    'os2web_news_page_newstypes' => 'os2web_news_page_newstypes',
  );
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate_options']['transform'] = TRUE;
  $handler->display->display_options['arguments']['field_os2web_news_page_type_tid']['validate']['fail'] = 'empty';
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
    'os2web_base_news' => 'os2web_base_news',
  );

  /* Display: Feed */
  $handler = $view->new_display('feed', 'Feed', 'feed_1');
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'rss';
  $handler->display->display_options['row_plugin'] = 'rss_fields';
  $handler->display->display_options['row_options']['title_field'] = 'title';
  $handler->display->display_options['row_options']['link_field'] = 'path';
  $handler->display->display_options['row_options']['description_field'] = 'body';
  $handler->display->display_options['row_options']['creator_field'] = 'name';
  $handler->display->display_options['row_options']['date_field'] = 'created';
  $handler->display->display_options['row_options']['guid_field_options'] = array(
    'guid_field' => 'nid',
    'guid_field_is_permalink' => 0,
  );
  $handler->display->display_options['path'] = 'nyheder/%/%/rss.xml';
  $handler->display->display_options['sitename_title'] = 0;
  $translatables['os2web_news_page_news_feed'] = array(
    t('Master'),
    t('Nyheder fra Svendborg.dk'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Antal elementer'),
    t('- Alle -'),
    t('Forskydning'),
    t('« første'),
    t('‹ forrige'),
    t('næste ›'),
    t('sidste »'),
    t('author'),
    t('Post date'),
    t('Name'),
    t('Svendborg Kommune'),
    t('Nid'),
    t('Alle'),
    t('Feed'),
    t('more'),
  );
  $export['os2web_news_page_news_feed'] = $view;

  return $export;
}
