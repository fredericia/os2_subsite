<?php
/**
 * @file
 * Template for a 1 column panel layout.
 *
 * This template provides a two column panel display layout, with
 * additional areas for the top and the bottom.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['top']: Content in the top row.
 *   - $content['middle']: Content in the left column.
 *   - $content['bottom']: Content in the bottom row.
 */
?>
<header>
  <div class="inner">
    <?php print $content['mini']; ?>
  </div>
</header>
<section class="mini-center">
  <div class="inner">
  	<?php print $content['mini-center']; ?>
  </div>
</section>
<section class="mini-center-secondary">
  <div class="inner">
  	<?php print $content['mini-center-secondary']; ?>
  </div>
</section>
<footer class="mini-bottom">
  <div class="inner">
  	<?php print $content['mini-bottom']; ?>
  </div>
</footer>