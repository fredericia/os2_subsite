<?php
/**
 * @file
 * panel_front.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_front_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -30;
  $handler->conf = array(
    'title' => 'Front',
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
              'front' => 'front',
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
  $display->layout = 'adaptfourmini';
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
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '9080ad80-5f38-47f7-b6cc-34c7572d4bf5';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-57ebaf56-f20b-4bab-9cff-5f49ef72c8fe';
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
    $pane->uuid = '57ebaf56-f20b-4bab-9cff-5f49ef72c8fe';
    $display->content['new-57ebaf56-f20b-4bab-9cff-5f49ef72c8fe'] = $pane;
    $display->panels['mini'][0] = 'new-57ebaf56-f20b-4bab-9cff-5f49ef72c8fe';
    $pane = new stdClass();
    $pane->pid = 'new-ee831609-f556-4458-85d3-d5d82ab38eab';
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
    $pane->uuid = 'ee831609-f556-4458-85d3-d5d82ab38eab';
    $display->content['new-ee831609-f556-4458-85d3-d5d82ab38eab'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-ee831609-f556-4458-85d3-d5d82ab38eab';
    $pane = new stdClass();
    $pane->pid = 'new-1c85b7f6-1176-47bf-8128-49f91d07e28a';
    $pane->panel = 'mini-bottom';
    $pane->type = 'openlayers_map';
    $pane->subtype = 'fredericia_fe';
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
    $pane->uuid = '1c85b7f6-1176-47bf-8128-49f91d07e28a';
    $display->content['new-1c85b7f6-1176-47bf-8128-49f91d07e28a'] = $pane;
    $display->panels['mini-bottom'][1] = 'new-1c85b7f6-1176-47bf-8128-49f91d07e28a';
    $pane = new stdClass();
    $pane->pid = 'new-10db6755-b616-4618-a414-6e7b4798565b';
    $pane->panel = 'mini-center';
    $pane->type = 'views_panes';
    $pane->subtype = 'topimage-panel_pane_4';
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
    $pane->uuid = '10db6755-b616-4618-a414-6e7b4798565b';
    $display->content['new-10db6755-b616-4618-a414-6e7b4798565b'] = $pane;
    $display->panels['mini-center'][0] = 'new-10db6755-b616-4618-a414-6e7b4798565b';
    $pane = new stdClass();
    $pane->pid = 'new-7fccec36-18e6-45df-803a-12de0efd2cde';
    $pane->panel = 'mini-center';
    $pane->type = 'views_panes';
    $pane->subtype = 'frontpage_tiles-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'topimage-description',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '7fccec36-18e6-45df-803a-12de0efd2cde';
    $display->content['new-7fccec36-18e6-45df-803a-12de0efd2cde'] = $pane;
    $display->panels['mini-center'][1] = 'new-7fccec36-18e6-45df-803a-12de0efd2cde';
    $pane = new stdClass();
    $pane->pid = 'new-971ea69f-4e5a-4c61-b92e-4cb832e0f493';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'frontpage_tiles-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'frontpage-tile',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '971ea69f-4e5a-4c61-b92e-4cb832e0f493';
    $display->content['new-971ea69f-4e5a-4c61-b92e-4cb832e0f493'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-971ea69f-4e5a-4c61-b92e-4cb832e0f493';
    $pane = new stdClass();
    $pane->pid = 'new-0b3fa612-f651-4cdf-9fbb-68e8121d7ce1';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'frontpage_tiles-panel_pane_3';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'frontpage-tile-top-right',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '0b3fa612-f651-4cdf-9fbb-68e8121d7ce1';
    $display->content['new-0b3fa612-f651-4cdf-9fbb-68e8121d7ce1'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-0b3fa612-f651-4cdf-9fbb-68e8121d7ce1';
    $pane = new stdClass();
    $pane->pid = 'new-20809cb6-f777-4e84-905d-866a39d0a330';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'frontpage_tiles-panel_pane_4';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'front-tile-center-img',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '20809cb6-f777-4e84-905d-866a39d0a330';
    $display->content['new-20809cb6-f777-4e84-905d-866a39d0a330'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-20809cb6-f777-4e84-905d-866a39d0a330';
    $pane = new stdClass();
    $pane->pid = 'new-235f13a1-8003-4d12-8317-94aea46136fe';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'frontpage_tiles-panel_pane_6';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'front-tile-center-box',
    );
    $pane->extras = array();
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '235f13a1-8003-4d12-8317-94aea46136fe';
    $display->content['new-235f13a1-8003-4d12-8317-94aea46136fe'] = $pane;
    $display->panels['mini-center-secondary'][3] = 'new-235f13a1-8003-4d12-8317-94aea46136fe';
    $pane = new stdClass();
    $pane->pid = 'new-6bf5a050-1a8a-46c2-88ba-329a144ffc8d';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'frontpage_tiles-panel_pane_5';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'front-tile-left-bottom',
    );
    $pane->extras = array();
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = '6bf5a050-1a8a-46c2-88ba-329a144ffc8d';
    $display->content['new-6bf5a050-1a8a-46c2-88ba-329a144ffc8d'] = $pane;
    $display->panels['mini-center-secondary'][4] = 'new-6bf5a050-1a8a-46c2-88ba-329a144ffc8d';
    $pane = new stdClass();
    $pane->pid = 'new-6eb900c3-f9d1-4297-b2fc-efd4fe7f7ddd';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'frontpage_tiles-panel_pane_7';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'front-tile-right-bottom',
    );
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = '6eb900c3-f9d1-4297-b2fc-efd4fe7f7ddd';
    $display->content['new-6eb900c3-f9d1-4297-b2fc-efd4fe7f7ddd'] = $pane;
    $display->panels['mini-center-secondary'][5] = 'new-6eb900c3-f9d1-4297-b2fc-efd4fe7f7ddd';
    $pane = new stdClass();
    $pane->pid = 'new-74b4d7dd-f0a7-4ba4-a20f-741e62336c42';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_text';
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
      'css_class' => 'bottom-text',
    );
    $pane->extras = array();
    $pane->position = 6;
    $pane->locks = array();
    $pane->uuid = '74b4d7dd-f0a7-4ba4-a20f-741e62336c42';
    $display->content['new-74b4d7dd-f0a7-4ba4-a20f-741e62336c42'] = $pane;
    $display->panels['mini-center-secondary'][6] = 'new-74b4d7dd-f0a7-4ba4-a20f-741e62336c42';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context'] = $handler;

  return $export;
}
