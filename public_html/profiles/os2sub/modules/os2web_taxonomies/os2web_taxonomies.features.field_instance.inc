<?php
/**
 * @file
 * os2web_taxonomies.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function os2web_taxonomies_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_comittee-field_os2web_taxonomies_dep_id'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_comittee-field_os2web_taxonomies_dep_id'] = array(
    'bundle' => 'os2web_taxonomies_tax_comittee',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 9,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_dep_id',
    'label' => 'Afdelingsid',
    'required' => 1,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 10,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_comittee-field_os2web_taxonomies_dep_name'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_comittee-field_os2web_taxonomies_dep_name'] = array(
    'bundle' => 'os2web_taxonomies_tax_comittee',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 10,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_dep_name',
    'label' => 'Afdelingsnavn',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 11,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_comittee-field_os2web_taxonomies_sys_id'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_comittee-field_os2web_taxonomies_sys_id'] = array(
    'bundle' => 'os2web_taxonomies_tax_comittee',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 8,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_sys_id',
    'label' => 'Systemid',
    'required' => 1,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 9,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_cue_word'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_cue_word'] = array(
    'bundle' => 'os2web_taxonomies_tax_kle',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 6,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_cue_word',
    'label' => 'KLE stikord',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 7,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_dis_con'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_dis_con'] = array(
    'bundle' => 'os2web_taxonomies_tax_kle',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'number',
        'settings' => array(
          'decimal_separator' => '.',
          'prefix_suffix' => TRUE,
          'scale' => 0,
          'thousand_separator' => ' ',
        ),
        'type' => 'number_integer',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_dis_con',
    'label' => 'Udgået',
    'required' => 0,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 31,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_dis_cont'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_dis_cont'] = array(
    'bundle' => 'os2web_taxonomies_tax_kle',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 2,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_dis_cont',
    'label' => 'Udgået',
    'required' => 0,
    'settings' => array(
      'max' => 1,
      'min' => 0,
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 3,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_legi_ref'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_legi_ref'] = array(
    'bundle' => 'os2web_taxonomies_tax_kle',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'link',
        'settings' => array(),
        'type' => 'link_default',
        'weight' => 5,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_legi_ref',
    'label' => 'Lovhenvisninger',
    'required' => 0,
    'settings' => array(
      'absolute_url' => 1,
      'attributes' => array(
        'class' => '',
        'configurable_title' => 0,
        'rel' => '',
        'target' => 'default',
        'title' => '',
      ),
      'display' => array(
        'url_cutoff' => 80,
      ),
      'enable_tokens' => 1,
      'title' => 'optional',
      'title_label_use_field_label' => FALSE,
      'title_maxlength' => 128,
      'title_value' => '',
      'url' => 0,
      'user_register_form' => FALSE,
      'validate_url' => 0,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'link',
      'settings' => array(),
      'type' => 'link_field',
      'weight' => 6,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_search'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_kle-field_os2web_taxonomies_search'] = array(
    'bundle' => 'os2web_taxonomies_tax_kle',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 7,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_search',
    'label' => 'Søgeord',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 8,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_org-field_os2web_taxonomies_dis_cont'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_org-field_os2web_taxonomies_dis_cont'] = array(
    'bundle' => 'os2web_taxonomies_tax_org',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 1,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_dis_cont',
    'label' => 'Udgået',
    'required' => 0,
    'settings' => array(
      'max' => 1,
      'min' => 0,
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 3,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_org-field_os2web_taxonomies_search'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_org-field_os2web_taxonomies_search'] = array(
    'bundle' => 'os2web_taxonomies_tax_org',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 2,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_search',
    'label' => 'Søgeord',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 5,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_city'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_city'] = array(
    'bundle' => 'os2web_taxonomies_tax_places',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 7,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_city',
    'label' => 'GIS postby',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 11,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_name'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_name'] = array(
    'bundle' => 'os2web_taxonomies_tax_places',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 5,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_name',
    'label' => 'GIS navn',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 9,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_sys_id'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_sys_id'] = array(
    'bundle' => 'os2web_taxonomies_tax_places',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 3,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_sys_id',
    'label' => 'GIS id',
    'required' => 0,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 7,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_type'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_places-field_os2web_taxonomies_type'] = array(
    'bundle' => 'os2web_taxonomies_tax_places',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 4,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_type',
    'label' => 'GIS type',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 8,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_agenda'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_agenda'] = array(
    'bundle' => 'os2web_taxonomies_tax_politics',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 8,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_agenda',
    'label' => 'Dagsordensvisning',
    'required' => 0,
    'settings' => array(
      'max' => 1,
      'min' => 0,
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 9,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_comittee'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_comittee'] = array(
    'bundle' => 'os2web_taxonomies_tax_politics',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 7,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_comittee',
    'label' => 'Acadremapning',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'options',
      'settings' => array(
        'autocomplete_path' => 'taxonomy/autocomplete',
        'content_taxonomy_opt_groups' => FALSE,
        'size' => 60,
      ),
      'type' => 'options_select',
      'weight' => 8,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_dis_cont'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_dis_cont'] = array(
    'bundle' => 'os2web_taxonomies_tax_politics',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 6,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_dis_cont',
    'label' => 'Udgået',
    'required' => 0,
    'settings' => array(
      'max' => 1,
      'min' => 0,
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 7,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_search'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_politics-field_os2web_taxonomies_search'] = array(
    'bundle' => 'os2web_taxonomies_tax_politics',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 9,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_search',
    'label' => 'Søgeord',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 11,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_portal_cat-field_termtekst'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_portal_cat-field_termtekst'] = array(
    'bundle' => 'os2web_taxonomies_tax_portal_cat',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 9,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_termtekst',
    'label' => 'Indholdstekst',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          'full_html' => 0,
        ),
        'allowed_formats_toggle' => 1,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            'full_html' => array(
              'weight' => 1,
            ),
          ),
        ),
      ),
      'linkit' => array(
        'button_text' => 'Search',
        'enable' => 0,
        'profile' => '',
      ),
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 4,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-os2web_taxonomies_tax_user_pos-field_os2web_taxonomies_priority'.
  $field_instances['taxonomy_term-os2web_taxonomies_tax_user_pos-field_os2web_taxonomies_priority'] = array(
    'bundle' => 'os2web_taxonomies_tax_user_pos',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'number',
        'settings' => array(
          'decimal_separator' => '.',
          'prefix_suffix' => TRUE,
          'scale' => 0,
          'thousand_separator' => ' ',
        ),
        'type' => 'number_integer',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_os2web_taxonomies_priority',
    'label' => 'Priority',
    'required' => 0,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 1,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Acadremapning');
  t('Afdelingsid');
  t('Afdelingsnavn');
  t('Dagsordensvisning');
  t('GIS id');
  t('GIS navn');
  t('GIS postby');
  t('GIS type');
  t('Indholdstekst');
  t('KLE stikord');
  t('Lovhenvisninger');
  t('Priority');
  t('Systemid');
  t('Søgeord');
  t('Udgået');

  return $field_instances;
}
