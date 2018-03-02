<article id="node-news-teaser-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
	<?php print render($title_suffix); ?>
  <div class="teaser">
   <div class="teaser-news-img">
    <?php print render($content['field_os2web_base_field_lead_img']); ?>
   </div>
   <div class="teaser-news-content">
   <div class="teaser-news-date">
    <?php print $created_at_long; ?>
    </div>
       <a class="teaser-news-title" href="<?php print $node_url; ?>"><?php print $title; ?></a>
    <?php print render($content['field_os2web_base_field_summary']); ?>
    	  <a class="read-more" href="<?php print $node_url; ?>">Læs mere
    </a>
    </div>
  </div>
</article>
