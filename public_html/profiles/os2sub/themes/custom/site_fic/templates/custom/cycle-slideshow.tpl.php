<?php
/**
 * @file
 * Custom implementation of cysle slideshow slide.
 */
?>
<?php if (!empty($slideshow)): ?>
  <div class="cycle-slideshow">
    <?php foreach($slideshow as $slide) :?>
      <?php print $slide; ?>
    <?php endforeach; ?>
  </div>
  <div id="cycle-nav" class="cycle-pager num-items-<?php print count($slideshow); ?>">
  </div>
<?php endif; ?>
