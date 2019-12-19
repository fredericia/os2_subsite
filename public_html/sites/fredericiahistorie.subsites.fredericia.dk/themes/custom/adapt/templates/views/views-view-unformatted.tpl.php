<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<section>
	<?php if (!empty($title)): ?>
		<h2><?php print $title; ?></h2>
	<?php endif; ?>
	<?php foreach ($rows as $id => $row): ?>
		<article <?php if ($classes_array[$id]) { print 'class="' . $classes_array[$id] .'"';  } ?>>
			<?php print $row; ?>
		</article>
	<?php endforeach; ?>
</section>