<?php if ($view_mode == 'teaser'): ?>
  <?php if (isset($content)): ?>
    <div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> node-teaser"<?php print $attributes; ?>>
      <?php
      // Hide comments, tags, and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      hide($content['field_tags']);
      print render($content);
      ?>
    </div>
  <?php endif; ?>
<?php endif; ?>
