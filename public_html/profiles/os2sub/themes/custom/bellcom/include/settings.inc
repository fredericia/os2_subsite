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

  // Branding
  $form['options']['layout']['branding'] = array(
    '#type' => 'fieldset',
    '#title' => t('Branding'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['options']['layout']['branding']['branding_show'] = array(
    '#type' => 'checkbox',
    '#title' => t('Vis branding'),
    '#default_value' => theme_get_setting('branding_show'),
  );

  // Address
  $form['options']['layout']['branding']['branding_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Branding tekst'),
    '#default_value' => theme_get_setting('branding_text'),
    '#states'        => array(
      'visible' => array(
        ':input[name="branding_show"]' => array('checked' => TRUE),
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

  // Site owner
  $form['options']['contact_information']['site_owner_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Side ejer'),
    '#description' => t("Eks. Svendborg"),
    '#default_value' => theme_get_setting('site_owner_name'),
  );
  $form['options']['contact_information']['site_owner_raw_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Side ejers rå URL'),
    '#description' => t("eks. http://svendborg.dk"),
    '#default_value' => theme_get_setting('site_owner_raw_url'),
  );
  $form['options']['contact_information']['site_owner_readable_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Side ejers læsbare URL'),
    '#description' => t("eks. svendborg.dk"),
    '#default_value' => theme_get_setting('site_owner_readable_url'),
  );

  // Business owner
  $form['options']['contact_information']['business_owner_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Navn'),
    '#default_value' => theme_get_setting('business_owner_name'),
  );
  $form['options']['contact_information']['business_owner_raw_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Undersides rå URL'),
    '#default_value' => theme_get_setting('business_owner_raw_url'),
    '#description' => t("eks. http://svendborg.dk"),
  );
  $form['options']['contact_information']['business_owner_readable_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Undersides læsbare URL'),
    '#default_value' => theme_get_setting('business_owner_readable_url'),
    '#description' => t("eks. svendborg.dk"),
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
