<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>

<?php
//original image
//$uri = file_create_url($row->field_field_os2web_kulturnaut_slidesho[0]['raw']['uri']);

preg_match('/src="(.*?)"/', $output, $matches);
$uri = $matches[1];
?>
<div class="img-container" style="
  background-image: #0f2846, url(<?php print $uri ?>);
  background-image: -moz-linear-gradient(left, rgba(15,40,70,1) 0%, rgba(15,40,70,0) 25%, rgba(15,40,70,0) 50%, rgba(15,40,70,0) 75%, rgba(15,40,70,1) 100%), url(<?php print $uri ?>);
  background-image: -webkit-linear-gradient(left, rgba(15,40,70,1) 0%,rgba(15,40,70,0) 25%,rgba(15,40,70,0) 50%,rgba(15,40,70,0) 75%,rgba(15,40,70,1) 100%), url(<?php print $uri ?>);
  background-image: linear-gradient(to right, rgba(15,40,70,1) 0%,rgba(15,40,70,0) 25%,rgba(15,40,70,0) 50%,rgba(15,40,70,0) 75%,rgba(15,40,70,1) 100%), url(<?php print $uri ?>);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0f2846', endColorstr='#0f2846',GradientType=1 );
  ">
</div>
