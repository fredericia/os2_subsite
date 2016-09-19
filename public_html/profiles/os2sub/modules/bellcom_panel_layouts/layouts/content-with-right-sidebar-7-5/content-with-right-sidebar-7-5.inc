<?php

/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with right sidebar (7/5)'),
  'category' => t('OS2'),
  'icon' => 'content-with-right-sidebar-7-5.png',
  'theme' => 'content-with-right-sidebar-7-5',
  'css' => 'content-with-right-sidebar-7-5.css',
  'regions' => array(
    'top' => t('Top'),
    'sidebar' => t('Sidebar'),
    'content' => t('Content'),
    'bottom' => t('Bottom'),
  ),
);
