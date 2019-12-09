<?php
/**
 * @file
 * contenttype_app_qrscan.features.inc
 */

/**
 * Implements hook_node_info().
 */
function contenttype_app_qrscan_node_info() {
  $items = array(
    'app_qr_scan' => array(
      'name' => t('App QR-scan'),
      'base' => 'node_content',
      'description' => t('Indicates that the app should start the qr-scanner'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
