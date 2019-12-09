<?php
/**
 * @file
 * panel_default.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_default_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_3';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -18;
  $handler->conf = array(
    'title' => 'Default',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(),
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
  $display->uuid = '31561e9f-ecbd-4ab9-a164-7006306fbb7d';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-63f21a29-b8a7-430f-8e21-204f521fa5eb';
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
    $pane->uuid = '63f21a29-b8a7-430f-8e21-204f521fa5eb';
    $display->content['new-63f21a29-b8a7-430f-8e21-204f521fa5eb'] = $pane;
    $display->panels['left-menu'][0] = 'new-63f21a29-b8a7-430f-8e21-204f521fa5eb';
    $pane = new stdClass();
    $pane->pid = 'new-12bbfe76-7d88-44d5-84a2-f6fbce7889e2';
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
    $pane->uuid = '12bbfe76-7d88-44d5-84a2-f6fbce7889e2';
    $display->content['new-12bbfe76-7d88-44d5-84a2-f6fbce7889e2'] = $pane;
    $display->panels['mini'][0] = 'new-12bbfe76-7d88-44d5-84a2-f6fbce7889e2';
    $pane = new stdClass();
    $pane->pid = 'new-c874f317-74c9-4beb-b090-41b3accaa5d5';
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
    $pane->uuid = 'c874f317-74c9-4beb-b090-41b3accaa5d5';
    $display->content['new-c874f317-74c9-4beb-b090-41b3accaa5d5'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-c874f317-74c9-4beb-b090-41b3accaa5d5';
    $pane = new stdClass();
    $pane->pid = 'new-57d2ff1b-4892-4114-9ab1-e16a585996a3';
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
    $pane->uuid = '57d2ff1b-4892-4114-9ab1-e16a585996a3';
    $display->content['new-57d2ff1b-4892-4114-9ab1-e16a585996a3'] = $pane;
    $display->panels['mini-center'][0] = 'new-57d2ff1b-4892-4114-9ab1-e16a585996a3';
    $pane = new stdClass();
    $pane->pid = 'new-f649982f-fef1-48d1-8a30-790516943b94';
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
    $pane->uuid = 'f649982f-fef1-48d1-8a30-790516943b94';
    $display->content['new-f649982f-fef1-48d1-8a30-790516943b94'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-f649982f-fef1-48d1-8a30-790516943b94';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_3'] = $handler;

  return $export;
}
