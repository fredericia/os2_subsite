<?php

/**
 * @file
 * Overrides implementation of display a node.
 *
 * @see /modules/node/node.tpl.php for additional information.
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <h1<?php print $title_attributes; ?>><a href="#"><?php print $title; ?></a></h1>
  <?php print render($title_suffix); ?>

  <div class="content"<?php print $content_attributes; ?>>
    <?php print render($content); ?>
  </div>
</div>
