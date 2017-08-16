<?php if (isset($content['field_os2web_spotbox_big_image'])): ?>

<?php 
$style='seniorspot';
$path=$node->field_os2web_spotbox_big_image['und']['0']['uri'];
$parth2=$node->field_spot_link['und']['0']['url'];
$parth3=$node->field_spot_link['und']['0']['title'];
$style_url = image_style_url($style, $path);
?>



<article id="node-<?php print $node->nid; ?>" class="<?php print $classes . " all"; ?> clearfix"<?php print $attributes; ?> 
	style="background: url(<?php print file_create_url($style_url); ?>) no-repeat scroll ;height:85px;background-size: cover;">
  <?php print render($title_prefix); ?>
  <?php print render($title_suffix); ?>
  <a class="bottom-link" href="<?php print $parth2; ?>">
    <span class="spotbox-wrapper">

      <span class="spotbox-text"><?php print $parth3; ?>
        <span class="btn-spotbox">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>  
      </span>

    </span>
  </a>
</article>

<?php else: 

$parth2=$node->field_spot_link['und']['0']['url'];
$parth3=$node->field_spot_link['und']['0']['title'];
?>


<article id="node-<?php print $node->nid; ?>" class="no-image-spot <?php print $classes . " all"; ?> clearfix"<?php print $attributes; ?> >
  <?php print render($title_prefix); ?>
  <?php print render($title_suffix); ?>
  <a class="bottom-link" href="<?php print $parth2; ?>">
    <span class="spotbox-wrapper">

      <span class="spotbox-text"><?php print $parth3; ?>

      </span>
      <span class="btn-spotbox">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </span>  
    </span>
  </a>
</article>

 <?php endif; ?>