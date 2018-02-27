<?php

/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
    'title' => t('os2web-3col-2-6-4-stacked-sidebars-visible'),
    'category' => t('OS2Web'),
    'icon' => 'os2web-3col-2-6-4-stacked-sidebars-visible.png',
    'theme' => 'os2web-3col-2-6-4-stacked-sidebars-visible',
    'css' => 'os2web-3col-2-6-4-stacked-sidebars-visible.css',
    'regions' => array(
        'footer' => t('Bottom'),
        'top' => t('Top'),
        'sidebar-left' => t('Left sidebar'),
        'sidebar-right' => t('Right sidebar'),
        'content' => t('Content'),
    ),
);
