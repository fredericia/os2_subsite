<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('3-col-stacked-12-3-5-4-12'),
  'category' => t('OS2Web'),
  'icon' => '3-col-stacked-12-3-5-4-12.png',
  'theme' => '3-col-stacked-12-3-5-4-12',
  'css' => '3-col-stacked-12-3-5-4-12.css',
  'regions' => array(
    'footer' => t('Bottom'),
    'top' => t('Top'),
    'sidebar-left' => t('Left sidebar'),
    'sidebar-right' => t('Right sidebar'),
    'content' => t('Content'),
  ),
);
