<?php
/**
 * @file
 * Views infinite scroll pager template.
 */
?>
<ul class="pager pager--infinite-scroll <?php print $automatic_scroll_class ?>">
  <?php if (trim(render($button))): ?>
    <li class="pager__item"><?php print render($button); ?>
  <?php endif; ?>
  </li>
</ul>
