<?php

/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with left sidebar (4/8)'),
  'category' => t('OS2'),
  'icon' => 'content-with-left-sidebar-4-8.png',
  'theme' => 'content-with-left-sidebar-4-8',
  'css' => 'content-with-left-sidebar-4-8.css',
  'regions' => array(
    'top' => t('Top'),
    'sidebar' => t('Sidebar'),
    'content' => t('Content'),
    'bottom' => t('Bottom'),
  ),
);
