<?php
/**
 * @file
 * panel_search.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_search_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'search_node_panel_context';
  $handler->task = 'search';
  $handler->subtask = 'node';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Search',
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
  $display->title = 'Søgeresultater';
  $display->uuid = '4ce3a85e-4364-4a41-8742-c2c19ca58d2d';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-d5f3def9-422d-4153-8e29-35f0124f23aa';
    $pane->panel = 'left-menu';
    $pane->type = 'block';
    $pane->subtype = 'search-form';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => 'Ny søgning',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'search-form',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'd5f3def9-422d-4153-8e29-35f0124f23aa';
    $display->content['new-d5f3def9-422d-4153-8e29-35f0124f23aa'] = $pane;
    $display->panels['left-menu'][0] = 'new-d5f3def9-422d-4153-8e29-35f0124f23aa';
    $pane = new stdClass();
    $pane->pid = 'new-1828d796-6681-4e4a-97cd-5d4fb3b5fdee';
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
    $pane->uuid = '1828d796-6681-4e4a-97cd-5d4fb3b5fdee';
    $display->content['new-1828d796-6681-4e4a-97cd-5d4fb3b5fdee'] = $pane;
    $display->panels['mini'][0] = 'new-1828d796-6681-4e4a-97cd-5d4fb3b5fdee';
    $pane = new stdClass();
    $pane->pid = 'new-2ccc991b-8866-4d0c-9282-15a89a210f3b';
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
    $pane->uuid = '2ccc991b-8866-4d0c-9282-15a89a210f3b';
    $display->content['new-2ccc991b-8866-4d0c-9282-15a89a210f3b'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-2ccc991b-8866-4d0c-9282-15a89a210f3b';
    $pane = new stdClass();
    $pane->pid = 'new-f453a434-d47c-4228-b4ab-d4a589f73011';
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
    $pane->uuid = 'f453a434-d47c-4228-b4ab-d4a589f73011';
    $display->content['new-f453a434-d47c-4228-b4ab-d4a589f73011'] = $pane;
    $display->panels['mini-center'][0] = 'new-f453a434-d47c-4228-b4ab-d4a589f73011';
    $pane = new stdClass();
    $pane->pid = 'new-5cdd4f15-a41d-4958-84fd-f7bf1fc83f8e';
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
    $pane->uuid = '5cdd4f15-a41d-4958-84fd-f7bf1fc83f8e';
    $display->content['new-5cdd4f15-a41d-4958-84fd-f7bf1fc83f8e'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-5cdd4f15-a41d-4958-84fd-f7bf1fc83f8e';
    $pane = new stdClass();
    $pane->pid = 'new-9815c38f-9b20-498a-a861-1ced8fab3418';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'search_result';
    $pane->subtype = 'search_result';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'type' => 'node',
      'log' => 1,
      'override_empty' => 0,
      'empty_title' => '',
      'empty' => '',
      'empty_format' => 'plain_text',
      'override_no_key' => 0,
      'no_key_title' => '',
      'no_key' => '',
      'no_key_format' => 'plain_text',
      'context' => 'argument_string_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'search-results',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '9815c38f-9b20-498a-a861-1ced8fab3418';
    $display->content['new-9815c38f-9b20-498a-a861-1ced8fab3418'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-9815c38f-9b20-498a-a861-1ced8fab3418';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['search_node_panel_context'] = $handler;

  return $export;
}
