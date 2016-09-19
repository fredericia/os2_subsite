<?php

/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with right sidebar (8/4)'),
  'category' => t('OS2'),
  'icon' => 'content-with-right-sidebar-8-4.png',
  'theme' => 'content-with-right-sidebar-8-4',
  'css' => 'content-with-right-sidebar-8-4.css',
  'regions' => array(
    'top' => t('Top'),
    'sidebar' => t('Sidebar'),
    'content' => t('Content'),
    'bottom' => t('Bottom'),
  ),
);
