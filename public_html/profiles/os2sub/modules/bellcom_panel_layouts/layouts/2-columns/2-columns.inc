<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('2 columns'),
  'category' => t('OS2'),
  'icon' => '2-columns.png',
  'theme' => '2-columns',
  'css' => '2-columns.css',
  'regions' => array(
    'left-content' => t('Left sided content'),
    'right-content' => t('Right sided content'),
  ),
);
