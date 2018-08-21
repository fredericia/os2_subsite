<?php
/**
 * @file
 * fic_search.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function fic_search_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'os2sub_kulturnaut_multi_search';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_fic_node_and_term_index';
  $view->human_name = 'FIC search';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['search_api_bypass_access'] = 0;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Search';
  $handler->display->display_options['pager']['type'] = 'infinite_scroll';
  $handler->display->display_options['pager']['options']['manual_load'] = 1;
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Result summary */
  $handler->display->display_options['header']['result']['id'] = 'result';
  $handler->display->display_options['header']['result']['table'] = 'views';
  $handler->display->display_options['header']['result']['field'] = 'result';
  $handler->display->display_options['header']['result']['content'] = '@start - @end results of @total';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'No results';
  $handler->display->display_options['empty']['area']['format'] = 'full_html';
  /* Field: Indexed Multiple types: Node */
  $handler->display->display_options['fields']['node']['id'] = 'node';
  $handler->display->display_options['fields']['node']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['fields']['node']['field'] = 'node';
  $handler->display->display_options['fields']['node']['label'] = '';
  $handler->display->display_options['fields']['node']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['node']['link_to_entity'] = 1;
  $handler->display->display_options['fields']['node']['display'] = 'view';
  $handler->display->display_options['fields']['node']['view_mode'] = 'search_result';
  $handler->display->display_options['fields']['node']['bypass_access'] = 0;
  /* Field: Indexed Multiple types: Taxonomy term */
  $handler->display->display_options['fields']['taxonomy_term']['id'] = 'taxonomy_term';
  $handler->display->display_options['fields']['taxonomy_term']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['fields']['taxonomy_term']['field'] = 'taxonomy_term';
  $handler->display->display_options['fields']['taxonomy_term']['label'] = '';
  $handler->display->display_options['fields']['taxonomy_term']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['taxonomy_term']['link_to_entity'] = 1;
  $handler->display->display_options['fields']['taxonomy_term']['display'] = 'view';
  $handler->display->display_options['fields']['taxonomy_term']['view_mode'] = 'search_result';
  $handler->display->display_options['fields']['taxonomy_term']['bypass_access'] = 0;
  /* Sort criterion: Search: Relevance */
  $handler->display->display_options['sorts']['search_api_relevance']['id'] = 'search_api_relevance';
  $handler->display->display_options['sorts']['search_api_relevance']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['sorts']['search_api_relevance']['field'] = 'search_api_relevance';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'OR',
    3 => 'OR',
    2 => 'OR',
  );
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_fic_node_and_term_index';
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
  $handler->display->display_options['filters']['search_api_views_fulltext']['group_info']['label'] = 'Fulltext search';
  $handler->display->display_options['filters']['search_api_views_fulltext']['group_info']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['group_info']['group_items'] = array(
    1 => array(
      'title' => '',
      'operator' => 'AND',
      'value' => '',
    ),
    2 => array(
      'title' => '',
      'operator' => 'AND',
      'value' => '',
    ),
    3 => array(
      'title' => '',
      'operator' => 'AND',
      'value' => '',
    ),
  );
  /* Filter criterion: Node » Dato: End date (indexed) */
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['id'] = 'node_field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['field'] = 'node_field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['operator'] = '>=';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['value'] = 'now';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2']['group'] = 2;
  /* Filter criterion: Node » Dato: End date (indexed) */
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['id'] = 'node_field_os2web_kulturnaut_date_value2_1';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['field'] = 'node_field_os2web_kulturnaut_date_value2';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['operator'] = 'empty';
  $handler->display->display_options['filters']['node_field_os2web_kulturnaut_date_value2_1']['group'] = 2;
  /* Filter criterion: Node: Status (indexed) */
  $handler->display->display_options['filters']['node_status']['id'] = 'node_status';
  $handler->display->display_options['filters']['node_status']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['filters']['node_status']['field'] = 'node_status';
  $handler->display->display_options['filters']['node_status']['value'] = array(
    1 => '1',
  );
  $handler->display->display_options['filters']['node_status']['group'] = 3;
  /* Filter criterion: Node: Status (indexed) */
  $handler->display->display_options['filters']['node_status_1']['id'] = 'node_status_1';
  $handler->display->display_options['filters']['node_status_1']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['filters']['node_status_1']['field'] = 'node_status';
  $handler->display->display_options['filters']['node_status_1']['operator'] = 'empty';
  $handler->display->display_options['filters']['node_status_1']['value'] = array();
  $handler->display->display_options['filters']['node_status_1']['group'] = 3;
  /* Filter criterion: Indexed Multiple types: Item language */
  $handler->display->display_options['filters']['search_api_language']['id'] = 'search_api_language';
  $handler->display->display_options['filters']['search_api_language']['table'] = 'search_api_index_fic_node_and_term_index';
  $handler->display->display_options['filters']['search_api_language']['field'] = 'search_api_language';
  $handler->display->display_options['filters']['search_api_language']['value'] = array(
    'current' => 'current',
  );

  /* Display: FIC search */
  $handler = $view->new_display('panel_pane', 'FIC search', 'pane_activities_multi_search');
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['allow']['use_pager'] = 0;
  $handler->display->display_options['allow']['items_per_page'] = 0;
  $handler->display->display_options['allow']['offset'] = 0;
  $handler->display->display_options['allow']['link_to_view'] = 0;
  $handler->display->display_options['allow']['more_link'] = 0;
  $handler->display->display_options['allow']['path_override'] = 0;
  $handler->display->display_options['allow']['title_override'] = 0;
  $handler->display->display_options['allow']['exposed_form'] = 0;
  $handler->display->display_options['allow']['fields_override'] = 0;
  $translatables['os2sub_kulturnaut_multi_search'] = array(
    t('Master'),
    t('more'),
    t('Search'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Show More'),
    t('@start - @end results of @total'),
    t('No results'),
    t('Fulltext search'),
    t('FIC search'),
    t('View panes'),
  );
  $export['os2sub_kulturnaut_multi_search'] = $view;

  return $export;
}
