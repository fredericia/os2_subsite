<?php
/**
 * @file
 * os2web_kulturnaut_events.feeds_importer_default.inc
 */

/**
 * Implements hook_feeds_importer_default().
 */
function os2web_kulturnaut_events_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'os2web_kulturnaut_feeds_import';
  $feeds_importer->config = array(
    'name' => 'Kulturnaut begivenheder',
    'description' => 'Importere kulturnaut begivenheder fra Kulturnaut.',
    'fetcher' => array(
      'plugin_key' => 'FeedsHTTPFetcher',
      'config' => array(
        'auto_detect_feeds' => FALSE,
        'use_pubsubhubbub' => FALSE,
        'designated_hub' => '',
        'request_timeout' => NULL,
        'auto_scheme' => 'http',
        'accept_invalid_cert' => FALSE,
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsXPathParserXML',
      'config' => array(
        'sources' => array(
          'xpathparser:2' => 'beskrivelse',
          'xpathparser:4' => 'concat(\'http://www.kultunaut.dk\', substring-after(url,\'.dk\'))',
          'xpathparser:7' => 'sted',
          'xpathparser:13' => 'startdato',
          'xpathparser:14' => 'slutdato',
          'xpathparser:15' => 'url',
          'xpathparser:16' => 'overskrift',
          'xpathparser:17' => 'sted',
          'xpathparser:18' => 'kategori',
          'xpathparser:21' => '\'feed\'',
          'xpathparser:22' => 'tid',
          'xpathparser:23' => 'billede',
        ),
        'rawXML' => array(
          'xpathparser:2' => 0,
          'xpathparser:4' => 0,
          'xpathparser:7' => 0,
          'xpathparser:13' => 0,
          'xpathparser:14' => 0,
          'xpathparser:15' => 0,
          'xpathparser:16' => 0,
          'xpathparser:17' => 0,
          'xpathparser:18' => 0,
          'xpathparser:21' => 0,
          'xpathparser:22' => 0,
          'xpathparser:23' => 0,
        ),
        'context' => '/main/arrlist/arr',
        'exp' => array(
          'errors' => 1,
          'debug' => array(
            'context' => 'context',
            'xpathparser:2' => 'xpathparser:2',
            'xpathparser:4' => 'xpathparser:4',
            'xpathparser:7' => 'xpathparser:7',
            'xpathparser:13' => 'xpathparser:13',
            'xpathparser:14' => 'xpathparser:14',
            'xpathparser:15' => 'xpathparser:15',
            'xpathparser:16' => 'xpathparser:16',
            'xpathparser:17' => 'xpathparser:17',
            'xpathparser:18' => 'xpathparser:18',
            'xpathparser:21' => 'xpathparser:21',
            'xpathparser:22' => 'xpathparser:22',
            'xpathparser:23' => 'xpathparser:23',
          ),
        ),
        'allow_override' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '31536000',
        'author' => '1',
        'mappings' => array(
          0 => array(
            'source' => 'xpathparser:2',
            'target' => 'field_os2web_kulturnaut_descrip',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'xpathparser:4',
            'target' => 'field_os2web_kulturnaut_homepage',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'xpathparser:7',
            'target' => 'field_os2web_kulturnaut_sname',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'xpathparser:13',
            'target' => 'field_os2web_kulturnaut_date:start',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'xpathparser:14',
            'target' => 'field_os2web_kulturnaut_date:end',
            'unique' => FALSE,
          ),
          5 => array(
            'source' => 'xpathparser:15',
            'target' => 'url',
            'unique' => 1,
          ),
          6 => array(
            'source' => 'xpathparser:16',
            'target' => 'title',
            'unique' => FALSE,
          ),
          7 => array(
            'source' => 'xpathparser:17',
            'target' => 'field_os2web_kulturnaut_venue',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          8 => array(
            'source' => 'xpathparser:18',
            'target' => 'field_os2web_kulturnaut_tema',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          9 => array(
            'source' => 'xpathparser:21',
            'target' => 'field_os2web_kulturnaut_source',
            'unique' => FALSE,
          ),
          10 => array(
            'source' => 'xpathparser:22',
            'target' => 'field_os2web_kulturnaut_time',
            'unique' => FALSE,
          ),
          11 => array(
            'source' => 'xpathparser:23',
            'target' => 'field_os2web_kulturnaut_url',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '1',
        'input_format' => 'full_html',
        'bundle' => 'os2web_kulturnaut_knactivity',
        'authorize' => TRUE,
        'update_non_existent' => 'skip',
        'skip_hash_check' => FALSE,
        'insert_new' => 1,
        'language' => 'und',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '3600',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['os2web_kulturnaut_feeds_import'] = $feeds_importer;

  return $export;
}
