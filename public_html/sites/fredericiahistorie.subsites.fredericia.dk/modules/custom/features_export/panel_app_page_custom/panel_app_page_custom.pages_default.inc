<?php
/**
 * @file
 * panel_app_page_custom.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_app_page_custom_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_8';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -27;
  $handler->conf = array(
    'title' => 'App page custom',
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
              'page' => 'page',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'theme',
          'settings' => array(
            'theme' => 'fredhistapp',
          ),
          'not' => FALSE,
        ),
        2 => array(
          'name' => 'entity_field_value:node:page:field_active_body',
          'settings' => array(
            'field_active_body' => array(
              'und' => array(
                0 => array(
                  'value' => 1,
                ),
              ),
            ),
            'field_active_body_value' => '1',
          ),
          'context' => 'argument_entity_id:node_1',
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
  $display->uuid = '68db400d-383b-418d-b5fd-4773aa0af23d';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-074549ba-22b5-4421-aa89-1897a469a2a3';
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
    $pane->uuid = '074549ba-22b5-4421-aa89-1897a469a2a3';
    $display->content['new-074549ba-22b5-4421-aa89-1897a469a2a3'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-074549ba-22b5-4421-aa89-1897a469a2a3';
    $pane = new stdClass();
    $pane->pid = 'new-234ff8ab-77ea-4601-957a-f0f29fb21381';
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
    $pane->uuid = '234ff8ab-77ea-4601-957a-f0f29fb21381';
    $display->content['new-234ff8ab-77ea-4601-957a-f0f29fb21381'] = $pane;
    $display->panels['mini-center'][0] = 'new-234ff8ab-77ea-4601-957a-f0f29fb21381';
    $pane = new stdClass();
    $pane->pid = 'new-5cd3727b-8278-4fba-9651-a91c1bea7c81';
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
    $pane->uuid = '5cd3727b-8278-4fba-9651-a91c1bea7c81';
    $display->content['new-5cd3727b-8278-4fba-9651-a91c1bea7c81'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-5cd3727b-8278-4fba-9651-a91c1bea7c81';
    $pane = new stdClass();
    $pane->pid = 'new-3cc23d17-ef36-4fcf-aac9-93c0717cd35b';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_body_app';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'text_default',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'body prose',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '3cc23d17-ef36-4fcf-aac9-93c0717cd35b';
    $display->content['new-3cc23d17-ef36-4fcf-aac9-93c0717cd35b'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-3cc23d17-ef36-4fcf-aac9-93c0717cd35b';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_8'] = $handler;

  return $export;
}
