<?php
/**
 * @file
 * Default theme implementation for a single paragraph item.
 *
 * Available variables:
 * - $content: An array of content items. Use render($content) to print them
 *   all, or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - entity
 *   - entity-paragraphs-item
 *   - paragraphs-item-{bundle}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened into
 *   a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */
?>
<div id = "ktc_paragraph_<?php print $host_entity_id ?>_<?php print $item_id ?>" class='draggable'>
  <div class="ting-e-ling ktc-article-section <?php print $classes; ?>"<?php print $attributes; ?>>
    <?php print render($title_prefix); ?>
    <?php print render($title_suffix); ?>
    <div class="content"<?php print $content_attributes; ?>>
      <?php
      print render($content);
      ?>
      <ul class="paragraphs-items-view-links">
        <li class="edit first"><?php print render($operations['edit']) ?></li>
        <li class="delete last"><?php print render($operations['delete']) ?></li>
      </ul>
    </div>
  </div>
</div>