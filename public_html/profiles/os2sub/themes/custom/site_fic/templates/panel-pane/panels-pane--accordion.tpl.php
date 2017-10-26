<?php if ($content): ?>

  <!-- panels-pane.tpl.php -->
  <?php if ($pane_prefix): ?>
    <?php print $pane_prefix; ?>
  <?php endif; ?>

  <div class="<?php print $classes; ?>" <?php print $id; ?> <?php print $attributes; ?>>
    <div class="os2-accordion">
      <?php if ($admin_links): ?>
        <?php print $admin_links; ?>
      <?php endif; ?>

      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <div class="os2-accordion-heading">
          <<?php print $title_heading; ?> class="os2-accordion-heading-title">
          <?php print $title; ?>
          </<?php print $title_heading; ?>>
        </div>
      <?php endif; ?>
      <?php print render($title_suffix); ?>

      <div class="os2-accordion-body pane-content">
        <?php print render($content); ?>
      </div>

    </div>
  </div>

  <?php if ($pane_suffix): ?>
    <?php print $pane_suffix; ?>
  <?php endif; ?>

<?php endif; ?>
