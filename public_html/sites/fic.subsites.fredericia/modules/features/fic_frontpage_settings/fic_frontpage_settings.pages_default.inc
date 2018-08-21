<?php
/**
 * @file
 * fic_frontpage_settings.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function fic_frontpage_settings_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__frontpage-term';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -2;
  $handler->conf = array(
    'title' => 'Frontpage term',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'frontpage-term',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'entity_bundle:taxonomy_term',
          'settings' => array(
            'type' => array(
              'os2web_base_tax_site_structure' => 'os2web_base_tax_site_structure',
            ),
          ),
          'context' => 'argument_term_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'front',
          'settings' => NULL,
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'full-width-dark-light-dark';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
      'light_section_1' => NULL,
      'dark_section_1' => NULL,
      'dark_section_2' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '63f29836-972d-4b91-8d1a-77aef61b78ed';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'term_view__frontpage-term';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-b0bc286e-7250-4e11-a4c6-4df3e51a824a';
  $pane->panel = 'dark_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_kommende_arrangementer-panel_pane_3';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 1,
    'path' => 'fic-kommende-arrangementer',
    'override_title' => 0,
    'override_title_text' => 'Kommende arrangementer',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'bg-white',
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'b0bc286e-7250-4e11-a4c6-4df3e51a824a';
  $display->content['new-b0bc286e-7250-4e11-a4c6-4df3e51a824a'] = $pane;
  $display->panels['dark_section_1'][0] = 'new-b0bc286e-7250-4e11-a4c6-4df3e51a824a';
  $pane = new stdClass();
  $pane->pid = 'new-82c4f8e4-44b7-411f-ad2c-0725bbb82bcd';
  $pane->panel = 'light_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_artikler-panel_pane_1';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'field_sektion_tid' => '',
      'nid' => '',
    ),
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
    'exposed' => array(
      'promote' => '1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'bg-dark',
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '82c4f8e4-44b7-411f-ad2c-0725bbb82bcd';
  $display->content['new-82c4f8e4-44b7-411f-ad2c-0725bbb82bcd'] = $pane;
  $display->panels['light_section_1'][0] = 'new-82c4f8e4-44b7-411f-ad2c-0725bbb82bcd';
  $pane = new stdClass();
  $pane->pid = 'new-4c467a4b-c3a0-4f27-874a-c08640ea9a10';
  $pane->panel = 'light_section_1';
  $pane->type = 'views';
  $pane->subtype = 'instagram_billeder';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'override_pager_settings' => 0,
    'use_pager' => 0,
    'nodes_per_page' => '7',
    'pager_id' => '0',
    'offset' => '0',
    'more_link' => 0,
    'feed_icons' => 0,
    'panel_args' => 0,
    'link_to_view' => 0,
    'args' => '',
    'url' => '',
    'display' => 'block',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'bg-darker',
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '4c467a4b-c3a0-4f27-874a-c08640ea9a10';
  $display->content['new-4c467a4b-c3a0-4f27-874a-c08640ea9a10'] = $pane;
  $display->panels['light_section_1'][1] = 'new-4c467a4b-c3a0-4f27-874a-c08640ea9a10';
  $pane = new stdClass();
  $pane->pid = 'new-afb36340-1601-4177-b9d1-b29593f74330';
  $pane->panel = 'light_section_1';
  $pane->type = 'entity_field';
  $pane->subtype = 'taxonomy_term:field_afsnit';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'paragraphs_view',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'view_mode' => 'full',
    ),
    'context' => 'argument_term_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'paragraphs',
  );
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'afb36340-1601-4177-b9d1-b29593f74330';
  $display->content['new-afb36340-1601-4177-b9d1-b29593f74330'] = $pane;
  $display->panels['light_section_1'][2] = 'new-afb36340-1601-4177-b9d1-b29593f74330';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__frontpage-term'] = $handler;

  return $export;
}
