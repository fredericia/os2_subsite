<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
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

  <a href='/nyheder' title="<?php print t('Read more articles'); ?>">
    <article class="se-flere">
      <div class="field field-name-field-os2web-base-field-lead-img field-type-image field-label-hidden">
        <img class="img-responsive" src="/profiles/os2sub/themes/custom/site_fic/dist/img/1px_transparent.png" width="670" height="670">
      </div>
      <div class='se-flere-content'>
        <span>
          <p class='se-flere-icon'>+</p>
          <p><?php print t('See more'); ?></p>
        </span>
      </div>
    </article>
  </a>
</div>