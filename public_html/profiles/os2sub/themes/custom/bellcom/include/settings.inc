<?php

function _theme_settings_form(&$form, $form_state) {

  // Vertical tabs
  $form['options'] = array(
    '#type' => 'vertical_tabs',
    '#default_tab' => 'main',
    '#weight' => '-20',
    '#prefix' => '<h2><small>' . t('Site indstillinger') . '</small></h2>',
    '#title' => t('Indstillinger'),
  );

  /*
  |--------------------------------------------------------------------------
  | Page layout
  |--------------------------------------------------------------------------
  |
  | Sets all necessary options to save data.
  |
  */

  // Fieldset
  $form['options']['layout'] = array(
    '#type' => 'fieldset',
    '#title' => t('Sideopsætning'),
  );

  // Top bar.
  $form['options']['layout']['top_bar'] = array(
    '#type' => 'fieldset',
    '#title' => 'Top bar',
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  // Top bar - contact information
  $form['options']['layout']['top_bar']['contact_information'] = array(
    '#type' => 'select',
    '#title' => t('Vis kontaktinformationer'),
    '#options' => array(
      1 => t('Nej, skjul dem.'),
      2 => t('Venstre side'),
      3 => t('Højre side'),
    ),
    '#default_value' => theme_get_setting('contact_information'),
  );

  // Top bar - social links
  $form['options']['layout']['top_bar']['social_links'] = array(
    '#type' => 'select',
    '#title' => t('Vis links til sociale websites'),
    '#options' => array(
      1 => t('Nej, skjul dem.'),
      2 => t('Venstre side'),
      3 => t('Højre side'),
    ),
    '#default_value' => theme_get_setting('social_links'),
  );

  // Navigation
  $form['options']['layout']['navigation'] = array(
    '#type' => 'fieldset',
    '#title' => t('Navigation'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['options']['layout']['navigation']['login_account_links'] = array(
    '#type' => 'checkbox',
    '#title' => t('Vis login og brugerlink'),
    '#default_value' => theme_get_setting('login_account_links'),
    '#description' => t("Vises i højre side af navigationen"),
  );

  // Sidebar
  $form['options']['layout']['sidebar'] = array(
    '#type' => 'fieldset',
    '#title' => 'Sidebar',
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  // Sidebar left
  $form['options']['layout']['sidebar']['left'] = array(
    '#type' => 'fieldset',
    '#title' => t('Sidebar venstre'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['options']['layout']['sidebar']['left']['xs'] = array(
    '#type' => 'fieldset',
    '#title' => t('XS viewmode'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_xs_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_state'] = array(
    '#type' => 'radios',
    '#title' => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_xs_state'),
    '#options' => array(
      'expanded' => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden' => t('Skjult'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_xs_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_content_effect'] = array(
    '#type' => 'radios',
    '#title' => t('Content effect'),
    '#default_value' => theme_get_setting('sidebar_left_xs_content_effect'),
    '#options' => array(
      'shrink' => 'Shrink content',
      'push' => 'Push content (off-canvas)',
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_xs_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_xs_state"]' => array('value' => 'hidden'),
      ),
    ),
  );

  $form['options']['layout']['sidebar']['left']['sm'] = array(
    '#type' => 'fieldset',
    '#title' => t('SM viewmode'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_sm_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_state'] = array(
    '#type' => 'radios',
    '#title' => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_sm_state'),
    '#options' => array(
      'expanded' => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden' => t('Skjult'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_sm_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_content_effect'] = array(
    '#type' => 'radios',
    '#title' => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_sm_content_effect'),
    '#options' => array(
      'shrink' => t('Presset sammen'),
      'push' => t('Skubbet til siden (off-canvas)'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_sm_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_sm_state"]' => array('value' => 'hidden'),
      ),
    ),
  );

  $form['options']['layout']['sidebar']['left']['md'] = array(
    '#type' => 'fieldset',
    '#title' => t('MD viewmode'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_md_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_state'] = array(
    '#type' => 'radios',
    '#title' => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_md_state'),
    '#options' => array(
      'expanded' => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden' => t('Skjult'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_md_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_content_effect'] = array(
    '#type' => 'radios',
    '#title' => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_md_content_effect'),
    '#options' => array(
      'shrink' => t('Presset sammen'),
      'push' => t('Skubbet til siden (off-canvas)'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_md_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_md_state"]' => array('value' => 'hidden'),
      ),
    ),
  );

  $form['options']['layout']['sidebar']['left']['lg'] = array(
    '#type' => 'fieldset',
    '#title' => 'LG viewmode',
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_lg_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_state'] = array(
    '#type' => 'radios',
    '#title' => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_lg_state'),
    '#options' => array(
      'expanded' => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden' => t('Skjult'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_lg_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_content_effect'] = array(
    '#type' => 'radios',
    '#title' => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_lg_content_effect'),
    '#options' => array(
      'shrink' => t('Presset sammen'),
      'push' => t('Skubbet til siden (off-canvas)'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="sidebar_left_lg_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_lg_state"]' => array('value' => 'hidden'),
      ),
    ),
  );

  // Footer
  $form['options']['layout']['footer'] = array(
    '#type' => 'fieldset',
    '#title' => t('Footer'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['options']['layout']['footer']['footer_attached'] = array(
    '#type' => 'checkbox',
    '#title' => t('Attach the footer'),
    '#default_value' => theme_get_setting('footer_attached'),
    '#description' => t('Keep footer at the bottom of the page, at all times.'),
  );
  $form['options']['layout']['footer']['footer_below'] = array(
    '#type' => 'checkbox',
    '#title' => t('Keep footer below content'),
    '#default_value' => theme_get_setting('footer_below'),
    '#description' => t('Keep footer at the bottom of the page, at all times.'),
  );
  $form['options']['layout']['footer']['footer_show_social_links'] = array(
    '#type' => 'checkbox',
    '#title' => t('Vis links til sociale tjenester'),
    '#default_value' => theme_get_setting('footer_show_social_links'),
    '#description' => t("Skal links til sociale tjenester vises i bunden af siden?"),
  );

  /*
  |--------------------------------------------------------------------------
  | Contact information
  |--------------------------------------------------------------------------
  |
  | Sets all necessary options to save data.
  |
  */

  // Fieldset
  $form['options']['contact_information'] = array(
    '#type' => 'fieldset',
    '#title' => t('Kontakt information'),
  );

  // Business owner name
  $form['options']['contact_information']['business_owner_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Navn'),
    '#default_value' => theme_get_setting('business_owner_name'),
  );

  // Business startup year
  $form['options']['contact_information']['business_startup_year'] = array(
    '#type' => 'textfield',
    '#title' => t('Opstartsår'),
    '#default_value' => theme_get_setting('business_startup_year'),
  );

  // Address
  $form['options']['contact_information']['address'] = array(
    '#type' => 'textfield',
    '#title' => t('Adresse'),
    '#default_value' => theme_get_setting('address'),
  );

  // Zipcode
  $form['options']['contact_information']['zipcode'] = array(
    '#type' => 'textfield',
    '#title' => t('Postnr'),
    '#default_value' => theme_get_setting('zipcode'),
  );

  // City
  $form['options']['contact_information']['city'] = array(
    '#type' => 'textfield',
    '#title' => t('By'),
    '#default_value' => theme_get_setting('city'),
  );

  // Phone number
  $form['options']['contact_information']['phone_system'] = array(
    '#type' => 'textfield',
    '#title' => t('Telefon'),
    '#description' => t('HUSK: uden mellemrum og inkl. +45 f.eks.: +4570260085'),
    '#default_value' => theme_get_setting('phone_system'),
  );

  // Phone number - readable
  $form['options']['contact_information']['phone_readable'] = array(
    '#type' => 'textfield',
    '#title' => t('Vist telefon nummer'),
    '#description' => t('Telefonnummeret vist (brug evt. mellemrum så det er let læseligt)'),
    '#default_value' => theme_get_setting('phone_readable'),
  );

  // E-mail address
  $form['options']['contact_information']['email'] = array(
    '#type' => 'textfield',
    '#title' => t('E-mail'),
    '#default_value' => theme_get_setting('email'),
  );

  // Working hours
  $form['options']['contact_information']['working_hours'] = array(
    '#type' => 'textfield',
    '#title' => t('Åbningstid eller anden info'),
    '#default_value' => theme_get_setting('working_hours'),
  );

  /*
|--------------------------------------------------------------------------
| Social links
|--------------------------------------------------------------------------
|
| Sets all necessary options to save data.
|
*/

  // Fieldset
  $form['options']['social_links'] = array(
    '#type' => 'fieldset',
    '#title' => t('Sociale tjenester'),
  );

  // Facebook
  $form['options']['social_links']['facebook'] = array(
    '#type' => 'checkbox',
    '#title' => t('Facebook'),
    '#default_value' => theme_get_setting('facebook'),
  );
  $form['options']['social_links']['facebook_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Facebook URL'),
    '#default_value' => theme_get_setting('facebook_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="facebook"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['facebook_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('facebook_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="facebook"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Twitter
  $form['options']['social_links']['twitter'] = array(
    '#type' => 'checkbox',
    '#title' => t('Twitter'),
    '#default_value' => theme_get_setting('twitter'),
  );
  $form['options']['social_links']['twitter_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Twitter URL'),
    '#default_value' => theme_get_setting('twitter_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="twitter"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['twitter_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('twitter_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="twitter"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Google plus
  $form['options']['social_links']['googleplus'] = array(
    '#type' => 'checkbox',
    '#title' => t('Google plus'),
    '#default_value' => theme_get_setting('googleplus'),
  );
  $form['options']['social_links']['googleplus_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Google plus URL'),
    '#default_value' => theme_get_setting('googleplus_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="googleplus"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['googleplus_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('googleplus_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="googleplus"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Instagram
  $form['options']['social_links']['instagram'] = array(
    '#type' => 'checkbox',
    '#title' => t('Instagram'),
    '#default_value' => theme_get_setting('instagram'),
  );
  $form['options']['social_links']['instagram_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Instagram URL'),
    '#default_value' => theme_get_setting('instagram_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="instagram"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['instagram_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('instagram_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="instagram"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // LinkedIn
  $form['options']['social_links']['linkedin'] = array(
    '#type' => 'checkbox',
    '#title' => t('LinkedIn'),
    '#default_value' => theme_get_setting('linkedin'),
  );
  $form['options']['social_links']['linkedin_url'] = array(
    '#type' => 'textfield',
    '#title' => t('LinkedIn URL'),
    '#default_value' => theme_get_setting('linkedin_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="linkedin"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['linkedin_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('linkedin_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="linkedin"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Pinterest
  $form['options']['social_links']['pinterest'] = array(
    '#type' => 'checkbox',
    '#title' => t('Pinterest'),
    '#default_value' => theme_get_setting('pinterest'),
  );
  $form['options']['social_links']['pinterest_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Pinterest URL'),
    '#default_value' => theme_get_setting('pinterest_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="pinterest"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['pinterest_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('pinterest_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="pinterest"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Vimeo
  $form['options']['social_links']['vimeo'] = array(
    '#type' => 'checkbox',
    '#title' => t('Vimeo'),
    '#default_value' => theme_get_setting('vimeo'),
  );
  $form['options']['social_links']['vimeo_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Vimeo URL'),
    '#default_value' => theme_get_setting('vimeo_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="vimeo"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['vimeo_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('vimeo_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="vimeo"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Youtube
  $form['options']['social_links']['youtube'] = array(
    '#type' => 'checkbox',
    '#title' => t('Youtube'),
    '#default_value' => theme_get_setting('youtube'),
  );
  $form['options']['social_links']['youtube_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Youtube URL'),
    '#default_value' => theme_get_setting('youtube_url'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="youtube"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['youtube_tooltip'] = array(
    '#type' => 'textfield',
    '#title' => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('youtube_tooltip'),
    '#states' => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="youtube"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
}
