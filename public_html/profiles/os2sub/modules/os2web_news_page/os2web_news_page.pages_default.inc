<?php
/**
 * @file
 * os2web_news_page.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function os2web_news_page_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'os2web_news_page';
  $page->task = 'page';
  $page->admin_title = 'OS2web News Page';
  $page->admin_description = '';
  $page->path = 'nyheder/!placering';
  $page->access = array(
    'type' => 'none',
    'settings' => NULL,
  );
  $page->menu = array();
  $page->arguments = array(
    'placering' => array(
      'id' => 1,
      'identifier' => 'Taksonomiterm: ID',
      'name' => 'term',
      'settings' => array(
        'input_form' => 'term',
        'vids' => array(
          11 => '11',
          8 => '8',
          2 => 0,
          6 => 0,
          10 => 0,
          4 => 0,
          12 => 0,
          13 => 0,
          5 => 0,
          7 => 0,
          3 => 0,
          1 => 0,
          9 => 0,
        ),
        'breadcrumb' => 1,
        'transform' => 1,
      ),
    ),
  );
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_os2web_news_page_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'os2web_news_page';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'os2web-news-page',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'threecol_33_34_33_stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
      'top' => NULL,
      'left' => NULL,
      'middle' => NULL,
      'right' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Nyheder %placering:name';
  $display->uuid = '081ac539-3f06-4993-90a7-ad5d06b656dc';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-298f754e-3315-4fa1-a272-ff30d87022c1';
    $pane->panel = 'bottom';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_news_page-panel_pane_4';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'field_os2web_base_field_struct_tid' => '%placering:name',
      ),
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'well',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '298f754e-3315-4fa1-a272-ff30d87022c1';
    $display->content['new-298f754e-3315-4fa1-a272-ff30d87022c1'] = $pane;
    $display->panels['bottom'][0] = 'new-298f754e-3315-4fa1-a272-ff30d87022c1';
    $pane = new stdClass();
    $pane->pid = 'new-ea4e7511-8077-4ca2-93ee-3e0abc239419';
    $pane->panel = 'bottom';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'RSS feed ikon',
      'title' => '',
      'body' => '<a href="/nyheder/all/all/rss.xml" target="_blank">RSS</a>',
      'format' => 'plain_text',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'ea4e7511-8077-4ca2-93ee-3e0abc239419';
    $display->content['new-ea4e7511-8077-4ca2-93ee-3e0abc239419'] = $pane;
    $display->panels['bottom'][1] = 'new-ea4e7511-8077-4ca2-93ee-3e0abc239419';
    $pane = new stdClass();
    $pane->pid = 'new-9aebf039-d29d-41b2-8062-41b21215b48c';
    $pane->panel = 'left';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_news_page-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'field_os2web_base_field_struct_tid' => '%placering:name',
      ),
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'well',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '9aebf039-d29d-41b2-8062-41b21215b48c';
    $display->content['new-9aebf039-d29d-41b2-8062-41b21215b48c'] = $pane;
    $display->panels['left'][0] = 'new-9aebf039-d29d-41b2-8062-41b21215b48c';
    $pane = new stdClass();
    $pane->pid = 'new-1d57592e-51f4-4714-9734-757b812c5ac6';
    $pane->panel = 'middle';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_news_page-panel_pane_3';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'field_os2web_base_field_struct_tid' => '%placering:name',
      ),
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'well',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '1d57592e-51f4-4714-9734-757b812c5ac6';
    $display->content['new-1d57592e-51f4-4714-9734-757b812c5ac6'] = $pane;
    $display->panels['middle'][0] = 'new-1d57592e-51f4-4714-9734-757b812c5ac6';
    $pane = new stdClass();
    $pane->pid = 'new-e0073dc0-80be-4748-8755-bd3bf01803a9';
    $pane->panel = 'right';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_news_page-panel_pane_5';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'field_os2web_base_field_struct_tid' => '%placering:name',
      ),
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'well',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'e0073dc0-80be-4748-8755-bd3bf01803a9';
    $display->content['new-e0073dc0-80be-4748-8755-bd3bf01803a9'] = $pane;
    $display->panels['right'][0] = 'new-e0073dc0-80be-4748-8755-bd3bf01803a9';
    $pane = new stdClass();
    $pane->pid = 'new-737b0a11-a435-4e27-befc-d8e85ea82b78';
    $pane->panel = 'top';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_news_page-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'field_os2web_base_field_struct_tid' => '%placering:name',
      ),
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'well',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '737b0a11-a435-4e27-befc-d8e85ea82b78';
    $display->content['new-737b0a11-a435-4e27-befc-d8e85ea82b78'] = $pane;
    $display->panels['top'][0] = 'new-737b0a11-a435-4e27-befc-d8e85ea82b78';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-737b0a11-a435-4e27-befc-d8e85ea82b78';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['os2web_news_page'] = $page;

  return $pages;

}
