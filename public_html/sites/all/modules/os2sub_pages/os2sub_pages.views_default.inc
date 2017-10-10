<?php
/**
 * @file
 * os2sub_pages.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function os2sub_pages_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'add_to_calendar';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Add to calendar';
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
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Beskrivelse */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['id'] = 'field_os2web_kulturnaut_descrip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['table'] = 'field_data_field_os2web_kulturnaut_descrip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['field'] = 'field_os2web_kulturnaut_descrip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['alter']['strip_tags'] = TRUE;
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['id'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['text'] = '[field_os2web_kulturnaut_date-value]';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['settings'] = array(
    'format_type' => 'outlook',
    'custom_date_format' => '',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Slutdato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['id'] = 'field_os2web_kulturnaut_date_1';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['ui_name'] = 'Slutdato';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['alter']['text'] = '[field_os2web_kulturnaut_date_1-value2] ';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['settings'] = array(
    'format_type' => 'outlook',
    'custom_date_format' => '',
    'fromto' => 'value2',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Content: Lang Beskrivelse */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_longdesc']['id'] = 'field_os2web_kulturnaut_longdesc';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_longdesc']['table'] = 'field_data_field_os2web_kulturnaut_longdesc';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_longdesc']['field'] = 'field_os2web_kulturnaut_longdesc';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_longdesc']['exclude'] = TRUE;
  /* Field: Content: Sted Adresse */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['id'] = 'field_os2web_kulturnaut_saddress';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['table'] = 'field_data_field_os2web_kulturnaut_saddress';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['field'] = 'field_os2web_kulturnaut_saddress';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['exclude'] = TRUE;
  /* Field: Content: Sted arrang */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['id'] = 'field_os2web_kulturnaut_sarrang';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['table'] = 'field_data_field_os2web_kulturnaut_sarrang';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['field'] = 'field_os2web_kulturnaut_sarrang';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['exclude'] = TRUE;
  /* Field: Content: Sted homepage */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['id'] = 'field_os2web_kulturnaut_shomepag';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['table'] = 'field_data_field_os2web_kulturnaut_shomepag';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['field'] = 'field_os2web_kulturnaut_shomepag';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['exclude'] = TRUE;
  /* Field: Content: Sted navn */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['id'] = 'field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['table'] = 'field_data_field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['field'] = 'field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['exclude'] = TRUE;
  /* Field: Content: Sted Postby */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['id'] = 'field_os2web_kulturnaut_scity';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['table'] = 'field_data_field_os2web_kulturnaut_scity';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['field'] = 'field_os2web_kulturnaut_scity';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['exclude'] = TRUE;
  /* Field: Content: Venue */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_venue']['id'] = 'field_os2web_kulturnaut_venue';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_venue']['table'] = 'field_data_field_os2web_kulturnaut_venue';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_venue']['field'] = 'field_os2web_kulturnaut_venue';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_venue']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_venue']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<div title="Tilføj til kalender" class="addthisevent addtocalendar atc-style-blue btn btn-default">
	    Tilføj til kalender
	    <span class="start">[field_os2web_kulturnaut_date]</span>
	    <span class="end">[field_os2web_kulturnaut_date_1]</span>
	    <span class="timezone">Europe/Copenhagen</span>
	    <span class="title">[title]</span>
	    <span class="description">[field_os2web_kulturnaut_descrip]</span>
	    <span class="location">[field_os2web_kulturnaut_saddress]</span>
	    <span class="organizer">[field_os2web_kulturnaut_venue]</span>
	    <span class="all_day_event">false</span>
	</div>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
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

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_pane_1');
  $handler->display->display_options['argument_input'] = array(
    'nid' => array(
      'type' => 'context',
      'context' => 'entity:node.nid',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Indhold: Nid',
    ),
  );
  $translatables['add_to_calendar'] = array(
    t('Master'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('« first'),
    t('‹ previous'),
    t('next ›'),
    t('last »'),
    t('Beskrivelse'),
    t('Dato'),
    t('[field_os2web_kulturnaut_date-value]'),
    t('[field_os2web_kulturnaut_date_1-value2] '),
    t('Lang Beskrivelse'),
    t('Sted Adresse'),
    t('Sted arrang'),
    t('Sted homepage'),
    t('Sted navn'),
    t('Sted Postby'),
    t('Venue'),
    t('<div title="Tilføj til kalender" class="addthisevent addtocalendar atc-style-blue btn btn-default">
	    Tilføj til kalender
	    <span class="start">[field_os2web_kulturnaut_date]</span>
	    <span class="end">[field_os2web_kulturnaut_date_1]</span>
	    <span class="timezone">Europe/Copenhagen</span>
	    <span class="title">[title]</span>
	    <span class="description">[field_os2web_kulturnaut_descrip]</span>
	    <span class="location">[field_os2web_kulturnaut_saddress]</span>
	    <span class="organizer">[field_os2web_kulturnaut_venue]</span>
	    <span class="all_day_event">false</span>
	</div>'),
    t('Alle'),
    t('Content pane'),
    t('View panes'),
  );
  $export['add_to_calendar'] = $view;

  return $export;
}
