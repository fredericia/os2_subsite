<!-- content-with-left-and-right-sidebar.tpl.php -->

<div class="panel panel--content-with-left-and-right-sidebar" <?php if (!empty($css_id)) {
  print "id=\"$css_id\"";
} ?>>

  <?php if ($content['top']): ?>
    <!-- Begin - top -->
    <div class="row row--first">
      <div class="col-md-12 content-top">
        <?php print $content['top']; ?>
      </div>
    </div>
    <!-- End - top -->
  <?php endif ?>

  <div class="row row--second">

    <!-- Begin - left sidebar -->
    <div class="col-md-2">
      <?php if ($content['sidebar-left']): ?>
        <?php print $content['sidebar-left']; ?>
      <?php endif ?>
    </div>
    <!-- End - left sidebar -->

    <!-- Begin - content -->
    <div class="col-md-6 vertical-line">
      <?php if ($content['content']): ?>
        <?php print $content['content']; ?>
      <?php endif ?>
    </div>
    <!-- End - content -->

    <!-- Begin - right sidebar -->
    <div class="col-md-4">
      <?php if ($content['sidebar-right']): ?>
        <?php print $content['sidebar-right']; ?>
      <?php endif ?>
    </div>
    <!-- End - right sidebar -->

  </div>

  <?php if ($content['footer']): ?>
    <!-- Begin - bottom -->
    <div class="row row--third">
      <div class="col-md-12">
        <?php print $content['footer']; ?>
      </div>
    </div>
    <!-- End - bottom -->
  <?php endif ?>

</div>
