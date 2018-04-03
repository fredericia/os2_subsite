<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
    <div<?php print $content_attributes; ?>>
        <div class="container">

            <?php if ($position_of_media == 'left'): ?>

                <div class="position-of-media position-of-media--left">
                    <div class="row row--equal-height-columns">
                        <div class="col-xs-12 col-lg-6">

                            <?php if (isset($content['field_image'])): ?>
                                <?php if ($show_media_in_modal): ?>
                                    <a href="<?= $url_for_media_modal; ?>"
                                       rel="modalbox"]>
                                        <?php print render($content['field_image']); ?>
                                    </a>
                                <?php else: ?>
                                    <?php print render($content['field_image']); ?>
                                <?php endif; ?>
                            <?php endif; ?>

                        </div>
                        <div class="col-xs-12 col-lg-6">
                            <?php print render($content['field_paragraph_header']); ?>
                            <?php print render($content['field_paragraph_text']); ?>
                        </div>
                    </div>
                </div>

            <?php elseif ($position_of_media == 'right'): ?>

                <div class="position-of-media position-of-media--right">
                    <div class="row row--equal-height-columns">
                        <div class="col-xs-12 col-lg-6">
                            <?php print render($content['field_paragraph_header']); ?>
                            <?php print render($content['field_paragraph_text']); ?>
                        </div>

                        <div class="col-xs-12 col-lg-6">

                            <?php if (isset($content['field_image'])): ?>
                                <?php if ($show_media_in_modal): ?>
                                    <a href="<?= $url_for_media_modal; ?>"
                                       rel="modalbox"]>
                                        <?php print render($content['field_image']); ?>
                                    </a>
                                <?php else: ?>
                                    <?php print render($content['field_image']); ?>
                                <?php endif; ?>
                            <?php endif; ?>

                        </div>
                    </div>
                </div>

            <?php else : ?>
                <div class="position-of-media position-of-media--centered">
                    <?php if (isset($content['field_paragraph_header']) || isset($content['field_paragraph_text'])): ?>
                        <div class="row">
                            <div
                                class="col-xs-12 col-sm-8 col-sm-push-2 col-md-4 col-md-push-4">
                                <?php print render($content['field_paragraph_header']); ?>
                                <?php print render($content['field_paragraph_text']); ?>
                            </div>
                        </div>
                    <?php endif; ?>
                    <?php if (isset($content['field_image'])): ?>
                        <div class="row">
                            <div
                                class="col-xs-12 col-sm-8 col-sm-push-2 col-md-4 col-md-push-4">

                                <?php if ($show_media_in_modal): ?>
                                    <a href="<?= $url_for_media_modal; ?>"
                                       rel="modalbox"]>
                                        <?php print render($content['field_image']); ?>
                                    </a>
                                <?php else: ?>
                                    <?php print render($content['field_image']); ?>
                                <?php endif; ?>

                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

        </div>
    </div>
</div>
