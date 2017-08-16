<!-- 2-columns.tpl.php -->
<div class="row" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>

    <!-- Begin - left content -->
    <div class="col-sm-6">
        <?php print $content['left-content']; ?>
    </div>
    <!-- End - left content -->

    <!-- Begin - right content -->
    <div class="col-sm-6">
        <?php print $content['right-content']; ?>
    </div>
    <!-- End - right content -->

</div>
