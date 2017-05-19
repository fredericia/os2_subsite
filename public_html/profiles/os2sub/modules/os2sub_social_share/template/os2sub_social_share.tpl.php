<?php
$title = $variables['current_node']['title'];
$url = $variables['current_node']['url'];

?>

<div class="block__share-links">
  <div class="block__share-links__link first">
    <a class="facebook"
       href="http://www.facebook.com/sharer/sharer.php?u=<?php print $url; ?>&amp;title=<?php print $title; ?>"
       title="Del på Facebook" target="_blank">Facebook</a>
  </div>
  <div class="block__share-links__link twitter">
    <a class="twitter" href="http://twitter.com/intent/tweet?status=<?php print $title; ?>+<?php print $url; ?>"
       title="Del på Twitter" target="_blank">Twitter</a>
  </div>
  <div class="block__share-links__link last linkedin">
    <a class="linkedin"
       href="http://www.linkedin.com/shareArticle?mini=true&amp;url=<?php print $url; ?>&amp;title=<?php print $title; ?>"
       title="Del på LinkedIn" target="_blank">LinkedIn</a>
  </div>
</div>