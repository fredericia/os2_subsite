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
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_oplev_index';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['operator'] = 'OR';
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
    t('OS2Sub kulturnaut multisearch'),
    t('View panes'),
  );
  $export['os2sub_kulturnaut_multi_search'] = $view;

  return $export;
}
