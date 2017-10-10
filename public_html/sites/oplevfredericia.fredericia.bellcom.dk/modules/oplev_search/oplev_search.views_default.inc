<?php
/**
 * @file
 * oplev_search.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function oplev_search_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'os2sub_kulturnaut_multi_search';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_oplev_index';
  $view->human_name = 'OS2Sub kulturnaut search';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Soøg';
  $handler->display->display_options['exposed_form']['options']['expose_sort_order'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Læs mere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Result summary */
  $handler->display->display_options['header']['result']['id'] = 'result';
  $handler->display->display_options['header']['result']['table'] = 'views';
  $handler->display->display_options['header']['result']['field'] = 'result';
  $handler->display->display_options['header']['result']['content'] = '<div class="search-summary">@total resultater i alt</div>';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'Din søgning gav ingen resultater. Prøv gerne igen med et andet søgeord';
  $handler->display->display_options['empty']['area']['format'] = 'full_html';
  /* Field: Indexed Multiple types: Node */
  $handler->display->display_options['fields']['node']['id'] = 'node';
  $handler->display->display_options['fields']['node']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['fields']['node']['field'] = 'node';
  $handler->display->display_options['fields']['node']['label'] = '';
  $handler->display->display_options['fields']['node']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['node']['link_to_entity'] = 1;
  $handler->display->display_options['fields']['node']['display'] = 'view';
  $handler->display->display_options['fields']['node']['view_mode'] = 'search_result';
  $handler->display->display_options['fields']['node']['bypass_access'] = 0;
  /* Field: Indexed Multiple types: Taxonomy term */
  $handler->display->display_options['fields']['taxonomy_term']['id'] = 'taxonomy_term';
  $handler->display->display_options['fields']['taxonomy_term']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['fields']['taxonomy_term']['field'] = 'taxonomy_term';
  $handler->display->display_options['fields']['taxonomy_term']['label'] = '';
  $handler->display->display_options['fields']['taxonomy_term']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['taxonomy_term']['link_to_entity'] = 1;
  $handler->display->display_options['fields']['taxonomy_term']['display'] = 'view';
  $handler->display->display_options['fields']['taxonomy_term']['view_mode'] = 'os2sub_term_search_result';
  $handler->display->display_options['fields']['taxonomy_term']['bypass_access'] = 0;
  /* Sort criterion: Search: Relevance */
  $handler->display->display_options['sorts']['search_api_relevance']['id'] = 'search_api_relevance';
  $handler->display->display_options['sorts']['search_api_relevance']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['sorts']['search_api_relevance']['field'] = 'search_api_relevance';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    3 => 'OR',
    2 => 'OR',
  );
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['operator'] = 'OR';
  $handler->display->display_options['filters']['search_api_views_fulltext']['group'] = 1;
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    6 => 0,
    4 => 0,
    5 => 0,
    3 => 0,
  );
  /* Filter criterion: Node » Dato: End date (indexed) */
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['id'] = 'node_field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['field'] = 'node_field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['value'] = 'now';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['group'] = 2;
  /* Filter criterion: Node » Dato: End date (indexed) */
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['id'] = 'node_field_os2web_kulturnaut_date_value2_1';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['field'] = 'node_field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['operator'] = 'empty';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['group'] = 2;
  /* Filter criterion: Node: Status (indexed) */
  $handler->display->display_options['filters']['node_status']['id'] = 'node_status';
  $handler->display->display_options['filters']['node_status']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['filters']['node_status']['field'] = 'node_status';
  $handler->display->display_options['filters']['node_status']['value'] = array(
    1 => '1',
  );
  $handler->display->display_options['filters']['node_status']['group'] = 3;
  /* Filter criterion: Node: Status (indexed) */
  $handler->display->display_options['filters']['node_status_1']['id'] = 'node_status_1';
  $handler->display->display_options['filters']['node_status_1']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['filters']['node_status_1']['field'] = 'node_status';
  $handler->display->display_options['filters']['node_status_1']['operator'] = 'empty';
  $handler->display->display_options['filters']['node_status_1']['value'] = array();
  $handler->display->display_options['filters']['node_status_1']['group'] = 3;

  /* Display: OS2Sub kulturnaut multisearch */
  $handler = $view->new_display('panel_pane', 'OS2Sub kulturnaut multisearch', 'pane_activities_multi_search');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['text'] = 'Læs mere';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['exposed_block'] = TRUE;
  $translatables['os2sub_kulturnaut_multi_search'] = array(
    t('Master'),
    t('more'),
    t('Soøg'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Læs mere'),
    t('<div class="search-summary">@total resultater i alt</div>'),
    t('Din søgning gav ingen resultater. Prøv gerne igen med et andet søgeord'),
    t('OS2Sub kulturnaut multisearch'),
    t('View panes'),
  );
  $export['os2sub_kulturnaut_multi_search'] = $view;

  return $export;
}
