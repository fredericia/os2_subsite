<?php

/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with left and right sidebar fluid'),
  'category' => t('6juli'),
  'icon' => 'content-with-left-and-right-sidebar-fluid.png',
  'theme' => 'content-with-left-and-right-sidebar-fluid',
  'css' => 'content-with-left-and-right-sidebar-fluid.css',
  'regions' => array(
    'top' => t('Top'),
    'sidebar-left' => t('Left sidebar'),
    'sidebar-right' => t('Right sidebar'),
    'content' => t('Content'),
    'bottom' => t('Bottom'),
  ),
);
