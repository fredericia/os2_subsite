<div class="edit_links"><?php if ($tabs): ?><?php print render($tabs); ?></div><?php endif; ?></div>
<?php print render($page['content']) ?>
<?php if(!empty($snippet_adwords)): ?>
  <?php print $snippet_adwords; ?>
<?php endif; ?>
