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
  $display->layout = 'os2web-2col-6-6-stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'content' => NULL,
      'footer' => NULL,
      'top' => NULL,
      'middle' => NULL,
      'left_above' => NULL,
      'right_above' => NULL,
      'left_below' => NULL,
      'right_below' => NULL,
      'bottom' => NULL,
      'content-left' => NULL,
      'content-right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Forside';
  $display->uuid = '5da30adc-aff3-4c40-9f04-0f1cf59e807e';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-9a7e0d6e-810a-449b-8804-ad56e902ce57';
    $pane->panel = 'content-left';
    $pane->type = 'node';
    $pane->subtype = 'node';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'nid' => '2',
      'links' => 0,
      'leave_node_title' => 1,
      'identifier' => '',
      'build_mode' => 'os2sub_spotbox_single',
      'link_node_title' => 0,
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '9a7e0d6e-810a-449b-8804-ad56e902ce57';
    $display->content['new-9a7e0d6e-810a-449b-8804-ad56e902ce57'] = $pane;
    $display->panels['content-left'][0] = 'new-9a7e0d6e-810a-449b-8804-ad56e902ce57';
    $pane = new stdClass();
    $pane->pid = 'new-258776d1-0b84-4735-bea3-d6acef0aaa5d';
    $pane->panel = 'content-right';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_list_4';
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '258776d1-0b84-4735-bea3-d6acef0aaa5d';
    $display->content['new-258776d1-0b84-4735-bea3-d6acef0aaa5d'] = $pane;
    $display->panels['content-right'][0] = 'new-258776d1-0b84-4735-bea3-d6acef0aaa5d';
    $pane = new stdClass();
    $pane->pid = 'new-54c8164e-e6b7-46cc-856d-092e05462159';
    $pane->panel = 'footer';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_list_2_3';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => 'Focus lige nu',
      'override_title_heading' => 'h3',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'panel-pane--full-width panel-pane--title-pinned',
      'template_suggestion' => 'views_panes',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '54c8164e-e6b7-46cc-856d-092e05462159';
    $display->content['new-54c8164e-e6b7-46cc-856d-092e05462159'] = $pane;
    $display->panels['footer'][0] = 'new-54c8164e-e6b7-46cc-856d-092e05462159';
    $pane = new stdClass();
    $pane->pid = 'new-fbca225a-1588-4913-bcf7-68486baf0a37';
    $pane->panel = 'footer';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_list_5_load_more';
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
    $pane->uuid = 'fbca225a-1588-4913-bcf7-68486baf0a37';
    $display->content['new-fbca225a-1588-4913-bcf7-68486baf0a37'] = $pane;
    $display->panels['footer'][1] = 'new-fbca225a-1588-4913-bcf7-68486baf0a37';
    $pane = new stdClass();
    $pane->pid = 'new-d2916789-2563-4e85-8f64-3037f929e45a';
    $pane->panel = 'footer';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_list_4_mini';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'panel-pane--full-width panel-pane--title-pinned',
      'template_suggestion' => 'views_panes',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'd2916789-2563-4e85-8f64-3037f929e45a';
    $display->content['new-d2916789-2563-4e85-8f64-3037f929e45a'] = $pane;
    $display->panels['footer'][2] = 'new-d2916789-2563-4e85-8f64-3037f929e45a';
    $pane = new stdClass();
    $pane->pid = 'new-309ef3cf-86ac-4697-879e-005b5f4ca53c';
    $pane->panel = 'top';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Calendar title',
      'title' => '',
      'body' => '<h2 class="pane-title pane-title--lifted">Kalender</h2>
',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '309ef3cf-86ac-4697-879e-005b5f4ca53c';
    $display->content['new-309ef3cf-86ac-4697-879e-005b5f4ca53c'] = $pane;
    $display->panels['top'][0] = 'new-309ef3cf-86ac-4697-879e-005b5f4ca53c';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['forside'] = $page;

  return $pages;

}
