<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with left and right sidebar and top and bottom'),
  'category' => t('OS2Web'),
  'icon' => 'content-with-left-and-right-sidebar-top-footer.png',
  'theme' => 'content-with-left-and-right-sidebar-top-footer',
  'css' => 'content-with-left-and-right-sidebar-top-footer.css',
  'regions' => array(
    'footer' => t('Bottom'),
    'top' => t('Top'),
    'sidebar-left' => t('Left sidebar'),
    'sidebar-right' => t('Right sidebar'),
    'content' => t('Content'),
  ),
);
