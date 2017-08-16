<?php 
$parth1=$node->field_spot_link['und']['0']['url'];
$parth2=$node->field_spot_link['und']['0']['title'];
?>
<article id="node-<?php print $node->nid; ?>" class="<?php print $classes . " all"; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <a class="bottom-link btn btn-info btn-block" href="<?php print $parth1; ?>">
    <span class="selfservice-wrapper">

      <span class="selfservice-text"><?php print $parth2; ?>
        <span class="btn-selfservice">
          <i class="fa fa-link" aria-hidden="true"></i>
        </span>  
      </span>

    </span>
  </a>
  <?php print render($title_suffix); ?>
</article>
