  <?php if (!$page) : ?>

<article id="node-<?php print $node->nid; ?>" class="os2-node-teaser view-mode-spotbox os2-box os2-box-small-spacing <?php print $classes . " all"; ?> clearfix"<?php print $attributes; ?> date-filter="<?php if (isset($top_parent_term)) print $top_parent_term ?>">

    <div class="thumbnail">
      <?php if (isset($content['field_os2web_base_field_lead_img'])) : ?>
            <div class="image">
              <?php
                $img = field_get_items('node', $node, 'field_os2web_base_field_lead_img');
                $image = $img[0];
                $style = 'os2sub_small_imagesize';
                $public_filename = image_style_url($style, $image["uri"]);
                $path = drupal_get_path_alias('node/' . $node->nid);
                print '<a href="/' . $path . '" alt="' . $node->title . '">';
                print $html = '<img class="img-responsive img-rounded" title = "' . $image["title"] . '" src="' . $public_filename . '"/></a>';
              ?>
            </div>
            <div class="os2-node-teaser-heading">
              
              <h3 class="os2-node-teaser-heading-title">
                <a class="news-title" href="<?php global $base_url; print $base_url . $node_url; ?>">
                    <?php print $node->title; ?></a>
              </h3>
              
              <div class="news-text-date">
               <span class="news-date-day"><?php print date('j', $created); ?>.</span>
               <span class="news-date-month"><?php $m = date('M', $created); print t($m);?></span>
			   <span class="news-date-year">- <?php print date('Y', $created);?></span>
              </div>
              
            </div>
            
      <?php else: ?> 
      	<div class="os2-node-teaser-heading">  
	        <h3 class="os2-node-teaser-heading-title">
	           <a class="news-title" href="<?php global $base_url; print $base_url . $node_url; ?>">
		          <?php print $node->title; ?>
		        </a>
	        </h3>
      	</div>
                     
         <div class="news-text-date">
           <span class="news-date-day"><?php print date('j', $created); ?>.</span>
           <span class="news-date-month"><?php $m = date('M', $created); print t($m);?></span>
           <span class="news-date-year">- <?php print date('Y', $created);?></span>
         </div>
         
         <?php if (!empty($content['field_os2web_base_field_summary'])) : ?>
	          <div class="os2-node-teaser-body">
	              <div class="os2-node-teaser-body-content">
				  	<?php print render($content['field_os2web_base_field_summary']); ?>
	              </div>
	          </div>
          <?php else: ?>
              <div class="os2-node-teaser-body">
                  <div class="os2-node-teaser-body-content">
				  	<?php print render($content['body']); ?>
              	</div>
              </div>
          <?php endif; ?>

               
      <?php endif; ?>
    </div>

  <?php
    // Hide comments, tags, and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    hide($content['field_tags']);
    hide($content['field_os2web_base_field_image']);
    hide($content['field_os2web_base_field_lead_img']);
  ?>

  <?php if (!empty($content['field_tags']) || !empty($content['links'])): ?>
    <?php hide($content['field_tags']); ?>
    <?php hide($content['links']); ?>
  <?php endif; ?>
  <?php hide($content['comments']); ?>
  
</article>
  <?php endif; ?>