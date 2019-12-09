  <?php

$plugin = array(
  'title' => t('Plugin'),
  'description' => t('Plugin'),
  'category' => t('JSON'),
  'defaults' => array(),
  'edit form' => 'fhist_json_plugin_edit_form',
  'render callback' => 'fhist_json_plugin_render',
);

/**
 * Render the custom content type.
 */

function fhist_json_plugin_edit_form($form, &$form_state) {
  $conf = $form_state['conf'];
  // $form = array();
  return $form;
}

/**
 * Submit handler for search form.
 */
function fhist_json_plugin_edit_form_submit($form, &$form_state) {
  // Copy everything from our defaults.
  foreach (array_keys($form_state['plugin']['defaults']) as $key) {
    $form_state['conf'][$key] = $form_state['values'][$key];
  }
}

function fhist_json_plugin_render($subtype, $conf, $panel_args, $context) {
  $block = new stdClass();
  $block->content = $block->subject = '';
  
  return $block;
}

// function fhist_json_plugin_content_type_admin_title($subtype, $conf, $context) {
//   $content = !empty($conf['override_title'])
//   ? t('Title') . ': ' . $conf['override_title_text'] . ' - ' : '';
//   $content .= t('Content type form') . ': ' . $conf['content_type'];

//   return $content;
// }
