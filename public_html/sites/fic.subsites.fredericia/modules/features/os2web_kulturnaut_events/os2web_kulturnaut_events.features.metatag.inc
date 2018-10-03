<?php
/**
 * @file
 * os2web_kulturnaut_events.features.metatag.inc
 */

/**
 * Implements hook_metatag_export_default().
 */
function os2web_kulturnaut_events_metatag_export_default() {
  $config = array();

  // Exported Metatag config instance: node:os2web_kulturnaut_knactivity.
  $config['node:os2web_kulturnaut_knactivity'] = array(
    'instance' => 'node:os2web_kulturnaut_knactivity',
    'disabled' => FALSE,
    'config' => array(
      'description' => array(
        'value' => '[node:field_os2web_kulturnaut_descrip]',
      ),
      'abstract' => array(
        'value' => '[node:summary]',
      ),
      'news_keywords' => array(
        'value' => '[node:field_os2web_base_field_edi_tags]',
      ),
      'image_src' => array(
        'value' => '[node:field_os2web_base_field_lead_img]',
      ),
      'geo.placename' => array(
        'value' => '[node:field_os2web_kulturnaut_sname] - [node:field_os2web_kulturnaut_sarrang]',
      ),
      'revisit-after' => array(
        'value' => 5,
        'period' => 'day',
      ),
      'og:street_address' => array(
        'value' => '[node:field_os2web_kulturnaut_saddress]',
      ),
      'og:locality' => array(
        'value' => '[node:field_os2web_kulturnaut_scity]',
      ),
      'og:postal_code' => array(
        'value' => '[node:field_os2web_kulturnaut_szip]',
      ),
      'og:country_name' => array(
        'value' => 'Denmark',
      ),
    ),
  );

  // Exported Metatag config instance: taxonomy_term:os2web_kulturnaut_tema.
  $config['taxonomy_term:os2web_kulturnaut_tema'] = array(
    'instance' => 'taxonomy_term:os2web_kulturnaut_tema',
    'disabled' => FALSE,
    'config' => array(
      'og:image' => array(
        'value' => '[term:field_os2web_kult_tema_image:os2sub_normal_imagesize]',
      ),
      'og:image:url' => array(
        'value' => '[term:field_os2web_kult_tema_image:os2sub_normal_imagesize]',
      ),
    ),
  );

  // Exported Metatag config instance: taxonomy_term:os2web_kulturnaut_venue.
  $config['taxonomy_term:os2web_kulturnaut_venue'] = array(
    'instance' => 'taxonomy_term:os2web_kulturnaut_venue',
    'disabled' => FALSE,
    'config' => array(
      'og:image' => array(
        'value' => '[term:field_os2web_kult_venue_image_lg:os2sub_normal_imagesize]',
      ),
      'og:image:url' => array(
        'value' => '[term:field_os2web_kult_venue_image_lg:os2sub_normal_imagesize]',
      ),
    ),
  );

  return $config;
}
