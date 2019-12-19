<?php
/**
 * @file
 * Template for a 2 column panel layout.
 *
 * This template provides a two column panel display layout, with
 * additional areas for the top and the bottom.
 *
 * Variables:
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['top']: Content in the top row.
 *   - $content['contentprimary']: Content in the left column.
 *   - $content['contentsecondary']: Content in the right column.
 *   - $content['bottom']: Content in the bottom row.
 */
?>
<?php if($content['top']): ?>
<header>
  <div class="inner"><?php print $content['top']; ?></div>
</header>
<?php endif;?>

<?php if($content['content-primary'] || $content['content-secondary']): ?>
  <section id="content">
    <section id="content-primary">
      <?php print $content['content-primary']; ?>
    </section>
    <section id="content-secondary">
      <?php print $content['content-secondary']; ?>
    </section>
    <section id="content-quinary">
      <?php print $content['content-quinary']; ?>
    </section>
  </section>
<?php endif;?>
<?php if($content['bottom']): ?>
<footer>
  <div class="inner">
    <?php print $content['bottom']; ?>
  </div>
</footer>
<?php endif;?>
