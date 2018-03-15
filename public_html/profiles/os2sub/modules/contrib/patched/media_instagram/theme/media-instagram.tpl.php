<?php

/**
 * @file
 * Template media_instagram/theme/media-instagram.tpl.php.
 *
 * Template file for theme('media_instagram').
 *
 * Variables available:
 *  $uri - The media uri for the Instagram (e.g., instagram://p/fA9uwTtkSN).
 */
?>
<div class="<?php print $classes; ?>">
  <iframe<?php print $content_attributes; ?>></iframe>
  <script async defer src="//platform.instagram.com/en_US/embeds.js"></script>
</div>
