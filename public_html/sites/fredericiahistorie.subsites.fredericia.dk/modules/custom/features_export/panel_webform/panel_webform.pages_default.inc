<?php
/**
 * @file
 * panel_webform.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_webform_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_12';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -20;
  $handler->conf = array(
    'title' => 'Webform',
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
              'webform' => 'webform',
            ),
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
  $display->uuid = '25c37412-1df9-4527-99f9-15906eb99903';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-fbca30f4-8d29-4dac-b8c1-05ab4bdf15c0';
    $pane->panel = 'left-menu';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'context_exists',
          'settings' => array(
            'exists' => '1',
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'menu_name' => 'main-menu',
      'parent_mlid' => '0',
      'title_link' => 0,
      'admin_title' => 'Undermenupunkter',
      'level' => '1',
      'follow' => 0,
      'depth' => '0',
      'expanded' => 1,
      'sort' => 0,
      'override_title' => 1,
      'override_title_text' => '',
      'parent' => 'main-menu:0',
      'depth_relative' => 0,
      'override_title_heading' => 'h2',
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
    $pane->uuid = 'fbca30f4-8d29-4dac-b8c1-05ab4bdf15c0';
    $display->content['new-fbca30f4-8d29-4dac-b8c1-05ab4bdf15c0'] = $pane;
    $display->panels['left-menu'][0] = 'new-fbca30f4-8d29-4dac-b8c1-05ab4bdf15c0';
    $pane = new stdClass();
    $pane->pid = 'new-cfb93ad9-f2fa-4b3b-aa12-e7dfa1562ba6';
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
    $pane->uuid = 'cfb93ad9-f2fa-4b3b-aa12-e7dfa1562ba6';
    $display->content['new-cfb93ad9-f2fa-4b3b-aa12-e7dfa1562ba6'] = $pane;
    $display->panels['mini'][0] = 'new-cfb93ad9-f2fa-4b3b-aa12-e7dfa1562ba6';
    $pane = new stdClass();
    $pane->pid = 'new-79edc89b-3579-436d-bef3-8f0b53ad9f86';
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
    $pane->uuid = '79edc89b-3579-436d-bef3-8f0b53ad9f86';
    $display->content['new-79edc89b-3579-436d-bef3-8f0b53ad9f86'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-79edc89b-3579-436d-bef3-8f0b53ad9f86';
    $pane = new stdClass();
    $pane->pid = 'new-31e4e46a-74aa-464d-a12b-b9019a3a02b0';
    $pane->panel = 'mini-center';
    $pane->type = 'views_panes';
    $pane->subtype = 'topimage-panel_pane_1';
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
    $pane->uuid = '31e4e46a-74aa-464d-a12b-b9019a3a02b0';
    $display->content['new-31e4e46a-74aa-464d-a12b-b9019a3a02b0'] = $pane;
    $display->panels['mini-center'][0] = 'new-31e4e46a-74aa-464d-a12b-b9019a3a02b0';
    $pane = new stdClass();
    $pane->pid = 'new-e29b72ab-c567-4962-9377-436b0b08e153';
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
    $pane->uuid = 'e29b72ab-c567-4962-9377-436b0b08e153';
    $display->content['new-e29b72ab-c567-4962-9377-436b0b08e153'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-e29b72ab-c567-4962-9377-436b0b08e153';
    $pane = new stdClass();
    $pane->pid = 'new-fe553ff2-fce6-4c0f-947b-e1622b5ab7ac';
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
    $pane->uuid = 'fe553ff2-fce6-4c0f-947b-e1622b5ab7ac';
    $display->content['new-fe553ff2-fce6-4c0f-947b-e1622b5ab7ac'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-fe553ff2-fce6-4c0f-947b-e1622b5ab7ac';
    $pane = new stdClass();
    $pane->pid = 'new-c6653d0b-9076-463c-b57a-f2a9eab45293';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'page_messages';
    $pane->subtype = 'page_messages';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'status-messages-container',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'c6653d0b-9076-463c-b57a-f2a9eab45293';
    $display->content['new-c6653d0b-9076-463c-b57a-f2a9eab45293'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-c6653d0b-9076-463c-b57a-f2a9eab45293';
    $pane = new stdClass();
    $pane->pid = 'new-84240dd8-e2f5-4c01-9c02-cd91540d4bfc';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field_extra';
    $pane->subtype = 'node:webform';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'view_mode' => 'full',
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
      'css_class' => 'webform-container',
    );
    $pane->extras = array();
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '84240dd8-e2f5-4c01-9c02-cd91540d4bfc';
    $display->content['new-84240dd8-e2f5-4c01-9c02-cd91540d4bfc'] = $pane;
    $display->panels['mini-center-secondary'][3] = 'new-84240dd8-e2f5-4c01-9c02-cd91540d4bfc';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_12'] = $handler;

  return $export;
}
