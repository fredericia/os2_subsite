<?php
/**
 * @file
 * Override theme implementation to display a block.
 *
 * @see profiles/os2sub/themes/contrib/bootstrap/templates/block/block.tpl.php
 */
?>
<section id="<?php print $block_html_id; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <h2<?php print $title_attributes; ?>><?php print $title; ?></h2>
  <?php endif;?>
  <?php print render($title_suffix); ?>
  <?php print $content ?>
</section>
<div class="scroll-down-wrapper" aria-hidden="TRUE">
  <span class="scroll-down-link">
    <a id="scroll-down-link" href="#main-content">
      <span></span>
    </a>
  </span>
</div>
