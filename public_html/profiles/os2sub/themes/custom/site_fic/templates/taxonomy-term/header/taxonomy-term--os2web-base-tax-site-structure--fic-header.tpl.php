<?php

/**
 * @file
 * Overridden taxonomy term template for Header view mode.
 *
 * @see modules/taxonomy/taxonomy-term.tpl.php
 */
?>
<div id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?>">
    <?php if (! empty($slideshow)) : ?>
        <?php print $slideshow; ?>
    <?php else: ?>
        <div class="slide-content-wrapper">
            <?php print render($content); ?>
        </div>
    <?php endif; ?>
    <div class="slide-bottom">
        <div class="col-xs-6 col-sm-8">
            <div class="blue-block">
                <?php if (! empty($opening_hours_url)) : ?>
                    <a href="<?php print $opening_hours_url; ?>"
                       class="ctools-modal-contact-modal-style ctools-use-modal">
                        <span class="text hidden-xs"><?php print t('Get an overview of all opening hours'); ?></span>
                        <span class="text visible-xs"><?php print t('Opening hours'); ?></span>

                        <span class="read-more hidden-xs"><?php print t('See all opening hours'); ?></span>
                    </a>
                <?php endif; ?>
            </div>
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
<?php if (! empty($related_links)) : ?>
    <?php print render($related_links); ?>
<?php endif; ?>
