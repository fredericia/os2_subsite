<?php
/**
 * @file
 * oplev_calendar.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function oplev_calendar_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'kalender';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Kalender';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Kalender';
  $handler->display->display_options['css_class'] = 'row';
  $handler->display->display_options['use_ajax'] = TRUE;
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
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Indlæs flere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '24';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-6 col-md-4 col-lg-3';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'os2sub_spotbox_single';
  /* Felt: Indhold: Titel */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sorteringskriterie: Indhold: Dato -  startdato (field_os2web_kulturnaut_date) */
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['sorts']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
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

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'kalender';
  $translatables['kalender'] = array(
    t('Master'),
    t('Kalender'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Indlæs flere'),
    t('Page'),
  );
  $export['kalender'] = $view;

  return $export;
}
