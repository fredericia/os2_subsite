<?php

// Plugin definition
$plugin = array(
  'title' => t('Twocol Tworows stacked top'),
  'category' => t('Adapt'),
  'icon' => 'adapttwocoltworowsstackedtop.png',
  'theme' => 'adapttwocoltworowsstackedtop',
  'css' => 'adapttwocoltworowsstackedtop.css',
  'regions' => array(
    'top' => t('Top'),
    'content-primary' => t('Content primary'),
    'content-secondary' => t('Content secondary'),
    'content-tertiary' => t('Content tertiary'),
    'content-quaternary' => t('Content quaternary'),
    'content-top' => t('Content top'),
    'bottom' => t('Bottom')
  ),
);
