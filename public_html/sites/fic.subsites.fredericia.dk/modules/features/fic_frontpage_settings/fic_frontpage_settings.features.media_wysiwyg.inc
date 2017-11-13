<?php
/**
 * @file
 * fic_frontpage_settings.features.media_wysiwyg.inc
 */

/**
 * Implements hook_media_wysiwyg_defaults().
 */
function fic_frontpage_settings_media_wysiwyg_defaults() {
  $media_wysiwyg = array();

  // WYSIWYG view mode for instagram files.
  $media_wysiwyg['instagram_wysiwyg_view_mode'] = 'none';

  // Restricted view modes for instagram files.
  $media_wysiwyg['instagram_teaser_restrict_wysiwyg'] = FALSE;
  $media_wysiwyg['instagram_preview_restrict_wysiwyg'] = FALSE;
  $media_wysiwyg['instagram_wysiwyg_restrict_wysiwyg'] = FALSE;
  $media_wysiwyg['instagram_default_restrict_wysiwyg'] = FALSE;

  return $media_wysiwyg;
}
