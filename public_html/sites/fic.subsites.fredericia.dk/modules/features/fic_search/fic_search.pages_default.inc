<?php
/**
 * @file
 * fic_search.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function fic_search_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'fic_search';
  $page->task = 'page';
  $page->admin_title = 'FIC search';
  $page->admin_description = '';
  $page->path = 'soeg';
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
  $handler->name = 'page_fic_search__panel';
  $handler->task = 'page';
  $handler->subtask = 'fic_search';
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
    'name' => 'panel',
  );
  $display = new panels_display();
  $display->layout = 'full-width-dark-light-dark-with-right-sidebar-8-4';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'sidebar' => NULL,
      'content' => NULL,
      'bottom' => NULL,
      'dark_section_1' => NULL,
      'light_section_0' => NULL,
      'light_section_1' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'a44961a0-45e9-47f9-82af-268df6ecd8df';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_fic_search__panel';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-0d6c99e2-90dc-49b2-847b-2a218c88e52c';
  $pane->panel = 'content';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2sub_kulturnaut_multi_search-pane_activities_multi_search';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '0d6c99e2-90dc-49b2-847b-2a218c88e52c';
  $display->content['new-0d6c99e2-90dc-49b2-847b-2a218c88e52c'] = $pane;
  $display->panels['content'][0] = 'new-0d6c99e2-90dc-49b2-847b-2a218c88e52c';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['fic_search'] = $page;

  return $pages;

}
