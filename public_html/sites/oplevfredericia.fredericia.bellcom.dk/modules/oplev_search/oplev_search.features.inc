<?php
/**
 * @file
 * oplev_search.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function oplev_search_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "ds" && $api == "ds") {
    return array("version" => "1");
  }
  if ($module == "facetapi" && $api == "facetapi_defaults") {
    return array("version" => "1");
  }
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function oplev_search_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_default_search_api_index().
 */
function oplev_search_default_search_api_index() {
  $items = array();
  $items['oplev_index'] = entity_import('search_api_index', '{
    "name" : "Oplev index",
    "machine_name" : "oplev_index",
    "description" : null,
    "server" : "oplev_server",
    "item_type" : "multiple",
    "options" : {
      "datasource" : { "types" : [ "node", "taxonomy_term" ] },
      "index_directly" : 0,
      "cron_limit" : "150",
      "fields" : {
        "node" : { "type" : "integer", "entity_type" : "node" },
        "node:field_os2web_kulturnaut_date:duration" : { "type" : "duration" },
        "node:field_os2web_kulturnaut_date:value" : { "type" : "date" },
        "node:field_os2web_kulturnaut_date:value2" : { "type" : "date" },
        "node:field_os2web_kulturnaut_descrip:value" : { "type" : "text" },
        "node:field_os2web_kulturnaut_longdesc:value" : { "type" : "text" },
        "node:field_os2web_kulturnaut_tema:name" : { "type" : "list\\u003Ctext\\u003E" },
        "node:field_os2web_kulturnaut_tema:parents_all" : {
          "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
          "entity_type" : "taxonomy_term"
        },
        "node:title" : { "type" : "text" },
        "node:type" : { "type" : "string" },
        "search_api_language" : { "type" : "string" },
        "taxonomy_term" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "taxonomy_term:description" : { "type" : "list\\u003Ctext\\u003E" },
        "taxonomy_term:name" : { "type" : "list\\u003Ctext\\u003E" },
        "taxonomy_term:vocabulary" : {
          "type" : "list\\u003Cinteger\\u003E",
          "entity_type" : "taxonomy_vocabulary"
        }
      },
      "data_alter_callbacks" : {
        "search_api_alter_bundle_filter" : {
          "status" : 1,
          "weight" : "-10",
          "settings" : {
            "default" : "0",
            "bundles" : {
              "node:os2web_kulturnaut_knactivity" : "node:os2web_kulturnaut_knactivity",
              "taxonomy_term:os2web_kulturnaut_tema" : "taxonomy_term:os2web_kulturnaut_tema"
            }
          }
        },
        "search_api_alter_add_url" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_aggregation" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "fields" : { "search_api_aggregation_1" : {
                "name" : "Full node view",
                "type" : "fulltext",
                "fields" : [ "node" ],
                "description" : "A Fulltext aggregation of the following fields: Node."
              }
            }
          }
        },
        "search_api_alter_add_hierarchy" : {
          "status" : 1,
          "weight" : "0",
          "settings" : { "fields" : { "taxonomy_term:parents_all" : "taxonomy_term:parents_all" } }
        },
        "search_api_alter_language_control" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "lang_field" : "", "languages" : [] }
        }
      },
      "processors" : {
        "search_api_case_ignore" : { "status" : 0, "weight" : "0", "settings" : { "fields" : [] } },
        "search_api_html_filter" : {
          "status" : 0,
          "weight" : "10",
          "settings" : {
            "fields" : [],
            "title" : 0,
            "alt" : 1,
            "tags" : "h1 = 5\\r\\nh2 = 3\\r\\nh3 = 2\\r\\nstrong = 2\\r\\nb = 2\\r\\nem = 1.5\\r\\nu = 1.5"
          }
        },
        "search_api_transliteration" : { "status" : 0, "weight" : "15", "settings" : { "fields" : [] } },
        "search_api_tokenizer" : {
          "status" : 0,
          "weight" : "20",
          "settings" : { "fields" : [], "spaces" : "[^[:alnum:]]", "ignorable" : "[\\u0027]" }
        },
        "search_api_stopwords" : {
          "status" : 0,
          "weight" : "30",
          "settings" : {
            "fields" : [],
            "file" : "",
            "stopwords" : "but\\r\\ndid\\r\\nthe this that those\\r\\netc"
          }
        },
        "search_api_porter_stemmer" : {
          "status" : 0,
          "weight" : "35",
          "settings" : { "fields" : [], "exceptions" : "texan=texa" }
        },
        "search_api_highlighting" : {
          "status" : 1,
          "weight" : "40",
          "settings" : {
            "prefix" : "\\u003Cb\\u003E",
            "suffix" : "\\u003C\\/b\\u003E",
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
function oplev_search_default_search_api_server() {
  $items = array();
  $items['oplev_server'] = entity_import('search_api_server', '{
    "name" : "Oplev server",
    "machine_name" : "oplev_server",
    "description" : "",
    "class" : "search_api_db_service",
    "options" : {
      "database" : "default:default",
      "min_chars" : "1",
      "partial_matches" : 0,
      "indexes" : {
        "oplev_index" : {
          "node" : {
            "table" : "search_api_db_oplev_index",
            "column" : "node",
            "type" : "integer",
            "boost" : "1.0"
          },
          "taxonomy_term" : {
            "table" : "search_api_db_oplev_index_taxonomy_term",
            "column" : "value",
            "type" : "list\\u003Cinteger\\u003E",
            "boost" : "1.0"
          },
          "search_api_language" : {
            "table" : "search_api_db_oplev_index",
            "column" : "search_api_language",
            "type" : "string",
            "boost" : "1.0"
          },
          "node:title" : {
            "table" : "search_api_db_oplev_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "taxonomy_term:name" : {
            "table" : "search_api_db_oplev_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "taxonomy_term:description" : {
            "table" : "search_api_db_oplev_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_date:value" : {
            "table" : "search_api_db_oplev_index",
            "column" : "node_field_os2web_kulturnaut_date_value",
            "type" : "date",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_date:value2" : {
            "table" : "search_api_db_oplev_index",
            "column" : "node_field_os2web_kulturnaut_date_value2",
            "type" : "date",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_date:duration" : {
            "table" : "search_api_db_oplev_index",
            "column" : "node_field_os2web_kulturnaut_date_duration",
            "type" : "duration",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_tema:name" : {
            "table" : "search_api_db_oplev_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:type" : {
            "table" : "search_api_db_oplev_index",
            "column" : "node_type",
            "type" : "string",
            "boost" : "1.0"
          },
          "taxonomy_term:vocabulary" : {
            "table" : "search_api_db_oplev_index_taxonomy_term_vocabulary",
            "column" : "value",
            "type" : "list\\u003Cinteger\\u003E",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_longdesc:value" : {
            "table" : "search_api_db_oplev_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_descrip:value" : {
            "table" : "search_api_db_oplev_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_tema:parents_all" : {
            "table" : "search_api_db_oplev_index_node_field_os2web_kulturnaut_tema_pa",
            "column" : "value",
            "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
            "boost" : "1.0"
          }
        },
        "oplev_node_index" : {
          "title" : {
            "table" : "search_api_db_oplev_node_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "search_api_language" : {
            "table" : "search_api_db_oplev_node_index",
            "column" : "search_api_language",
            "type" : "string",
            "boost" : "1.0"
          },
          "field_os2web_kulturnaut_descrip:value" : {
            "table" : "search_api_db_oplev_node_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "field_os2web_kulturnaut_longdesc:value" : {
            "table" : "search_api_db_oplev_node_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "search_api_viewed" : {
            "table" : "search_api_db_oplev_node_index_text",
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
