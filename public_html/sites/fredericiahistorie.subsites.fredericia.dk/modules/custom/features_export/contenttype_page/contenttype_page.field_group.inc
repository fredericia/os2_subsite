<?php
/**
 * @file
 * contenttype_page.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function contenttype_page_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_center_img|node|page|form';
  $field_group->group_name = 'group_center_img';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_main_content_page';
  $field_group->data = array(
    'label' => 'Center billede',
    'weight' => '27',
    'children' => array(
      0 => 'field_body_center_img',
      1 => 'field_center_img_text',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_center_img|node|page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_lyd|node|page|form';
  $field_group->group_name = 'group_lyd';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_page';
  $field_group->data = array(
    'label' => 'Lyd',
    'weight' => '25',
    'children' => array(
      0 => 'field_audiofile',
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
  $export['group_lyd|node|page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_main_content_page|node|page|form';
  $field_group->group_name = 'group_main_content_page';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_page';
  $field_group->data = array(
    'label' => 'Hovedindhold',
    'weight' => '24',
    'children' => array(
      0 => 'body',
      1 => 'field_second_body',
      2 => 'group_center_img',
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
  $export['group_main_content_page|node|page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_page_app|node|page|form';
  $field_group->group_name = 'group_page_app';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_page';
  $field_group->data = array(
    'label' => 'App',
    'weight' => '27',
    'children' => array(
      0 => 'field_reference_thumbnail',
      1 => 'field_reference_title',
      2 => 'field_reference_summary',
      3 => 'field_references',
      4 => 'field_active_body',
      5 => 'field_body_app',
      6 => 'field_active_title_app',
      7 => 'field_page_title_app',
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
  $export['group_page_app|node|page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_page|node|page|form';
  $field_group->group_name = 'group_page';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Page',
    'weight' => '2',
    'children' => array(
      0 => 'group_lyd',
      1 => 'group_main_content_page',
      2 => 'group_page_app',
      3 => 'group_sidebar_page',
      4 => 'group_top_img_page',
    ),
    'format_type' => 'tabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => '',
      ),
    ),
  );
  $export['group_page|node|page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_sidebar_page|node|page|form';
  $field_group->group_name = 'group_sidebar_page';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_page';
  $field_group->data = array(
    'label' => 'Sidebar',
    'weight' => '26',
    'children' => array(
      0 => 'field_sidebar',
      1 => 'field_featured_links',
      2 => 'field_link_background_image',
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
  $export['group_sidebar_page|node|page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_top_img_page|node|page|form';
  $field_group->group_name = 'group_top_img_page';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_page';
  $field_group->data = array(
    'label' => 'Topbillede',
    'weight' => '23',
    'children' => array(
      0 => 'field_topimage',
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
  $export['group_top_img_page|node|page|form'] = $field_group;

  return $export;
}
