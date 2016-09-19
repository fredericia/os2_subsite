<!-- 3-columns.tpl.php -->
<div class="row" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>

    <!-- Begin - left column -->
    <div class="col-sm-4">
        <?php print $content['column-left']; ?>
    </div>
    <!-- End - left column -->

    <!-- Begin - center column -->
    <div class="col-sm-4">
        <?php print $content['column-center']; ?>
    </div>
    <!-- End - center column -->

    <!-- Begin - right column -->
    <div class="col-sm-4">
        <?php print $content['column-right']; ?>
    </div>
    <!-- End - right column -->

</div>
