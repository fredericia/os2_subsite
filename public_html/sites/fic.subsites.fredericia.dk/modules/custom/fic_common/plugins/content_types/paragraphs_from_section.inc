<?php
/**
 * @file
 * Contains paragraphs from section panels plugin.
 */

$plugin = array(
  'title' => t('Paragraphs from section'),
  'description' => t("Show paragraphs from section if node doesn't have paragraphs"),
  'category' => 'FIC',
  'render callback' => 'paragraphs_from_section',
  'defaults' => array(),
);

/**
 * Render callback for plugin.
 */
function paragraphs_from_section() {
  $block = new stdClass();
  $node = menu_get_object();
  if (empty($node)) {
    return $block;
  }

  $field_afsnit_full_width = field_get_items('node', $node, 'field_afsnit_full_width');
  $field_hide_section_afsnits = field_get_items('node', $node, 'field_hide_section_afsnits');
  $field_sektion = field_get_items('node', $node, 'field_sektion');

  // Return empty block if wrong content type.
  if ($node->type != 'os2web_base_contentpage'
    // Or node has own paragraphs to show.
    || !empty($field_afsnit_full_width)
    // Or not specified section to show.
    || empty($field_sektion)
    // Or don't need show paragraph from section.
    || (!empty($field_hide_section_afsnits) && $field_hide_section_afsnits[0]['value'] == '1')) {
    return $block;
  }

  $field_sektion = reset($field_sektion);
  $term = taxonomy_term_load($field_sektion['tid']);
  $term_paragraphs = field_view_field('taxonomy_term', $term, 'field_afsnit');
  $term_paragraphs['#label_display'] = 'hidden';
  $content = array(
    'section_paragraphs' => $term_paragraphs,
  );

  $block = new stdClass();
  $block->content = $content;
  $block->title = '';
  $block->id = 'paragraphs_from_section';

  return $block;
}
