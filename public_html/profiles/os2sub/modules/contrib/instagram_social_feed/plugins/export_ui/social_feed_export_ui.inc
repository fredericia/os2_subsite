<?php
/**
 * @file
 */

/**
 * Define this Export UI plugin.
 */
$plugin = array(
  'schema' => 'instagram_social_feeds',  // As defined in hook_schema().
  'access' => 'administer instagram_social_feed settings',  // Define a permission users must have to access these pages.
  // Define the menu item.
  'menu' => array(
    'menu prefix' => 'admin/config/services',
    'menu item' => 'instagram_social_feed',
    'menu title' => 'Manage Instagram feeds',
    'menu description' => 'Administer Instagram feeds.',
  ),
  // Define user interface texts.
  'title singular' => t('preset'),
  'title plural' => t('presets'),
  'title singular proper' => t('Instagram feed'),
  'title plural proper' => t('Instagram feeds'),
  // Define the names of the functions that provide the add/edit forms.
  'form' => array(
    'settings' => 'instagram_social_feed_ctools_export_ui_form',
    'validate' => 'instagram_social_feed_ctools_export_ui_form_validate',
  ),
);

/**
 * Define the preset add/edit form.
 */
function instagram_social_feed_ctools_export_ui_form(&$form, &$form_state) {
  $preset = $form_state['item'];
  $form['feed_type'] = array(
    '#type' => 'select',
    '#title' => t('Feed type'),
    '#default_value' => $preset->feed_type,
    '#required' => TRUE,
    '#options' => instagram_social_feed_get_feed_type_options(),
  );
  $form['search_term'] = array(
    '#type' => 'textfield',
    '#title' => t('Search term (if applicable)'),
    '#description' => t("Leave blank if selecting user feed or user's own photos"),
    '#default_value' => $preset->search_term,
  );
  $form['user_id'] = array(
    '#type' => 'hidden',
    '#title' => t('User ID'),
    '#description' => t("Stores system user id"),
    '#default_value' => $preset->user_id,
  );
  $form['auto_publish'] = array(
    '#type' => 'checkbox',
    '#title' => t('Auto-publish?'),
    '#default_value' => $preset->auto_publish,
    '#required' => FALSE,
  );
  $form['enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable this feed?'),
    '#default_value' => $preset->enabled,
    '#required' => FALSE,
  );
}

/**
 * Submit handler for preset form.
 */
function instagram_social_feed_ctools_export_ui_form_validate(&$form, &$form_state) {

  // Lookup user ID to pull another user's photos.
  if ($form_state['values']['feed_type'] == INSTAGRAM_SOCIAL_FEED_OTHER_USER) {
    $username = $form_state['values']['search_term'];

    $access_token = variable_get('instagram_social_feed_api_key');
    if (!$access_token) {
      drupal_set_message(t('Unable to look up user info, access token not created'), 'error');
      return;
    }

    $instagram_query = "https://api.instagram.com/v1/users/search?q=$username&access_token=$access_token&count=1";
    $instagram_feed = json_decode(instagram_social_feed_api_call($instagram_query));

    if (isset($instagram_feed->meta) && isset($instagram_feed->meta->error_message)) {
      $message = $instagram_feed->meta->error_message;
      drupal_set_message($message, 'error');
      watchdog(__FUNCTION__, $message);
      return;
    }

    $user_id = -1;
    foreach ($instagram_feed->data as $feed) {
      $user_id = $feed->id;
    }
    if ($user_id != -1) {
      $form_state['values']['user_id'] = $user_id;
    }
    else {
      form_set_error('search_term', 'Invalid username');
      return false;
    }
  }
}
