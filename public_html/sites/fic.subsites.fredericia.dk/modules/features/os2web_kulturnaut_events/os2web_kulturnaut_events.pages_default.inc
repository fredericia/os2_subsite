<?php
/**
 * @file
 * os2web_kulturnaut_events.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function os2web_kulturnaut_events_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__begivenhed';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -27;
  $handler->conf = array(
    'title' => 'Begivenhed',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(
      0 => array(
        'identifier' => 'Sektion [field_sektion]',
        'keyword' => 'taxonomy_term_sektion',
        'name' => 'entity_from_field:field_sektion-node-taxonomy_term',
        'delta' => 0,
        'context' => 'argument_entity_id:node_1',
        'id' => 1,
      ),
    ),
    'name' => 'begivenhed',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
              'event_calendar' => 'event_calendar',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'full-width-dark-light-dark-with-right-sidebar-8-4';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'sidebar' => NULL,
      'content' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'footer' => NULL,
      'top' => NULL,
      'dark_section_1' => NULL,
      'light_section_1' => NULL,
      'dark_section_2' => NULL,
      'light_section_0' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = 'd00ab7a6-9c3a-4db2-990c-5a01327f2f02';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__begivenhed';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-c8cb293b-9ad8-430e-afc1-dc9fa3d6e85f';
  $pane->panel = 'content';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => 'pane-title',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c8cb293b-9ad8-430e-afc1-dc9fa3d6e85f';
  $display->content['new-c8cb293b-9ad8-430e-afc1-dc9fa3d6e85f'] = $pane;
  $display->panels['content'][0] = 'new-c8cb293b-9ad8-430e-afc1-dc9fa3d6e85f';
  $pane = new stdClass();
  $pane->pid = 'new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
  $pane->panel = 'content';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'no_extras' => 0,
    'override_title' => 1,
    'override_title_text' => '',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 1,
    'build_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
  $display->content['new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d'] = $pane;
  $display->panels['content'][1] = 'new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
  $pane = new stdClass();
  $pane->pid = 'new-a8aef160-57d9-42e9-831c-26b0391a7114';
  $pane->panel = 'dark_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_kommende_arrangementer-panel_pane_1';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 1,
    'arguments' => array(
      'term_node_tid_depth' => '%taxonomy_term_sektion:tid',
      'nid' => '%node:nid',
    ),
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
    'path' => 'fic-kommende-arrangementer',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'a8aef160-57d9-42e9-831c-26b0391a7114';
  $display->content['new-a8aef160-57d9-42e9-831c-26b0391a7114'] = $pane;
  $display->panels['dark_section_1'][0] = 'new-a8aef160-57d9-42e9-831c-26b0391a7114';
  $pane = new stdClass();
  $pane->pid = 'new-8b3fe2c5-ba5c-4ba8-a8f6-c2fbe80c291d';
  $pane->panel = 'light_section_0';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_slidesho';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'slideshow',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'slideshow_image_style' => 'fic_wide',
      'slideshow_link' => '',
      'slideshow_caption' => '',
      'slideshow_caption_link' => '',
      'slideshow_fx' => 'fade',
      'slideshow_speed' => '1000',
      'slideshow_timeout' => '4000',
      'slideshow_order' => '',
      'slideshow_controls' => 1,
      'slideshow_controls_pause' => 0,
      'slideshow_controls_position' => 'after',
      'slideshow_pause' => 0,
      'slideshow_start_on_hover' => 1,
      'slideshow_pager' => 'number',
      'slideshow_pager_position' => 'after',
      'slideshow_pager_image_style' => '',
      'slideshow_carousel_image_style' => '',
      'slideshow_carousel_visible' => '3',
      'slideshow_carousel_scroll' => '1',
      'slideshow_carousel_speed' => '500',
      'slideshow_carousel_vertical' => 0,
      'slideshow_carousel_circular' => 0,
      'slideshow_carousel_follow' => 0,
      'slideshow_carousel_skin' => '',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '8b3fe2c5-ba5c-4ba8-a8f6-c2fbe80c291d';
  $display->content['new-8b3fe2c5-ba5c-4ba8-a8f6-c2fbe80c291d'] = $pane;
  $display->panels['light_section_0'][0] = 'new-8b3fe2c5-ba5c-4ba8-a8f6-c2fbe80c291d';
  $pane = new stdClass();
  $pane->pid = 'new-d5fcec00-1e49-49da-9728-c8d1ccd434ad';
  $pane->panel = 'light_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_kommende_arrangementer-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 1,
    'arguments' => array(
      'term_node_tid_depth' => '%taxonomy_term_sektion:tid',
      'nid' => '%node:nid',
    ),
    'override_title' => 0,
    'override_title_text' => 'Kommende arrangementer',
    'override_title_heading' => 'h2',
    'path' => 'fic-kommende-arrangementer',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'bg-white',
    'template_suggestion' => 'views_panes',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd5fcec00-1e49-49da-9728-c8d1ccd434ad';
  $display->content['new-d5fcec00-1e49-49da-9728-c8d1ccd434ad'] = $pane;
  $display->panels['light_section_1'][0] = 'new-d5fcec00-1e49-49da-9728-c8d1ccd434ad';
  $pane = new stdClass();
  $pane->pid = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_base_field_selfserv';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'node_reference_node',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'node_reference_view_mode' => 'spotbox',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Selvbetjening',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
  $display->content['new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9'] = $pane;
  $display->panels['sidebar'][0] = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
  $pane = new stdClass();
  $pane->pid = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_base_field_related';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'node_reference_default',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Relaterede sider',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
  $display->content['new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51'] = $pane;
  $display->panels['sidebar'][1] = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
  $pane = new stdClass();
  $pane->pid = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_base_field_ext_link';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'link_default',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '72928d41-013b-4890-8ecf-8777b9f87636';
  $display->content['new-72928d41-013b-4890-8ecf-8777b9f87636'] = $pane;
  $display->panels['sidebar'][2] = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
  $pane = new stdClass();
  $pane->pid = 'new-893929e0-93cd-4d39-b2a8-1179ece67f6e';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_date';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'date_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'format_type' => 'long',
      'multiple_number' => '',
      'multiple_from' => '',
      'multiple_to' => '',
      'fromto' => 'value',
      'show_remaining_days' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Tid',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '893929e0-93cd-4d39-b2a8-1179ece67f6e';
  $display->content['new-893929e0-93cd-4d39-b2a8-1179ece67f6e'] = $pane;
  $display->panels['sidebar'][3] = 'new-893929e0-93cd-4d39-b2a8-1179ece67f6e';
  $pane = new stdClass();
  $pane->pid = 'new-bf5718fb-565d-4cf4-8707-b512d2902a76';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_sname';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Sted',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'bf5718fb-565d-4cf4-8707-b512d2902a76';
  $display->content['new-bf5718fb-565d-4cf4-8707-b512d2902a76'] = $pane;
  $display->panels['sidebar'][4] = 'new-bf5718fb-565d-4cf4-8707-b512d2902a76';
  $pane = new stdClass();
  $pane->pid = 'new-03f2daef-0dfa-4479-b6b7-c798bbf97bf7';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_price';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = '03f2daef-0dfa-4479-b6b7-c798bbf97bf7';
  $display->content['new-03f2daef-0dfa-4479-b6b7-c798bbf97bf7'] = $pane;
  $display->panels['sidebar'][5] = 'new-03f2daef-0dfa-4479-b6b7-c798bbf97bf7';
  $pane = new stdClass();
  $pane->pid = 'new-3999839d-17c5-4d5e-86c4-200748715da1';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_homepage';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '3999839d-17c5-4d5e-86c4-200748715da1';
  $display->content['new-3999839d-17c5-4d5e-86c4-200748715da1'] = $pane;
  $display->panels['sidebar'][6] = 'new-3999839d-17c5-4d5e-86c4-200748715da1';
  $pane = new stdClass();
  $pane->pid = 'new-fb70d122-e762-4540-80f3-5e1931cd489f';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_sarrang';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Arrangør',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 7;
  $pane->locks = array();
  $pane->uuid = 'fb70d122-e762-4540-80f3-5e1931cd489f';
  $display->content['new-fb70d122-e762-4540-80f3-5e1931cd489f'] = $pane;
  $display->panels['sidebar'][7] = 'new-fb70d122-e762-4540-80f3-5e1931cd489f';
  $pane = new stdClass();
  $pane->pid = 'new-491d03a7-8c76-46af-b6f3-c5dbb52bcfae';
  $pane->panel = 'sidebar';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_saddress';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'simple_gmap',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'include_map' => 1,
      'include_static_map' => 0,
      'include_link' => 0,
      'include_text' => 0,
      'iframe_height' => '185',
      'iframe_width' => '375',
      'static_scale' => '2',
      'zoom_level' => '14',
      'link_text' => 'View larger map',
      'map_type' => 'm',
      'langcode' => 'da',
      'apikey' => 'AIzaSyAgJA8d0t65vtmoUm1V4QzLUHxZCKaSSeE',
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 8;
  $pane->locks = array();
  $pane->uuid = '491d03a7-8c76-46af-b6f3-c5dbb52bcfae';
  $display->content['new-491d03a7-8c76-46af-b6f3-c5dbb52bcfae'] = $pane;
  $display->panels['sidebar'][8] = 'new-491d03a7-8c76-46af-b6f3-c5dbb52bcfae';
  $pane = new stdClass();
  $pane->pid = 'new-6286e3b1-2010-4fa7-89bd-cd8c25dee868';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'os2sub_social_share-os2sub_social_share';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Del begivenhed',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 9;
  $pane->locks = array();
  $pane->uuid = '6286e3b1-2010-4fa7-89bd-cd8c25dee868';
  $display->content['new-6286e3b1-2010-4fa7-89bd-cd8c25dee868'] = $pane;
  $display->panels['sidebar'][9] = 'new-6286e3b1-2010-4fa7-89bd-cd8c25dee868';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view__begivenhed'] = $handler;

  return $export;
}

/**
 * Implements hook_default_page_manager_pages().
 */
