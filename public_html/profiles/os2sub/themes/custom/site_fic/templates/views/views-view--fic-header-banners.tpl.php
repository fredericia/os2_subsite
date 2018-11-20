<?php

/**
 * @file
 * FIC Header view override of main view template.
 */
?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>
    <div class="view-content">
      <?php print $rows; ?>
      <div class="slide-bottom">
        <div class="col-xs-6 col-sm-8">
          <?php if (!empty($opening_hours_node_url)) : ?>
            <div class="blue-block">
              <a href="<?php print $opening_hours_node_url; ?>"
                 class="ctools-modal-contact-modal-style <?php if ($opening_hours_open_type == 'modal') { print "ctools-use-modal"; } ?>">
                <span class="text hidden-xs"><?php print $opening_hours_main_text; ?></span>
                <span class="text visible-xs"><?php print $opening_hours_main_text; ?></span>
                <?php if (!empty($opening_hours_sub_text)) : ?>
                  <span class="read-more hidden-xs"><?php print $opening_hours_sub_text; ?></span>
                <?php endif; ?>
              </a>
            </div>
          <?php endif; ?>
        </div>
        <?php if (!empty($contact_link_url)) : ?>
          <div class="col-xs-6 col-sm-4">
            <a href="<?php print $contact_link_url; ?>"
               class="modal-link ctools-modal-contact-modal-style ctools-use-modal contact">
              <?php print t('Contact'); ?>
            </a>
          </div>
        <?php endif; ?>
      </div>
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>
