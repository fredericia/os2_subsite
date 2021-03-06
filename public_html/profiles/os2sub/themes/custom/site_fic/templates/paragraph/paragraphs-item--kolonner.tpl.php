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
<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <div<?php print $content_attributes; ?>>
    <div class="container">
      <?php $col_num = 1;
      $items = &$content['field_kolonne_afsnit'];
      $children = !empty($items) ? element_children($items) : array();
      for ($i = 0; $i < count($children);) : ?>
        <div class="row row--equal-height-columns">
          <?php for ($j = $i; $j < count($children) && $j < $i + $col_amount; $j++) :?>
            <div <?php if (!empty($col_class[$col_amount])): print 'class="' . $col_class[$col_amount] . '"'; endif;?>>
              <?php print render($items[$j]); ?>
            </div>
          <?php endfor;
          $i = $j;?>
        </div>
      <?php endfor; ?>
    </div>
  </div>
</div>