function os2web_kulturnaut_events_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'page_kultunaut_events';
  $page->task = 'page';
  $page->admin_title = 'Page kultunaut events';
  $page->admin_description = '';
  $page->path = 'kommende_arangementer';
  $page->access = array();
  $page->menu = array(
    'type' => 'none',
    'title' => 'kommende_arangementer',
    'name' => 'main-menu',
    'weight' => '0',
    'parent' => array(
      'type' => 'none',
      'title' => '',
      'name' => 'navigation',
      'weight' => '0',
    ),
  );
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_page_kultunaut_events__panel';
  $handler->task = 'page';
  $handler->subtask = 'page_kultunaut_events';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'kultunaut',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'panel',
    'access' => array(
      'logic' => 'and',
    ),
    'panels_breadcrumbs_state' => 0,
    'panels_breadcrumbs_titles' => '',
    'panels_breadcrumbs_paths' => '',
    'panels_breadcrumbs_home' => 1,
  );
  $display = new panels_display();
  $display->layout = 'onecol';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'middle' => NULL,
      'top' => NULL,
      'left' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Kommende arangementer';
  $display->uuid = '83f456b8-5c59-4205-8425-b8f6070a3e5f';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_page_kultunaut_events__panel';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-f24c962b-258c-41fa-9419-9db42aed100d';
  $pane->panel = 'middle';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2web_kulturnaut_events_lists-pane_kultunaut_events';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'f24c962b-258c-41fa-9419-9db42aed100d';
  $display->content['new-f24c962b-258c-41fa-9419-9db42aed100d'] = $pane;
  $display->panels['middle'][0] = 'new-f24c962b-258c-41fa-9419-9db42aed100d';
  $pane = new stdClass();
  $pane->pid = 'new-fd471056-f59b-4788-bbfd-beaefce168bd';
  $pane->panel = 'middle';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_list_4_mini';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'panel-pane--full-width panel-pane--title',
    'template_suggestion' => 'views_panes',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'fd471056-f59b-4788-bbfd-beaefce168bd';
  $display->content['new-fd471056-f59b-4788-bbfd-beaefce168bd'] = $pane;
  $display->panels['middle'][1] = 'new-fd471056-f59b-4788-bbfd-beaefce168bd';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-f24c962b-258c-41fa-9419-9db42aed100d';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['page_kultunaut_events'] = $page;

  return $pages;

}
