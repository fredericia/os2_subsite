<?php
/**
 * @file
 * panel_app_frontpage.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_app_frontpage_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_4';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -28;
  $handler->conf = array(
    'title' => 'App frontpage',
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
              'app_frontpage' => 'app_frontpage',
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
  $display->uuid = '580589c9-a12d-41f1-9bf9-1cc47df690d0';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-c9e092cd-36d9-43c2-8b1c-280558a2cd34';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile-1 tile',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'c9e092cd-36d9-43c2-8b1c-280558a2cd34';
    $display->content['new-c9e092cd-36d9-43c2-8b1c-280558a2cd34'] = $pane;
    $display->panels['mini'][0] = 'new-c9e092cd-36d9-43c2-8b1c-280558a2cd34';
    $pane = new stdClass();
    $pane->pid = 'new-09ae87ea-fe51-4d07-a6a9-819f9a422885';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile-2 tile',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '09ae87ea-fe51-4d07-a6a9-819f9a422885';
    $display->content['new-09ae87ea-fe51-4d07-a6a9-819f9a422885'] = $pane;
    $display->panels['mini'][1] = 'new-09ae87ea-fe51-4d07-a6a9-819f9a422885';
    $pane = new stdClass();
    $pane->pid = 'new-113966e3-f1df-4b77-a0bb-c9e4a4b08de7';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_4';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile tile-4',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '113966e3-f1df-4b77-a0bb-c9e4a4b08de7';
    $display->content['new-113966e3-f1df-4b77-a0bb-c9e4a4b08de7'] = $pane;
    $display->panels['mini'][2] = 'new-113966e3-f1df-4b77-a0bb-c9e4a4b08de7';
    $pane = new stdClass();
    $pane->pid = 'new-d2f37f4d-0900-4874-8a17-7f7d1a29b0ad';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_3';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile-3 tile',
    );
    $pane->extras = array();
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = 'd2f37f4d-0900-4874-8a17-7f7d1a29b0ad';
    $display->content['new-d2f37f4d-0900-4874-8a17-7f7d1a29b0ad'] = $pane;
    $display->panels['mini'][3] = 'new-d2f37f4d-0900-4874-8a17-7f7d1a29b0ad';
    $pane = new stdClass();
    $pane->pid = 'new-e64f5318-504e-44f8-9bf6-3d08110d0fad';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_5';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile tile-5',
    );
    $pane->extras = array();
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = 'e64f5318-504e-44f8-9bf6-3d08110d0fad';
    $display->content['new-e64f5318-504e-44f8-9bf6-3d08110d0fad'] = $pane;
    $display->panels['mini'][4] = 'new-e64f5318-504e-44f8-9bf6-3d08110d0fad';
    $pane = new stdClass();
    $pane->pid = 'new-d4d60396-579e-495f-b442-497a8138937d';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_6';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile tile-6',
    );
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = 'd4d60396-579e-495f-b442-497a8138937d';
    $display->content['new-d4d60396-579e-495f-b442-497a8138937d'] = $pane;
    $display->panels['mini'][5] = 'new-d4d60396-579e-495f-b442-497a8138937d';
    $pane = new stdClass();
    $pane->pid = 'new-4917ab83-c775-4afb-9e9d-17ccef875dc8';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_7';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile tile-7',
    );
    $pane->extras = array();
    $pane->position = 6;
    $pane->locks = array();
    $pane->uuid = '4917ab83-c775-4afb-9e9d-17ccef875dc8';
    $display->content['new-4917ab83-c775-4afb-9e9d-17ccef875dc8'] = $pane;
    $display->panels['mini'][6] = 'new-4917ab83-c775-4afb-9e9d-17ccef875dc8';
    $pane = new stdClass();
    $pane->pid = 'new-504f442e-f544-48a0-8766-1dd3d4c676fe';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_8';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile tile-8',
    );
    $pane->extras = array();
    $pane->position = 7;
    $pane->locks = array();
    $pane->uuid = '504f442e-f544-48a0-8766-1dd3d4c676fe';
    $display->content['new-504f442e-f544-48a0-8766-1dd3d4c676fe'] = $pane;
    $display->panels['mini'][7] = 'new-504f442e-f544-48a0-8766-1dd3d4c676fe';
    $pane = new stdClass();
    $pane->pid = 'new-727e4961-928a-4ecd-819b-ba87440b19dd';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'app_frontpage_tiles-panel_pane_9';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'tile tile-9',
    );
    $pane->extras = array();
    $pane->position = 8;
    $pane->locks = array();
    $pane->uuid = '727e4961-928a-4ecd-819b-ba87440b19dd';
    $display->content['new-727e4961-928a-4ecd-819b-ba87440b19dd'] = $pane;
    $display->panels['mini'][8] = 'new-727e4961-928a-4ecd-819b-ba87440b19dd';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_4'] = $handler;

  return $export;
}
