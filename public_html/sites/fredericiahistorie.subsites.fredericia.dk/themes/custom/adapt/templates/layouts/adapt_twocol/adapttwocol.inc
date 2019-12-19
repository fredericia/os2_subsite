<?php

// Plugin definition
$plugin = array(
  'title' => t('Twocol'),
  'category' => t('Adapt'),
  'icon' => 'adapttwocol.png',
  'theme' => 'adapttwocol',
  'css' => 'adapttwocol.css',
  'regions' => array(
    'top' => t('Top'),
    'content-primary' => t('Content primary'),
    'content-secondary' => t('Content secondary'),
    'bottom' => t('Bottom')
  ),
);
