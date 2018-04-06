<?php if ($embedded_view != false): ?>
  <div class="<?php print $classes; ?>"<?php print $attributes; ?>>
    <div class="content"<?php print $content_attributes; ?>>
      <?php print render($content); ?>

      <?php print $embedded_view; ?>
    </div>
  </div>
<?php endif; ?>
