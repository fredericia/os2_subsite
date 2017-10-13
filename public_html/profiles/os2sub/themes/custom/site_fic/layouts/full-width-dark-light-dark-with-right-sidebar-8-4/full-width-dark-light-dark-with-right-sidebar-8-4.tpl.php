<!-- full-width-dark-light-dark-with-right-sidebar-8-4.tpl.php -->
<div <?php if (!empty($css_id)) {
    echo "id=\"$css_id\"";
} ?>>

  <?php if ($content['light_section_0']): ?>
    <!-- Begin - light section no. 0 -->
    <div class="os2-section os2-section-light">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <?php echo $content['light_section_0']; ?>
          </div>
        </div>
      </div>
    </div>
    <!-- End - light section no. 0 -->
  <?php endif; ?>

  <?php if ($content['content'] or $content['sidebar']): ?>
    <!-- Begin - dark section no. 1 -->
    <div class="os2-section os2-section-dark os2-watermark os2-watermark-light content-primary">
      <div class="container content-primary">
        <div class="row">

          <?php if ($content['sidebar']): ?>

            <!-- Begin - content -->
            <div class="col-sm-8 content-content">
              <?php echo $content['content']; ?>
            </div>
            <!-- End - content -->

            <!-- Begin - sidebar -->
            <div class="col-sm-4 hidden-print content-sidebar">
                <?php echo $content['sidebar']; ?>
            </div>
            <!-- End - sidebar -->

          <?php else: ?>

            <!-- Begin - content -->
            <div class="col-xs-12 content-content">
                <?php echo $content['content']; ?>
            </div>
            <!-- End - content -->

          <?php endif ?>

        </div>
      </div>
    </div>
    <!-- End - dark section no. 1 -->
  <?php endif ?>

  <?php if ($content['light_section_1']): ?>
    <!-- Begin - light section no. 1 -->
    <div class="os2-section os2-section-light">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 content-light-section-1">
              <?php echo $content['light_section_1']; ?>
          </div>
        </div>
      </div>
    </div>
    <!-- End - light section no. 1 -->
  <?php endif; ?>

  <?php if ($content['dark_section_1']): ?>
    <!-- Begin - dark section no. 1 -->
    <div class="os2-section os2-section-dark">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 content-dark-section-1">
              <?php echo $content['dark_section_1']; ?>
          </div>
        </div>
      </div>
    </div>
    <!-- End - dark section no. 1 -->
  <?php endif; ?>

</div>
