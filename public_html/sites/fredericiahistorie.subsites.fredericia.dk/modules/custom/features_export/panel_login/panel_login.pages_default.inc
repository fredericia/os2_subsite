<?php
/**
 * @file
 * panel_login.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function panel_login_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'login';
  $page->task = 'page';
  $page->admin_title = 'Login';
  $page->admin_description = '';
  $page->path = 'login';
  $page->access = array();
  $page->menu = array();
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_login_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'login';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'adaptfourmini';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'mini' => NULL,
      'mini-bottom' => NULL,
      'mini-center' => NULL,
      'mini-center-secondary' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '08489429-362b-4e52-ad00-e30781195f5d';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-0c9c3306-99e2-45ce-95ab-1588c03e2127';
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
    $pane->uuid = '0c9c3306-99e2-45ce-95ab-1588c03e2127';
    $display->content['new-0c9c3306-99e2-45ce-95ab-1588c03e2127'] = $pane;
    $display->panels['mini'][0] = 'new-0c9c3306-99e2-45ce-95ab-1588c03e2127';
    $pane = new stdClass();
    $pane->pid = 'new-aae9c28c-da85-433f-9a0e-871ac5e26c63';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'block';
    $pane->subtype = 'user-login';
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
    $pane->uuid = 'aae9c28c-da85-433f-9a0e-871ac5e26c63';
    $display->content['new-aae9c28c-da85-433f-9a0e-871ac5e26c63'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-aae9c28c-da85-433f-9a0e-871ac5e26c63';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-0c9c3306-99e2-45ce-95ab-1588c03e2127';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['login'] = $page;

  return $pages;

}
