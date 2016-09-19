<!-- Begin - outer wrapper -->
<div class="outer-wrapper">

  <!-- Begin - inner wrapper -->
  <div class="inner-wrapper" role="document">

    <!-- Begin - content -->
    <div class="content">

      <!-- Begin - header -->
      <header class="header" id="header">

        <!-- Begin - top -->
        <div class="header-top-outer">
          <div class="container">
            <div class="header-top-inner">

              <!-- Begin - logo -->
              <a href="<?php print $front_page; ?>" class="header-logo-link">
                <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="header-logo-image" />
              </a>
              <!-- End - logo -->

            </div>
          </div>
        </div>
        <!-- End - top -->

        <?php if (isset($navigation_list_primary)): ?>
          <!-- Begin - bottom -->
          <div class="header-bottom-outer">
            <div class="header-bottom-inner">

              <!-- Begin - navigation list -->
              <?php print render($navigation_list_primary); ?>
              <!-- End - navigation list -->

            </div>
          </div>
          <!-- End - bottom -->
        <?php endif; ?>

      </header>
      <!-- End - header -->

      <?php if (!empty($tabs)): ?>
        <!-- Begin - tabs -->
        <div class="content-tabs-container">
          <?php print render($tabs); ?>
        </div>
        <!-- End - tabs -->
      <?php endif; ?>

      <div class="container">

        <?php if (!empty($page['help'])): ?>
          <?php print render($page['help']); ?>
        <?php endif; ?>

        <?php if (!empty($action_links)): ?>
          <?php print render($action_links); ?>
        <?php endif; ?>

        <a id="main-content"></a>

        <div class="content-inner">
          <?php if (!panels_get_current_page_display()): ?>
            <div class="card card-block">
              <?php print render($page['content']); ?>
            </div>
          <?php else: ?>
            <?php print render($page['content']); ?>
          <?php endif; ?>
        </div>

      </div>
    </div>
    <!-- End - content -->

    <!-- Begin - footer -->
    <footer class="footer">

      <?php if ($theme_settings['layout']['branding_show'] && !empty($theme_settings['layout']['branding_text'])): ?>
        <!-- Begin - branding -->
        <div class="footer-branding-outer">
          <div class="container">
            <div class="footer-branding-inner">
              <p class="footer-branding-brand-text">
                <?php print $theme_settings['layout']['branding_text']; ?>
              </p>
            </div>
          </div>
        </div>
        <!-- End - branding -->
      <?php endif; ?>

      <?php if (!empty($page['footer_top_first']) || !empty($page['footer_top_second']) || !empty($page['footer_top_tertiary'])): ?>
        <div class="footer-top-outer">
          <div class="container">
            <div class="footer-top-inner">
              <div class="row">

                <?php if (!empty($page['footer_top_first'])): ?>
                  <div class="col-xs-12 col-sm-4">
                    <?php print render($page['footer_top_first']); ?>
                  </div>
                <?php endif; ?>

                <?php if (!empty($page['footer_top_second'])): ?>
                  <div class="col-xs-12 col-sm-4">
                    <?php print render($page['footer_top_second']); ?>
                  </div>
                <?php endif; ?>

                <?php if (!empty($page['footer_top_tertiary'])): ?>
                  <div class="col-xs-12 col-sm-4">
                    <?php print render($page['footer_top_tertiary']); ?>
                  </div>
                <?php endif; ?>

              </div>
            </div>
          </div>
        </div>
      <?php endif; ?>

      <div class="footer-bottom-outer">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 text-center">

              <div class="footer-bottom-inner">

                <?php if ($theme_settings['layout']['footer']['show_social_links']) : ?>
                  <!-- Begin - social icons -->
                  <ul class="social-icons-list">

                    <?php if ($theme_settings['social_links']['facebook']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['facebook']['url']; ?>" target="_blank" class="social-icon social-icon-facebook" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['facebook']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                    <?php if ($theme_settings['social_links']['twitter']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['twitter']['url']; ?>" target="_blank" class="social-icon social-icon-twitter" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['twitter']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                    <?php if ($theme_settings['social_links']['googleplus']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['googleplus']['url']; ?>" target="_blank" class="social-icon social-icon-google-plus" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['googleplus']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                    <?php if ($theme_settings['social_links']['linkedin']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['linkedin']['url']; ?>" target="_blank" class="social-icon social-icon-linkedin" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['linkedin']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                    <?php if ($theme_settings['social_links']['pinterest']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['pinterest']['url']; ?>" target="_blank" class="social-icon social-icon-pinterest" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['pinterest']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                    <?php if ($theme_settings['social_links']['instagram']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['instagram']['url']; ?>" target="_blank" class="social-icon social-icon-instagram" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['instagram']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                    <?php if ($theme_settings['social_links']['youtube']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['youtube']['url']; ?>" target="_blank" class="social-icon social-icon-youtube" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['youtube']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                    <?php if ($theme_settings['social_links']['vimeo']['active']): ?>
                      <li><a href="<?php print $theme_settings['social_links']['vimeo']['url']; ?>" target="_blank" class="social-icon social-icon-vimeo" data-toggle="tooltip" data-placement="top" title="<?php print $theme_settings['social_links']['vimeo']['tooltip']; ?>"></a></li>
                    <?php endif; ?>

                  </ul>
                  <!-- End - social icons -->
                <?php endif ?>

                <?php if (!empty($theme_settings['contact_information'])): ?>
                  <!-- Begin - contact information -->
                  <ul class="footer-bottom-inner-contact-information">

                    <?php if (isset($theme_settings['contact_information']['business_owner_name']) ) : ?>
                      <li>
                        <?php print $theme_settings['contact_information']['business_owner_name']; ?>
                      </li>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['address']) ) : ?>
                      <li>
                        <?php print $theme_settings['contact_information']['address']; ?>
                      </li>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['zipcode'] && !empty($theme_settings['contact_information']['city'])) ) : ?>
                      <li>
                        <?php print $theme_settings['contact_information']['zipcode'] . ' ' . $theme_settings['contact_information']['city']; ?>
                      </li>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['phone_system']) && !empty($theme_settings['contact_information']['phone_readable'])): ?>
                      <li>
                        <a href="tel: <?php print $theme_settings['contact_information']['phone_system']; ?>">
                          <?php print $theme_settings['contact_information']['phone_readable']; ?>
                        </a>
                      </li>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['email']) ) : ?>
                      <li>
                        <a href='mailto: <?php print $theme_settings['contact_information']['email']; ?>' Title='Send email'>
                          <?php print $theme_settings['contact_information']['email']; ?>
                        </a>
                      </li>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['working_hours']) ) : ?>
                      <li>
                        <?php print $theme_settings['contact_information']['working_hours']; ?>
                      </li>
                    <?php endif; ?>

                  </ul>
                  <!-- End - contact information -->
                <?php endif; ?>

                <?php if (!empty($theme_settings['contact_information']['business_owner_readable_url'])): ?>
                  <p><?php print t('© @year, @url. All rights reserved.', array('@year' => date('Y'), '@url' => $theme_settings['contact_information']['business_owner_readable_url'])); ?></p>
                <?php endif; ?>
                
                <?php if (!empty($theme_settings['contact_information']['site_owner_raw_url']) && !empty($theme_settings['contact_information']['site_owner_readable_url']) ) : ?>
                  <p><?php print t('A site from'); ?> <a href="<?php print $theme_settings['contact_information']['site_owner_raw_url']; ?>" target="_blank"><?php print $theme_settings['contact_information']['site_owner_readable_url']; ?></a></p>
                <?php endif; ?>

              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- End - footer -->

  </div>
  <!-- End - inner wrapper -->

</div>
<!-- End - outer wrapper -->
