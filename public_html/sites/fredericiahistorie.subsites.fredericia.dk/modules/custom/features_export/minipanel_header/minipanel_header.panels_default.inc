<?php
/**
 * @file
 * minipanel_header.panels_default.inc
 */

/**
 * Implements hook_default_panels_mini().
 */
function minipanel_header_default_panels_mini() {
  $export = array();

  $mini = new stdClass();
  $mini->disabled = FALSE; /* Edit this to true to make a default mini disabled initially */
  $mini->api_version = 1;
  $mini->name = 'header';
  $mini->category = '';
  $mini->admin_title = 'Header';
  $mini->admin_description = '';
  $mini->requiredcontexts = array();
  $mini->contexts = array();
  $mini->relationships = array();
  $display = new panels_display();
  $display->layout = 'adaptdoublemini';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'mini' => NULL,
      'mini-bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '87359952-1bea-4f73-b4aa-9ec490c98164';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-5836e69a-5ad0-43f6-89d5-0f7fe70b0b19';
    $pane->panel = 'mini';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Social / Search',
      'title' => '',
      'body' => '<?php $current_url = \'http://\' .$_SERVER[\'HTTP_HOST\'] .$_SERVER[\'REQUEST_URI\']; ?>
<a target="_blank" class="facebook" href="http://www.facebook.com/sharer.php?u=<?php print $current_url ?>">Facebook</a><a class="search">Søg</a>',
      'format' => 'php_code',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'top-icons',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '5836e69a-5ad0-43f6-89d5-0f7fe70b0b19';
    $display->content['new-5836e69a-5ad0-43f6-89d5-0f7fe70b0b19'] = $pane;
    $display->panels['mini'][0] = 'new-5836e69a-5ad0-43f6-89d5-0f7fe70b0b19';
    $pane = new stdClass();
    $pane->pid = 'new-8247de5f-47de-48b7-aa01-b6da29b10365';
    $pane->panel = 'mini';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Logo',
      'title' => '',
      'body' => '<a href="/">Museerne i Fredericia</a>',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'site-logo',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '8247de5f-47de-48b7-aa01-b6da29b10365';
    $display->content['new-8247de5f-47de-48b7-aa01-b6da29b10365'] = $pane;
    $display->panels['mini'][1] = 'new-8247de5f-47de-48b7-aa01-b6da29b10365';
    $pane = new stdClass();
    $pane->pid = 'new-b7ed3789-1cf6-4875-b317-8c1d3980d3e7';
    $pane->panel = 'mini';
    $pane->type = 'block';
    $pane->subtype = 'search-form';
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
      'css_class' => 'search-form',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'b7ed3789-1cf6-4875-b317-8c1d3980d3e7';
    $display->content['new-b7ed3789-1cf6-4875-b317-8c1d3980d3e7'] = $pane;
    $display->panels['mini'][2] = 'new-b7ed3789-1cf6-4875-b317-8c1d3980d3e7';
    $pane = new stdClass();
    $pane->pid = 'new-7bf7402d-cb85-4952-87af-cfd7a68740cc';
    $pane->panel = 'mini-bottom';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Mobile menu',
      'title' => '',
      'body' => '<div class="mobile-menu">Menu</div>',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'mobile',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '7bf7402d-cb85-4952-87af-cfd7a68740cc';
    $display->content['new-7bf7402d-cb85-4952-87af-cfd7a68740cc'] = $pane;
    $display->panels['mini-bottom'][0] = 'new-7bf7402d-cb85-4952-87af-cfd7a68740cc';
    $pane = new stdClass();
    $pane->pid = 'new-2faf59bd-1771-4d45-8121-3de335717ffc';
    $pane->panel = 'mini-bottom';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'menu_name' => 'main-menu',
      'parent_mlid' => '0',
      'title_link' => 0,
      'admin_title' => '',
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
      'css_class' => 'main-menu',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '2faf59bd-1771-4d45-8121-3de335717ffc';
    $display->content['new-2faf59bd-1771-4d45-8121-3de335717ffc'] = $pane;
    $display->panels['mini-bottom'][1] = 'new-2faf59bd-1771-4d45-8121-3de335717ffc';
    $pane = new stdClass();
    $pane->pid = 'new-4ce0034f-ac23-4e61-85c0-9edac8f0efc8';
    $pane->panel = 'mini-bottom';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Drop down background',
      'title' => '',
      'body' => '<div class="dropdown-bg"></div>',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'dropdown-menu',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '4ce0034f-ac23-4e61-85c0-9edac8f0efc8';
    $display->content['new-4ce0034f-ac23-4e61-85c0-9edac8f0efc8'] = $pane;
    $display->panels['mini-bottom'][2] = 'new-4ce0034f-ac23-4e61-85c0-9edac8f0efc8';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-8247de5f-47de-48b7-aa01-b6da29b10365';
  $mini->display = $display;
  $export['header'] = $mini;

  return $export;
}
