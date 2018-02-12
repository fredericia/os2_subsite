<div class="carousel-image">
  <?php print $image ?>

  <div class="carousel-overlay"></div>
</div>

<?php if (!empty($title) || !empty($description)): ?>
<div class="container">
  <div class="carousel-caption">
    <?php if (!empty($title)): ?>
      <h3><?php print $title ?></h3>
    <?php endif ?>

    <?php if (!empty($description)): ?>
      <p><?php print $description ?></p>
    <?php endif ?>
  </div>
</div>
<?php endif ?>