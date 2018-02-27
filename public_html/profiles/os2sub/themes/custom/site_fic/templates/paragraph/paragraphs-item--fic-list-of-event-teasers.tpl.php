<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <div class="content"<?php print $content_attributes; ?>>

    <?php if ( isset( $content['field_paragraph_header'] ) ): ?>
        <!-- Begin - heading -->
        <div class="paragraph__heading">
          <h2 class="paragraph__heading__title"><?php print render( $content['field_paragraph_header'] ); ?></h2>
        </div>
        <!-- End - heading -->
    <?php endif; ?>

    <?php print $embedded_view; ?>
  </div>
</div>

