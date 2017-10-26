<?php if ($content): ?>

  <!-- panels-pane--plain.tpl.php -->
  <?php if ($pane_prefix): ?>
    <?php print $pane_prefix; ?>
  <?php endif; ?>
  <div class="<?php print $classes; ?>" <?php print $id; ?> <?php print $attributes; ?>>
    <?php if ($admin_links): ?>
      <?php print $admin_links; ?>
    <?php endif; ?>

    <?php print render($title_prefix); ?>
    <?php print render($title_suffix); ?>

    <div class="pane-content">
      <?php print render($content); ?>
    </div>


  <?php if ($pane_suffix): ?>
    <?php print $pane_suffix; ?>
  <?php endif; ?>

<?php endif; ?>
