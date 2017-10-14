<?php
/**
 * implementation of hook_panels_layouts().
 */
$plugin = array(
  'title' => t('Full width - content with left sidebar (3/9)'),
  'category' => t('OS2'),
  'icon' => 'full-width-dark-light-dark-with-left-sidebar-3-9.png',
  'theme' => 'full-width-dark-light-dark-with-left-sidebar-3-9',
  'css' => 'full-width-dark-light-dark-with-left-sidebar-3-9.css',
  'regions' => array(
    'content' => t('Content'),
    'sidebar' => t('Sidebar'),
    'dark_section_1' => t('Dark section'),
    'light_section_1' => t('Light section'),
    'dark_section_2' => t('Dark section 2'),
  ),
);
