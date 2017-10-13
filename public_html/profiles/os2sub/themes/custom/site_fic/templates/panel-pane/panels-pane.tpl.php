<?php if ($content): ?>

  <!-- panels-pane.tpl.php -->
  <?php if ($pane_prefix): ?>
    <?php print $pane_prefix; ?>
  <?php endif; ?>

  <div class="<?php print $classes; ?>" <?php print $id; ?> <?php print $attributes; ?>>
    <div class="os2-box">
      <?php if ($admin_links): ?>
        <?php print $admin_links; ?>
      <?php endif; ?>

      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <div class="os2-box-heading">
          <<?php print $title_heading; ?> <?php print $title_attributes; ?>>
          <?php print $title; ?>
          </<?php print $title_heading; ?>>
        </div>
      <?php endif; ?>
      <?php print render($title_suffix); ?>

      <div class="os2-box-body pane-content">
        <?php print render($content); ?>
      </div>

      <?php if ($links): ?>
        <div class="links">
          <?php print $links; ?>
        </div>
      <?php endif; ?>

      <?php if ($more): ?>
        <div class="more-link">
          <?php print $more; ?>
        </div>
      <?php endif; ?>

      <?php if ($feeds): ?>
        <div class="feed">
          <?php print $feeds; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>

  <?php if ($pane_suffix): ?>
    <?php print $pane_suffix; ?>
  <?php endif; ?>

<?php endif; ?>
