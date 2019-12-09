<?php
/**
 * @file
 * panel_app_page.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_app_page_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_6';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -25;
  $handler->conf = array(
    'title' => 'App page',
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
  $display->uuid = 'c5ef198d-887f-4155-a1d7-016ca853164a';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-bd40b891-b22a-4618-ba82-5a245ca54c53';
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
    $pane->uuid = 'bd40b891-b22a-4618-ba82-5a245ca54c53';
    $display->content['new-bd40b891-b22a-4618-ba82-5a245ca54c53'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-bd40b891-b22a-4618-ba82-5a245ca54c53';
    $pane = new stdClass();
    $pane->pid = 'new-d4274890-f483-40b5-beb6-5e1ca504da08';
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
    $pane->uuid = 'd4274890-f483-40b5-beb6-5e1ca504da08';
    $display->content['new-d4274890-f483-40b5-beb6-5e1ca504da08'] = $pane;
    $display->panels['mini-center'][0] = 'new-d4274890-f483-40b5-beb6-5e1ca504da08';
    $pane = new stdClass();
    $pane->pid = 'new-d12590e8-067d-483f-b2f4-325d82bc3f36';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'page_title';
    $pane->subtype = 'page_title';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'entity_field_value:node:page:field_active_title_app',
          'settings' => array(
            'field_active_title_app' => array(
              'und' => array(
                0 => array(
                  'value' => 1,
                ),
              ),
            ),
            'field_active_title_app_value' => '1',
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => TRUE,
        ),
      ),
    );
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
    $pane->uuid = 'd12590e8-067d-483f-b2f4-325d82bc3f36';
    $display->content['new-d12590e8-067d-483f-b2f4-325d82bc3f36'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-d12590e8-067d-483f-b2f4-325d82bc3f36';
    $pane = new stdClass();
    $pane->pid = 'new-9796baf5-53ee-4c58-85fc-3c3947a831ad';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_page_title_app';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'entity_field_value:node:page:field_active_title_app',
          'settings' => array(
            'field_active_title_app' => array(
              'und' => array(
                0 => array(
                  'value' => 1,
                ),
              ),
            ),
            'field_active_title_app_value' => '1',
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
    );
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
      'css_class' => 'page-title app-custom',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '9796baf5-53ee-4c58-85fc-3c3947a831ad';
    $display->content['new-9796baf5-53ee-4c58-85fc-3c3947a831ad'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-9796baf5-53ee-4c58-85fc-3c3947a831ad';
    $pane = new stdClass();
    $pane->pid = 'new-abf0ba95-8ed7-4f54-b7ee-4a3350e577db';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:body';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
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
          'not' => TRUE,
        ),
      ),
    );
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
    $pane->uuid = 'abf0ba95-8ed7-4f54-b7ee-4a3350e577db';
    $display->content['new-abf0ba95-8ed7-4f54-b7ee-4a3350e577db'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-abf0ba95-8ed7-4f54-b7ee-4a3350e577db';
    $pane = new stdClass();
    $pane->pid = 'new-a436a4a6-1cf8-4d7d-b08e-7bb6906056b4';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_second_body';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
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
          'not' => TRUE,
        ),
      ),
    );
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = 'a436a4a6-1cf8-4d7d-b08e-7bb6906056b4';
    $display->content['new-a436a4a6-1cf8-4d7d-b08e-7bb6906056b4'] = $pane;
    $display->panels['mini-center-secondary'][3] = 'new-a436a4a6-1cf8-4d7d-b08e-7bb6906056b4';
    $pane = new stdClass();
    $pane->pid = 'new-a0545ea7-1a6e-4340-b8cd-f4227486480a';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_body_app';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
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
    );
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
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = 'a0545ea7-1a6e-4340-b8cd-f4227486480a';
    $display->content['new-a0545ea7-1a6e-4340-b8cd-f4227486480a'] = $pane;
    $display->panels['mini-center-secondary'][4] = 'new-a0545ea7-1a6e-4340-b8cd-f4227486480a';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_6'] = $handler;

  return $export;
}
