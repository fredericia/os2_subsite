<?php
/**
 * @file
 * Theme the more link.
 *
 * - $view: The view object.
 * - $more_url: the url for the more link.
 * - $link_text: the text for the more link.
 *
 * @ingroup views_templates
 */
?>

<div class="more-link">
  <div class="row">
    <div class="col-md-3 col-sm-6 col-md-push-9 col-sm-push-6">
      <a href="<?php print $more_url ?>">
        <?php print $link_text; ?>
      </a>
    </div>
  </div>
</div>
