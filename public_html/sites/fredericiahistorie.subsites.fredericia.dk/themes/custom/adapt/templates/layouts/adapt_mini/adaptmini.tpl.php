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
<?php if($content['mini']): ?>
  <section class="mini">
  	<?php print $content['mini']; ?>
  </section>
<?php endif;?>