<?php
/**
 * @file
 * fic_page_settings.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function fic_page_settings_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__panel_context_38e272dc-4fcb-429b-bfab-07fa049970f0';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Sektionssider',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
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
  $display->storage_id = 'term_view__panel_context_38e272dc-4fcb-429b-bfab-07fa049970f0';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-fd64dc95-8b4a-486d-a902-b4af8d5025c5';
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
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'fd64dc95-8b4a-486d-a902-b4af8d5025c5';
  $display->content['new-fd64dc95-8b4a-486d-a902-b4af8d5025c5'] = $pane;
  $display->panels['light_section_1'][0] = 'new-fd64dc95-8b4a-486d-a902-b4af8d5025c5';
  $pane = new stdClass();
  $pane->pid = 'new-a7d04197-787b-4360-a736-bfe253cceb77';
  $pane->panel = 'light_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_for_tag';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_term_1',
    ),
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'a7d04197-787b-4360-a736-bfe253cceb77';
  $display->content['new-a7d04197-787b-4360-a736-bfe253cceb77'] = $pane;
  $display->panels['light_section_1'][1] = 'new-a7d04197-787b-4360-a736-bfe253cceb77';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-fd64dc95-8b4a-486d-a902-b4af8d5025c5';
  $handler->conf['display'] = $display;
  $export['term_view__panel_context_38e272dc-4fcb-429b-bfab-07fa049970f0'] = $handler;

  return $export;
}

/**
 * Implements hook_default_page_manager_pages().
 */
function fic_page_settings_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'fic_frontpage';
  $page->task = 'page';
  $page->admin_title = 'FIC Frontpage';
  $page->admin_description = '';
  $page->path = 'fic';
  $page->access = array();
  $page->menu = array();
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_fic_frontpage__panel';
  $handler->task = 'page';
  $handler->subtask = 'fic_frontpage';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'panel',
  );
  $display = new panels_display();
  $display->layout = 'flexible';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '8b2b90ee-46b7-49d3-b65e-99338f4f3a4a';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_fic_frontpage__panel';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-48069c2e-9da4-4428-9f1f-f2dedf977652';
  $pane->panel = 'center';
  $pane->type = 'views';
  $pane->subtype = 'fic_header_banners';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_pager_settings' => 0,
    'use_pager' => 1,
    'nodes_per_page' => '0',
    'pager_id' => '0',
    'offset' => '0',
    'more_link' => 0,
    'feed_icons' => 0,
    'panel_args' => 0,
    'link_to_view' => 0,
    'args' => '',
    'url' => '',
    'display' => 'block_1',
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '48069c2e-9da4-4428-9f1f-f2dedf977652';
  $display->content['new-48069c2e-9da4-4428-9f1f-f2dedf977652'] = $pane;
  $display->panels['center'][0] = 'new-48069c2e-9da4-4428-9f1f-f2dedf977652';
  $pane = new stdClass();
  $pane->pid = 'new-5c5d563e-bedf-40d2-aede-66998d36167e';
  $pane->panel = 'center';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_list_4_mini';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '5c5d563e-bedf-40d2-aede-66998d36167e';
  $display->content['new-5c5d563e-bedf-40d2-aede-66998d36167e'] = $pane;
  $display->panels['center'][1] = 'new-5c5d563e-bedf-40d2-aede-66998d36167e';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-48069c2e-9da4-4428-9f1f-f2dedf977652';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['fic_frontpage'] = $page;

  return $pages;

}
