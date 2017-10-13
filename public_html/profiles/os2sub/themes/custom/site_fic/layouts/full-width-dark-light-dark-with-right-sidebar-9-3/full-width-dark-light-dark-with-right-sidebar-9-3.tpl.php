<!-- full-width-dark-light-dark-with-right-sidebar-9-3.tpl.php -->
<div <?php if (!empty($css_id)) {
    echo "id=\"$css_id\"";
} ?>>

  <?php if ($content['content'] or $content['sidebar']): ?>
    <!-- Begin - dark section no. 1 -->
    <div class="os2-section os2-section-dark os2-watermark os2-watermark-light">
      <div class="container">
        <div class="row">

          <?php if ($content['sidebar']): ?>

            <!-- Begin - content -->
            <div class="col-sm-9">
              <?php echo $content['content']; ?>
            </div>
            <!-- End - content -->

            <!-- Begin - sidebar -->
            <div class="col-sm-3 hidden-print">
                <?php echo $content['sidebar']; ?>
            </div>
            <!-- End - sidebar -->

          <?php else: ?>

            <!-- Begin - content -->
            <div class="col-xs-12">
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
          <div class="col-xs-12">
              <?php echo $content['light_section_1']; ?>
          </div>
        </div>
      </div>
    </div>
    <!-- End - light section no. 1 -->
  <?php endif; ?>

  <?php if ($content['dark_section_2']): ?>
    <!-- Begin - dark section no. 2 -->
    <div class="os2-section os2-section-dark">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
              <?php echo $content['dark_section_2']; ?>
          </div>
        </div>
      </div>
    </div>
    <!-- End - dark section no. 2 -->
  <?php endif; ?>

</div>
