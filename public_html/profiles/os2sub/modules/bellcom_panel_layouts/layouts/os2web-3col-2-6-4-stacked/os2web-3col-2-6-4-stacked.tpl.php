<!-- content-with-left-and-right-sidebar.tpl.php -->


<div class="row" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>

    <?php if ($content['top']): ?>
	   	<!-- Begin - top -->
		    <div class="col-md-12 content-top">
		        <?php print $content['top']; ?>
		    </div>
		    <!-- End - top -->
	<?php endif ?>


    <?php if ($content['sidebar-left']): ?>
	    <!-- Begin - left sidebar -->
	    <div class="col-md-2">
	        <?php print $content['sidebar-left']; ?>
	    </div>
	    <!-- End - left sidebar -->
	<?php endif ?>

    <?php if ($content['sidebar-right']): ?>
    
	    <!-- Begin - right sidebar -->
	    <div class="col-md-4 col-md-push-6">
	        <?php print $content['sidebar-right']; ?>
	    </div>
	    <!-- End - right sidebar -->
	<?php endif ?>

	<?php if ($content['sidebar-left'] && $content['sidebar-right']): ?>
    	
    	<?php /* If both sidebars are present*/?>
    	
	    <!-- Begin - content -->
	    <div class="col-md-6 col-md-pull-4">
	        <?php print $content['content']; ?>
	    </div>
	    <!-- End - content -->

	<?php elseif ($content['sidebar-left']): ?>

    	<?php /* If left sidebar is present*/?>

		<div class="col-md-10">
	        <?php print $content['content']; ?>
	    </div>

	<?php else : ?>

    	<?php /* If no sidebars are present*/?>
	
		<div class="col-sm-12">
	        <?php print $content['content']; ?>
	    </div>

	<?php endif ?>

    <?php if ($content['footer']): ?>
	   	<!-- Begin - bottom -->
		    <div class="col-md-12">
		        <?php print $content['footer']; ?>
		    </div>
		    <!-- End - bottom -->
	<?php endif ?>


</div>
