<!-- content-with-left-and-right-sidebar.tpl.php -->
<div class="row" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>

    <?php if ($content['sidebar-left']): ?>
	    <!-- Begin - left sidebar -->
	    <div class="col-md-2 col-sm-3">
	        <?php print $content['sidebar-left']; ?>
	    </div>
	    <!-- End - left sidebar -->
	<?php endif ?>

    <?php if ($content['sidebar-right']): ?>

	    <!-- Begin - right sidebar her -->
	    <?php if ($content['sidebar-left']): ?>
	    <div class="col-sm-2 col-sm-push-8 os2sub-box-stacked">
	<?php else : ?>
	    <div class="col-sm-2 col-sm-push-10">
	<?php endif ?>
	        <?php print $content['sidebar-right']; ?>
	    </div>
	    <!-- End - right sidebar -->
	<?php endif ?>

	<?php if ($content['sidebar-left'] && $content['sidebar-right']): ?>

    	<?php /* If both sidebars are present*/?>

	    <!-- Begin - content -->
	    <div class="col-sm-8 col-sm-pull-2">
	        <?php print $content['content']; ?>
	    </div>
	    <!-- End - content -->

	<?php elseif ($content['sidebar-left']): ?>

    	<?php /* If left sidebar is present*/?>

		<div class="col-sm-10">
	        <?php print $content['content']; ?>
	    </div>

	<?php elseif ($content['sidebar-right']): ?>

    	<?php /* If right sidebar is present*/?>

		<div class="col-sm-10 col-sm-pull-2">
	        <?php print $content['content']; ?>
	    </div>

	<?php elseif (!$content['sidebar-left'] && !$content['sidebar-right']) : ?>

    	<?php /* If no sidebars are present*/?>

		<div class="col-sm-12">
	        <?php print $content['content']; ?>
	    </div>

	<?php endif ?>
</div>
