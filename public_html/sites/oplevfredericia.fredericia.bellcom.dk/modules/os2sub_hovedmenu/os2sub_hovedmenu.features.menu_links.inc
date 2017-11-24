<?php
/**
 * @file
 * os2sub_hovedmenu.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function os2sub_hovedmenu_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: management_hovedmenu:admin/structure/menu/manage/main-menu.
  $menu_links['management_hovedmenu:admin/structure/menu/manage/main-menu'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/structure/menu/manage/main-menu',
    'router_path' => 'admin/structure/menu/manage/%',
    'link_title' => 'Hovedmenu',
    'options' => array(
      'identifier' => 'management_hovedmenu:admin/structure/menu/manage/main-menu',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'management_menuer:admin/structure/menu',
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Hovedmenu');

  return $menu_links;
}
