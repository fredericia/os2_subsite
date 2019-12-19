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
<?php if($content['content-top']): ?>
  <section class="divider">
    <div class="mainwidth">
      <section id="content-top" class="clearfix">
        <?php print $content['content-top']; ?>
      </section>
    </div>
  </section>
<?php endif;?>
<?php if($content['content-primary'] || $content['content-secondary']): ?>
  <section class="top">
    <div class="mainwidth">
      <section id="content-primary">
        <?php print $content['content-primary']; ?>
      </section>
      <section id="content-secondary">
        <?php print $content['content-secondary']; ?>
      </section>
    </div>
    <div class="clear-section"></div>
  </section>
<?php endif;?>
<?php if($content['content-tertiary'] || $content['content-quaternary']): ?>
	<section class="divider">
	  <div class="mainwidth">
	    <section id="content-tertiary">
	      <?php print $content['content-tertiary']; ?>
	    </section>
	    <section id="content-quaternary">
	      <?php print $content['content-quaternary']; ?>
	    </section>
	  </div>
	  <div class="clear-section"></div>
	</section>
<?php endif;?>

<?php if($content['bottom']): ?>
	<footer>
	  <div class="inner"><?php print $content['bottom']; ?></div>
	</footer>
<?php endif;?>
