<!-- Begin - sidr source provider -->
<aside class="sidr-source-provider">

  <?php if ( $logo ): ?>
      <a class="logo" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/>
      </a>
  <?php endif; ?>

    <!-- Begin - navigation -->
    <div class="slinky-menu">

      <?php if ( !empty($menu_slinky__primary) ): ?>
        <?php print render($menu_slinky__primary); ?>
      <?php endif; ?>

    </div>
    <!-- End - navigation -->

</aside>
<!-- End - sidr source provider -->

<!-- Begin - header -->
<header role="navigation" id="page-header" class="page-header-wrapper">

    <div class="header-container container">

        <!-- Begin - desktop header -->
        <div class="row hidden-xs">
            <div class="logo-wrapper col-sm-4 col-md-3 col-lg-4">
              <?php if ( $logo ): ?>
                  <a class="logo" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
                      <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/>
                  </a>
              <?php endif; ?>

              <?php if ( !empty($site_name) ): ?>
                  <a class="name navbar-brand" href="<?php print $front_page; ?>"
                     title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
              <?php endif; ?>
            </div>

            <nav role="navigation" id="topnav" class="topnav-wrapper user-nav col-sm-8 col-md-9 col-lg-8">
              <?php if ( !empty($secondary_nav) ): ?>
                <?php print render($secondary_nav); ?>
              <?php endif; ?>
              <?php if ( !empty($page['navigation']) ): ?>
                <?php print render($page['navigation']); ?>
              <?php endif; ?>
            </nav>

            <nav id="navbar" role="banner" class="col-sm-12 col-sm-8 col-md-9 col-lg-8 <?php print $navbar_classes; ?>">
                <div class="headerwrapper-inner">

                    <div class="navbar-header">
                      <?php if ( !empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation']) ): ?>
                          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span class="sr-only"><?php print t('Toggle navigation'); ?></span>
                              <span class="icon-bar"></span>
                              <span class="icon-bar"></span>
                              <span class="icon-bar"></span>
                          </button>
                      <?php endif; ?>
                    </div>

                  <?php if ( !empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation']) ): ?>
                      <div class="navbar-collapse collapse">
                          <nav role="navigation">
                            <?php if ( !empty($primary_nav) ): ?>
                              <?php print render($primary_nav); ?>
                            <?php endif; ?>
                          </nav>
                      </div>
                  <?php endif; ?>

                  <?php print $search_box; ?>
                </div>
            </nav>
        </div>
        <!-- End - desktop header -->

        <!-- Begin - responsive header -->
        <div class="responsive-header visible-xs">
            <div class="responsive-header__row responsive-header__row--first">

              <?php if ( $logo ): ?>
                  <a class="logo" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
                      <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/>
                  </a>
              <?php endif; ?>

                <div class="flexy-spacer"></div>

                <button class="sidr__toggle">
                    <span class="icon fa fa-bars"></span>
                </button>

            </div>

            <div class="responsive-header__row responsive-header__row--second">
              <?php print $search_box; ?>
            </div>
        </div>
        <!-- End - responsive header -->

      <?php print render($page['header']); ?>

    </div>
</header>
<!-- End - header -->

<div class="main-container">
  <div class="row search-and-title">
    <?php if ( !empty($page['sidebar_first']) ): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>
    <?php endif; ?>

    <section<?php print $content_column_class; ?>>
      <div class="container">
        <?php if ( !empty($page['highlighted']) ): ?>
          <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
        <?php endif; ?>
        <div class="row">
          <div class="col-xs-6">
            <?php if ( !empty($breadcrumb) ): print $breadcrumb; endif; ?>
          </div>
        </div>

        <a id="main-content"></a>
        <?php print render($title_prefix); ?>
        <?php print render($title_suffix); ?>
        <?php print $messages; ?>
        <?php if ( !empty($tabs) ): ?>
          <?php print render($tabs); ?>
        <?php endif; ?>
        <?php if ( !empty($page['help']) ): ?>
          <?php print render($page['help']); ?>
        <?php endif; ?>
        <?php if ( !empty($action_links) ): ?>
          <ul class="action-links"><?php print render($action_links); ?></ul>
        <?php endif; ?>
      </div>
    </section>
  </div>
  <?php if (panels_get_current_page_display()): ?>
    <?php print render($page['content']); ?>
  <?php else: ?>
    <div class="container">
      <div class="os2-box">
        <div class="os2-box-body">
          <?php print render($page['content']); ?>
        </div>
      </div>
    </div>
  <?php endif; ?>
  <?php if ( !empty($page['sidebar_second']) ): ?>
    <aside class="col-sm-3" role="complementary">
      <?php print render($page['sidebar_second']); ?>
    </aside>  <!-- /#sidebar-second -->
  <?php endif; ?>
</div>
<div class="upper-footer">
  <?php if (!empty($page['footer'])) : ?>
    <div class="container footer-container">
      <?php print render($page['footer']); ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($page['footer1'])) : ?>
    <div class="footer-container footer1-container">
      <?php print render($page['footer1']); ?>
    </div>
  <?php endif; ?>
</div>
<footer class="footer">
  <div class=" footer-dark">
    <div class="container">
      <div class="row">
        <div class="contact-information col-sx-12 col-sm-6 col-md-4">
          <?php print render($page['footer2']); ?>
          <?php if (isset($theme_settings['contact_information']['business_owner_name'])) : ?>
            <h2 class="block-title">
              <?php print $theme_settings['contact_information']['business_owner_name']; ?>
            </h2>
          <?php endif; ?>
          <p>
            <?php if (!empty($theme_settings['contact_information']['business_startup_year']) ) : ?>
              <?php print t('Siden ').$theme_settings['contact_information']['business_startup_year']; ?><br/>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['address']) ) : ?>
              <?php print $theme_settings['contact_information']['address']; ?><br/>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['zipcode']) ) : ?>
              <?php print $theme_settings['contact_information']['zipcode']; ?><br/>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['city']) ) : ?>
              <?php print $theme_settings['contact_information']['city']; ?><br/>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['phone_system']) ) : ?>
              <?php print '<a title="Ring til '.$theme_settings['contact_information']['phone_readable'].'" 
                href="tel:'.$theme_settings['contact_information']['phone_system'].'">'; ?>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['phone_readable']) ) : ?>
              <?php print $theme_settings['contact_information']['phone_readable']; ?></br>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['phone_system']) ) : ?>
              <?php print '</a>'; ?><br/>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['email']) ) : ?>
              <?php print '<a href="mailto:'.$theme_settings['contact_information']['email'].' 
                Title="Send email">'.$theme_settings['contact_information']['email'].'</a>'; ?><br/>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['working_hours']) ) : ?>
              <?php print $theme_settings['contact_information']['working_hours']; ?></br>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['cvr_nr']) ) : ?>
              <br/><?php print $theme_settings['contact_information']['cvr_nr']; ?></br>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['giro_nr']) ) : ?>
              <?php print $theme_settings['contact_information']['giro_nr']; ?></br>
            <?php endif; ?>

            <?php if (!empty($theme_settings['contact_information']['ean']) ) : ?>
              <?php print $theme_settings['contact_information']['ean']; ?></br>
            <?php endif; ?>
          </p>
        </div>
        <?php if (!empty($page['footer3'])) : ?>
          <div class="col-sx-12 col-sm-6 col-md-4">
            <div class="footer3">
              <?php print render($page['footer3']); ?>
            </div>
          </div>
        <?php endif; ?>
        <div class="clearfix visible-sm" aria-hidden="TRUE"></div>
        <?php if (!empty($page['footer4'])) : ?>
          <div class="col-sx-12 col-md-4">
            <div class="footer4">
              <?php print render($page['footer4']); ?>
            </div>
          </div>
        <?php endif; ?>
        <div class="clearfix visible-sm" aria-hidden="TRUE"></div>
        <div class="col-sx-12 col-md-12">
          <div class="footer5">
            <ul class="social-icon-list">
              <?php if ($theme_settings['social_links']['facebook']['active']): ?>
                <li>
                  <a
                      href="<?php print $theme_settings['social_links']['facebook']['url']; ?>"
                      target="_blank"
                      class="social-icon social-icon-facebook"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="<?php print $theme_settings['social_links']['facebook']['tooltip']; ?>">
                  </a>
                </li>
              <?php endif; ?>

              <?php if ($theme_settings['social_links']['linkedin']['active']): ?>
                <li>
                  <a
                      href="<?php print $theme_settings['social_links']['linkedin']['url']; ?>"
                      target="_blank"
                      class="social-icon social-icon-linkedin"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="<?php print $theme_settings['social_links']['linkedin']['tooltip']; ?>">
                  </a>
                </li>
              <?php endif; ?>

              <?php if ($theme_settings['social_links']['instagram']['active']): ?>
                <li>
                  <a href="<?php print $theme_settings['social_links']['instagram']['url']; ?>"
                     target="_blank" class="social-icon social-icon-instagram"
                     data-toggle="tooltip"
                     data-placement="top"
                     title="<?php print $theme_settings['social_links']['instagram']['tooltip']; ?>">
                  </a>
                </li>
              <?php endif; ?>

              <?php if ($theme_settings['social_links']['youtube']['active']): ?>
                <li>
                  <a href="<?php print $theme_settings['social_links']['youtube']['url']; ?>"
                     target="_blank"
                     class="social-icon social-icon-youtube"
                     data-toggle="tooltip"
                     data-placement="top"
                     title="<?php print $theme_settings['social_links']['youtube']['tooltip']; ?>">
                  </a>
                </li>
              <?php endif; ?>
            </ul>
            <?php print render($page['footer5']); ?>
          </div>
        </div>
      </div>
    </div>
    <?php if (!empty($page['footer6'])) : ?>
      <div class="container footer-container footer6-container">
        <?php print render($page['footer6']); ?>
      </div>
    <?php endif; ?>
  </div>
</footer>
