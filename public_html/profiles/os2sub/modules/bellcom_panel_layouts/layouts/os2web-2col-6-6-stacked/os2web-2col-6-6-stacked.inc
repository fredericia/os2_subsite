<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('os2web-2col-6-6-stacked'),
  'category' => t('OS2Web'),
  'icon' => 'os2web-2col-6-6-stacked.png',
  'theme' => 'os2web-2col-6-6-stacked',
  'css' => 'os2web-2col-6-6-stacked.css',
  'regions' => array(
    'top' => t('Top'),
    'content-left' => t('Content left'),
    'content-right' => t('Content right'),
    'content' => t('Content'),
    'footer' => t('Bottom'),
  ),
);
