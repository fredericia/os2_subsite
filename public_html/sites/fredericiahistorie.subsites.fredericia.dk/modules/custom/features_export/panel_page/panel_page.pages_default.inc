<?php
/**
 * @file
 * panel_page.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_page_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_2';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -29;
  $handler->conf = array(
    'title' => 'Page',
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
  $display->title = '';
  $display->uuid = '0e346844-a802-4a16-8571-8cf2fbdfb78d';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-bc786c21-1049-44c6-9922-224dcc30f8c9';
    $pane->panel = 'left-menu';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array();
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
    $pane->uuid = 'bc786c21-1049-44c6-9922-224dcc30f8c9';
    $display->content['new-bc786c21-1049-44c6-9922-224dcc30f8c9'] = $pane;
    $display->panels['left-menu'][0] = 'new-bc786c21-1049-44c6-9922-224dcc30f8c9';
    $pane = new stdClass();
    $pane->pid = 'new-8b57c2b4-b67a-4d8d-9ec7-1bde68ceda4b';
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
    $pane->uuid = '8b57c2b4-b67a-4d8d-9ec7-1bde68ceda4b';
    $display->content['new-8b57c2b4-b67a-4d8d-9ec7-1bde68ceda4b'] = $pane;
    $display->panels['left-menu'][1] = 'new-8b57c2b4-b67a-4d8d-9ec7-1bde68ceda4b';
    $pane = new stdClass();
    $pane->pid = 'new-b9c1750e-9f97-42b5-81e7-70f378de9c13';
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
    $pane->uuid = 'b9c1750e-9f97-42b5-81e7-70f378de9c13';
    $display->content['new-b9c1750e-9f97-42b5-81e7-70f378de9c13'] = $pane;
    $display->panels['left-menu'][2] = 'new-b9c1750e-9f97-42b5-81e7-70f378de9c13';
    $pane = new stdClass();
    $pane->pid = 'new-bd51eed8-8166-49a9-a744-af0ec46805be';
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
    $pane->uuid = 'bd51eed8-8166-49a9-a744-af0ec46805be';
    $display->content['new-bd51eed8-8166-49a9-a744-af0ec46805be'] = $pane;
    $display->panels['mini'][0] = 'new-bd51eed8-8166-49a9-a744-af0ec46805be';
    $pane = new stdClass();
    $pane->pid = 'new-4267b828-3038-4eb5-8ad6-3fcdb30cdaf9';
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
    $pane->uuid = '4267b828-3038-4eb5-8ad6-3fcdb30cdaf9';
    $display->content['new-4267b828-3038-4eb5-8ad6-3fcdb30cdaf9'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-4267b828-3038-4eb5-8ad6-3fcdb30cdaf9';
    $pane = new stdClass();
    $pane->pid = 'new-1cd8f176-17a7-4346-8e8e-a736ed8531f5';
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
    $pane->uuid = '1cd8f176-17a7-4346-8e8e-a736ed8531f5';
    $display->content['new-1cd8f176-17a7-4346-8e8e-a736ed8531f5'] = $pane;
    $display->panels['mini-bottom'][1] = 'new-1cd8f176-17a7-4346-8e8e-a736ed8531f5';
    $pane = new stdClass();
    $pane->pid = 'new-7ee0ac28-d2de-4715-82b3-592b3f50806b';
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
    $pane->uuid = '7ee0ac28-d2de-4715-82b3-592b3f50806b';
    $display->content['new-7ee0ac28-d2de-4715-82b3-592b3f50806b'] = $pane;
    $display->panels['mini-center'][0] = 'new-7ee0ac28-d2de-4715-82b3-592b3f50806b';
    $pane = new stdClass();
    $pane->pid = 'new-9682e62b-768d-4996-8343-c9b7475dec4b';
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
    $pane->uuid = '9682e62b-768d-4996-8343-c9b7475dec4b';
    $display->content['new-9682e62b-768d-4996-8343-c9b7475dec4b'] = $pane;
    $display->panels['mini-center-secondary'][0] = 'new-9682e62b-768d-4996-8343-c9b7475dec4b';
    $pane = new stdClass();
    $pane->pid = 'new-00eefc99-1134-409d-9c56-736d5b4bf518';
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
    $pane->uuid = '00eefc99-1134-409d-9c56-736d5b4bf518';
    $display->content['new-00eefc99-1134-409d-9c56-736d5b4bf518'] = $pane;
    $display->panels['mini-center-secondary'][1] = 'new-00eefc99-1134-409d-9c56-736d5b4bf518';
    $pane = new stdClass();
    $pane->pid = 'new-fdfe22f8-6ce2-4ff5-8d12-e0a2619894b0';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'views_panes';
    $pane->subtype = 'body_center_img-panel_pane_1';
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'fdfe22f8-6ce2-4ff5-8d12-e0a2619894b0';
    $display->content['new-fdfe22f8-6ce2-4ff5-8d12-e0a2619894b0'] = $pane;
    $display->panels['mini-center-secondary'][2] = 'new-fdfe22f8-6ce2-4ff5-8d12-e0a2619894b0';
    $pane = new stdClass();
    $pane->pid = 'new-9a73f89a-cfe1-4505-827f-c27a86e809c3';
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '9a73f89a-cfe1-4505-827f-c27a86e809c3';
    $display->content['new-9a73f89a-cfe1-4505-827f-c27a86e809c3'] = $pane;
    $display->panels['mini-center-secondary'][3] = 'new-9a73f89a-cfe1-4505-827f-c27a86e809c3';
    $pane = new stdClass();
    $pane->pid = 'new-43f66933-0973-41bc-a33e-32036f96f090';
    $pane->panel = 'mini-center-secondary';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_audiofile';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'jplayer_player',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(
        'autoplay' => '0',
        'solution' => 'html, flash',
        'preload' => 'metadata',
        'volume' => '80',
        'muted' => '0',
        'repeat' => 'none',
        'backgroundColor' => '000000',
        'mode' => 'playlist',
      ),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = '43f66933-0973-41bc-a33e-32036f96f090';
    $display->content['new-43f66933-0973-41bc-a33e-32036f96f090'] = $pane;
    $display->panels['mini-center-secondary'][4] = 'new-43f66933-0973-41bc-a33e-32036f96f090';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_2'] = $handler;

  return $export;
}
