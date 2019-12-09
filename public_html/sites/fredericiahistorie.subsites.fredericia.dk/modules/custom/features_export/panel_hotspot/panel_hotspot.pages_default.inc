<?php
/**
 * @file
 * panel_hotspot.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_hotspot_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_13';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -19;
  $handler->conf = array(
    'title' => 'Hotspot',
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
              'app_hotspot' => 'app_hotspot',
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
  $display->uuid = '7a5f73d6-db87-42e5-8110-189bbc9c6811';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-2c5270f1-de68-4f59-9282-c61eb975fb9c';
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
    $pane->uuid = '2c5270f1-de68-4f59-9282-c61eb975fb9c';
    $display->content['new-2c5270f1-de68-4f59-9282-c61eb975fb9c'] = $pane;
    $display->panels['left-menu'][0] = 'new-2c5270f1-de68-4f59-9282-c61eb975fb9c';
    $pane = new stdClass();
    $pane->pid = 'new-9d1e74ab-04a5-4b6f-a85b-aa5cd34b5ada';
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
    $pane->uuid = '9d1e74ab-04a5-4b6f-a85b-aa5cd34b5ada';
    $display->content['new-9d1e74ab-04a5-4b6f-a85b-aa5cd34b5ada'] = $pane;
    $display->panels['mini'][0] = 'new-9d1e74ab-04a5-4b6f-a85b-aa5cd34b5ada';
    $pane = new stdClass();
    $pane->pid = 'new-514435b1-fd81-42b1-b61d-9b4880d69fb4';
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
    $pane->uuid = '514435b1-fd81-42b1-b61d-9b4880d69fb4';
    $display->content['new-514435b1-fd81-42b1-b61d-9b4880d69fb4'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-514435b1-fd81-42b1-b61d-9b4880d69fb4';
    $pane = new stdClass();
    $pane->pid = 'new-e534a6a0-d9b0-422a-a68a-886215f05fd6';
    $pane->panel = 'mini-center';
    $pane->type = 'views_panes';
    $pane->subtype = 'topimage-panel_pane_2';
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
    $pane->uuid = 'e534a6a0-d9b0-422a-a68a-886215f05fd6';
    $display->content['new-e534a6a0-d9b0-422a-a68a-886215f05fd6'] = $pane;
    $display->panels['mini-center'][0] = 'new-e534a6a0-d9b0-422a-a68a-886215f05fd6';
    $pane = new stdClass();
    $pane->pid = 'new-0327a82c-4c02-4e06-8cf4-525327c17f27';
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
    $pane->uuid = '0327a82c-4c02-4e06-8cf4-525327c17f27';
    $display->content['new-0327a82c-4c02-4e06-8cf4-525327c17f27'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-0327a82c-4c02-4e06-8cf4-525327c17f27';
    $pane = new stdClass();
    $pane->pid = 'new-985ea679-4cc1-40e5-b7b4-35084d6b9a51';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_page_body';
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
      'css_class' => 'body prose no-padding',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '985ea679-4cc1-40e5-b7b4-35084d6b9a51';
    $display->content['new-985ea679-4cc1-40e5-b7b4-35084d6b9a51'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-985ea679-4cc1-40e5-b7b4-35084d6b9a51';
    $pane = new stdClass();
    $pane->pid = 'new-3ed9913a-50c5-4b27-8082-58655d436db6';
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
    $pane->uuid = '3ed9913a-50c5-4b27-8082-58655d436db6';
    $display->content['new-3ed9913a-50c5-4b27-8082-58655d436db6'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-3ed9913a-50c5-4b27-8082-58655d436db6';
    $pane = new stdClass();
    $pane->pid = 'new-9a77af24-535e-4353-8542-1a283028505d';
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
    $pane->uuid = '9a77af24-535e-4353-8542-1a283028505d';
    $display->content['new-9a77af24-535e-4353-8542-1a283028505d'] = $pane;
    $display->panels['mini-center-secondary'][3] = 'new-9a77af24-535e-4353-8542-1a283028505d';
    $pane = new stdClass();
    $pane->pid = 'new-c0a83d8c-e9e6-4e07-af91-ad535f05c6fe';
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
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = 'c0a83d8c-e9e6-4e07-af91-ad535f05c6fe';
    $display->content['new-c0a83d8c-e9e6-4e07-af91-ad535f05c6fe'] = $pane;
    $display->panels['mini-center-secondary'][4] = 'new-c0a83d8c-e9e6-4e07-af91-ad535f05c6fe';
    $pane = new stdClass();
    $pane->pid = 'new-a3ce8d3e-6f63-42a7-8356-49753b21ef87';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_view';
    $pane->subtype = 'node';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'view_mode' => 'full',
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
    $pane->uuid = 'a3ce8d3e-6f63-42a7-8356-49753b21ef87';
    $display->content['new-a3ce8d3e-6f63-42a7-8356-49753b21ef87'] = $pane;
    $display->panels['mini-center-secondary'][5] = 'new-a3ce8d3e-6f63-42a7-8356-49753b21ef87';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_13'] = $handler;

  return $export;
}
