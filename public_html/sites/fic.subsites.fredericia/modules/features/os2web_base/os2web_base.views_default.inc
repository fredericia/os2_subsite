<?php
/**
 * @file
 * os2web_base.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function os2web_base_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'fic_embed_files';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'file_managed';
  $view->human_name = 'FIC Embed Files';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'FIC Embed Files';
  $handler->display->display_options['css_class'] = 'row';
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
  $handler->display->display_options['pager']['options']['items_per_page'] = '7';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-xs-12 col-sm-4 col-lg-3';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  /* Felt: Fil: Navn */
  $handler->display->display_options['fields']['filename']['id'] = 'filename';
  $handler->display->display_options['fields']['filename']['table'] = 'file_managed';
  $handler->display->display_options['fields']['filename']['field'] = 'filename';
  $handler->display->display_options['fields']['filename']['label'] = '';
  $handler->display->display_options['fields']['filename']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['filename']['alter']['ellipsis'] = FALSE;
  /* Sorteringskriterie: Global: Tilfældig */
  $handler->display->display_options['sorts']['random']['id'] = 'random';
  $handler->display->display_options['sorts']['random']['table'] = 'views';
  $handler->display->display_options['sorts']['random']['field'] = 'random';
  /* Kontekstuelt filter: Fil: Fil-ID */
  $handler->display->display_options['arguments']['fid']['id'] = 'fid';
  $handler->display->display_options['arguments']['fid']['table'] = 'file_managed';
  $handler->display->display_options['arguments']['fid']['field'] = 'fid';
  $handler->display->display_options['arguments']['fid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['fid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['fid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['fid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['fid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['fid']['break_phrase'] = TRUE;
  /* Filterkriterie: Fil: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'file_managed';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'instagram' => 'instagram',
  );

  /* Display: Instagram */
  $handler = $view->new_display('block', 'Instagram', 'instagram');
  $translatables['fic_embed_files'] = array(
    t('Master'),
    t('FIC Embed Files'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Alle'),
    t('Instagram'),
  );
  $export['fic_embed_files'] = $view;

  $view = new view();
  $view->name = 'fic_embed_nodes';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'FIC Embed Nodes';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'FIC Embed Nodes';
  $handler->display->display_options['css_class'] = 'row row--equal-height-columns';
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
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-3';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_teaser_mini';
  $handler->display->display_options['row_options']['links'] = FALSE;
  /* Felt: Indhold: Titel */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sorteringskriterie: Indhold: Oprettelsesdato */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Kontekstuelt filter: Indhold: Sektion (field_sektion) */
  $handler->display->display_options['arguments']['field_sektion_tid']['id'] = 'field_sektion_tid';
  $handler->display->display_options['arguments']['field_sektion_tid']['table'] = 'field_data_field_sektion';
  $handler->display->display_options['arguments']['field_sektion_tid']['field'] = 'field_sektion_tid';
  $handler->display->display_options['arguments']['field_sektion_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_sektion_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_sektion_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_sektion_tid']['summary_options']['items_per_page'] = '25';
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
    'os2web_base_news' => 'os2web_base_news',
  );

  /* Display: News */
  $handler = $view->new_display('block', 'News', 'news');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'row';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_teaser_mini';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;

  /* Display: News - forfremmet */
  $handler = $view->new_display('block', 'News - forfremmet', 'news_promoted');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'row';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_teaser_mini';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
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
    'os2web_base_news' => 'os2web_base_news',
  );
  /* Filterkriterie: Indhold: Forfremmet til forside */
  $handler->display->display_options['filters']['promote']['id'] = 'promote';
  $handler->display->display_options['filters']['promote']['table'] = 'node';
  $handler->display->display_options['filters']['promote']['field'] = 'promote';
  $handler->display->display_options['filters']['promote']['value'] = '1';

  /* Display: Events */
  $handler = $view->new_display('block', 'Events', 'events');
  $handler->display->display_options['defaults']['use_more'] = FALSE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_always'] = TRUE;
  $handler->display->display_options['defaults']['use_more_text'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'se flere';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sorteringskriterie: Indhold: Dato -  startdato (field_os2web_kulturnaut_date) */
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
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
  /* Filterkriterie: Indhold: Dato -  startdato (field_os2web_kulturnaut_date) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['form_type'] = 'date_popup';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['default_date'] = 'now';

  /* Display: Events - forfremmet */
  $handler = $view->new_display('block', 'Events - forfremmet', 'events_promoted');
  $handler->display->display_options['defaults']['use_more'] = FALSE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_always'] = TRUE;
  $handler->display->display_options['defaults']['use_more_text'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'se flere';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sorteringskriterie: Indhold: Dato -  startdato (field_os2web_kulturnaut_date) */
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
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
  /* Filterkriterie: Indhold: Dato -  startdato (field_os2web_kulturnaut_date) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['form_type'] = 'date_popup';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['default_date'] = 'now';
  /* Filterkriterie: Indhold: Forfremmet til forside */
  $handler->display->display_options['filters']['promote']['id'] = 'promote';
  $handler->display->display_options['filters']['promote']['table'] = 'node';
  $handler->display->display_options['filters']['promote']['field'] = 'promote';
  $handler->display->display_options['filters']['promote']['value'] = '1';
  $translatables['fic_embed_nodes'] = array(
    t('Master'),
    t('FIC Embed Nodes'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Alle'),
    t('News'),
    t('News - forfremmet'),
    t('Events'),
    t('se flere'),
    t('Events - forfremmet'),
  );
  $export['fic_embed_nodes'] = $view;

  return $export;
}
