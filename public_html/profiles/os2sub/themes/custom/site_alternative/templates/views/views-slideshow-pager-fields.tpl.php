<?php

/**
 * @file
 * Views Slideshow: Template for pager fields.
 *
 * - $widget_id: Widget id.
 * - $classes: Classes.
 * - $rendered_field_items: Rendered field items.
 *
 * @ingroup vss_templates
 */
?>
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <div id="<?php print $widget_id; ?>" class="<?php print $classes; ?>">
        <?php print $rendered_field_items; ?>
      </div>
    </div>
  </div>
</div>
