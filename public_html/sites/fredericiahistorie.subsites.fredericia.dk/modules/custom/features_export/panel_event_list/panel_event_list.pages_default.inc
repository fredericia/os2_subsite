<?php
/**
 * @file
 * panel_event_list.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function panel_event_list_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'event_list';
  $page->task = 'page';
  $page->admin_title = 'Event list';
  $page->admin_description = '';
  $page->path = 'begivenheder';
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
  $handler->name = 'page_event_list_panel_context_2';
  $handler->task = 'page';
  $handler->subtask = 'event_list';
  $handler->handler = 'panel_context';
  $handler->weight = 1;
  $handler->conf = array(
    'title' => 'Event list',
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
  $display->title = 'Begivenheder';
  $display->uuid = '63508a31-d9df-4f6b-9fe1-21e4254eb25a';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-80a17b91-5d8a-4fd5-b052-61cd74eff287';
    $pane->panel = 'left-menu';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'menu_name' => 'main-menu',
      'parent_mlid' => 'main-menu:0',
      'title_link' => 0,
      'admin_title' => 'Undermenupunkter',
      'level' => '1',
      'follow' => 0,
      'depth' => 0,
      'expanded' => 1,
      'sort' => 0,
      'override_title' => 1,
      'override_title_text' => '',
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
    $pane->uuid = '80a17b91-5d8a-4fd5-b052-61cd74eff287';
    $display->content['new-80a17b91-5d8a-4fd5-b052-61cd74eff287'] = $pane;
    $display->panels['left-menu'][0] = 'new-80a17b91-5d8a-4fd5-b052-61cd74eff287';
    $pane = new stdClass();
    $pane->pid = 'new-efbc2f95-3f38-49c0-b888-d8bd9037a84c';
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
    $pane->uuid = 'efbc2f95-3f38-49c0-b888-d8bd9037a84c';
    $display->content['new-efbc2f95-3f38-49c0-b888-d8bd9037a84c'] = $pane;
    $display->panels['left-menu'][1] = 'new-efbc2f95-3f38-49c0-b888-d8bd9037a84c';
    $pane = new stdClass();
    $pane->pid = 'new-46fa03a5-3702-4e11-863c-e41371ff14d5';
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
    $pane->uuid = '46fa03a5-3702-4e11-863c-e41371ff14d5';
    $display->content['new-46fa03a5-3702-4e11-863c-e41371ff14d5'] = $pane;
    $display->panels['left-menu'][2] = 'new-46fa03a5-3702-4e11-863c-e41371ff14d5';
    $pane = new stdClass();
    $pane->pid = 'new-1e147f9d-d318-49f6-820f-dc3623735503';
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
    $pane->uuid = '1e147f9d-d318-49f6-820f-dc3623735503';
    $display->content['new-1e147f9d-d318-49f6-820f-dc3623735503'] = $pane;
    $display->panels['mini'][0] = 'new-1e147f9d-d318-49f6-820f-dc3623735503';
    $pane = new stdClass();
    $pane->pid = 'new-b4f8794b-f6b5-4e1a-b4c5-18a39adddc9f';
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
    $pane->uuid = 'b4f8794b-f6b5-4e1a-b4c5-18a39adddc9f';
    $display->content['new-b4f8794b-f6b5-4e1a-b4c5-18a39adddc9f'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-b4f8794b-f6b5-4e1a-b4c5-18a39adddc9f';
    $pane = new stdClass();
    $pane->pid = 'new-add3db33-ce0a-4208-8015-01036f78b448';
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
    $pane->uuid = 'add3db33-ce0a-4208-8015-01036f78b448';
    $display->content['new-add3db33-ce0a-4208-8015-01036f78b448'] = $pane;
    $display->panels['mini-bottom'][1] = 'new-add3db33-ce0a-4208-8015-01036f78b448';
    $pane = new stdClass();
    $pane->pid = 'new-ea1e0276-9341-40bf-b6f1-dab0e7e2d63a';
    $pane->panel = 'mini-center';
    $pane->type = 'views_panes';
    $pane->subtype = 'topimage-panel_pane_5';
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
    $pane->uuid = 'ea1e0276-9341-40bf-b6f1-dab0e7e2d63a';
    $display->content['new-ea1e0276-9341-40bf-b6f1-dab0e7e2d63a'] = $pane;
    $display->panels['mini-center'][0] = 'new-ea1e0276-9341-40bf-b6f1-dab0e7e2d63a';
    $pane = new stdClass();
    $pane->pid = 'new-d86532f8-81df-4e64-968e-0efb3c4c162d';
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
    $pane->uuid = 'd86532f8-81df-4e64-968e-0efb3c4c162d';
    $display->content['new-d86532f8-81df-4e64-968e-0efb3c4c162d'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-d86532f8-81df-4e64-968e-0efb3c4c162d';
    $pane = new stdClass();
    $pane->pid = 'new-c2eb98e8-6557-486b-ab09-b4e47b915df9';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'event-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'event-list',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'c2eb98e8-6557-486b-ab09-b4e47b915df9';
    $display->content['new-c2eb98e8-6557-486b-ab09-b4e47b915df9'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-c2eb98e8-6557-486b-ab09-b4e47b915df9';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_event_list_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'event_list';
  $handler->handler = 'panel_context';
  $handler->weight = 2;
  $handler->conf = array(
    'title' => 'Event list - app',
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
        1 => array(
          'name' => 'theme',
          'settings' => array(
            'theme' => 'fredhistapp',
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
  $display->uuid = 'a5b7f1f5-45dd-4f0c-8c58-d2920bdf1ba9';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-14cf1682-16b6-42f1-adeb-412b173c7cf0';
    $pane->panel = 'mini-bottom';
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
      'css_class' => 'app-references page',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '14cf1682-16b6-42f1-adeb-412b173c7cf0';
    $display->content['new-14cf1682-16b6-42f1-adeb-412b173c7cf0'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-14cf1682-16b6-42f1-adeb-412b173c7cf0';
    $pane = new stdClass();
    $pane->pid = 'new-05461050-3400-4767-9fed-4611951515b3';
    $pane->panel = 'mini-center';
    $pane->type = 'views_panes';
    $pane->subtype = 'topimage-panel_pane_3';
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '05461050-3400-4767-9fed-4611951515b3';
    $display->content['new-05461050-3400-4767-9fed-4611951515b3'] = $pane;
    $display->panels['mini-center'][0] = 'new-05461050-3400-4767-9fed-4611951515b3';
    $pane = new stdClass();
    $pane->pid = 'new-06489a3b-b33f-4fcb-abf3-8fb252050f7a';
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
    $pane->uuid = '06489a3b-b33f-4fcb-abf3-8fb252050f7a';
    $display->content['new-06489a3b-b33f-4fcb-abf3-8fb252050f7a'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-06489a3b-b33f-4fcb-abf3-8fb252050f7a';
    $pane = new stdClass();
    $pane->pid = 'new-29f52dc5-6ad0-4fc9-b9b5-5269853012d4';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'event-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'event-list',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '29f52dc5-6ad0-4fc9-b9b5-5269853012d4';
    $display->content['new-29f52dc5-6ad0-4fc9-b9b5-5269853012d4'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-29f52dc5-6ad0-4fc9-b9b5-5269853012d4';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['event_list'] = $page;

  return $pages;

}
