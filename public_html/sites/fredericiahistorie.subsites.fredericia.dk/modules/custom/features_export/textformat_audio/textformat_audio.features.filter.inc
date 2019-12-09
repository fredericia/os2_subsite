<?php
/**
 * @file
 * textformat_audio.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function textformat_audio_filter_default_formats() {
  $formats = array();

  // Exported format: TinyMCE Audio.
  $formats['tinymce_audio'] = array(
    'format' => 'tinymce_audio',
    'name' => 'TinyMCE Audio',
    'cache' => '1',
    'status' => '1',
    'weight' => '0',
    'filters' => array(),
  );

  return $formats;
}
