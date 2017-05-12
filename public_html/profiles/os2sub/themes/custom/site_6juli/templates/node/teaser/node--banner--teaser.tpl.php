
<?php 
	$style='os2sub_banner';
	$path=$node->field_banner_billede['und']['0']['uri'];
	$style_url = image_style_url($style, $path); ?>
	
	<article id="node-<?php print $node->nid; ?>" class="banner <?php print $classes . " all"; ?> clearfix"<?php print $attributes; ?> 
		style="background: url(<?php print file_create_url($style_url); ?>) no-repeat scroll ;height:400px;background-size: cover;">
	
	<div class="row">
		<div class="col-md-6 ">
	<div class="banner-wrapper color-<?php print $node->field_hvid_tekst['und']['0']['value']; ?>">
		<div class="banner-headline"><?php print render($content['field_banner_headline']); ?></div>
		<div class="banner-text"><?php print render($content['field_banner_text']); ?></div>
		<?php print render($content['field_knap_link']);?>
		
		</div>
	</div>
	</div>
	

  
  
  
  
  
</article>


