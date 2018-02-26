<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<!--first row is a logo-->
<div class="views-row views-row-0 col-xs-12 col-sm-6 col-lg-3">
  <img class="img-responsive" src="<?php print(file_create_url(path_to_theme() . '/dist/img/bg-instagram.png')); ?>">
</div>

<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]) {print ' class="' . $classes_array[$id] . '"';} ?>>
  <?php print $row; ?>
  </div>
<?php endforeach; ?>
