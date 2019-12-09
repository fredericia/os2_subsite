<?php
/**
 * @file
 * panel_gallery.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panel_gallery_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_context_7';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -21;
  $handler->conf = array(
    'title' => 'Gallery',
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
              'gallery' => 'gallery',
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
  $display->uuid = '25d726d6-3841-45a8-93f6-8c92c2f6075a';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-213fb9ba-2631-4519-809e-85f1fca5ab8b';
    $pane->panel = 'mini';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Top buttons',
      'title' => '',
      'body' => '<?php $current_url = \'http://\' .$_SERVER[\'HTTP_HOST\'] .$_SERVER[\'REQUEST_URI\']; ?>
<a href="http://www.facebook.com/sharer.php?u=<?php print $current_url ?>" target="_blank" class="facebook">Facebook</a>
<a href="#thumbs" class="gallery-thumbs">Thumbs</a>
<a class="close">Luk</a>',
      'format' => 'php_code',
      'substitute' => 1,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'top-btns',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '213fb9ba-2631-4519-809e-85f1fca5ab8b';
    $display->content['new-213fb9ba-2631-4519-809e-85f1fca5ab8b'] = $pane;
    $display->panels['mini'][0] = 'new-213fb9ba-2631-4519-809e-85f1fca5ab8b';
    $pane = new stdClass();
    $pane->pid = 'new-1749c828-e479-4aae-a906-96ef2f2363cd';
    $pane->panel = 'mini';
    $pane->type = 'views_panes';
    $pane->subtype = 'gallery-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'gallery',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '1749c828-e479-4aae-a906-96ef2f2363cd';
    $display->content['new-1749c828-e479-4aae-a906-96ef2f2363cd'] = $pane;
    $display->panels['mini'][1] = 'new-1749c828-e479-4aae-a906-96ef2f2363cd';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_context_7'] = $handler;

  return $export;
}
