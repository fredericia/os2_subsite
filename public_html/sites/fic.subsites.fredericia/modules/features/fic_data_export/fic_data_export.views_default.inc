<?php
/**
 * @file
 * fic_data_export.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function fic_data_export_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'oplevfredericia_feed';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Oplevfredericia feed';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['query']['options']['pure_distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Beskrivelse */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['id'] = 'field_os2web_kulturnaut_descrip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['table'] = 'field_data_field_os2web_kulturnaut_descrip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_descrip']['field'] = 'field_os2web_kulturnaut_descrip';
  /* Field: Content: Billeturl */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_url']['id'] = 'field_os2web_kulturnaut_url';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_url']['table'] = 'field_data_field_os2web_kulturnaut_url';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_url']['field'] = 'field_os2web_kulturnaut_url';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_url']['type'] = 'text_plain';
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['id'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['label'] = 'startdato';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['text'] = '1488629594';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_type'] = '0';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date']['settings'] = array(
    'format_type' => 'custom',
    'custom_date_format' => 'Y-m-d H:i:s',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Content: Genre */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_genre']['id'] = 'field_os2web_kulturnaut_genre';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_genre']['table'] = 'field_data_field_os2web_kulturnaut_genre';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_genre']['field'] = 'field_os2web_kulturnaut_genre';
  /* Field: Content: Hjemmeside */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_homepage']['id'] = 'field_os2web_kulturnaut_homepage';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_homepage']['table'] = 'field_data_field_os2web_kulturnaut_homepage';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_homepage']['field'] = 'field_os2web_kulturnaut_homepage';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_homepage']['empty'] = 'http://www.f-i-c.dk';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_homepage']['type'] = 'text_plain';
  /* Field: Content: Lang Beskrivelse */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_longdesc']['id'] = 'field_os2web_kulturnaut_longdesc';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_longdesc']['table'] = 'field_data_field_os2web_kulturnaut_longdesc';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_longdesc']['field'] = 'field_os2web_kulturnaut_longdesc';
  /* Field: Content: Maalgruppe */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_target']['id'] = 'field_os2web_kulturnaut_target';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_target']['table'] = 'field_data_field_os2web_kulturnaut_target';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_target']['field'] = 'field_os2web_kulturnaut_target';
  /* Field: Content: Pris */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_price']['id'] = 'field_os2web_kulturnaut_price';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_price']['table'] = 'field_data_field_os2web_kulturnaut_price';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_price']['field'] = 'field_os2web_kulturnaut_price';
  /* Field: Content: Sektion */
  $handler->display->display_options['fields']['field_sektion']['id'] = 'field_sektion';
  $handler->display->display_options['fields']['field_sektion']['table'] = 'field_data_field_sektion';
  $handler->display->display_options['fields']['field_sektion']['field'] = 'field_sektion';
  $handler->display->display_options['fields']['field_sektion']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_sektion']['alter']['text'] = 'FIC- [field_sektion]';
  $handler->display->display_options['fields']['field_sektion']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sektion']['delta_offset'] = '0';
  /* Field: Content: Sted Adresse */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['id'] = 'field_os2web_kulturnaut_saddress';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['table'] = 'field_data_field_os2web_kulturnaut_saddress';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['field'] = 'field_os2web_kulturnaut_saddress';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_saddress']['empty'] = 'Vestre Ringvej 100';
  /* Field: Content: Sted arrang */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['id'] = 'field_os2web_kulturnaut_sarrang';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['table'] = 'field_data_field_os2web_kulturnaut_sarrang';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['field'] = 'field_os2web_kulturnaut_sarrang';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sarrang']['empty'] = '[field_sektion]';
  /* Field: Content: Sted homepage */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['id'] = 'field_os2web_kulturnaut_shomepag';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['table'] = 'field_data_field_os2web_kulturnaut_shomepag';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['field'] = 'field_os2web_kulturnaut_shomepag';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_shomepag']['empty'] = 'http://www.f-i-c.dk';
  /* Field: Content: Sted navn */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['id'] = 'field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['table'] = 'field_data_field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['field'] = 'field_os2web_kulturnaut_sname';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_sname']['empty'] = 'Fredericia Idrætscenter (FIC)';
  /* Field: Content: Sted Postby */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['id'] = 'field_os2web_kulturnaut_scity';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['table'] = 'field_data_field_os2web_kulturnaut_scity';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['field'] = 'field_os2web_kulturnaut_scity';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_scity']['empty'] = 'Fredericia';
  /* Field: Content: Sted Postnr */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_szip']['id'] = 'field_os2web_kulturnaut_szip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_szip']['table'] = 'field_data_field_os2web_kulturnaut_szip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_szip']['field'] = 'field_os2web_kulturnaut_szip';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_szip']['empty'] = '7000';
  /* Field: Content: Tema */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_tema']['id'] = 'field_os2web_kulturnaut_tema';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_tema']['table'] = 'field_data_field_os2web_kulturnaut_tema';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_tema']['field'] = 'field_os2web_kulturnaut_tema';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_tema']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_tema']['delta_offset'] = '0';
  /* Field: Content: Tid */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_time']['id'] = 'field_os2web_kulturnaut_time';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_time']['table'] = 'field_data_field_os2web_kulturnaut_time';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_time']['field'] = 'field_os2web_kulturnaut_time';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_time']['type'] = 'text_plain';
  /* Field: Field: Stikord */
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['id'] = 'field_os2web_base_field_edi_tags';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['table'] = 'field_data_field_os2web_base_field_edi_tags';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['field'] = 'field_os2web_base_field_edi_tags';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_os2web_base_field_edi_tags']['delta_offset'] = '0';
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = 'Sti';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = 'http://fic.subsites.fredericia.dk/[path]';
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['id'] = 'field_os2web_kulturnaut_date_1';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['label'] = 'slutdato';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_1']['settings'] = array(
    'format_type' => 'custom',
    'custom_date_format' => 'Y-m-d H:i:s',
    'fromto' => 'value2',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['text'] = 'http://fic.subsites.fredericia.dk/node/[nid]';
  $handler->display->display_options['fields']['nid']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['nid']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['path_case'] = 'lower';
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_2']['id'] = 'field_os2web_kulturnaut_date_2';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_2']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_2']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_2']['label'] = 'Dato - tid fra';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_2']['settings'] = array(
    'format_type' => 'custom',
    'custom_date_format' => 'H:i',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Content: Dato */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['id'] = 'field_os2web_kulturnaut_date_3';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['field'] = 'field_os2web_kulturnaut_date';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['label'] = 'tidspunkt';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['alter']['text'] = 'kl. [field_os2web_kulturnaut_date_2] til [field_os2web_kulturnaut_date_3]';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['empty'] = 'kl. [field_os2web_kulturnaut_date_2]';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_date_3']['settings'] = array(
    'format_type' => 'custom',
    'custom_date_format' => 'H:i',
    'fromto' => 'value2',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
    'show_remaining_days' => 0,
  );
  /* Field: Content: Data source */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_source']['id'] = 'field_os2web_kulturnaut_source';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_source']['table'] = 'field_data_field_os2web_kulturnaut_source';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_source']['field'] = 'field_os2web_kulturnaut_source';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_source']['label'] = 'source';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_source']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_source']['alter']['text'] = 'feed';
  /* Field: Content: Slideshow */
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['id'] = 'field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['table'] = 'field_data_field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['field'] = 'field_os2web_kulturnaut_slidesho';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['alter']['text'] = '[field_os2web_kulturnaut_slidesho]';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['settings'] = array(
    'url_type' => '0',
    'image_style' => '',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['delta_limit'] = '';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_os2web_kulturnaut_slidesho']['separator'] = ',';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
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
  /* Filter criterion: Content: Dato -  start date (field_os2web_kulturnaut_date) */
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['id'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['table'] = 'field_data_field_os2web_kulturnaut_date';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['field'] = 'field_os2web_kulturnaut_date_value';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['operator'] = '>';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['form_type'] = 'date_popup';
  $handler->display->display_options['filters']['field_os2web_kulturnaut_date_value']['default_date'] = 'today';
  /* Filter criterion: Content: Forfrem til (field_os2web_base_field_promote) */
  $handler->display->display_options['filters']['field_os2web_base_field_promote_tid']['id'] = 'field_os2web_base_field_promote_tid';
  $handler->display->display_options['filters']['field_os2web_base_field_promote_tid']['table'] = 'field_data_field_os2web_base_field_promote';
  $handler->display->display_options['filters']['field_os2web_base_field_promote_tid']['field'] = 'field_os2web_base_field_promote_tid';
  $handler->display->display_options['filters']['field_os2web_base_field_promote_tid']['value'] = array(
    15 => '15',
  );
  $handler->display->display_options['filters']['field_os2web_base_field_promote_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_os2web_base_field_promote_tid']['vocabulary'] = 'os2web_base_tax_promoteto';

  /* Display: Feed */
  $handler = $view->new_display('feed', 'Feed', 'feed_1');
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['style_plugin'] = 'rss';
  $handler->display->display_options['row_plugin'] = 'node_rss';
  $handler->display->display_options['path'] = 'fic-til-oplevfredericia-dk';

  /* Display: Data export */
  $handler = $view->new_display('views_data_export', 'Data export', 'views_data_export_1');
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['style_plugin'] = 'views_data_export_xml';
  $handler->display->display_options['style_options']['provide_file'] = 0;
  $handler->display->display_options['style_options']['parent_sort'] = 0;
  $handler->display->display_options['style_options']['transform'] = 1;
  $handler->display->display_options['style_options']['root_node'] = 'nodes';
  $handler->display->display_options['style_options']['item_node'] = 'node';
  $handler->display->display_options['style_options']['no_entity_encode'] = array(
    'field_os2web_kulturnaut_descrip' => 'field_os2web_kulturnaut_descrip',
    'field_os2web_kulturnaut_longdesc' => 'field_os2web_kulturnaut_longdesc',
  );
  $handler->display->display_options['path'] = 'fic-til-oplevfredericia';
  $translatables['oplevfredericia_feed'] = array(
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
    t('Title'),
    t('Beskrivelse'),
    t('Billeturl'),
    t('startdato'),
    t('1488629594'),
    t('Genre'),
    t('Hjemmeside'),
    t('http://www.f-i-c.dk'),
    t('Lang Beskrivelse'),
    t('Maalgruppe'),
    t('Pris'),
    t('Sektion'),
    t('FIC- [field_sektion]'),
    t('Sted Adresse'),
    t('Vestre Ringvej 100'),
    t('Sted arrang'),
    t('[field_sektion]'),
    t('Sted homepage'),
    t('Sted navn'),
    t('Fredericia Idrætscenter (FIC)'),
    t('Sted Postby'),
    t('Fredericia'),
    t('Sted Postnr'),
    t('7000'),
    t('Tema'),
    t('Tid'),
    t('Stikord'),
    t('Sti'),
    t('http://fic.subsites.fredericia.dk/[path]'),
    t('slutdato'),
    t('Nid'),
    t('http://fic.subsites.fredericia.dk/node/[nid]'),
    t('Dato - tid fra'),
    t('tidspunkt'),
    t('kl. [field_os2web_kulturnaut_date_2] til [field_os2web_kulturnaut_date_3]'),
    t('kl. [field_os2web_kulturnaut_date_2]'),
    t('source'),
    t('feed'),
    t('Slideshow'),
    t('[field_os2web_kulturnaut_slidesho]'),
    t('Feed'),
    t('Data export'),
  );
  $export['oplevfredericia_feed'] = $view;

  return $export;
}
