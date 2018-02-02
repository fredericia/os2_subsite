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
</div>
