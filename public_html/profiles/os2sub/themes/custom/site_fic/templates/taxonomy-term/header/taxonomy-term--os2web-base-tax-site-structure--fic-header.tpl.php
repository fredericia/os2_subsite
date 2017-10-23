<?php

/**
 * @file
 * Overridden taxonomy term template for Header view mode.
 *
 * @see modules/taxonomy/taxonomy-term.tpl.php
 */
?>
<div id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?>">
  <div class="slide-content-wrapper">
    <?php print render($content); ?>
  </div>
  <div class="slide-bottom">
    <div class="col-sm-8 ">
      <div class="blue-block">
        <span class="text"><?php print t('Get an overview of all opening hours'); ?></span>
        <?php if (!empty($opening_hours_link)) : ?>
          <?php print $opening_hours_link; ?>
        <?php endif; ?>
      </div>
    </div>
    <?php if (!empty($contact_link)) : ?>
      <div class="col-sm-4">
        <?php print $contact_link; ?>
      </div>
    <?php endif; ?>
  </div>
</div>
<?php if (!empty($related_links)) : ?>
  <?php print render($related_links); ?>
<?php endif; ?>
