<!-- content-with-left-sidebar-4-8.tpl.php -->
<div class="row" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>

    <?php if ($content['top']): ?>

        <!-- Begin - top -->
        <div class="col-xs-12">
            <?php print $content['top']; ?>
        </div>
        <!-- End - top -->

    <?php endif; ?>

    <?php if ($content['sidebar']): ?>

        <!-- Begin - sidebar -->
        <div class="col-sm-4 hidden-print">
            <?php print $content['sidebar']; ?>
        </div>
        <!-- End - sidebar -->

        <!-- Begin - content -->
        <div class="col-sm-8">
            <?php print $content['content']; ?>
        </div>
        <!-- End - content -->

    <?php else: ?>

        <!-- Begin - content -->
        <div class="col-xs-12">
            <?php print $content['content']; ?>
        </div>
        <!-- End - content -->

    <?php endif ?>

    <?php if ($content['bottom']): ?>

        <!-- Begin - bottom -->
        <div class="col-xs-12">
            <?php print $content['bottom']; ?>
        </div>
        <!-- End - bottom -->

    <?php endif; ?>

</div>
