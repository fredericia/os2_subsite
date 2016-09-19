<?php
/**
 * @file
 * os2web_taxonomies.feeds_importer_default.inc
 */

/**
 * Implements hook_feeds_importer_default().
 */
function os2web_taxonomies_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'os2web_taxonomies_feed_gis';
  $feeds_importer->config = array(
    'name' => 'Taksonomi: Egennavne/stednavne',
    'description' => 'Importerer Egennavne/stednavne taksonomien',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'xml',
        'direct' => 1,
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsXPathParserXML',
      'config' => array(
        'sources' => array(
          'xpathparser:0' => 'concat( @GisID, GisName )',
          'xpathparser:1' => 'concat( GisName, \', \' , GisPostCity, \' (\', GisTypes, \') id:\', @GisID  )',
          'xpathparser:2' => '@GisID',
          'xpathparser:3' => 'GisTypes',
          'xpathparser:4' => 'GisName',
          'xpathparser:5' => 'GisPostCity',
        ),
        'rawXML' => array(
          'xpathparser:0' => 0,
          'xpathparser:1' => 0,
          'xpathparser:2' => 0,
          'xpathparser:3' => 0,
          'xpathparser:4' => 0,
          'xpathparser:5' => 0,
        ),
        'context' => '/GisNames/GisName',
        'exp' => array(
          'errors' => 0,
          'debug' => array(
            'context' => 0,
            'xpathparser:0' => 0,
            'xpathparser:1' => 0,
            'xpathparser:2' => 0,
            'xpathparser:3' => 0,
            'xpathparser:4' => 0,
            'xpathparser:5' => 0,
          ),
        ),
        'allow_override' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsTermProcessor',
      'config' => array(
        'vocabulary' => 'os2web_taxonomies_tax_places',
        'mappings' => array(
          0 => array(
            'source' => 'xpathparser:0',
            'target' => 'guid',
            'unique' => 1,
          ),
          1 => array(
            'source' => 'xpathparser:1',
            'target' => 'name',
            'unique' => 0,
          ),
          2 => array(
            'source' => 'xpathparser:2',
            'target' => 'field_os2web_taxonomies_sys_id',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'xpathparser:3',
            'target' => 'field_os2web_taxonomies_type',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'xpathparser:4',
            'target' => 'field_name',
            'unique' => FALSE,
          ),
          5 => array(
            'source' => 'xpathparser:5',
            'target' => 'field_os2web_taxonomies_city',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '2',
        'input_format' => 'plain_text',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['os2web_taxonomies_feed_gis'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'os2web_taxonomies_feed_kle';
  $feeds_importer->config = array(
    'name' => 'Taksonomi: KLE',
    'description' => 'Importerer KLE taksonomien',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'xml',
        'direct' => 1,
        'directory' => 'public://feeds',
        'allowed_schemes' => array(
          0 => 'public',
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsXPathParserXML',
      'config' => array(
        'sources' => array(
          'xpathparser:1' => 'concat(Key,\' \',Name)',
          'xpathparser:2' => 'Key',
          'xpathparser:3' => '@ParentKey',
          'xpathparser:7' => 'Description',
          'xpathparser:8' => 'translate( translate( @Discontinued,\'true\',1), \'false\', 0 )',
          'xpathparser:9' => 'Tag[@TagTypeSqlID=2]/Value',
          'xpathparser:10' => 'Tag[@TagTypeSqlID=2]/Key',
          'xpathparser:11' => 'Tag[@TagTypeSqlID=4]/Key',
          'xpathparser:12' => 'Tag[@TagTypeSqlID=3]/Key',
        ),
        'rawXML' => array(
          'xpathparser:1' => 0,
          'xpathparser:2' => 0,
          'xpathparser:3' => 0,
          'xpathparser:7' => 0,
          'xpathparser:8' => 0,
          'xpathparser:9' => 0,
          'xpathparser:10' => 0,
          'xpathparser:11' => 0,
          'xpathparser:12' => 0,
        ),
        'context' => '/Taxonomy/Taxon',
        'exp' => array(
          'errors' => 0,
          'debug' => array(
            'context' => 0,
            'xpathparser:1' => 0,
            'xpathparser:2' => 0,
            'xpathparser:3' => 0,
            'xpathparser:7' => 0,
            'xpathparser:8' => 0,
            'xpathparser:9' => 0,
            'xpathparser:10' => 0,
            'xpathparser:11' => 0,
            'xpathparser:12' => 0,
          ),
        ),
        'allow_override' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsTermProcessor',
      'config' => array(
        'vocabulary' => 'os2web_taxonomies_tax_kle',
        'mappings' => array(
          0 => array(
            'source' => 'xpathparser:1',
            'target' => 'name',
            'unique' => 0,
          ),
          1 => array(
            'source' => 'xpathparser:2',
            'target' => 'guid',
            'unique' => 1,
          ),
          2 => array(
            'source' => 'xpathparser:3',
            'target' => 'parentguid',
            'unique' => 0,
          ),
          3 => array(
            'source' => 'xpathparser:7',
            'target' => 'description',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'xpathparser:8',
            'target' => 'field_os2web_taxonomies_dis_cont',
            'unique' => FALSE,
          ),
          5 => array(
            'source' => 'xpathparser:9',
            'target' => 'field_os2web_taxonomies_legi_ref:url',
            'unique' => FALSE,
          ),
          6 => array(
            'source' => 'xpathparser:10',
            'target' => 'field_os2web_taxonomies_legi_ref:title',
            'unique' => FALSE,
          ),
          7 => array(
            'source' => 'xpathparser:11',
            'target' => 'field_os2web_taxonomies_cue_word',
            'unique' => FALSE,
          ),
          8 => array(
            'source' => 'xpathparser:12',
            'target' => 'field_os2web_taxonomies_search',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '2',
        'input_format' => 'full_html',
        'skip_hash_check' => 0,
        'bundle' => 'os2web_taxonomies_tax_kle',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['os2web_taxonomies_feed_kle'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'os2web_taxonomies_feed_org';
  $feeds_importer->config = array(
    'name' => 'Taksonomi: Organisation',
    'description' => 'Importerer Organisation taksonomien',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'xml',
        'direct' => 1,
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsXPathParserXML',
      'config' => array(
        'sources' => array(
          'xpathparser:1' => 'Name',
          'xpathparser:2' => 'Key',
          'xpathparser:3' => '@ParentKey',
          'xpathparser:4' => 'Tag[@TagTypeSqlID=3]/Key',
          'xpathparser:5' => 'translate( translate( @Discontinued,\'true\',1), \'false\', 0 )',
        ),
        'rawXML' => array(
          'xpathparser:1' => 0,
          'xpathparser:2' => 0,
          'xpathparser:3' => 0,
          'xpathparser:4' => 0,
          'xpathparser:5' => 0,
        ),
        'context' => '/Taxonomy/Taxon',
        'exp' => array(
          'errors' => 0,
          'debug' => array(
            'context' => 0,
            'xpathparser:1' => 0,
            'xpathparser:2' => 0,
            'xpathparser:3' => 0,
            'xpathparser:4' => 0,
            'xpathparser:5' => 0,
          ),
        ),
        'allow_override' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsTermProcessor',
      'config' => array(
        'vocabulary' => 'os2web_taxonomies_tax_org',
        'mappings' => array(
          0 => array(
            'source' => 'xpathparser:1',
            'target' => 'name',
            'unique' => 0,
          ),
          1 => array(
            'source' => 'xpathparser:2',
            'target' => 'guid',
            'unique' => 1,
          ),
          2 => array(
            'source' => 'xpathparser:3',
            'target' => 'parentguid',
            'unique' => 0,
          ),
          3 => array(
            'source' => 'xpathparser:4',
            'target' => 'field_os2web_taxonomies_search',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'xpathparser:5',
            'target' => 'field_os2web_taxonomies_dis_cont',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '2',
        'input_format' => 'html',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['os2web_taxonomies_feed_org'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'os2web_taxonomies_feed_politics';
  $feeds_importer->config = array(
    'name' => 'Taksonomi: Politik',
    'description' => 'Importerer Politik taksonomien',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'txt csv tsv xml opml',
        'direct' => FALSE,
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsXPathParserXML',
      'config' => array(
        'sources' => array(
          'xpathparser:1' => 'Name',
          'xpathparser:2' => 'Key',
          'xpathparser:3' => '@ParentKey',
          'xpathparser:4' => 'Tag[@TagTypeSqlID=3]/Key',
          'xpathparser:5' => 'translate( translate( @Discontinued,\'true\',1), \'false\', 0 )',
        ),
        'rawXML' => array(
          'xpathparser:1' => 0,
          'xpathparser:2' => 0,
          'xpathparser:3' => 0,
          'xpathparser:4' => 0,
          'xpathparser:5' => 0,
        ),
        'context' => '/Taxonomy/Taxon',
        'exp' => array(
          'errors' => 0,
          'debug' => array(
            'context' => 0,
            'xpathparser:1' => 0,
            'xpathparser:2' => 0,
            'xpathparser:3' => 0,
            'xpathparser:4' => 0,
            'xpathparser:5' => 0,
          ),
        ),
        'allow_override' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsTermProcessor',
      'config' => array(
        'vocabulary' => 'os2web_taxonomies_tax_politics',
        'mappings' => array(
          0 => array(
            'source' => 'xpathparser:1',
            'target' => 'name',
            'unique' => 0,
          ),
          1 => array(
            'source' => 'xpathparser:2',
            'target' => 'guid',
            'unique' => 1,
          ),
          2 => array(
            'source' => 'xpathparser:3',
            'target' => 'parentguid',
            'unique' => 0,
          ),
          3 => array(
            'source' => 'xpathparser:4',
            'target' => 'field_os2web_taxonomies_search',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'xpathparser:5',
            'target' => 'field_os2web_taxonomies_dis_cont',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '2',
        'input_format' => 'plain_text',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['os2web_taxonomies_feed_politics'] = $feeds_importer;

  return $export;
}
