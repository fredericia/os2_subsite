<?php if ($view_mode == 'spotbox'): ?>
  <!-- node--os2web-spotbox-box--spotbox.tpl.php -->
  <!-- Begin - spotbox -->
  <article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> node-spotbox node-spotbox-spotbox"<?php print $attributes; ?>>
    <?php if (isset($node->field_spot_link['und']['0']['url'])) : ?><a href="<?php print $node->field_spot_link['und']['0']['url']; ?>" title="<?php print $node->field_spot_link['und']['0']['title']; ?>"><?php endif; ?>

      <div class="card">

        <?php if (isset($content['field_os2web_spotbox_big_image'])): ?>
          <!-- Begin - image -->
          <div class="card-img-top">
            <?php print render($content['field_os2web_spotbox_big_image']); ?>
          </div>
          <!-- End - image -->
        <?php endif; ?>

        <div class="card-block">

          <?php if ($node->field_spot_link['und']['0']['title'] !== $node->field_spot_link['und']['0']['url']) : ?>
            <h4 class="card-title"><?php print $node->field_spot_link['und']['0']['title']; ?></h4>
          <?php endif; ?>

          <?php if (!isset($content['field_os2web_spotbox_big_image']) && isset($content['field_os2web_spotbox_text'])): ?>
            <!-- Begin - image -->
            <div class="card-text">
              <?php print render($content['field_os2web_spotbox_text']); ?>
            </div>
            <!-- End - image -->
          <?php endif; ?>

        </div>

      </div>

    <?php if (isset($node->field_spot_link['und']['0']['url'])) : ?></a><?php endif; ?>
  </article>
<?php endif; ?>
