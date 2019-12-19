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
 *   - $content['top']: Content in the top row with header markup.
 *   - $content['middle']: Content in the left column.
 *   - $content['bottom']: Content in the bottom row with footer markup.
 */
?>
<?php if($content['top']): ?>
<header>
	<div class="inner"><?php print $content['top']; ?></div>
</header>
<?php endif;?>
<?php if($content['middle']): ?>
<section id="content">
	<?php print $content['middle']; ?>
</section>
<?php endif;?>
<?php if($content['bottom']): ?>
<footer class="clearfix">
	<div class="inner"><?php print $content['bottom']; ?></div>
</footer>
<?php endif;?>