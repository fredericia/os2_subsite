<!DOCTYPE html>
<head>
  <?php print $head; ?>
  <meta name="HandheldFriendly" content="true">
  <meta name="format-detection" content="telephone=no">
  <meta name = "viewport" content = "initial-scale = 1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0, user-scalable=0">
  <title><?php print current(explode('|',$head_title)); ?></title>
  <link href="/sites/fredericiahistorie.subsites.fredericia.dk/themes/custom/fredhistapp/css/screen.css" rel="stylesheet" type="text/css">
  <script src="/sites/fredericiahistorie.subsites.fredericia.dk/themes/custom/fredhistapp/js/jquery.min.js"></script>
  <script src="/sites/fredericiahistorie.subsites.fredericia.dk/themes/custom/fredhistapp/js/main.js"></script>
  <script src="/sites/fredericiahistorie.subsites.fredericia.dk/themes/custom/fredhistapp/js/modernizr.js"></script>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
<div class="wrapper">
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</div>
</body>
</html>
