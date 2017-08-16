<!-- content-with-left-and-right-sidebar.tpl.php -->
<div class="row" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>

    <?php if ($content['sidebar-left']): ?>
	    <!-- Begin - left sidebar -->
	    <div class="col-md-3">
	        <?php print $content['sidebar-left']; ?>
	    </div>
	    <!-- End - left sidebar -->
	<?php endif ?>

    <?php if ($content['sidebar-right']): ?>
    
	    <!-- Begin - right sidebar -->
	    <?php if ($content['sidebar-left']): ?>
	    <div class="col-md-3 col-md-push-6">
	<?php else : ?>
	    <div class="col-md-3 col-md-push-9">
	<?php endif ?>
	        <?php print $content['sidebar-right']; ?>
	    </div>
	    <!-- End - right sidebar -->
	<?php endif ?>

	<?php if ($content['sidebar-left'] && $content['sidebar-right']): ?>
    	
    	<?php /* If both sidebars are present*/?>
    	
	    <!-- Begin - content -->
	    <div class="col-md-6 col-md-pull-3">
	        <?php print $content['content']; ?>
	    </div>
	    <!-- End - content -->

	<?php elseif ($content['sidebar-left']): ?>

    	<?php /* If left sidebar is present*/?>

		<div class="col-md-9">
	        <?php print $content['content']; ?>
	    </div>

	<?php elseif ($content['sidebar-right']): ?>

    	<?php /* If right sidebar is present*/?>

		<div class="col-md-9 col-md-pull-3">
	        <?php print $content['content']; ?>
	    </div>

	<?php elseif (!$content['sidebar-left'] && !$content['sidebar-right']) : ?>

    	<?php /* If no sidebars are present*/?>
	
		<div class="col-sm-12">
	        <?php print $content['content']; ?>
	    </div>

	<?php endif ?>
</div>
