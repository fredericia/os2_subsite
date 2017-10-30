<?php
/**
 * @file
 * os2sub_pages.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function os2sub_pages_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__panel_context_6c1c1d09-d0bd-4e24-8b51-bab8af28c112';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -27;
  $handler->conf = array(
    'title' => 'OS2Web kulturnaut knactivity',
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
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_kulturnaut_knactivity' => 'os2web_kulturnaut_knactivity',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
    'panels_breadcrumbs_state' => 1,
    'panels_breadcrumbs_titles' => 'Kalender
%node:title',
    'panels_breadcrumbs_paths' => '/kalender
<none>',
    'panels_breadcrumbs_home' => 1,
  );
  $display = new panels_display();
  $display->layout = 'os2web-3col-2-6-4-stacked';
  $display->layout_settings = array(
    'items' => array(
      'canvas' => array(
        'type' => 'row',
        'contains' => 'column',
        'children' => array(
          0 => 'main',
        ),
        'parent' => NULL,
      ),
      'main' => array(
        'type' => 'column',
        'width' => 100,
        'width_type' => '%',
        'children' => array(
          0 => 'main-row',
        ),
        'parent' => 'canvas',
      ),
      'main-row' => array(
        'type' => 'row',
        'contains' => 'region',
        'children' => array(
          0 => 'left',
          1 => 'center',
        ),
        'parent' => 'main',
      ),
      'center' => array(
        'type' => 'region',
        'title' => 'Center',
        'width' => '69.98001998001997',
        'width_type' => '%',
        'parent' => 'main-row',
      ),
      'left' => array(
        'type' => 'region',
        'title' => 'Left',
        'width' => '30.019980019980018',
        'width_type' => '%',
        'parent' => 'main-row',
        'class' => '',
        'hide_empty' => 0,
      ),
    ),
  );
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
      'left' => NULL,
      'top' => NULL,
      'sidebar' => NULL,
      'content' => NULL,
      'bottom' => NULL,
      'footer' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'sidebar-right-xs-collapsible' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'bad2513c-8ab3-4cf3-a4fe-d5ed3f567340';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__panel_context_6c1c1d09-d0bd-4e24-8b51-bab8af28c112';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-d96676a7-bad2-4314-88cb-5ca49834683c';
  $pane->panel = 'content';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'no_extras' => 0,
    'override_title' => 1,
    'override_title_text' => '%title',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 0,
    'build_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
    'override_title_heading' => 'h1',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd96676a7-bad2-4314-88cb-5ca49834683c';
  $display->content['new-d96676a7-bad2-4314-88cb-5ca49834683c'] = $pane;
  $display->panels['content'][0] = 'new-d96676a7-bad2-4314-88cb-5ca49834683c';
  $pane = new stdClass();
  $pane->pid = 'new-d3e1a56f-6dbc-4a9e-a75e-f6768cd95e86';
  $pane->panel = 'footer';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'bottom-separator',
    'title' => '',
    'title_heading' => 'h2',
    'body' => '<div class="bottom-separator hidden-xs hidden-sm"></div>',
    'format' => 'full_html',
    'substitute' => 0,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd3e1a56f-6dbc-4a9e-a75e-f6768cd95e86';
  $display->content['new-d3e1a56f-6dbc-4a9e-a75e-f6768cd95e86'] = $pane;
  $display->panels['footer'][0] = 'new-d3e1a56f-6dbc-4a9e-a75e-f6768cd95e86';
  $pane = new stdClass();
  $pane->pid = 'new-d1f61d58-81f2-40b6-9ca9-f77502337051';
  $pane->panel = 'footer';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2web_kulturnaut_events_lists-pane_related_articles';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'hidden-xs hidden-sm',
    'template_suggestion' => 'views_panes',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'd1f61d58-81f2-40b6-9ca9-f77502337051';
  $display->content['new-d1f61d58-81f2-40b6-9ca9-f77502337051'] = $pane;
  $display->panels['footer'][1] = 'new-d1f61d58-81f2-40b6-9ca9-f77502337051';
  $pane = new stdClass();
  $pane->pid = 'new-4808c20a-145f-4ab4-8e83-90e6fa883714';
  $pane->panel = 'sidebar-left';
  $pane->type = 'block';
  $pane->subtype = 'os2sub_social_share-os2sub_social_share';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Del på',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '4808c20a-145f-4ab4-8e83-90e6fa883714';
  $display->content['new-4808c20a-145f-4ab4-8e83-90e6fa883714'] = $pane;
  $display->panels['sidebar-left'][0] = 'new-4808c20a-145f-4ab4-8e83-90e6fa883714';
  $pane = new stdClass();
  $pane->pid = 'new-dce20486-cdbe-4a7a-ba0d-ee5bf22c0930';
  $pane->panel = 'sidebar-right';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => 'page-header',
    'context' => 'argument_entity_id:node_1',
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
    'css_class' => 'visible-xs visible-sm',
    'template_suggestion' => 'node_title',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'dce20486-cdbe-4a7a-ba0d-ee5bf22c0930';
  $display->content['new-dce20486-cdbe-4a7a-ba0d-ee5bf22c0930'] = $pane;
  $display->panels['sidebar-right'][0] = 'new-dce20486-cdbe-4a7a-ba0d-ee5bf22c0930';
  $pane = new stdClass();
  $pane->pid = 'new-e7dbf0ad-a196-4168-b43a-16cf9868060e';
  $pane->panel = 'sidebar-right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_date';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'date_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'format_type' => 'long',
      'multiple_number' => '',
      'multiple_from' => '',
      'multiple_to' => '',
      'fromto' => 'both',
      'show_remaining_days' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'visible-xs visible-sm',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'e7dbf0ad-a196-4168-b43a-16cf9868060e';
  $display->content['new-e7dbf0ad-a196-4168-b43a-16cf9868060e'] = $pane;
  $display->panels['sidebar-right'][1] = 'new-e7dbf0ad-a196-4168-b43a-16cf9868060e';
  $pane = new stdClass();
  $pane->pid = 'new-1fb317b7-3e15-47f3-95d4-0ba1e0f0def1';
  $pane->panel = 'sidebar-right';
  $pane->type = 'token';
  $pane->subtype = 'node:field_os2web_kulturnaut_venue';
  $pane->shown = FALSE;
  $pane->access = array();
  $pane->configuration = array(
    'sanitize' => 1,
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '%none',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'visible-xs visible-sm',
    'template_suggestion' => 'token',
  );
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '1fb317b7-3e15-47f3-95d4-0ba1e0f0def1';
  $display->content['new-1fb317b7-3e15-47f3-95d4-0ba1e0f0def1'] = $pane;
  $display->panels['sidebar-right'][2] = 'new-1fb317b7-3e15-47f3-95d4-0ba1e0f0def1';
  $pane = new stdClass();
  $pane->pid = 'new-29ac8730-64ec-4ffc-b589-65d002685781';
  $pane->panel = 'sidebar-right';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_url';
  $pane->shown = TRUE;
  $pane->access = array(
    'plugins' => array(),
  );
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 0,
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
    'template_suggestion' => '',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '29ac8730-64ec-4ffc-b589-65d002685781';
  $display->content['new-29ac8730-64ec-4ffc-b589-65d002685781'] = $pane;
  $display->panels['sidebar-right'][3] = 'new-29ac8730-64ec-4ffc-b589-65d002685781';
  $pane = new stdClass();
  $pane->pid = 'new-3e11d5f0-6f15-4ad5-a19b-2f462e7dbf8f';
  $pane->panel = 'sidebar-right';
  $pane->type = 'views_panes';
  $pane->subtype = 'add_to_calendar-panel_pane_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_entity_id:node_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '3e11d5f0-6f15-4ad5-a19b-2f462e7dbf8f';
  $display->content['new-3e11d5f0-6f15-4ad5-a19b-2f462e7dbf8f'] = $pane;
  $display->panels['sidebar-right'][4] = 'new-3e11d5f0-6f15-4ad5-a19b-2f462e7dbf8f';
  $pane = new stdClass();
  $pane->pid = 'new-9be16197-abe9-4813-aaa9-8e754ba9de4e';
  $pane->panel = 'sidebar-right-xs-collapsible';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_date';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'date_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'format_type' => 'long',
      'multiple_number' => '',
      'multiple_from' => '',
      'multiple_to' => '',
      'fromto' => 'both',
      'show_remaining_days' => 0,
    ),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Tid',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '9be16197-abe9-4813-aaa9-8e754ba9de4e';
  $display->content['new-9be16197-abe9-4813-aaa9-8e754ba9de4e'] = $pane;
  $display->panels['sidebar-right-xs-collapsible'][0] = 'new-9be16197-abe9-4813-aaa9-8e754ba9de4e';
  $pane = new stdClass();
  $pane->pid = 'new-7f30286f-ddf1-4a0e-b850-8cce1de409a4';
  $pane->panel = 'sidebar-right-xs-collapsible';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_venue';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'taxonomy_term_reference_link',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Sted',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '7f30286f-ddf1-4a0e-b850-8cce1de409a4';
  $display->content['new-7f30286f-ddf1-4a0e-b850-8cce1de409a4'] = $pane;
  $display->panels['sidebar-right-xs-collapsible'][1] = 'new-7f30286f-ddf1-4a0e-b850-8cce1de409a4';
  $pane = new stdClass();
  $pane->pid = 'new-33f17203-1e45-403b-b39b-acdf33cefc9a';
  $pane->panel = 'sidebar-right-xs-collapsible';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_venue';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'ds_taxonomy_view_mode',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '33f17203-1e45-403b-b39b-acdf33cefc9a';
  $display->content['new-33f17203-1e45-403b-b39b-acdf33cefc9a'] = $pane;
  $display->panels['sidebar-right-xs-collapsible'][2] = 'new-33f17203-1e45-403b-b39b-acdf33cefc9a';
  $pane = new stdClass();
  $pane->pid = 'new-3cc2a94c-8afd-4077-aa04-1617055e84e5';
  $pane->panel = 'sidebar-right-xs-collapsible';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_sarrang';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Arrangør',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '3cc2a94c-8afd-4077-aa04-1617055e84e5';
  $display->content['new-3cc2a94c-8afd-4077-aa04-1617055e84e5'] = $pane;
  $display->panels['sidebar-right-xs-collapsible'][3] = 'new-3cc2a94c-8afd-4077-aa04-1617055e84e5';
  $pane = new stdClass();
  $pane->pid = 'new-db4a95ec-e4b4-4bf7-869f-32b1bfb68f09';
  $pane->panel = 'sidebar-right-xs-collapsible';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_price';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Pris',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = 'db4a95ec-e4b4-4bf7-869f-32b1bfb68f09';
  $display->content['new-db4a95ec-e4b4-4bf7-869f-32b1bfb68f09'] = $pane;
  $display->panels['sidebar-right-xs-collapsible'][4] = 'new-db4a95ec-e4b4-4bf7-869f-32b1bfb68f09';
  $pane = new stdClass();
  $pane->pid = 'new-bebee433-3d07-4063-bccf-f89a09467c53';
  $pane->panel = 'sidebar-right-xs-collapsible';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_target';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Målgruppe',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = 'bebee433-3d07-4063-bccf-f89a09467c53';
  $display->content['new-bebee433-3d07-4063-bccf-f89a09467c53'] = $pane;
  $display->panels['sidebar-right-xs-collapsible'][5] = 'new-bebee433-3d07-4063-bccf-f89a09467c53';
  $pane = new stdClass();
  $pane->pid = 'new-4aea3468-b776-4415-8c11-272837cc1350';
  $pane->panel = 'sidebar-right-xs-collapsible';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_base_field_edi_tags';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'taxonomy_term_reference_link',
    'delta_limit' => '10',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(),
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => 'Tags',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => '',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 6;
  $pane->locks = array();
  $pane->uuid = '4aea3468-b776-4415-8c11-272837cc1350';
  $display->content['new-4aea3468-b776-4415-8c11-272837cc1350'] = $pane;
  $display->panels['sidebar-right-xs-collapsible'][6] = 'new-4aea3468-b776-4415-8c11-272837cc1350';
  $pane = new stdClass();
  $pane->pid = 'new-26d19768-2e1f-4d8e-8017-42cb5dcb15d5';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'node:field_os2web_kulturnaut_slidesho';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'hidden',
    'formatter' => 'image',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(
      'slideshow_image_style' => 'os2sub_page_slideshow',
      'slideshow_link' => '',
      'slideshow_caption' => '',
      'slideshow_caption_link' => '',
      'slideshow_fx' => 'fade',
      'slideshow_speed' => '1000',
      'slideshow_timeout' => '4000',
      'slideshow_order' => '',
      'slideshow_controls' => 1,
      'slideshow_controls_pause' => 0,
      'slideshow_controls_position' => 'before',
      'slideshow_pause' => 0,
      'slideshow_start_on_hover' => 0,
      'slideshow_pager' => 'number',
      'slideshow_pager_position' => 'after',
      'slideshow_pager_image_style' => '',
      'slideshow_carousel_image_style' => '',
      'slideshow_carousel_visible' => '3',
      'slideshow_carousel_scroll' => '1',
      'slideshow_carousel_speed' => '500',
      'slideshow_carousel_vertical' => 0,
      'slideshow_carousel_circular' => 0,
      'slideshow_carousel_follow' => 0,
      'slideshow_carousel_skin' => '',
      'image_style' => 'os2sub_banner',
      'image_link' => '',
    ),
    'context' => 'argument_entity_id:node_1',
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
  $pane->uuid = '26d19768-2e1f-4d8e-8017-42cb5dcb15d5';
  $display->content['new-26d19768-2e1f-4d8e-8017-42cb5dcb15d5'] = $pane;
  $display->panels['top'][0] = 'new-26d19768-2e1f-4d8e-8017-42cb5dcb15d5';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view__panel_context_6c1c1d09-d0bd-4e24-8b51-bab8af28c112'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__os2sub-tema';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 2;
  $handler->conf = array(
    'title' => 'OS2Sub tema',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'os2sub-tema',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_kulturnaut_tema' => 'os2web_kulturnaut_tema',
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
  $display->layout = 'os2web-3col-2-6-4-stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'left' => NULL,
      'right' => NULL,
      'middle' => NULL,
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'sidebar-right-xs-collapsible' => NULL,
      'content' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Tema #%term:name';
  $display->uuid = '8bb7a5e6-6a90-4ed6-92cf-07b3544c05a3';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'term_view__os2sub-tema';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-852dd206-d862-41de-a83e-fda506238105';
  $pane->panel = 'content';
  $pane->type = 'entity_field_extra';
  $pane->subtype = 'taxonomy_term:description';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'view_mode' => 'full',
    'context' => 'argument_term_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'os2-box',
    'template_suggestion' => 'entity_field_extra',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '852dd206-d862-41de-a83e-fda506238105';
  $display->content['new-852dd206-d862-41de-a83e-fda506238105'] = $pane;
  $display->panels['content'][0] = 'new-852dd206-d862-41de-a83e-fda506238105';
  $pane = new stdClass();
  $pane->pid = 'new-62f38573-c252-4c36-9355-f83001c115be';
  $pane->panel = 'content';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_for_tema';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
    'context' => array(
      0 => 'argument_term_1',
    ),
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '62f38573-c252-4c36-9355-f83001c115be';
  $display->content['new-62f38573-c252-4c36-9355-f83001c115be'] = $pane;
  $display->panels['content'][1] = 'new-62f38573-c252-4c36-9355-f83001c115be';
  $pane = new stdClass();
  $pane->pid = 'new-87f04d25-23ed-4bb6-aa30-a3577b23d7b2';
  $pane->panel = 'content';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2sub_venues-pane_venues_for_tema';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_term_1',
    ),
    'override_title' => 1,
    'override_title_text' => 'Steder',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '87f04d25-23ed-4bb6-aa30-a3577b23d7b2';
  $display->content['new-87f04d25-23ed-4bb6-aa30-a3577b23d7b2'] = $pane;
  $display->panels['content'][2] = 'new-87f04d25-23ed-4bb6-aa30-a3577b23d7b2';
  $pane = new stdClass();
  $pane->pid = 'new-286730f6-d89f-410b-9181-df6c5f004cfe';
  $pane->panel = 'sidebar-left';
  $pane->type = 'menu_tree';
  $pane->subtype = '_active';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'parent' => '_active:0',
    'title_link' => 1,
    'admin_title' => '',
    'level' => '1',
    'follow' => 'child',
    'depth' => '0',
    'depth_relative' => 1,
    'expanded' => 0,
    'sort' => 0,
    'menu_name' => '_active',
    'parent_mlid' => '0',
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
  $pane->uuid = '286730f6-d89f-410b-9181-df6c5f004cfe';
  $display->content['new-286730f6-d89f-410b-9181-df6c5f004cfe'] = $pane;
  $display->panels['sidebar-left'][0] = 'new-286730f6-d89f-410b-9181-df6c5f004cfe';
  $pane = new stdClass();
  $pane->pid = 'new-a65a411a-ba99-471d-8be6-5baf1d244d33';
  $pane->panel = 'sidebar-left';
  $pane->type = 'block';
  $pane->subtype = 'os2sub_social_share-os2sub_social_share';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Del på',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'a65a411a-ba99-471d-8be6-5baf1d244d33';
  $display->content['new-a65a411a-ba99-471d-8be6-5baf1d244d33'] = $pane;
  $display->panels['sidebar-left'][1] = 'new-a65a411a-ba99-471d-8be6-5baf1d244d33';
  $pane = new stdClass();
  $pane->pid = 'new-59fc92d0-be34-40be-9d89-db6dcd7efec6';
  $pane->panel = 'top';
  $pane->type = 'entity_field';
  $pane->subtype = 'taxonomy_term:field_os2web_kult_tema_image';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'image',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'image_style' => 'os2sub_banner',
      'image_link' => '',
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
  $pane->uuid = '59fc92d0-be34-40be-9d89-db6dcd7efec6';
  $display->content['new-59fc92d0-be34-40be-9d89-db6dcd7efec6'] = $pane;
  $display->panels['top'][0] = 'new-59fc92d0-be34-40be-9d89-db6dcd7efec6';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-852dd206-d862-41de-a83e-fda506238105';
  $handler->conf['display'] = $display;
  $export['term_view__os2sub-tema'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__os2sub-venue';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 1;
  $handler->conf = array(
    'title' => 'OS2Sub Venue',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'os2sub-venue',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_kulturnaut_venue' => 'os2web_kulturnaut_venue',
            ),
          ),
          'context' => 'argument_term_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
    'panels_breadcrumbs_state' => 1,
    'panels_breadcrumbs_titles' => 'Steder
%term:name',
    'panels_breadcrumbs_paths' => '/steder
<none>',
    'panels_breadcrumbs_home' => 1,
  );
  $display = new panels_display();
  $display->layout = 'os2web-3col-2-6-4-stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'left' => NULL,
      'right' => NULL,
      'middle' => NULL,
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'sidebar-right-xs-collapsible' => NULL,
      'content' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%term:name';
  $display->uuid = '8bb7a5e6-6a90-4ed6-92cf-07b3544c05a3';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'term_view__os2sub-venue';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-b654ed23-4f25-48ef-a689-84de95b32e72';
  $pane->panel = 'content';
  $pane->type = 'term_name';
  $pane->subtype = 'term_name';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => 'pane-title',
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
    'css_class' => 'hidden-sm hidden-xs',
    'template_suggestion' => 'term_name',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'b654ed23-4f25-48ef-a689-84de95b32e72';
  $display->content['new-b654ed23-4f25-48ef-a689-84de95b32e72'] = $pane;
  $display->panels['content'][0] = 'new-b654ed23-4f25-48ef-a689-84de95b32e72';
  $pane = new stdClass();
  $pane->pid = 'new-4032b76d-6982-40ae-a2d5-fa219b898d1b';
  $pane->panel = 'content';
  $pane->type = 'entity_field';
  $pane->subtype = 'taxonomy_term:field_os2web_kult_venue_image_lg';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'image',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'image_style' => 'os2sub_normal_imagesize',
      'image_link' => '',
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
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '4032b76d-6982-40ae-a2d5-fa219b898d1b';
  $display->content['new-4032b76d-6982-40ae-a2d5-fa219b898d1b'] = $pane;
  $display->panels['content'][1] = 'new-4032b76d-6982-40ae-a2d5-fa219b898d1b';
  $pane = new stdClass();
  $pane->pid = 'new-f47b4564-9afd-4f81-9d82-fba3d50f7482';
  $pane->panel = 'content';
  $pane->type = 'entity_field';
  $pane->subtype = 'taxonomy_term:field_os2web_kult_venue_address';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'simple_gmap',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'include_map' => 0,
      'include_static_map' => 1,
      'include_link' => 0,
      'include_text' => 0,
      'iframe_height' => '184',
      'iframe_width' => '369',
      'static_scale' => '1',
      'zoom_level' => '14',
      'link_text' => 'View larger map',
      'map_type' => 'm',
      'langcode' => 'en',
      'apikey' => 'AIzaSyAgJA8d0t65vtmoUm1V4QzLUHxZCKaSSeE',
    ),
    'context' => 'argument_term_1',
    'override_title' => 1,
    'override_title_text' => 'STED',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'visible-xs visible-sm',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'f47b4564-9afd-4f81-9d82-fba3d50f7482';
  $display->content['new-f47b4564-9afd-4f81-9d82-fba3d50f7482'] = $pane;
  $display->panels['content'][2] = 'new-f47b4564-9afd-4f81-9d82-fba3d50f7482';
  $pane = new stdClass();
  $pane->pid = 'new-df767235-59af-4650-b70e-0f6083764cfc';
  $pane->panel = 'content';
  $pane->type = 'entity_field_extra';
  $pane->subtype = 'taxonomy_term:description';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'view_mode' => 'full',
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
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = 'df767235-59af-4650-b70e-0f6083764cfc';
  $display->content['new-df767235-59af-4650-b70e-0f6083764cfc'] = $pane;
  $display->panels['content'][3] = 'new-df767235-59af-4650-b70e-0f6083764cfc';
  $pane = new stdClass();
  $pane->pid = 'new-27815b76-57b5-4a32-a4c7-dd0e4bc72d38';
  $pane->panel = 'content';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2web_kulturnaut_events_lists-pane_activities_for_venue';
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
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '27815b76-57b5-4a32-a4c7-dd0e4bc72d38';
  $display->content['new-27815b76-57b5-4a32-a4c7-dd0e4bc72d38'] = $pane;
  $display->panels['content'][4] = 'new-27815b76-57b5-4a32-a4c7-dd0e4bc72d38';
  $pane = new stdClass();
  $pane->pid = 'new-6a2ed624-b3c2-41e8-beb7-36746276d6f9';
  $pane->panel = 'sidebar-left';
  $pane->type = 'block';
  $pane->subtype = 'os2sub_social_share-os2sub_social_share';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'DEL PÅ',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '6a2ed624-b3c2-41e8-beb7-36746276d6f9';
  $display->content['new-6a2ed624-b3c2-41e8-beb7-36746276d6f9'] = $pane;
  $display->panels['sidebar-left'][0] = 'new-6a2ed624-b3c2-41e8-beb7-36746276d6f9';
  $pane = new stdClass();
  $pane->pid = 'new-2258c858-c454-4f88-ae85-16d0b9cd189a';
  $pane->panel = 'sidebar-right';
  $pane->type = 'term_name';
  $pane->subtype = 'term_name';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => 'page-header',
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
    'css_class' => 'visible-xs visible-sm',
    'template_suggestion' => 'term_name',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '2258c858-c454-4f88-ae85-16d0b9cd189a';
  $display->content['new-2258c858-c454-4f88-ae85-16d0b9cd189a'] = $pane;
  $display->panels['sidebar-right'][0] = 'new-2258c858-c454-4f88-ae85-16d0b9cd189a';
  $pane = new stdClass();
  $pane->pid = 'new-bd6aaca9-55cf-467e-a76b-7d3f786ab064';
  $pane->panel = 'sidebar-right';
  $pane->type = 'entity_field';
  $pane->subtype = 'taxonomy_term:field_os2web_kult_venue_address';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'simple_gmap',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(
      'include_map' => 0,
      'include_static_map' => 1,
      'include_link' => 0,
      'include_text' => 0,
      'iframe_height' => '184',
      'iframe_width' => '369',
      'static_scale' => '1',
      'zoom_level' => '15',
      'link_text' => 'View larger map',
      'map_type' => 'm',
      'langcode' => 'en',
      'apikey' => 'AIzaSyAgJA8d0t65vtmoUm1V4QzLUHxZCKaSSeE',
    ),
    'context' => 'argument_term_1',
    'override_title' => 1,
    'override_title_text' => 'STED',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'hidden-sm hidden-xs right-pane',
    'template_suggestion' => 'entity_field',
  );
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'bd6aaca9-55cf-467e-a76b-7d3f786ab064';
  $display->content['new-bd6aaca9-55cf-467e-a76b-7d3f786ab064'] = $pane;
  $display->panels['sidebar-right'][1] = 'new-bd6aaca9-55cf-467e-a76b-7d3f786ab064';
  $pane = new stdClass();
  $pane->pid = 'new-1eefcbd4-8265-481b-86d6-6800b0b62976';
  $pane->panel = 'sidebar-right';
  $pane->type = 'entity_field';
  $pane->subtype = 'taxonomy_term:field_os2web_kult_venue_sbtext';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'text_default',
    'delta_limit' => 0,
    'delta_offset' => '0',
    'delta_reversed' => FALSE,
    'formatter_settings' => array(),
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
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '1eefcbd4-8265-481b-86d6-6800b0b62976';
  $display->content['new-1eefcbd4-8265-481b-86d6-6800b0b62976'] = $pane;
  $display->panels['sidebar-right'][2] = 'new-1eefcbd4-8265-481b-86d6-6800b0b62976';
  $pane = new stdClass();
  $pane->pid = 'new-558ab709-533a-47cd-bb72-8ff4c244ffa6';
  $pane->panel = 'sidebar-right';
  $pane->type = 'entity_field';
  $pane->subtype = 'taxonomy_term:field_os2web_base_field_edi_tags';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'label' => 'title',
    'formatter' => 'taxonomy_term_reference_link',
    'delta_limit' => '0',
    'delta_offset' => '0',
    'delta_reversed' => 0,
    'formatter_settings' => array(),
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
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '558ab709-533a-47cd-bb72-8ff4c244ffa6';
  $display->content['new-558ab709-533a-47cd-bb72-8ff4c244ffa6'] = $pane;
  $display->panels['sidebar-right'][3] = 'new-558ab709-533a-47cd-bb72-8ff4c244ffa6';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = 'new-b654ed23-4f25-48ef-a689-84de95b32e72';
  $handler->conf['display'] = $display;
  $export['term_view__os2sub-venue'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__panel_context_b93bf237-6097-4919-81ee-fbf94710de8c';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'OS2Sub Stikord',
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
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_taxonomies_tax_editor_tag' => 'os2web_taxonomies_tax_editor_tag',
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
  $display->layout = 'os2web-3col-2-6-4-stacked';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'left' => NULL,
      'right' => NULL,
      'middle' => NULL,
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'sidebar-right-xs-collapsible' => NULL,
      'content' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Oplevelser tagget med #%term:name';
  $display->uuid = '8bb7a5e6-6a90-4ed6-92cf-07b3544c05a3';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'term_view__panel_context_b93bf237-6097-4919-81ee-fbf94710de8c';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-bb23f140-c301-437b-bc69-6d03b0b4efbf';
  $pane->panel = 'content';
  $pane->type = 'entity_field_extra';
  $pane->subtype = 'taxonomy_term:description';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'view_mode' => 'full',
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
  $pane->uuid = 'bb23f140-c301-437b-bc69-6d03b0b4efbf';
  $display->content['new-bb23f140-c301-437b-bc69-6d03b0b4efbf'] = $pane;
  $display->panels['content'][0] = 'new-bb23f140-c301-437b-bc69-6d03b0b4efbf';
  $pane = new stdClass();
  $pane->pid = 'new-399d4c08-bc42-497f-b526-c1476344551b';
  $pane->panel = 'content';
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
  $pane->uuid = '399d4c08-bc42-497f-b526-c1476344551b';
  $display->content['new-399d4c08-bc42-497f-b526-c1476344551b'] = $pane;
  $display->panels['content'][1] = 'new-399d4c08-bc42-497f-b526-c1476344551b';
  $pane = new stdClass();
  $pane->pid = 'new-aeb8b1cb-0d32-4dee-9038-1bfbb5af5567';
  $pane->panel = 'content';
  $pane->type = 'views_panes';
  $pane->subtype = 'os2sub_venues-pane_venues_for_tag';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => array(
      0 => 'argument_term_1',
    ),
    'override_title' => 1,
    'override_title_text' => 'Steder',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = 'aeb8b1cb-0d32-4dee-9038-1bfbb5af5567';
  $display->content['new-aeb8b1cb-0d32-4dee-9038-1bfbb5af5567'] = $pane;
  $display->panels['content'][2] = 'new-aeb8b1cb-0d32-4dee-9038-1bfbb5af5567';
  $pane = new stdClass();
  $pane->pid = 'new-09a6fd8b-f629-44f9-b20d-0660f86d2fc6';
  $pane->panel = 'sidebar-left';
  $pane->type = 'block';
  $pane->subtype = 'os2sub_social_share-os2sub_social_share';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => ' Del på',
    'override_title_heading' => 'h3',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '09a6fd8b-f629-44f9-b20d-0660f86d2fc6';
  $display->content['new-09a6fd8b-f629-44f9-b20d-0660f86d2fc6'] = $pane;
  $display->panels['sidebar-left'][0] = 'new-09a6fd8b-f629-44f9-b20d-0660f86d2fc6';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__panel_context_b93bf237-6097-4919-81ee-fbf94710de8c'] = $handler;

  return $export;
}
