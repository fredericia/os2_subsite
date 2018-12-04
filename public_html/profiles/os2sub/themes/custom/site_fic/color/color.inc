<?php

$info = array();

// Define the CSS file(s) that we want the Color module to use as a base.
$info['css'] = array('dist/stylesheets/stylesheet.css');

// Define the possible replaceable items and their labels.
$info['fields'] = array(
  'brand_primary' => t('Primary brand color'),
  'brand_secondary' => t('Secondary brand color'),
);

// Color schemes for the site.
$info['schemes'] = array(

  // Define the default scheme.
  'default' => array(

    // Scheme title.
    'title' => t('Default colouring'),

    // Scheme colors
    'colors' => array(
      'brand_primary' => '#ff4200',
      'brand_secondary' => '#01b5d5',
    ),
  ),

  // Define the default scheme.
  'madsbyparken' => array(

    // Scheme title.
    'title' => t('Madsbyparken'),

    // Scheme colors
    'colors' => array(
      'brand_primary' => '#ba00af',
      'brand_secondary' => '#2cc500',
    ),
  ),
);

// Files we want to copy along with the CSS files, let's define these later.
$info['copy'] = array();

// Files used in the scheme preview.
$info['preview_css'] = '';
$info['preview_js'] = '';
$info['preview_html'] = '';

// Gradients
$info['gradients'] = array();

// Color areas to fill (x, y, width, height).
$info['fill'] = array();

// Coordinates of all the theme slices (x, y, width, height)
// with their filename as used in the stylesheet.
$info['slices'] = array();

// Base file for image generation.
$info['base_image'] = 'color/base.png';
