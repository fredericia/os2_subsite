<?php
/**
 * @file
 * panel_app_event_custom.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_app_event_custom_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_10';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -26;
  $handler->conf = array(
    'title' => 'App event custom',
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
  $display->uuid = 'ff405995-6e3b-4e0a-9900-05e3ff6665ec';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-ad1aa5e6-8ecb-43f7-813e-11a9d6d4d861';
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
    $pane->uuid = 'ad1aa5e6-8ecb-43f7-813e-11a9d6d4d861';
    $display->content['new-ad1aa5e6-8ecb-43f7-813e-11a9d6d4d861'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-ad1aa5e6-8ecb-43f7-813e-11a9d6d4d861';
    $pane = new stdClass();
    $pane->pid = 'new-07229900-e3e3-430c-9c29-214618c9ed03';
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
    $pane->uuid = '07229900-e3e3-430c-9c29-214618c9ed03';
    $display->content['new-07229900-e3e3-430c-9c29-214618c9ed03'] = $pane;
    $display->panels['mini-center'][0] = 'new-07229900-e3e3-430c-9c29-214618c9ed03';
    $pane = new stdClass();
    $pane->pid = 'new-00d81641-720e-4964-89dc-3db06bfd5adb';
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
    $pane->uuid = '00d81641-720e-4964-89dc-3db06bfd5adb';
    $display->content['new-00d81641-720e-4964-89dc-3db06bfd5adb'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-00d81641-720e-4964-89dc-3db06bfd5adb';
    $pane = new stdClass();
    $pane->pid = 'new-f368516c-0902-44f4-a86e-9a0f033de791';
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
    $pane->uuid = 'f368516c-0902-44f4-a86e-9a0f033de791';
    $display->content['new-f368516c-0902-44f4-a86e-9a0f033de791'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-f368516c-0902-44f4-a86e-9a0f033de791';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_10'] = $handler;

  return $export;
}
