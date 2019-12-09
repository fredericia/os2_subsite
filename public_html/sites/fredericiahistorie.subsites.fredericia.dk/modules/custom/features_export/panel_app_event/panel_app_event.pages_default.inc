<?php
/**
 * @file
 * panel_app_event.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_app_event_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_11';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -24;
  $handler->conf = array(
    'title' => 'App event',
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
              'event' => 'event',
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
  $display->uuid = '41e7a5f5-fe78-4a26-b0ae-1457d3de816e';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-a8dc6949-6ea5-4824-9aed-f39c6c62b852';
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
    $pane->uuid = 'a8dc6949-6ea5-4824-9aed-f39c6c62b852';
    $display->content['new-a8dc6949-6ea5-4824-9aed-f39c6c62b852'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-a8dc6949-6ea5-4824-9aed-f39c6c62b852';
    $pane = new stdClass();
    $pane->pid = 'new-23ff744c-6752-49a5-a484-0d8bf1c06366';
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
    $pane->uuid = '23ff744c-6752-49a5-a484-0d8bf1c06366';
    $display->content['new-23ff744c-6752-49a5-a484-0d8bf1c06366'] = $pane;
    $display->panels['mini-center'][0] = 'new-23ff744c-6752-49a5-a484-0d8bf1c06366';
    $pane = new stdClass();
    $pane->pid = 'new-4368fdf5-0114-4973-834f-2c313ac9cb81';
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
    $pane->uuid = '4368fdf5-0114-4973-834f-2c313ac9cb81';
    $display->content['new-4368fdf5-0114-4973-834f-2c313ac9cb81'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-4368fdf5-0114-4973-834f-2c313ac9cb81';
    $pane = new stdClass();
    $pane->pid = 'new-93ac060d-3a6b-497c-a02e-db5a0d53ac66';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:body';
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
      'css_class' => 'body',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '93ac060d-3a6b-497c-a02e-db5a0d53ac66';
    $display->content['new-93ac060d-3a6b-497c-a02e-db5a0d53ac66'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-93ac060d-3a6b-497c-a02e-db5a0d53ac66';
    $pane = new stdClass();
    $pane->pid = 'new-99185c1d-c8f8-4b55-b3cc-2477d593b796';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_second_body';
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '99185c1d-c8f8-4b55-b3cc-2477d593b796';
    $display->content['new-99185c1d-c8f8-4b55-b3cc-2477d593b796'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-99185c1d-c8f8-4b55-b3cc-2477d593b796';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_11'] = $handler;

  return $export;
}
