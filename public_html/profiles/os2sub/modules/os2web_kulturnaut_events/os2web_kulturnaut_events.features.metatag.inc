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
    'config' => array(
      'description' => array(
        'value' => '[node:field_os2web_kulturnaut_date] [node:field_os2web_kulturnaut_descrip] [node:field_os2web_kulturnaut_longdesc]',
      ),
      'abstract' => array(
        'value' => '[node:summary]',
      ),
      'keywords' => array(
        'value' => '[node:field_os2web_base_field_edi_tags]',
      ),
      'robots' => array(
        'value' => array(
          'index' => 'index',
          'follow' => 'follow',
          'noindex' => 0,
          'nofollow' => 0,
          'noarchive' => 0,
          'nosnippet' => 0,
          'noodp' => 0,
          'noydir' => 0,
          'noimageindex' => 0,
          'notranslate' => 0,
        ),
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
      'og:type' => array(
        'value' => 'article',
      ),
      'og:image' => array(
        'value' => '[node:field_os2web_kulturnaut_slidesho:os2sub_page_slideshow]',
      ),
      'og:image:url' => array(
        'value' => '',
      ),
      'og:image:width' => array(
        'value' => '[node:field_os2web_kulturnaut_slidesho:os2sub_page_slideshow:width]',
      ),
      'og:image:height' => array(
        'value' => '[node:field_os2web_kulturnaut_slidesho:os2sub_page_slideshow:height]',
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

  return $config;
}
