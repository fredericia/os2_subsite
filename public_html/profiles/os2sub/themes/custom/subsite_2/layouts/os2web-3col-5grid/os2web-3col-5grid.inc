<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('os2web-3col-5grid'),
  'category' => t('OS2Web'),
  'icon' => 'os2web-3col-5grid.png',
  'theme' => 'os2web-3col-5grid',
  'css' => 'os2web-3col-5grid.css',
  'regions' => array(
    'footer' => t('Bottom'),
    'top' => t('Top'),
    'sidebar-left' => t('Left sidebar'),
    'sidebar-right' => t('Right sidebar'),
    'content' => t('Content'),
  ),
);
