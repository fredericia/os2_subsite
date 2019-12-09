<?php
/**
 * @file
 * panel_event.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_event_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_9';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -22;
  $handler->conf = array(
    'title' => 'Event',
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
              'event' => 'event',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'theme',
          'settings' => array(
            'theme' => 'fredhist',
          ),
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
  $display->uuid = '83b2af6e-792b-4721-aba9-c36917d7272c';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-fd0367ad-73a9-4648-97aa-39a257aeba3b';
    $pane->panel = 'left-menu';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array();
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
    $pane->uuid = 'fd0367ad-73a9-4648-97aa-39a257aeba3b';
    $display->content['new-fd0367ad-73a9-4648-97aa-39a257aeba3b'] = $pane;
    $display->panels['left-menu'][0] = 'new-fd0367ad-73a9-4648-97aa-39a257aeba3b';
    $pane = new stdClass();
    $pane->pid = 'new-766ef32a-705d-45c3-a084-3e8fdd3fc44e';
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
    $pane->uuid = '766ef32a-705d-45c3-a084-3e8fdd3fc44e';
    $display->content['new-766ef32a-705d-45c3-a084-3e8fdd3fc44e'] = $pane;
    $display->panels['left-menu'][1] = 'new-766ef32a-705d-45c3-a084-3e8fdd3fc44e';
    $pane = new stdClass();
    $pane->pid = 'new-82fad162-c0b4-48fc-a474-04fc7d973229';
    $pane->panel = 'left-menu';
    $pane->type = 'views_panes';
    $pane->subtype = 'event-panel_pane_4';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'featured_links_event',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '82fad162-c0b4-48fc-a474-04fc7d973229';
    $display->content['new-82fad162-c0b4-48fc-a474-04fc7d973229'] = $pane;
    $display->panels['left-menu'][2] = 'new-82fad162-c0b4-48fc-a474-04fc7d973229';
    $pane = new stdClass();
    $pane->pid = 'new-424d9140-faa2-4507-b63e-a4093caf1cf7';
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '424d9140-faa2-4507-b63e-a4093caf1cf7';
    $display->content['new-424d9140-faa2-4507-b63e-a4093caf1cf7'] = $pane;
    $display->panels['left-menu'][3] = 'new-424d9140-faa2-4507-b63e-a4093caf1cf7';
    $pane = new stdClass();
    $pane->pid = 'new-adb6c28d-8cc9-473c-8b9c-c28ad7f04005';
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
    $pane->uuid = 'adb6c28d-8cc9-473c-8b9c-c28ad7f04005';
    $display->content['new-adb6c28d-8cc9-473c-8b9c-c28ad7f04005'] = $pane;
    $display->panels['mini'][0] = 'new-adb6c28d-8cc9-473c-8b9c-c28ad7f04005';
    $pane = new stdClass();
    $pane->pid = 'new-b0da79ac-5737-4977-af94-f61dcb7352f0';
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
    $pane->uuid = 'b0da79ac-5737-4977-af94-f61dcb7352f0';
    $display->content['new-b0da79ac-5737-4977-af94-f61dcb7352f0'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-b0da79ac-5737-4977-af94-f61dcb7352f0';
    $pane = new stdClass();
    $pane->pid = 'new-4b51abdf-80f3-4690-a1ff-09ff8ffca4ff';
    $pane->panel = 'mini-bottom';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'bottom-map',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '4b51abdf-80f3-4690-a1ff-09ff8ffca4ff';
    $display->content['new-4b51abdf-80f3-4690-a1ff-09ff8ffca4ff'] = $pane;
    $display->panels['mini-bottom'][1] = 'new-4b51abdf-80f3-4690-a1ff-09ff8ffca4ff';
    $pane = new stdClass();
    $pane->pid = 'new-8ad342d0-fee2-44a8-9823-65db77267982';
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
    $pane->uuid = '8ad342d0-fee2-44a8-9823-65db77267982';
    $display->content['new-8ad342d0-fee2-44a8-9823-65db77267982'] = $pane;
    $display->panels['mini-center'][0] = 'new-8ad342d0-fee2-44a8-9823-65db77267982';
    $pane = new stdClass();
    $pane->pid = 'new-e29ba3f3-a4ed-4651-9815-7789f00ecb08';
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
      'css_class' => 'page-title event-page-title',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'e29ba3f3-a4ed-4651-9815-7789f00ecb08';
    $display->content['new-e29ba3f3-a4ed-4651-9815-7789f00ecb08'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-e29ba3f3-a4ed-4651-9815-7789f00ecb08';
    $pane = new stdClass();
    $pane->pid = 'new-5c08b0a9-f98e-45b0-938b-22a53950cbb2';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'event-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'event-date',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '5c08b0a9-f98e-45b0-938b-22a53950cbb2';
    $display->content['new-5c08b0a9-f98e-45b0-938b-22a53950cbb2'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-5c08b0a9-f98e-45b0-938b-22a53950cbb2';
    $pane = new stdClass();
    $pane->pid = 'new-e63d83dc-f516-416a-8999-3ce675880fbf';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_place';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'inline',
      'formatter' => 'text_default',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 0,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'event-place',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'e63d83dc-f516-416a-8999-3ce675880fbf';
    $display->content['new-e63d83dc-f516-416a-8999-3ce675880fbf'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-e63d83dc-f516-416a-8999-3ce675880fbf';
    $pane = new stdClass();
    $pane->pid = 'new-e596239e-52e1-400f-a2a6-0746a2c942e5';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'event-panel_pane_3';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'event-price',
    );
    $pane->extras = array();
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = 'e596239e-52e1-400f-a2a6-0746a2c942e5';
    $display->content['new-e596239e-52e1-400f-a2a6-0746a2c942e5'] = $pane;
    $display->panels['mini-center-secondary'][3] = 'new-e596239e-52e1-400f-a2a6-0746a2c942e5';
    $pane = new stdClass();
    $pane->pid = 'new-91f6ffc1-5327-415e-9d97-2604ff69e353';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_event_link';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'link_default',
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
      'css_class' => 'event-link',
    );
    $pane->extras = array();
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = '91f6ffc1-5327-415e-9d97-2604ff69e353';
    $display->content['new-91f6ffc1-5327-415e-9d97-2604ff69e353'] = $pane;
    $display->panels['mini-center-secondary'][4] = 'new-91f6ffc1-5327-415e-9d97-2604ff69e353';
    $pane = new stdClass();
    $pane->pid = 'new-2a1761d0-813d-4d09-8c35-c613c3e0bb7c';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:body';
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
      'css_class' => 'body',
    );
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = '2a1761d0-813d-4d09-8c35-c613c3e0bb7c';
    $display->content['new-2a1761d0-813d-4d09-8c35-c613c3e0bb7c'] = $pane;
    $display->panels['mini-center-secondary'][5] = 'new-2a1761d0-813d-4d09-8c35-c613c3e0bb7c';
    $pane = new stdClass();
    $pane->pid = 'new-6bd76b54-b224-4b6a-8f42-55d42ddaad35';
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
    $pane->position = 6;
    $pane->locks = array();
    $pane->uuid = '6bd76b54-b224-4b6a-8f42-55d42ddaad35';
    $display->content['new-6bd76b54-b224-4b6a-8f42-55d42ddaad35'] = $pane;
    $display->panels['mini-center-secondary'][6] = 'new-6bd76b54-b224-4b6a-8f42-55d42ddaad35';
    $pane = new stdClass();
    $pane->pid = 'new-71a5f20f-4d69-47f5-b125-f8c72d7957ab';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_second_body';
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
    $pane->position = 7;
    $pane->locks = array();
    $pane->uuid = '71a5f20f-4d69-47f5-b125-f8c72d7957ab';
    $display->content['new-71a5f20f-4d69-47f5-b125-f8c72d7957ab'] = $pane;
    $display->panels['mini-center-secondary'][7] = 'new-71a5f20f-4d69-47f5-b125-f8c72d7957ab';
    $pane = new stdClass();
    $pane->pid = 'new-7eadcdfc-6329-4ddf-baf8-1b1e38da265a';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_audiofile';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
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
    $pane->position = 8;
    $pane->locks = array();
    $pane->uuid = '7eadcdfc-6329-4ddf-baf8-1b1e38da265a';
    $display->content['new-7eadcdfc-6329-4ddf-baf8-1b1e38da265a'] = $pane;
    $display->panels['mini-center-secondary'][8] = 'new-7eadcdfc-6329-4ddf-baf8-1b1e38da265a';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_9'] = $handler;

  return $export;
}
