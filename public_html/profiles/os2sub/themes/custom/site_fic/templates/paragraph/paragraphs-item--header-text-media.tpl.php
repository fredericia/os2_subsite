<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <div<?php print $content_attributes; ?>>
    <div class="container">

      <?php if ($position_of_media == 'left'): ?>

        <div class="position-of-media position-of-media--left">
          <div class="row">
            <div class="col-xs-12 col-lg-6">

              <?php if ($show_media_in_modal): ?>
                <a href="<?=$url_for_media_modal; ?>" data-lity>
                  <?php print render($content['field_image']); ?>
                </a>
              <?php else: ?>
                <?php print render($content['field_image']); ?>
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
          <div class="row">
            <div class="col-xs-12 col-lg-6">
              <?php print render($content['field_paragraph_header']); ?>
              <?php print render($content['field_paragraph_text']); ?>
            </div>
            <div class="col-xs-12 col-lg-6">

              <?php if ($show_media_in_modal): ?>
                <a href="<?=$url_for_media_modal; ?>" data-lity>
                  <?php print render($content['field_image']); ?>
                </a>
              <?php else: ?>
                <?php print render($content['field_image']); ?>
              <?php endif; ?>

            </div>
          </div>
        </div>

      <?php else : ?>
        <div class="position-of-media position-of-media--centered">
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3">

              <?php if ($show_media_in_modal): ?>
                <a href="<?=$url_for_media_modal; ?>" data-lity>
                  <?php print render($content['field_image']); ?>
                </a>
              <?php else: ?>
                <?php print render($content['field_image']); ?>
              <?php endif; ?>

            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3">
              <?php print render($content['field_paragraph_header']); ?>
              <?php print render($content['field_paragraph_text']); ?>
            </div>
          </div>
        </div>
      <?php endif; ?>

    </div>
  </div>
</div>
