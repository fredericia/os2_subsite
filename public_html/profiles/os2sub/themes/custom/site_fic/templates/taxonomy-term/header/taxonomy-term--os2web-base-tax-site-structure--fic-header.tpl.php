<?php

/**
 * @file
 * Overridden taxonomy term template for Header view mode.
 *
 * @see modules/taxonomy/taxonomy-term.tpl.php
 */
?>
<div id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?>">
  <div class="taxonomy-term-description-wrapper">
    <?php print render($content['description']); ?>
  </div>
  <div class="slide-bottom">
    <div class="col-sm-8 ">
      <div class="blue-block">
        <span class="text"><?php print t('Get an overview of all opening hours'); ?></span>
        <a href="#" class="read-more"><?php print t('See all opening hours');
        ?></a>
      </div>
    </div>
    <div class="col-sm-4">
      <?php print render($content['field_os2web_base_field_contact']); ?>
    </div>
  </div>
</div>
