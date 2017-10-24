<?php
/**
 * @file
 * Override default theme implementation to display a node.
 * @see profiles/os2sub/themes/contrib/bootstrap/templates/node/node.tpl.php
 */
?>
<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <div class="slide-content-wrapper">
    <?php
      // Hide comments, tags, and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      hide($content['field_tags']);
      print render($content);
    ?>
  </div>
</article>
