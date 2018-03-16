<?php

/**
 * @file
 * Overridden taxonomy term template for Header view mode.
 *
 * @see modules/taxonomy/taxonomy-term.tpl.php
 */
?>
<div id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?>">
    <?php if (!empty($slideshow)) : ?>
        <?php print $slideshow; ?>
    <?php else : ?>
        <div class="slide-content-wrapper">
            <?php print render($content); ?>
        </div>
    <?php endif; ?>
    <?php if (!empty($opening_hours_node_url) || !empty($contact_link_url)) : ?>
    <div class="slide-bottom">
        <div class="col-xs-6 col-md-8">
           <?php if (!empty($opening_hours_node_url)) : ?>
              <div class="blue-block">
                    <a href="<?php print $opening_hours_node_url; ?>"
                       class="ctools-modal-contact-modal-style ctools-use-modal">
                        <span class="text hidden-xs"><?php print $opening_hours_main_text; ?></span>
                        <span class="text visible-xs"><?php print t('Opening hours'); ?></span>
                        <?php if (!empty($opening_hours_sub_text)) : ?>
                          <span class="read-more hidden-xs"><?php print $opening_hours_sub_text; ?></span>
                        <?php endif; ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
        <?php if (!empty($contact_link_url)) : ?>
            <div class="col-xs-6 col-md-4">
              <a href="<?php print $contact_link_url; ?>"
                 class="modal-link ctools-modal-contact-modal-style ctools-use-modal contact">
                <?php print t('Contact'); ?>
              </a>
            </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>
</div>
