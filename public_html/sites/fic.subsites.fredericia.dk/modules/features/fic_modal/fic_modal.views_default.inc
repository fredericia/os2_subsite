<?php
/**
 * @file
 * fic_modal.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function fic_modal_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'fic_modal';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'FIC modal';
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
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'entity';
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
  $handler->display->display_options['arguments']['field_sektion_tid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_sektion_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_type'] = 'taxonomy_tid';
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_options']['node'] = TRUE;
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_options']['limit'] = TRUE;
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_options']['vocabularies'] = array(
    'os2web_base_tax_site_structure' => 'os2web_base_tax_site_structure',
  );
  $handler->display->display_options['arguments']['field_sektion_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_sektion_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_sektion_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_sektion_tid']['break_phrase'] = TRUE;
  /* Kontekstuelt filter: Indhold: Indhold (field_node_ids) */
  $handler->display->display_options['arguments']['field_node_ids_nid']['id'] = 'field_node_ids_nid';
  $handler->display->display_options['arguments']['field_node_ids_nid']['table'] = 'field_data_field_node_ids';
  $handler->display->display_options['arguments']['field_node_ids_nid']['field'] = 'field_node_ids_nid';
  $handler->display->display_options['arguments']['field_node_ids_nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_node_ids_nid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_node_ids_nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['field_node_ids_nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_node_ids_nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_node_ids_nid']['summary_options']['items_per_page'] = '25';
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
    'modal' => 'modal',
  );

  /* Display: Blok - sektion */
  $handler = $view->new_display('block', 'Blok - sektion', 'block');
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Kontekstuelt filter: Indhold: Sektion (field_sektion) */
  $handler->display->display_options['arguments']['field_sektion_tid']['id'] = 'field_sektion_tid';
  $handler->display->display_options['arguments']['field_sektion_tid']['table'] = 'field_data_field_sektion';
  $handler->display->display_options['arguments']['field_sektion_tid']['field'] = 'field_sektion_tid';
  $handler->display->display_options['arguments']['field_sektion_tid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_sektion_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_type'] = 'taxonomy_tid';
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_options']['node'] = TRUE;
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_options']['limit'] = TRUE;
  $handler->display->display_options['arguments']['field_sektion_tid']['default_argument_options']['vocabularies'] = array(
    'os2web_base_tax_site_structure' => 'os2web_base_tax_site_structure',
  );
  $handler->display->display_options['arguments']['field_sektion_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_sektion_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_sektion_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_sektion_tid']['break_phrase'] = TRUE;

  /* Display: Blok - node */
  $handler = $view->new_display('block', 'Blok - node', 'block_node');
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Kontekstuelt filter: Indhold: Indhold (field_node_ids) */
  $handler->display->display_options['arguments']['field_node_ids_nid']['id'] = 'field_node_ids_nid';
  $handler->display->display_options['arguments']['field_node_ids_nid']['table'] = 'field_data_field_node_ids';
  $handler->display->display_options['arguments']['field_node_ids_nid']['field'] = 'field_node_ids_nid';
  $handler->display->display_options['arguments']['field_node_ids_nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_node_ids_nid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_node_ids_nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['field_node_ids_nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_node_ids_nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_node_ids_nid']['summary_options']['items_per_page'] = '25';
  $translatables['fic_modal'] = array(
    t('Master'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Alle'),
    t('Blok - sektion'),
    t('Blok - node'),
  );
  $export['fic_modal'] = $view;

  return $export;
}
