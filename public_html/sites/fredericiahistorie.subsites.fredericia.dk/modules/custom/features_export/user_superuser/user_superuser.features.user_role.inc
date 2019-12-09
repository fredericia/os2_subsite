<?php
/**
 * @file
 * user_superuser.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function user_superuser_user_default_roles() {
  $roles = array();

  // Exported role: superuser.
  $roles['superuser'] = array(
    'name' => 'superuser',
    'weight' => '3',
  );

  return $roles;
}
