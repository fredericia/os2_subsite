<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
global $language;
?>
<?php if ( language_default()->language == $language->language ): ?>
  <?php $read_more_url = '/' . 'nyheder' ?>
<?php else: ?>
  <?php $read_more_url = '/' . $language->language . '/nyheder' ?>
<?php endif; ?>

<?php if ( !empty($title) ): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
  <div<?php
  if ( $classes_array[$id] ) {
    print ' class="' . $classes_array[$id] . '"';
  }
  ?>>
    <?php print $row; ?>
  </div>
<?php endforeach; ?>
<div class="views-row views-row views-row-se-flere">
  <div class="big-plus-wrapper">
    <a href="<?php print $read_more_url; ?>" class="big-plus-link" title="<?php print t('Read more articles'); ?>">
      <span class="link fa fa-plus" aria-hidden="true"></span>
      <?php print t('See more'); ?>
    </a>
  </div>
</div>