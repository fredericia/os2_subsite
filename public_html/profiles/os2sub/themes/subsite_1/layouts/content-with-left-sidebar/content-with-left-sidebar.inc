<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with left sidebar'),
  'category' => t('OS2Web'),
  'icon' => 'content-with-left-sidebar.png',
  'theme' => 'content-with-left-sidebar',
  'css' => 'content-with-left-sidebar.css',
  'regions' => array(
    'sidebar' => t('Sidebar'),
    'content' => t('Content'),
  ),
);
