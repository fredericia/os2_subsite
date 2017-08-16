<?php 
$style='os2sub_banner';
$path=$node->field_banner_billede['und']['0']['uri'];
$parth2=$node->field_knap_link['und']['0']['url'];
$parth3=$node->field_banner_headline['und']['0']['value'];
$style_url = image_style_url($style, $path);
?>
<article id="node-<?php print $node->nid; ?>" class="<?php print $classes . " all"; ?> clearfix"<?php print $attributes; ?> 
	style="background: url(<?php print file_create_url($style_url); ?>) no-repeat scroll ;height:220px;background-size: cover; position: relative">
	<a class="banner-link" href="<?php print $parth2; ?>">
  	<span class="banner-wrapper color-<?php print $node->field_hvid_tekst['und']['0']['value']; ?>">
  		<span class="banner-headline"><?php print $parth3; ?>
  		  <span class="btn-banner">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>  
  		</span>			
    </span>
  </a>
</article>
