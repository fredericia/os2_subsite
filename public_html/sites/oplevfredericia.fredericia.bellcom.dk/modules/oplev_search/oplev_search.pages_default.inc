<?php
/**
 * @file
 * oplev_search.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function oplev_search_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'os2sub_search';
  $page->task = 'page';
  $page->admin_title = 'OS2sub search';
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
  $handler->name = 'page_os2sub_search__panel';
  $handler->task = 'page';
  $handler->subtask = 'os2sub_search';
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
    'panels_breadcrumbs_state' => 1,
    'panels_breadcrumbs_titles' => 'Forside',
    'panels_breadcrumbs_paths' => '<front>',
    'panels_breadcrumbs_home' => 1,
  );
  $display = new panels_display();
  $display->layout = 'content-with-right-sidebar-8-4';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'middle' => NULL,
      'top' => NULL,
      'sidebar' => NULL,
      'content' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Søgeresultater';
  $display->uuid = 'c6af6dd8-e9a5-4470-b0d1-5db95689261e';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_os2sub_search__panel';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-da3ca8d2-837a-4498-b07c-9ec2b07f9a97';
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
  $pane->uuid = 'da3ca8d2-837a-4498-b07c-9ec2b07f9a97';
  $display->content['new-da3ca8d2-837a-4498-b07c-9ec2b07f9a97'] = $pane;
  $display->panels['content'][0] = 'new-da3ca8d2-837a-4498-b07c-9ec2b07f9a97';
  $pane = new stdClass();
  $pane->pid = 'new-5709d0cb-f5ce-4bef-a6b0-7529ffc0fccc';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'facetapi-Bz4u0LLN1MqLCeW71FVot6hAUpQEQBoL';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Type',
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
  $pane->uuid = '5709d0cb-f5ce-4bef-a6b0-7529ffc0fccc';
  $display->content['new-5709d0cb-f5ce-4bef-a6b0-7529ffc0fccc'] = $pane;
  $display->panels['sidebar'][0] = 'new-5709d0cb-f5ce-4bef-a6b0-7529ffc0fccc';
  $pane = new stdClass();
  $pane->pid = 'new-292c481c-b914-4d55-9aa6-5536eb196413';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'facetapi-A7dFARDFp03DlgXrw8Hqkgtec6CXdmr3';
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
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '292c481c-b914-4d55-9aa6-5536eb196413';
  $display->content['new-292c481c-b914-4d55-9aa6-5536eb196413'] = $pane;
  $display->panels['sidebar'][1] = 'new-292c481c-b914-4d55-9aa6-5536eb196413';
  $pane = new stdClass();
  $pane->pid = 'new-89378d67-7177-4b53-b1dd-9a46b00fb2c0';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'facetapi-fQNToBgWvm3yT7qgOGpGJNTxpOpG0h16';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Tema',
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
  $pane->uuid = '89378d67-7177-4b53-b1dd-9a46b00fb2c0';
  $display->content['new-89378d67-7177-4b53-b1dd-9a46b00fb2c0'] = $pane;
  $display->panels['sidebar'][2] = 'new-89378d67-7177-4b53-b1dd-9a46b00fb2c0';
  $pane = new stdClass();
  $pane->pid = 'new-da46ec25-d019-4061-a37c-b7d1b159a47f';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'facetapi-4nPsCNhUBV2uQPKMQ5u85u9hQcQm6UQt';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
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
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'da46ec25-d019-4061-a37c-b7d1b159a47f';
  $display->content['new-da46ec25-d019-4061-a37c-b7d1b159a47f'] = $pane;
  $display->panels['sidebar'][3] = 'new-da46ec25-d019-4061-a37c-b7d1b159a47f';
  $pane = new stdClass();
  $pane->pid = 'new-b91e0fe3-2b32-44e3-b688-942f52dc0b4f';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'facetapi-qJRwW8oADnji37TE1whh2UezjUjFXrE0';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Start',
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
  $pane->uuid = 'b91e0fe3-2b32-44e3-b688-942f52dc0b4f';
  $display->content['new-b91e0fe3-2b32-44e3-b688-942f52dc0b4f'] = $pane;
  $display->panels['sidebar'][4] = 'new-b91e0fe3-2b32-44e3-b688-942f52dc0b4f';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['os2sub_search'] = $page;

  return $pages;

}
