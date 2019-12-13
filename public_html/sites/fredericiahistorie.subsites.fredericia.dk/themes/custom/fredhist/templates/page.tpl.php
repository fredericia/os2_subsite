<?php if ( !empty($node) && $node->type == 'gallery')  { ?>
  <?php
  drupal_add_js(drupal_get_path('theme', 'mytheme') .'sites/fredericiahistorie.subsites.fredericia.dk/themes/custom/fredhist/js/gallery.js');
  ?>
<?php } ?>

<div class="edit_links"><?php if ($tabs): ?><?php print render($tabs); ?><?php endif; ?></div>
<?php print render($page['content']) ?>
<?php if(!empty($snippet_adwords)): ?>
  <?php print $snippet_adwords; ?>
<?php endif; ?>
