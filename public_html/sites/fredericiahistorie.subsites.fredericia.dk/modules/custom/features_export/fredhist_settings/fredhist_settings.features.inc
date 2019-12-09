<?php
/**
 * @file
 * fredhist_settings.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function fredhist_settings_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_themekey_features_rule_chain().
 */
function fredhist_settings_themekey_features_rule_chain() {
if (!defined('THEMEKEY_PAGECACHE_UNSUPPORTED')) {
    define('THEMEKEY_PAGECACHE_UNSUPPORTED', 0);
    define('THEMEKEY_PAGECACHE_SUPPORTED', 1);
    define('THEMEKEY_PAGECACHE_TIMEBASED', 2);
  }
$rules = array(
  0 => array(
    'rule' => array(
      'property' => 'system:user_agent',
      'operator' => '=',
      'value' => 'pack',
      'theme' => 'fredhistapp',
      'enabled' => 1,
      'wildcards' => 'a:0:{}',
      'module' => 'fredhist_settings',
    ),
    'string' => '"system:user_agent = pack >>> fredhistapp"',
    'childs' => array(),
  ),
);

return $rules;
}
