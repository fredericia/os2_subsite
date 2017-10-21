<?php
/**
 * @file
 * os2web_news_page.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function os2web_news_page_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_nyheder-menu-position-rule:menu-position/2.
  $menu_links['main-menu_nyheder-menu-position-rule:menu-position/2'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'menu-position/2',
    'router_path' => 'menu-position/%',
    'link_title' => 'Nyheder (menu position rule)',
    'options' => array(
      'alter' => TRUE,
      'attributes' => array(
        'class' => array(
          0 => 'menu-position-link',
        ),
      ),
      'identifier' => 'main-menu_nyheder-menu-position-rule:menu-position/2',
    ),
    'module' => 'menu_position',
    'hidden' => 1,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'main-menu_nyheder:nyheder',
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Nyheder (menu position rule)');

  return $menu_links;
}
