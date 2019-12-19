<?php

// Plugin definition
$plugin = array(
  'title' => t('Threecol'),
  'category' => t('Adapt'),
  'icon' => 'adaptthreecol.png',
  'theme' => 'adaptthreecol',
  'css' => 'adaptthreecol.css',
  'regions' => array(
    'top' => t('Top'),
    'content-primary' => t('Content primary'),
    'content-secondary' => t('Content secondary'),
    'content-quinary' => t('Content quinary'),
    'bottom' => t('Bottom')
  ),
);
