<?php
/**
 * @file
 * contenttype_front.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function contenttype_front_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_bottom_left_box|node|front|form';
  $field_group->group_name = 'group_bottom_left_box';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_top_img';
  $field_group->data = array(
    'label' => 'Venstre boks - Nederst',
    'weight' => '21',
    'children' => array(
      0 => 'field_bottom_left_img',
      1 => 'field_description_bottom_left',
      2 => 'field_internal_bottom_left',
      3 => 'field_link_type_bottom_left',
      4 => 'field_external_bottom_left',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Venstre boks - Nederst',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_bottom_left_box|node|front|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_bottom_right_box|node|front|form';
  $field_group->group_name = 'group_bottom_right_box';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_top_img';
  $field_group->data = array(
    'label' => 'Højre boks - Nederst',
    'weight' => '22',
    'children' => array(
      0 => 'field_bottom_right_img',
      1 => 'field_description_bottom_right',
      2 => 'field_link_type_bottom_right',
      3 => 'field_internal_bottom_right',
      4 => 'field_external_bottom_right',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_bottom_right_box|node|front|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_center_box_2|node|front|form';
  $field_group->group_name = 'group_center_box_2';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_top_img';
  $field_group->data = array(
    'label' => 'Center boks',
    'weight' => '20',
    'children' => array(
      0 => 'field_center_box_img',
      1 => 'field_center_box_description',
      2 => 'field_link_type_center_box',
      3 => 'field_internal_center_box_2',
      4 => 'field_external_center_box',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_center_box_2|node|front|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_center_box|node|front|form';
  $field_group->group_name = 'group_center_box';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_top_img';
  $field_group->data = array(
    'label' => 'Center billede',
    'weight' => '19',
    'children' => array(
      0 => 'field_center_img',
      1 => 'field_center_img_link_type',
      2 => 'field_eksternt_link_center',
      3 => 'field_internal_center_box',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Center billede',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_center_box|node|front|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_test|node|front|form';
  $field_group->group_name = 'group_test';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_top_img';
  $field_group->data = array(
    'label' => 'Topbillede',
    'weight' => '16',
    'children' => array(
      0 => 'field_topimage',
      1 => 'field_date',
      2 => 'field_short_text',
      3 => 'field_link_type',
      4 => 'field_external_link',
      5 => 'field_internt_link_topimg',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Topbillede',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_test|node|front|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_top_box_left|node|front|form';
  $field_group->group_name = 'group_top_box_left';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_top_img';
  $field_group->data = array(
    'label' => 'Top boks - venstre',
    'weight' => '17',
    'children' => array(
      0 => 'field_top_box_img',
      1 => 'field_top_box_date',
      2 => 'field_top_box_description',
      3 => 'field_top_box_link_type',
      4 => 'field_top_box_eksternt_link',
      5 => 'field_internal_top_box_left',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_top_box_left|node|front|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_top_box_right|node|front|form';
  $field_group->group_name = 'group_top_box_right';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_top_img';
  $field_group->data = array(
    'label' => 'Top boks - højre',
    'weight' => '18',
    'children' => array(
      0 => 'field_top_box_right_text',
      1 => 'field_top_box_right_link_type',
      2 => 'field_top_box_right_external_lin',
      3 => 'field_internal_top_box_right',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_top_box_right|node|front|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_top_img|node|front|form';
  $field_group->group_name = 'group_top_img';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'front';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Front Tiles',
    'weight' => '1',
    'children' => array(
      0 => 'group_top_box_left',
      1 => 'group_test',
      2 => 'group_top_box_right',
      3 => 'group_center_box',
      4 => 'group_bottom_left_box',
      5 => 'group_center_box_2',
      6 => 'group_bottom_right_box',
    ),
    'format_type' => 'tabs',
    'format_settings' => array(
      'label' => 'Front Tiles',
      'instance_settings' => array(
        'classes' => '',
      ),
    ),
  );
  $export['group_top_img|node|front|form'] = $field_group;

  return $export;
}
