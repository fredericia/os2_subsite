<?php

// Plugin definition
$plugin = array(
  'title' => t('Threecol bottom'),
  'category' => t('Adapt'),
  'icon' => 'adaptthreecolbottom.png',
  'theme' => 'adaptthreecolbottom',
  'css' => 'adaptthreecolbottom.css',
  'regions' => array(
    'top' => t('Top'),
    'content-primary' => t('Content primary'),
    'content-secondary' => t('Content secondary'),
    'content-quinary' => t('Content quinary'),
    'content-bottom' => t('Content bottom'),
    'bottom' => t('Bottom')
  ),
);
