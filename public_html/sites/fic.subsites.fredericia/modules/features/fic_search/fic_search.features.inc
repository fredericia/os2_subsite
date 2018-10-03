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
      "index_directly" : 1,
      "cron_limit" : "200",
      "fields" : {
        "node" : { "type" : "integer", "entity_type" : "node" },
        "node:body:value" : { "type" : "text" },
        "node:field_afsnit" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "paragraphs_item" },
        "node:field_afsnit:field_paragraph_header" : { "type" : "list\\u003Ctext\\u003E" },
        "node:field_afsnit:field_paragraph_personale" : {
          "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
          "entity_type" : "node"
        },
        "node:field_afsnit:field_paragraph_personale:field_personale_jobtitel" : { "type" : "list\\u003Clist\\u003Ctext\\u003E\\u003E" },
        "node:field_afsnit:field_paragraph_personale:field_vist_navn" : { "type" : "list\\u003Clist\\u003Ctext\\u003E\\u003E" },
        "node:field_afsnit:field_paragraph_personale:title" : { "type" : "list\\u003Clist\\u003Ctext\\u003E\\u003E" },
        "node:field_afsnit:field_paragraph_text:value" : { "type" : "list\\u003Ctext\\u003E" },
        "node:field_afsnit_full_width" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "paragraphs_item" },
        "node:field_afsnit_full_width:field_citat" : { "type" : "list\\u003Ctext\\u003E" },
        "node:field_afsnit_full_width:field_paragraph_header" : { "type" : "list\\u003Ctext\\u003E" },
        "node:field_afsnit_full_width:field_paragraph_text:value" : { "type" : "list\\u003Ctext\\u003E" },
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
        "node:title" : { "type" : "text", "boost" : "13.0" },
        "node:type" : { "type" : "string" },
        "search_api_language" : { "type" : "string" },
        "taxonomy_term" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "taxonomy_term:description" : { "type" : "text", "boost" : "0.8" },
        "taxonomy_term:field_afsnit:field_citat" : { "type" : "list\\u003Ctext\\u003E" },
        "taxonomy_term:field_afsnit:field_paragraph_header" : { "type" : "list\\u003Ctext\\u003E" },
        "taxonomy_term:field_afsnit:field_paragraph_text:value" : { "type" : "list\\u003Ctext\\u003E" },
        "taxonomy_term:name" : { "type" : "text", "boost" : "8.0" },
        "taxonomy_term:name_field" : { "type" : "text", "boost" : "8.0" },
        "taxonomy_term:vocabulary" : { "type" : "integer", "entity_type" : "taxonomy_vocabulary" }
      },
      "data_alter_callbacks" : {
        "search_api_alter_bundle_filter" : {
          "status" : 1,
          "weight" : "-10",
          "settings" : {
            "default" : "0",
            "bundles" : {
              "node:os2web_kulturnaut_knactivity" : "node:os2web_kulturnaut_knactivity",
              "node:event_calendar" : "node:event_calendar",
              "node:os2web_base_gallery" : "node:os2web_base_gallery",
              "node:os2web_base_contentpage" : "node:os2web_base_contentpage",
              "node:os2web_base_news" : "node:os2web_base_news",
              "taxonomy_term:os2web_taxonomies_tax_portal_cat" : "taxonomy_term:os2web_taxonomies_tax_portal_cat",
              "taxonomy_term:os2web_base_tax_site_structure" : "taxonomy_term:os2web_base_tax_site_structure",
              "taxonomy_term:os2web_kulturnaut_tema" : "taxonomy_term:os2web_kulturnaut_tema",
              "taxonomy_term:os2web_kulturnaut_venue" : "taxonomy_term:os2web_kulturnaut_venue"
            }
          }
        },
        "search_api_alter_language_control" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "lang_field" : "", "languages" : [] }
        },
        "search_api_alter_add_hierarchy" : { "status" : 0, "weight" : "0", "settings" : { "fields" : [] } },
        "search_api_alter_add_aggregation" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_url" : { "status" : 0, "weight" : "0", "settings" : [] }
      },
      "processors" : {
        "search_api_case_ignore" : {
          "status" : 1,
          "weight" : "0",
          "settings" : { "fields" : {
              "node:title" : true,
              "node:field_afsnit" : true,
              "node:field_afsnit_full_width" : true,
              "taxonomy_term:name" : true,
              "taxonomy_term:description" : true,
              "taxonomy_term:name_field" : true,
              "node:body:value" : true,
              "node:field_afsnit:field_paragraph_header" : true,
              "node:field_os2web_kulturnaut_tema:name_field" : true,
              "node:field_afsnit:field_paragraph_personale:title" : true,
              "node:field_afsnit:field_paragraph_personale:field_personale_jobtitel" : true,
              "node:field_afsnit:field_paragraph_personale:field_vist_navn" : true
            }
          }
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
          "status" : 1,
          "weight" : "30",
          "settings" : {
            "fields" : {
              "taxonomy_term:description" : true,
              "node:body:value" : true,
              "node:field_afsnit_full_width:field_citat" : true,
              "node:field_os2web_kulturnaut_descrip:value" : true,
              "node:field_os2web_kulturnaut_longdesc:value" : true,
              "node:field_os2web_kulturnaut_tema:name_field" : true,
              "taxonomy_term:field_afsnit:field_citat" : true,
              "node:field_afsnit:field_paragraph_text:value" : true,
              "node:field_afsnit_full_width:field_paragraph_text:value" : true,
              "taxonomy_term:field_afsnit:field_paragraph_text:value" : true
            },
            "file" : "",
            "stopwords" : "ad\\r\\naf\\r\\naldrig\\r\\nalle\\r\\nalt\\r\\nanden\\r\\nandet\\r\\nandre\\r\\nat\\r\\nbare\\r\\nbegge\\r\\nblev\\r\\nblive\\r\\nbliver\\r\\nda\\r\\nde\\r\\ndem\\r\\nden\\r\\ndenne\\r\\nder\\r\\nderes\\r\\ndet\\r\\ndette\\r\\ndig\\r\\ndin\\r\\ndine\\r\\ndisse\\r\\ndit\\r\\ndog\\r\\ndu\\r\\nefter\\r\\nej\\r\\neller\\r\\nen\\r\\nend\\r\\nene\\r\\neneste\\r\\nenhver\\r\\ner\\r\\net\\r\\nfar\\r\\nfem\\r\\nfik\\r\\nfire\\r\\nflere\\r\\nfleste\\r\\nfor\\r\\nfordi\\r\\nforrige\\r\\nfra\\r\\nf\\u00e5\\r\\nf\\u00e5r\\r\\nf\\u00f8r\\r\\ngod\\r\\ngodt\\r\\nham\\r\\nhan\\r\\nhans\\r\\nhar\\r\\nhavde\\r\\nhave\\r\\nhej\\r\\nhelt\\r\\nhende\\r\\nhendes\\r\\nher\\r\\nhos\\r\\nhun\\r\\nhvad\\r\\nhvem\\r\\nhver\\r\\nhvilken\\r\\nhvis\\r\\nhvor\\r\\nhvordan\\r\\nhvorfor\\r\\nhvorn\\u00e5r\\r\\ni\\r\\nikke\\r\\nind\\r\\ningen\\r\\nintet\\r\\nja\\r\\njeg\\r\\njer\\r\\njeres\\r\\njo\\r\\nkan\\r\\nkom\\r\\nkomme\\r\\nkommer\\r\\nkun\\r\\nkunne\\r\\nlad\\r\\nlav\\r\\nlidt\\r\\nlige\\r\\nlille\\r\\nman\\r\\nmand\\r\\nmange\\r\\nmed\\r\\nmeget\\r\\nmen\\r\\nmens\\r\\nmere\\r\\nmig\\r\\nmin\\r\\nmine\\r\\nmit\\r\\nmod\\r\\nm\\u00e5\\r\\nned\\r\\nnej\\r\\nni\\r\\nnogen\\r\\nnoget\\r\\nnogle\\r\\nnu\\r\\nny\\r\\nnyt\\r\\nn\\u00e5r\\r\\nn\\u00e6r\\r\\nn\\u00e6ste\\r\\nn\\u00e6sten\\r\\nog\\r\\nogs\\u00e5\\r\\nokay\\r\\nom\\r\\nop\\r\\nos\\r\\notte\\r\\nover\\r\\np\\u00e5\\r\\nse\\r\\nseks\\r\\nselv\\r\\nser\\r\\nses\\r\\nsig\\r\\nsige\\r\\nsin\\r\\nsine\\r\\nsit\\r\\nskal\\r\\nskulle\\r\\nsom\\r\\nstor\\r\\nstore\\r\\nsyv\\r\\ns\\u00e5\\r\\ns\\u00e5dan\\r\\ntag\\r\\ntage\\r\\nthi\\r\\nti\\r\\ntil\\r\\nto\\r\\ntre\\r\\nud\\r\\nunder\\r\\nvar\\r\\nved\\r\\nvi\\r\\nvil\\r\\nville\\r\\nvor\\r\\nvores\\r\\nv\\u00e6re\\r\\nv\\u00e6ret\\r\\nbut\\r\\ndid\\r\\nthe this that those\\r\\netc"
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
          "search_api_language" : {
            "table" : "search_api_db_fic_node_and_term_index",
            "column" : "search_api_language",
            "type" : "string",
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
            "boost" : "13.0"
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
            "boost" : "8.0"
          },
          "taxonomy_term:description" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "0.8"
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
          "taxonomy_term:name_field" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "8.0"
          },
          "taxonomy_term:field_afsnit:field_paragraph_header" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit:field_paragraph_text:value" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit:field_paragraph_personale:field_personale_jobtitel" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Clist\\u003Ctext\\u003E\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit:field_paragraph_personale:field_vist_navn" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Clist\\u003Ctext\\u003E\\u003E",
            "boost" : "1.0"
          },
          "taxonomy_term:field_afsnit:field_paragraph_text:value" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit" : {
            "table" : "search_api_db_fic_node_and_term_index_node_field_afsnit",
            "column" : "value",
            "type" : "list\\u003Cinteger\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit_full_width" : {
            "table" : "search_api_db_fic_node_and_term_index_node_field_afsnit_full_w",
            "column" : "value",
            "type" : "list\\u003Cinteger\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit:field_paragraph_header" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit:field_paragraph_personale" : {
            "table" : "search_api_db_fic_node_and_term_index_node_field_afsnit_field_",
            "column" : "value",
            "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
            "boost" : "1.0"
          },
          "taxonomy_term:field_afsnit:field_citat" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit_full_width:field_paragraph_header" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit_full_width:field_citat" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_afsnit_full_width:field_paragraph_text:value" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:body:value" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_afsnit:field_paragraph_personale:title" : {
            "table" : "search_api_db_fic_node_and_term_index_text",
            "type" : "list\\u003Clist\\u003Ctext\\u003E\\u003E",
            "boost" : "1.0"
          }
        }
      }
    },
    "enabled" : "1"
  }');
  return $items;
}
