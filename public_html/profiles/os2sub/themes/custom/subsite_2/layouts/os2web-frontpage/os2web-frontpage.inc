<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('os2web-frontpage'),
  'category' => t('OS2Web'),
  'icon' => 'os2web-frontpage.png',
  'theme' => 'os2web-frontpage',
  'css' => 'os2web-frontpage.css',
  'regions' => array(
    'footer' => t('Bottom'),
    'top' => t('Top'),
    'sidebar-left' => t('Left sidebar'),
    'sidebar-right' => t('Right sidebar'),
    'content' => t('Content'),
  ),
);
