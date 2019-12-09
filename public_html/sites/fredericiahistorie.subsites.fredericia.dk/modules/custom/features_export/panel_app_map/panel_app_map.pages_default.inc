<?php
/**
 * @file
 * panel_app_map.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_app_map_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_14';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -18;
  $handler->conf = array(
    'title' => 'App map',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'app_map' => 'app_map',
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
  $display->layout = 'adapttwocolmini';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'middle' => NULL,
      'bottom' => NULL,
      'mini' => NULL,
      'mini-center' => NULL,
      'mini-center-secondary' => NULL,
      'mini-bottom' => NULL,
      'left-menu' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'e061ce92-792a-4891-914d-50370df0a7b7';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-62de88b3-9a6c-415d-9698-7e57c6f84aa1';
    $pane->panel = 'left-menu';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'context_exists',
          'settings' => array(
            'exists' => '1',
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'menu_name' => 'main-menu',
      'parent_mlid' => '0',
      'title_link' => 0,
      'admin_title' => 'Undermenupunkter',
      'level' => '1',
      'follow' => 0,
      'depth' => '0',
      'expanded' => 1,
      'sort' => 0,
      'override_title' => 1,
      'override_title_text' => '',
      'parent' => 'main-menu:0',
      'depth_relative' => 0,
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'submenu-items',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '62de88b3-9a6c-415d-9698-7e57c6f84aa1';
    $display->content['new-62de88b3-9a6c-415d-9698-7e57c6f84aa1'] = $pane;
    $display->panels['left-menu'][0] = 'new-62de88b3-9a6c-415d-9698-7e57c6f84aa1';
    $pane = new stdClass();
    $pane->pid = 'new-646620f9-d868-47fa-841a-122d5dcb19ba';
    $pane->panel = 'left-menu';
    $pane->type = 'views_panes';
    $pane->subtype = 'sidebar-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'sidebar-box',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '646620f9-d868-47fa-841a-122d5dcb19ba';
    $display->content['new-646620f9-d868-47fa-841a-122d5dcb19ba'] = $pane;
    $display->panels['left-menu'][1] = 'new-646620f9-d868-47fa-841a-122d5dcb19ba';
    $pane = new stdClass();
    $pane->pid = 'new-41648d37-67e1-4deb-8bd3-89b299c03290';
    $pane->panel = 'left-menu';
    $pane->type = 'views_panes';
    $pane->subtype = 'featured_links-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'featured_links',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '41648d37-67e1-4deb-8bd3-89b299c03290';
    $display->content['new-41648d37-67e1-4deb-8bd3-89b299c03290'] = $pane;
    $display->panels['left-menu'][2] = 'new-41648d37-67e1-4deb-8bd3-89b299c03290';
    $pane = new stdClass();
    $pane->pid = 'new-dfa41625-734e-4efd-a775-37d5cfefe073';
    $pane->panel = 'mini';
    $pane->type = 'panels_mini';
    $pane->subtype = 'header';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'dfa41625-734e-4efd-a775-37d5cfefe073';
    $display->content['new-dfa41625-734e-4efd-a775-37d5cfefe073'] = $pane;
    $display->panels['mini'][0] = 'new-dfa41625-734e-4efd-a775-37d5cfefe073';
    $pane = new stdClass();
    $pane->pid = 'new-bc0e0592-97ec-46c0-a6bc-a400cb7a4932';
    $pane->panel = 'mini-bottom';
    $pane->type = 'panels_mini';
    $pane->subtype = 'footer';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'bc0e0592-97ec-46c0-a6bc-a400cb7a4932';
    $display->content['new-bc0e0592-97ec-46c0-a6bc-a400cb7a4932'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-bc0e0592-97ec-46c0-a6bc-a400cb7a4932';
    $pane = new stdClass();
    $pane->pid = 'new-ea522d1d-967e-4b9e-9202-fa240d01cf5f';
    $pane->panel = 'mini-center';
    $pane->type = 'views_panes';
    $pane->subtype = 'topimage-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'topimage-container',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'ea522d1d-967e-4b9e-9202-fa240d01cf5f';
    $display->content['new-ea522d1d-967e-4b9e-9202-fa240d01cf5f'] = $pane;
    $display->panels['mini-center'][0] = 'new-ea522d1d-967e-4b9e-9202-fa240d01cf5f';
    $pane = new stdClass();
    $pane->pid = 'new-1ba9c96c-33a5-4273-9273-dd00fc25398a';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'page_title';
    $pane->subtype = 'page_title';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'markup' => 'h1',
      'class' => '',
      'id' => '',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'page-title',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '1ba9c96c-33a5-4273-9273-dd00fc25398a';
    $display->content['new-1ba9c96c-33a5-4273-9273-dd00fc25398a'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-1ba9c96c-33a5-4273-9273-dd00fc25398a';
    $pane = new stdClass();
    $pane->pid = 'new-230e858e-7722-48e5-b556-57b979e3a588';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_body';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'text_default',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'body first prose',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '230e858e-7722-48e5-b556-57b979e3a588';
    $display->content['new-230e858e-7722-48e5-b556-57b979e3a588'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-230e858e-7722-48e5-b556-57b979e3a588';
    $pane = new stdClass();
    $pane->pid = 'new-b1d429d2-6010-4a82-b692-079f84e997cf';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'body_center_img-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'body-center-image',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'b1d429d2-6010-4a82-b692-079f84e997cf';
    $display->content['new-b1d429d2-6010-4a82-b692-079f84e997cf'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-b1d429d2-6010-4a82-b692-079f84e997cf';
    $pane = new stdClass();
    $pane->pid = 'new-7c039c3a-d984-42d7-a218-d1d681fe5429';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_page_body_second';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'text_default',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'body prose',
    );
    $pane->extras = array();
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '7c039c3a-d984-42d7-a218-d1d681fe5429';
    $display->content['new-7c039c3a-d984-42d7-a218-d1d681fe5429'] = $pane;
    $display->panels['mini-center-secondary'][3] = 'new-7c039c3a-d984-42d7-a218-d1d681fe5429';
    $pane = new stdClass();
    $pane->pid = 'new-49b1c0b7-bd55-44fc-a4a9-5ae482f8d070';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_audiofile';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'title',
      'formatter' => 'jplayer_player',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(
        'autoplay' => '0',
        'solution' => 'html, flash',
        'preload' => 'metadata',
        'volume' => '80',
        'muted' => '0',
        'repeat' => 'none',
        'backgroundColor' => '000000',
        'mode' => 'playlist',
      ),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = '49b1c0b7-bd55-44fc-a4a9-5ae482f8d070';
    $display->content['new-49b1c0b7-bd55-44fc-a4a9-5ae482f8d070'] = $pane;
    $display->panels['mini-center-secondary'][4] = 'new-49b1c0b7-bd55-44fc-a4a9-5ae482f8d070';
    $pane = new stdClass();
    $pane->pid = 'new-024ba762-65f7-4d9c-9252-ac33be6616e7';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_map_title';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'text_default',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = '024ba762-65f7-4d9c-9252-ac33be6616e7';
    $display->content['new-024ba762-65f7-4d9c-9252-ac33be6616e7'] = $pane;
    $display->panels['mini-center-secondary'][5] = 'new-024ba762-65f7-4d9c-9252-ac33be6616e7';
    $pane = new stdClass();
    $pane->pid = 'new-c5497223-1e98-4df2-a377-17d851e1b16f';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'openlayers_map';
    $pane->subtype = 'fredericia_pagemap';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 6;
    $pane->locks = array();
    $pane->uuid = 'c5497223-1e98-4df2-a377-17d851e1b16f';
    $display->content['new-c5497223-1e98-4df2-a377-17d851e1b16f'] = $pane;
    $display->panels['mini-center-secondary'][6] = 'new-c5497223-1e98-4df2-a377-17d851e1b16f';
    $pane = new stdClass();
    $pane->pid = 'new-e024f676-afda-4003-bd66-cf5415fc69bc';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_map_title_second';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'entity_field_value:node:app_map:field_display_second_map',
          'settings' => array(
            'field_display_second_map' => array(
              'und' => array(
                0 => array(
                  'value' => 1,
                ),
              ),
            ),
            'field_display_second_map_value' => '1',
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'text_default',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 7;
    $pane->locks = array();
    $pane->uuid = 'e024f676-afda-4003-bd66-cf5415fc69bc';
    $display->content['new-e024f676-afda-4003-bd66-cf5415fc69bc'] = $pane;
    $display->panels['mini-center-secondary'][7] = 'new-e024f676-afda-4003-bd66-cf5415fc69bc';
    $pane = new stdClass();
    $pane->pid = 'new-bf102486-7446-4512-b947-7c6414aeb1ce';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'openlayers_map';
    $pane->subtype = 'clone_of_fredericia_pagemap';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'entity_field_value:node:app_map:field_display_second_map',
          'settings' => array(
            'field_display_second_map' => array(
              'und' => array(
                0 => array(
                  'value' => 1,
                ),
              ),
            ),
            'field_display_second_map_value' => '1',
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 8;
    $pane->locks = array();
    $pane->uuid = 'bf102486-7446-4512-b947-7c6414aeb1ce';
    $display->content['new-bf102486-7446-4512-b947-7c6414aeb1ce'] = $pane;
    $display->panels['mini-center-secondary'][8] = 'new-bf102486-7446-4512-b947-7c6414aeb1ce';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_14'] = $handler;

  return $export;
}
