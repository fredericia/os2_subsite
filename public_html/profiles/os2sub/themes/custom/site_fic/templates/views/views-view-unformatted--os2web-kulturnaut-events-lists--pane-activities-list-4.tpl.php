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
<div class="views-row views-row-4 views-row-even col-xs-6 event-list-4-show-all">
  <a href="#">
    <article class="bordered node node-os2web-kulturnaut-knactivity contextual-links-region view-mode-os2sub_spotbox_single node--os2web_kulturnaut_knactivity--os2sub_spotbox_single clearfix event-list-4-article">
      <div class="event-list-4">
        <div class="event-list-4-bottom-part">
          <div class="event-list-4-text">
            <span class="event-list-4-pluss">+</span>
            <?php print t('See more'); ?>
          </div>
        </div>
        <img class="img-responsive " src="/profiles/os2sub/themes/custom/site_fic/dist/img/1px_transparent.png" width="1920" height="1080">
      </div>
    </article>
  </a>
</div>
