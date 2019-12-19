<?php

// Plugin definition
$plugin = array(
  'title' => t('Twocol Tworows stacked bottom'),
  'category' => t('Adapt'),
  'icon' => 'adapttwocoltworowsstackedbottom.png',
  'theme' => 'adapttwocoltworowsstackedbottom',
  'css' => 'adapttwocoltworowsstackedbottom.css',
  'regions' => array(
    'top' => t('Top'),
    'content-primary' => t('Content primary'),
    'content-secondary' => t('Content secondary'),
    'content-tertiary' => t('Content tertiary'),
    'content-quaternary' => t('Content quaternary'),
    'content-quinary' => t('Content quinary'),
    'bottom' => t('Bottom')
  ),
);
