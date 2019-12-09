<?php
/**
 * @file
 * minipanel_footer.panels_default.inc
 */

/**
 * Implements hook_default_panels_mini().
 */
function minipanel_footer_default_panels_mini() {
  $export = array();

  $mini = new stdClass();
  $mini->disabled = FALSE; /* Edit this to true to make a default mini disabled initially */
  $mini->api_version = 1;
  $mini->name = 'footer';
  $mini->category = '';
  $mini->admin_title = 'Footer';
  $mini->admin_description = '';
  $mini->requiredcontexts = array();
  $mini->contexts = array(
    0 => array(
      'identifier' => 'Content',
      'keyword' => 'node',
      'name' => 'entity:node',
      'entity_id' => '14',
      'id' => 1,
    ),
  );
  $mini->relationships = array();
  $display = new panels_display();
  $display->layout = 'adaptmini';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'mini' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'a680585b-00d3-496e-9672-683e06e5432c';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-1c48a6da-2281-4cf5-a61c-c0d7d2f5153e';
    $pane->panel = 'mini';
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
      'context' => 'context_entity:node_1',
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '1c48a6da-2281-4cf5-a61c-c0d7d2f5153e';
    $display->content['new-1c48a6da-2281-4cf5-a61c-c0d7d2f5153e'] = $pane;
    $display->panels['mini'][0] = 'new-1c48a6da-2281-4cf5-a61c-c0d7d2f5153e';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $mini->display = $display;
  $export['footer'] = $mini;

  return $export;
}
