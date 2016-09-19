<?php if ($view_mode == 'list'): ?>
  <!-- node--list.tpl.php -->
  <!-- Begin - list -->
  <section id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> node-list"<?php print $attributes; ?>>

    <?php if (isset($updated_at_short)): ?>
      <!-- Begin - updated at -->
      <span class="node-list-updated-at"><?php print $updated_at_short; ?></span>
      <!-- End - updated at -->
    <?php endif; ?>

    <!-- Begin - title -->
    <h3 class="node-list-title"><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h3>
    <!-- End - title -->

  </section>
  <!-- End - list -->
<?php endif; ?>
