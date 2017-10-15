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
  $pane->pid = 'new-909e1b2b-12fc-49b4-9269-2c171c4f24a2';
  $pane->panel = 'dark_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_sektion_header-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '909e1b2b-12fc-49b4-9269-2c171c4f24a2';
  $display->content['new-909e1b2b-12fc-49b4-9269-2c171c4f24a2'] = $pane;
  $display->panels['dark_section_1'][0] = 'new-909e1b2b-12fc-49b4-9269-2c171c4f24a2';
  $pane = new stdClass();
  $pane->pid = 'new-cb60b7b3-93f2-4014-9c55-9b41070764d7';
  $pane->panel = 'dark_section_2';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_kommende_arrangementer-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 1,
    'arguments' => array(
      'term_node_tid_depth' => '%term:tid',
    ),
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
    'css_class' => 'bg-white',
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'cb60b7b3-93f2-4014-9c55-9b41070764d7';
  $display->content['new-cb60b7b3-93f2-4014-9c55-9b41070764d7'] = $pane;
  $display->panels['dark_section_2'][0] = 'new-cb60b7b3-93f2-4014-9c55-9b41070764d7';
  $pane = new stdClass();
  $pane->pid = 'new-82c4f8e4-44b7-411f-ad2c-0725bbb82bcd';
  $pane->panel = 'dark_section_2';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_artikler-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'field_sektion_tid' => '%term:tid',
    ),
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
    'css_class' => 'bg-dark',
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '82c4f8e4-44b7-411f-ad2c-0725bbb82bcd';
  $display->content['new-82c4f8e4-44b7-411f-ad2c-0725bbb82bcd'] = $pane;
  $display->panels['dark_section_2'][1] = 'new-82c4f8e4-44b7-411f-ad2c-0725bbb82bcd';
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
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'paragraphs',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'fd64dc95-8b4a-486d-a902-b4af8d5025c5';
  $display->content['new-fd64dc95-8b4a-486d-a902-b4af8d5025c5'] = $pane;
  $display->panels['light_section_1'][0] = 'new-fd64dc95-8b4a-486d-a902-b4af8d5025c5';
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
  $display->uuid = '8b2b90ee-46b7-49d3-b65e-99338f4f3a4a';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_fic_frontpage__panel';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-48069c2e-9da4-4428-9f1f-f2dedf977652';
  $pane->panel = 'light_section_1';
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
  $display->panels['light_section_1'][0] = 'new-48069c2e-9da4-4428-9f1f-f2dedf977652';
  $pane = new stdClass();
  $pane->pid = 'new-76ddba32-d033-4033-8131-0fff43b9f77e';
  $pane->panel = 'light_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_kommende_arrangementer-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'more_link' => 1,
    'arguments' => array(
      'term_node_tid_depth' => '',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '76ddba32-d033-4033-8131-0fff43b9f77e';
  $display->content['new-76ddba32-d033-4033-8131-0fff43b9f77e'] = $pane;
  $display->panels['light_section_1'][1] = 'new-76ddba32-d033-4033-8131-0fff43b9f77e';
  $pane = new stdClass();
  $pane->pid = 'new-b6ad54bc-ba9f-4616-8017-e50b0e515855';
  $pane->panel = 'light_section_1';
  $pane->type = 'views_panes';
  $pane->subtype = 'fic_artikler-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'arguments' => array(
      'field_sektion_tid' => '',
    ),
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
    'template_suggestion' => 'fw-views',
  );
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'b6ad54bc-ba9f-4616-8017-e50b0e515855';
  $display->content['new-b6ad54bc-ba9f-4616-8017-e50b0e515855'] = $pane;
  $display->panels['light_section_1'][2] = 'new-b6ad54bc-ba9f-4616-8017-e50b0e515855';
  $pane = new stdClass();
  $pane->pid = 'new-efded6ec-a2b4-4ffc-bc50-df1c9075d6f7';
  $pane->panel = 'light_section_1';
  $pane->type = 'views';
  $pane->subtype = 'instagram_billeder';
  $pane->shown = TRUE;
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
    'template_suggestion' => 'paragraphs',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'efded6ec-a2b4-4ffc-bc50-df1c9075d6f7';
  $display->content['new-efded6ec-a2b4-4ffc-bc50-df1c9075d6f7'] = $pane;
  $display->panels['light_section_1'][3] = 'new-efded6ec-a2b4-4ffc-bc50-df1c9075d6f7';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-48069c2e-9da4-4428-9f1f-f2dedf977652';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['fic_frontpage'] = $page;

  return $pages;

}