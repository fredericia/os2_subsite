<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('3 columns'),
  'category' => t('OS2'),
  'icon' => '3-columns.png',
  'theme' => '3-columns',
  'css' => '3-columns.css',
  'regions' => array(
    'column-left' => t('Left column'),
    'column-center' => t('Center column'),
    'column-right' => t('Right column'),
  ),
);
