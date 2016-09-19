<?php
/**
 * @file
 * os2sub_frontpage.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function os2sub_frontpage_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'forside';
  $page->task = 'page';
  $page->admin_title = 'Forside';
  $page->admin_description = '';
  $page->path = 'forside';
  $page->access = array();
  $page->menu = array(
    'type' => 'none',
    'title' => '',
    'weight' => '0',
    'name' => 'navigation',
    'parent' => array(
      'type' => 'none',
      'title' => '',
      'weight' => 0,
      'name' => 'navigation',
    ),
  );
  $page->arguments = array();
  $page->conf = array();
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_forside__panel_context_5c441894-8350-417e-9a15-c48ae5410851';
  $handler->task = 'page';
  $handler->subtask = 'forside';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Landing page',
    'no_blocks' => FALSE,
    'pipeline' => 'ipe',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
  );
  $display = new panels_display();
  $display->layout = 'os2web-frontpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'content' => NULL,
      'footer' => NULL,
      'top' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Forside';
  $display->uuid = '5da30adc-aff3-4c40-9f04-0f1cf59e807e';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-054a37dd-733f-42a5-9bb9-4f64da59cea2';
    $pane->panel = 'content';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2sub_velkomst-panel_pane_1';
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
    $pane->uuid = '054a37dd-733f-42a5-9bb9-4f64da59cea2';
    $display->content['new-054a37dd-733f-42a5-9bb9-4f64da59cea2'] = $pane;
    $display->panels['content'][0] = 'new-054a37dd-733f-42a5-9bb9-4f64da59cea2';
    $pane = new stdClass();
    $pane->pid = 'new-4a87a1c0-d33c-4018-b044-126b4efc8de4';
    $pane->panel = 'footer';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_spotbokse';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '4',
      'pager_id' => '0',
      'offset' => '1',
      'more_link' => 0,
      'feed_icons' => 0,
      'panel_args' => 0,
      'link_to_view' => 0,
      'args' => '',
      'url' => '',
      'display' => 'block_2',
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'hidden-xs hidden-sm',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '4a87a1c0-d33c-4018-b044-126b4efc8de4';
    $display->content['new-4a87a1c0-d33c-4018-b044-126b4efc8de4'] = $pane;
    $display->panels['footer'][0] = 'new-4a87a1c0-d33c-4018-b044-126b4efc8de4';
    $pane = new stdClass();
    $pane->pid = 'new-edfbfc4d-d5a6-444d-81e3-b1828bf409d1';
    $pane->panel = 'footer';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_nyheder';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '10',
      'pager_id' => '0',
      'offset' => '0',
      'more_link' => 0,
      'feed_icons' => 0,
      'panel_args' => 0,
      'link_to_view' => 0,
      'args' => '',
      'url' => '',
      'display' => 'block_1',
      'override_title' => 0,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'edfbfc4d-d5a6-444d-81e3-b1828bf409d1';
    $display->content['new-edfbfc4d-d5a6-444d-81e3-b1828bf409d1'] = $pane;
    $display->panels['footer'][1] = 'new-edfbfc4d-d5a6-444d-81e3-b1828bf409d1';
    $pane = new stdClass();
    $pane->pid = 'new-a5cd909e-5ece-4038-b417-70138b51c711';
    $pane->panel = 'sidebar-left';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_spotbokse';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '1',
      'pager_id' => '0',
      'offset' => '0',
      'more_link' => 0,
      'feed_icons' => 0,
      'panel_args' => 0,
      'link_to_view' => 0,
      'args' => '',
      'url' => '',
      'display' => 'block',
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'hidden-xs hidden-sm',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'a5cd909e-5ece-4038-b417-70138b51c711';
    $display->content['new-a5cd909e-5ece-4038-b417-70138b51c711'] = $pane;
    $display->panels['sidebar-left'][0] = 'new-a5cd909e-5ece-4038-b417-70138b51c711';
    $pane = new stdClass();
    $pane->pid = 'new-0a309486-028f-4cc5-850a-360aa747f7d8';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_kontaktblok';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '5',
      'pager_id' => '0',
      'offset' => '0',
      'more_link' => 0,
      'feed_icons' => 0,
      'panel_args' => 0,
      'link_to_view' => 0,
      'args' => '',
      'url' => '',
      'display' => 'block',
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '0a309486-028f-4cc5-850a-360aa747f7d8';
    $display->content['new-0a309486-028f-4cc5-850a-360aa747f7d8'] = $pane;
    $display->panels['sidebar-right'][0] = 'new-0a309486-028f-4cc5-850a-360aa747f7d8';
    $pane = new stdClass();
    $pane->pid = 'new-e1070e0a-b9df-4343-8e86-513d5a0a4cad';
    $pane->panel = 'top';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_banner';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '5',
      'pager_id' => '0',
      'offset' => '0',
      'more_link' => 0,
      'feed_icons' => 0,
      'panel_args' => 0,
      'link_to_view' => 0,
      'args' => '',
      'url' => '',
      'display' => 'block',
      'override_title' => 0,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'e1070e0a-b9df-4343-8e86-513d5a0a4cad';
    $display->content['new-e1070e0a-b9df-4343-8e86-513d5a0a4cad'] = $pane;
    $display->panels['top'][0] = 'new-e1070e0a-b9df-4343-8e86-513d5a0a4cad';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['forside'] = $page;

  return $pages;

}
