<?php
/**
 * @file
 * fic_search.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function fic_search_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function fic_search_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function fic_search_image_default_styles() {
  $styles = array();

  // Exported image style: os2sub_search.
  $styles['os2sub_search'] = array(
    'label' => 'OS2Sub search (810 x 405)',
    'effects' => array(
      17 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 810,
          'height' => 405,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_default_search_api_index().
 */
function fic_search_default_search_api_index() {
  $items = array();
  $items['fic_node_and_term_index'] = entity_import('search_api_index', '{
    "name" : "FIC node and term index",
    "machine_name" : "fic_node_and_term_index",
    "description" : null,
    "server" : "fic_search_server",
    "item_type" : "multiple",
    "options" : {
      "datasource" : { "types" : [ "node", "taxonomy_term" ] },
      "index_directly" : 0,
      "cron_limit" : "50",
      "fields" : {
        "node" : { "type" : "integer", "entity_type" : "node" },
        "node:field_os2web_kulturnaut_date:duration" : { "type" : "duration" },
        "node:field_os2web_kulturnaut_date:value" : { "type" : "date" },
        "node:field_os2web_kulturnaut_date:value2" : { "type" : "date" },
        "node:field_os2web_kulturnaut_descrip:value" : { "type" : "text" },
        "node:field_os2web_kulturnaut_longdesc:value" : { "type" : "text" },
        "node:field_os2web_kulturnaut_tema:name_field" : { "type" : "list\\u003Ctext\\u003E" },
        "node:field_os2web_kulturnaut_tema:parents_all" : {
          "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
          "entity_type" : "taxonomy_term"
        },
        "node:status" : { "type" : "integer" },
        "node:title" : { "type" : "text" },
        "node:type" : { "type" : "string" },
        "search_api_language" : { "type" : "string" },
        "taxonomy_term" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "taxonomy_term:description" : { "type" : "text" },
        "taxonomy_term:name" : { "type" : "text" },
        "taxonomy_term:vocabulary" : { "type" : "integer", "entity_type" : "taxonomy_vocabulary" }
      },
      "data_alter_callbacks" : {
        "search_api_alter_bundle_filter" : {
          "status" : 0,
          "weight" : "-10",
          "settings" : { "default" : "1", "bundles" : [] }
        },
        "search_api_alter_add_url" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_aggregation" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_hierarchy" : { "status" : 0, "weight" : "0", "settings" : { "fields" : [] } },
        "search_api_alter_language_control" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "lang_field" : "", "languages" : [] }
        }
      },
      "processors" : {
        "search_api_case_ignore" : {
          "status" : 1,
          "weight" : "0",
          "settings" : { "fields" : { "node:field_os2web_kulturnaut_tema:name_field" : true } }
        },
        "search_api_html_filter" : {
          "status" : 0,
          "weight" : "10",
          "settings" : {
            "fields" : { "node:field_os2web_kulturnaut_tema:name_field" : true },
            "title" : 0,
            "alt" : 1,
            "tags" : "h1 = 5\\r\\nh2 = 3\\r\\nh3 = 2\\r\\nstrong = 2\\r\\nb = 2\\r\\nem = 1.5\\r\\nu = 1.5"
          }
        },
        "search_api_transliteration" : {
          "status" : 0,
          "weight" : "15",
          "settings" : { "fields" : { "node:field_os2web_kulturnaut_tema:name_field" : true } }
        },
        "search_api_tokenizer" : {
          "status" : 0,
          "weight" : "20",
          "settings" : {
            "fields" : { "node:field_os2web_kulturnaut_tema:name_field" : true },
            "spaces" : "[^[:alnum:]]",
            "ignorable" : "[\\u0027]"
          }
        },
        "search_api_stopwords" : {
          "status" : 0,
          "weight" : "30",
          "settings" : {
            "fields" : { "node:field_os2web_kulturnaut_tema:name_field" : true },
            "file" : "",
            "stopwords" : "but\\r\\ndid\\r\\nthe this that those\\r\\netc"
          }
        },
        "search_api_porter_stemmer" : {
          "status" : 0,
          "weight" : "35",
          "settings" : {
            "fields" : { "node:field_os2web_kulturnaut_tema:name_field" : true },
            "exceptions" : "texan=texa"
          }
        },
        "search_api_highlighting" : {
          "status" : 1,
          "weight" : "40",
          "settings" : {
            "prefix" : "\\u003Cstrong\\u003E",
            "suffix" : "\\u003C\\/strong\\u003E",
            "excerpt" : 1,
            "excerpt_length" : "256",
            "exclude_fields" : [],
            "highlight" : "always",
            "highlight_partial" : 0
          }
        }
      }
    },
    "enabled" : "1",
    "read_only" : "0"
  }');
  return $items;
}

/**
 * Implements hook_default_search_api_server().
 */
function fic_search_default_search_api_server() {
  $items = array();
  $items['fic_search_server'] = entity_import('search_api_server', '{
    "name" : "FIC search",
    "machine_name" : "fic_search_server",
    "description" : "",
    "class" : "search_api_db_service",
    "options" : {
      "database" : "default:default",
      "min_chars" : "3",
      "partial_matches" : 0,
      "indexes" : { "fic_node_and_term_index" : {
          "search_api_language" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "search_api_language",
            "type" : "string",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_tema:parents_all" : {
            "table" : "search_api_db_fic_node_and_term_index_node_field_os2web_kultur",
            "column" : "value",
            "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_tema:name_field" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "node",
            "type" : "integer",
            "boost" : "1.0"
          },
          "taxonomy_term" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "taxonomy_term",
            "type" : "integer",
            "boost" : "1.0"
          },
          "node:type" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "node_type",
            "type" : "string",
            "boost" : "1.0"
          },
          "node:title" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:status" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "node_status",
            "type" : "integer",
            "boost" : "1.0"
          },
          "taxonomy_term:name" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "taxonomy_term:description" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "taxonomy_term:vocabulary" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "taxonomy_term_vocabulary",
            "type" : "integer",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_date:value" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "node_field_os2web_kulturnaut_date_value",
            "type" : "date",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_date:value2" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "node_field_os2web_kulturnaut_date_value2",
            "type" : "date",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_date:duration" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "node_field_os2web_kulturnaut_date_duration",
            "type" : "duration",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_descrip:value" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_longdesc:value" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "1.0"
          }
        }
      }
    },
    "enabled" : "1"
  }');
  return $items;
}
