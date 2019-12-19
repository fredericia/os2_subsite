<?php

// Plugin definition
$plugin = array(
  'title' => t('Twocol stacked bottom'),
  'category' => t('Adapt'),
  'icon' => 'adapttwocolbottom.png',
  'theme' => 'adapttwocolbottom',
  'css' => 'adapttwocolbottom.css',
  'regions' => array(
    'top' => t('Top'),
    'content-primary' => t('Content primary'),
    'content-secondary' => t('Content secondary'),
    'content-quinary' => t('Content quinary'),
    'bottom' => t('Bottom')
  ),
);
