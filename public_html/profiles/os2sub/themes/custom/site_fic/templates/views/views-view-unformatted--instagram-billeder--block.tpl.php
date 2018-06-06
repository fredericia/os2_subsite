<?php
$instagram_url = 'https://www.instagram.com/fredericiaidraetscenter/';

if (strpos($_SERVER['SERVER_NAME'], 'madsbyparken') !== FALSE) {
  $instagram_url = 'https://www.instagram.com/madsbyparken/';
}

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

<div class="row--equal-height-columns">

  <!--first row is a logo-->
  <div class="views-row views-row-0 col-xs-12 col-sm-4 col-lg-3">
    <a href="<?=$instagram_url;?>">
      <img class="img-responsive instagram-logo instagram-logo--default" src="<?php print(file_create_url(path_to_theme() . '/dist/img/bg-instagram-default.png')); ?>" border="0">
      <img class="img-responsive instagram-logo instagram-logo--dark" src="<?php print(file_create_url(path_to_theme() . '/dist/img/bg-instagram-dark.png')); ?>" border="0">
      <img class="img-responsive instagram-logo instagram-logo--darker" src="<?php print(file_create_url(path_to_theme() . '/dist/img/bg-instagram-darker.png')); ?>" border="0">
      <img class="img-responsive instagram-logo instagram-logo--alternative" src="<?php print(file_create_url(path_to_theme() . '/dist/img/bg-instagram-alternative.png')); ?>" border="0">
    </a>
  </div>

  <?php foreach ($rows as $id => $row): ?>
    <div<?php if ($classes_array[$id]) {print ' class="' . $classes_array[$id] . '"';} ?>>
      <?php print $row; ?>
    </div>
  <?php endforeach; ?>

</div>
