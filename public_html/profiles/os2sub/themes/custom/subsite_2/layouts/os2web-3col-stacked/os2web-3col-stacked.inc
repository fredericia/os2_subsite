<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('os2web-os2web-3col-stacked'),
  'category' => t('OS2Web'),
  'icon' => 'os2web-3col-stacked.png',
  'theme' => 'os2web-3col-stacked',
  'css' => 'os2web-3col-stacked.css',
  'regions' => array(
    'footer' => t('Bottom'),
    'top' => t('Top'),
    'sidebar-left' => t('Left sidebar'),
    'sidebar-right' => t('Right sidebar'),
    'content' => t('Content'),
  ),
);
