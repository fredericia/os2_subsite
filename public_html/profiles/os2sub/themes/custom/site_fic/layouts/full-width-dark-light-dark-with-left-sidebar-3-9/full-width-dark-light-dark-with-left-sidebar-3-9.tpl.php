<!-- full-width-dark-light-dark-with-right-sidebar-9-3.tpl.php -->
<div <?php if (!empty($css_id)) {
    echo "id=\"$css_id\"";
} ?>>

  <?php if ($content['content'] or $content['sidebar']): ?>
    <!-- Begin - dark section no. 1 -->
    <div class="os2-sectiont">
      <div class="container">
        <div class="row">

          <?php if ($content['sidebar']): ?>

            <!-- Begin - sidebar -->
            <div class="col-sm-3">
                <?php echo $content['sidebar']; ?>
            </div>
            <!-- End - sidebar -->
            <!-- Begin - content -->
            <div class="col-sm-9">
              <?php echo $content['content']; ?>
            </div>
            <!-- End - content -->

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
  <?php echo $content['light_section_1']; ?>
  <?php echo $content['dark_section_2']; ?>
</div>
