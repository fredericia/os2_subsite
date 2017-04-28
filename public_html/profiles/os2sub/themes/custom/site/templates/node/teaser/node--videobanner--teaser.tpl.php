<?php if ($view_mode == 'teaser'): ?>
  <!-- node--teaser.tpl.php -->
  <!-- Begin - teaser -->
  <article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> node-teaser"<?php print $attributes; ?>>
    <div class="card-video">
      <?php if (isset($content)): ?>
        <!-- Begin - body -->
        <div class="card-text">
          <?php
          // Hide comments, tags, and links now so that we can render them later.
          hide($content['comments']);
          hide($content['links']);
          hide($content['field_tags']);
          print render($content);
          ?>
        </div>
        <!-- End - body -->
      <?php endif; ?>

    </div>
  </article>
  <!-- End - teaser -->

<?php endif; ?>
