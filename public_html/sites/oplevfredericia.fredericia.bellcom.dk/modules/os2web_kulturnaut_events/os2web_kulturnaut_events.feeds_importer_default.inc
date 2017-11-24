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
          'xpathparser:24' => 'billede',
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
          'xpathparser:24' => 0,
        ),
        'context' => '/main/arrlist/arr',
        'exp' => array(
          'errors' => 1,
          'tidy' => 0,
          'tidy_encoding' => 'UTF8',
          'debug' => array(
            'context' => 0,
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
            'xpathparser:24' => 0,
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
            'language' => 'und',
          ),
          1 => array(
            'source' => 'xpathparser:4',
            'target' => 'field_os2web_kulturnaut_homepage',
            'unique' => FALSE,
            'language' => 'und',
          ),
          2 => array(
            'source' => 'xpathparser:7',
            'target' => 'field_os2web_kulturnaut_sname',
            'unique' => FALSE,
            'language' => 'und',
          ),
          3 => array(
            'source' => 'xpathparser:13',
            'target' => 'field_os2web_kulturnaut_date:start',
            'unique' => FALSE,
            'language' => 'und',
          ),
          4 => array(
            'source' => 'xpathparser:14',
            'target' => 'field_os2web_kulturnaut_date:end',
            'unique' => FALSE,
            'language' => 'und',
          ),
          5 => array(
            'source' => 'xpathparser:15',
            'target' => 'url',
            'unique' => 1,
            'language' => 'und',
          ),
          6 => array(
            'source' => 'xpathparser:16',
            'target' => 'title',
            'unique' => FALSE,
            'language' => 'und',
          ),
          7 => array(
            'source' => 'xpathparser:17',
            'target' => 'field_os2web_kulturnaut_venue',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          8 => array(
            'source' => 'xpathparser:18',
            'target' => 'field_os2web_kulturnaut_tema',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          9 => array(
            'source' => 'xpathparser:21',
            'target' => 'field_os2web_kulturnaut_source',
            'unique' => FALSE,
            'language' => 'und',
          ),
          10 => array(
            'source' => 'xpathparser:22',
            'target' => 'field_os2web_kulturnaut_time',
            'unique' => FALSE,
            'language' => 'und',
          ),
          11 => array(
            'source' => 'xpathparser:24',
            'target' => 'field_os2web_kulturnaut_slidesho:uri',
            'unique' => FALSE,
            'language' => 'und',
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
