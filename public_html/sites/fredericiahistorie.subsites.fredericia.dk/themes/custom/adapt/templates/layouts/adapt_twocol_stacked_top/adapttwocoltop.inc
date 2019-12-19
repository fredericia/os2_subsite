<?php

// Plugin definition
$plugin = array(
  'title' => t('Twocol stacked top'),
  'category' => t('Adapt'),
  'icon' => 'adapttwocoltop.png',
  'theme' => 'adapttwocoltop',
  'css' => 'adapttwocoltop.css',
  'regions' => array(
    'top' => t('Top'),
    'content-primary' => t('Content primary'),
    'content-secondary' => t('Content secondary'),
    'content-top' => t('Content top'),
    'bottom' => t('Bottom')
  ),
);
