<?php
/**
 * @file
 * panel_app_list.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_app_list_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_5';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -23;
  $handler->conf = array(
    'title' => 'App list',
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
              'app_list' => 'app_list',
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
  $display->layout = 'adaptmini';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'mini' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '7027e312-eec2-4721-9fbe-4024ef1ea4ed';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-3b586045-bdda-4f46-86cb-58fd11e0f15e';
    $pane->panel = 'mini';
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
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '3b586045-bdda-4f46-86cb-58fd11e0f15e';
    $display->content['new-3b586045-bdda-4f46-86cb-58fd11e0f15e'] = $pane;
    $display->panels['mini'][0] = 'new-3b586045-bdda-4f46-86cb-58fd11e0f15e';
    $pane = new stdClass();
    $pane->pid = 'new-e06e9c5e-1d69-456b-b843-a1e1296b4070';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'references_app-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'app-references',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'e06e9c5e-1d69-456b-b843-a1e1296b4070';
    $display->content['new-e06e9c5e-1d69-456b-b843-a1e1296b4070'] = $pane;
    $display->panels['mini'][1] = 'new-e06e9c5e-1d69-456b-b843-a1e1296b4070';
    $pane = new stdClass();
    $pane->pid = 'new-65b646bb-ba66-4415-9a02-ca8d90fdd5a7';
    $pane->panel = 'mini';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Bottom',
      'title' => '',
      'body' => '<div class="bottom"></div>',
      'format' => 'full_html',
      'substitute' => 1,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '65b646bb-ba66-4415-9a02-ca8d90fdd5a7';
    $display->content['new-65b646bb-ba66-4415-9a02-ca8d90fdd5a7'] = $pane;
    $display->panels['mini'][2] = 'new-65b646bb-ba66-4415-9a02-ca8d90fdd5a7';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_5'] = $handler;

  return $export;
}
