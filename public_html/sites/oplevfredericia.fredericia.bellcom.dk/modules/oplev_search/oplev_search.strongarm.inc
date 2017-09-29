<?php
/**
 * @file
 * oplev_search.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function oplev_search_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'facetapi:block_cache:search_api@oplev_index';
  $strongarm->value = -1;
  $export['facetapi:block_cache:search_api@oplev_index'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'search_api_facets_search_ids';
  $strongarm->value = array(
    'oplev_index' => array(
      'search_api_views:os2sub_kulturnaut_multi_search:pane_activities_multi_search' => 'search_api_views:os2sub_kulturnaut_multi_search:pane_activities_multi_search',
    ),
  );
  $export['search_api_facets_search_ids'] = $strongarm;

  return $export;
}
