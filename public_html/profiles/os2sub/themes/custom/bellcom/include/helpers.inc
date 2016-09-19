<?php

/*
 * Seperated dates
 * Heavily inspired by drupals format_date() function.
 */
function _bellcom_seperated_dates($timestamp) {
  $seperated_dates = array();

  // Use the advanced drupal_static() pattern, since this is called very often.
  static $drupal_static_fast;
  if (!isset($drupal_static_fast)) {
    $drupal_static_fast['timezones'] = &drupal_static(__FUNCTION__);
  }
  $timezones = &$drupal_static_fast['timezones'];

  if (!isset($timezone)) {
    $timezone = date_default_timezone_get();
  }
  // Store DateTimeZone objects in an array rather than repeatedly
  // constructing identical objects over the life of a request.
  if (!isset($timezones[$timezone])) {
    $timezones[$timezone] = timezone_open($timezone);
  }

  // Use the default langcode if none is set.
  global $language;
  if (empty($langcode)) {
    $langcode = isset($language->language) ? $language->language : 'en';
  }

  // Create a DateTime object from the timestamp.
  $date_time = date_create('@' . $timestamp);
  // Set the time zone for the DateTime object.
  date_timezone_set($date_time, $timezones[$timezone]);

  // Seperated dates
  $seperated_dates = array(
    'day' => array(
      'integer' => date_format($date_time, 'd'),
      'short' => t(date_format($date_time, 'D')),
      'full' => t(date_format($date_time, 'l')),
    ),
    'month' => array(
      'integer' => date_format($date_time, 'm'),
      'short' => t(date_format($date_time, 'M')),
      'full' => t(date_format($date_time, 'F')),
    ),
    'year' => array(
      'short' => date_format($date_time, 'y'),
      'full' => date_format($date_time, 'Y'),
    ),
    'week' => date_format($date_time, 'W'),
  );

  return $seperated_dates;
}

/*
 * Text shortener
 */
function _bellcom_text_shortener($text_string, $max_length) {
  $alter = array(
    'max_length'    => $max_length,
    'ellipsis'      => TRUE,
    'word_boundary' => TRUE,
    'html'          => TRUE,
  );

  $shortened_string = views_trim_text($alter, $text_string);

  return $shortened_string;
}

/**
 * Collect and assemble theme settings.
 */
function _bellcom_collect_theme_settings() {
  $settings = array();

  // Contact information
  $settings['contact_information']['business_owner_name'] = theme_get_setting('business_owner_name');
  $settings['contact_information']['business_startup_year'] = theme_get_setting('business_startup_year');
  $settings['contact_information']['address'] = theme_get_setting('address');
  $settings['contact_information']['zipcode'] = theme_get_setting('zipcode');
  $settings['contact_information']['city'] = theme_get_setting('city');
  $settings['contact_information']['phone_system'] = theme_get_setting('phone_system');
  $settings['contact_information']['phone_readable'] = theme_get_setting('phone_readable');
  $settings['contact_information']['email'] = theme_get_setting('email');
  $settings['contact_information']['working_hours'] = theme_get_setting('working_hours');

  // Social links
  $settings['social_links']['facebook']['active'] = theme_get_setting('facebook');
  $settings['social_links']['facebook']['url'] = theme_get_setting('facebook_url');
  $settings['social_links']['facebook']['tooltip'] = t(theme_get_setting('facebook_tooltip'));
  $settings['social_links']['twitter']['active'] = theme_get_setting('twitter');
  $settings['social_links']['twitter']['url'] = theme_get_setting('twitter_url');
  $settings['social_links']['twitter']['tooltip'] = t(theme_get_setting('twitter_tooltip'));
  $settings['social_links']['googleplus']['active'] = theme_get_setting('googleplus');
  $settings['social_links']['googleplus']['url'] = theme_get_setting('googleplus_url');
  $settings['social_links']['googleplus']['tooltip'] = t(theme_get_setting('googleplus_tooltip'));
  $settings['social_links']['instagram']['active'] = theme_get_setting('instagram');
  $settings['social_links']['instagram']['url'] = theme_get_setting('instagram_url');
  $settings['social_links']['instagram']['tooltip'] = t(theme_get_setting('instagram_tooltip'));
  $settings['social_links']['linkedin']['active'] = theme_get_setting('linkedin');
  $settings['social_links']['linkedin']['url'] = theme_get_setting('linkedin_url');
  $settings['social_links']['linkedin']['tooltip'] = t(theme_get_setting('linkedin_tooltip'));
  $settings['social_links']['pinterest']['active'] = theme_get_setting('pinterest');
  $settings['social_links']['pinterest']['url'] = theme_get_setting('pinterest_url');
  $settings['social_links']['pinterest']['tooltip'] = t(theme_get_setting('pinterest_tooltip'));
  $settings['social_links']['vimeo']['active'] = theme_get_setting('vimeo');
  $settings['social_links']['vimeo']['url'] = theme_get_setting('vimeo_url');
  $settings['social_links']['vimeo']['tooltip'] = t(theme_get_setting('vimeo_tooltip'));
  $settings['social_links']['youtube']['active'] = theme_get_setting('youtube');
  $settings['social_links']['youtube']['url'] = theme_get_setting('youtube_url');
  $settings['social_links']['youtube']['tooltip'] = t(theme_get_setting('youtube_tooltip'));

  // Layout
  $settings['layout']['copyright'] = ($settings['contact_information']['business_startup_year'] < date('Y') AND $settings['contact_information']['business_startup_year'] !== NULL) ? $settings['contact_information']['business_startup_year'] . '-' . date('Y') : date('Y');
  $settings['layout']['footer']['show_social_links'] = theme_get_setting('footer_show_social_links');
  $settings['layout']['sidebar']['show_social_links'] = theme_get_setting('sidebar_show_social_links');

  return $settings;
}

/*
 * Sidebar classes
 */
function _bellcom_sidebar_classes($viewmode) {
  $classes = array();

  // Settings
  $enabled = theme_get_setting('sidebar_left_' . $viewmode . '_enabled');
  $state = theme_get_setting('sidebar_left_' . $viewmode . '_state');
  $content_effect = theme_get_setting('sidebar_left_' . $viewmode . '_content_effect');

  // Enabled
  if (!isset($enabled) or !$enabled or $enabled == 0) {
    return array();
  }

  $classes[] = 'sidebar-left-enabled-' . $viewmode;

  // State
  if ($state == 'expanded') {
    $classes[] = 'sidebar-left-expanded-' . $viewmode;
  }
  elseif ($state == 'collapsed') {
    $classes[] = 'sidebar-left-collapsed-' . $viewmode;
  }
  elseif ($state == 'hidden') {
    $classes[] = 'sidebar-left-hidden-' . $viewmode;
  }

  // Content effect
  if ($content_effect == 'shrink' && $state == 'hidden') {
    $classes[] = 'sidebar-left-content-shrink-' . $viewmode;
  }
  elseif ($content_effect == 'push') {
    $classes[] = 'sidebar-left-content-push-' . $viewmode;
  }

  return $classes;
}
