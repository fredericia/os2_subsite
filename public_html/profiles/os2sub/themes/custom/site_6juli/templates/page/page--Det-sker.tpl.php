<?php
//Titleand url for social-share
$social_share_url   = url(drupal_get_path_alias('/'),
    ['absolute' => TRUE]) . current_path();
$social_share_title = $title;
if (!$social_share_title) {
  $social_share_title = str_replace(parse_url($social_share_url,
      PHP_URL_SCHEME) . '://',
    '',
    $social_share_url);
}
?>
<!-- Begin - wrapper -->
<div class="layout__wrapper">

  <!-- Begin - sidr source provider -->
  <aside class="sidr-source-provider">

    <!-- Begin - navigation -->
    <nav class="slinky-menu" role="navigation">
      <?php print render($menu_slinky_custom__primary); ?>
    </nav>
    <!-- End - navigation -->

  </aside>
  <!-- End - sidr source provider -->

  <!-- Begin - header static -->
  <header class="flexy-header flexy-header--static">
    <div class="flexy-header__row flexy-header__row--first">
      <div class="container">
        <div class="flexy-row">

          <!-- Begin - logo -->
          <a href="<?php print $front_page; ?>"
             class="flexy-header__logo">
            <img src="<?php print $logo; ?>"
                 alt="<?php print t('@site_name logo', ['@site_name' => $site_name]); ?>"/>

            <?php print $site_name; ?>
          </a>
          <!-- End - logo -->

          <div class="flexy-spacer"></div>

          <!-- Begin - navigation -->
          <nav class="flexy-header__navigation__wrapper hidden-xs hidden-sm"
               role="navigation">
            <?php print render($flexy_navigation__primary); ?>
          </nav>
          <!-- End - navigation -->

          <!-- Begin - responsive toggle -->
          <button
              class="flexy-header__sidebar-toggle sidr-toggle--right visible-xs visible-sm">
            <span class="icon fa fa-bars"></span>
          </button>
          <!-- End - responsive toggle -->

        </div>
      </div>
    </div>
  </header>
  <!-- End - header static -->

  <!-- Begin - header sticky -->
  <header class="flexy-header flexy-header--sticky">
    <div class="flexy-header__row">
      <div class="container">
        <div class="flexy-row">

          <!-- Begin - logo -->
          <a href="<?php print $front_page; ?>"
             class="flexy-header__logo">
            <img src="<?php print $logo; ?>"
                 alt="<?php print t('@site_name logo', ['@site_name' => $site_name]); ?>"/>

            <?php print $site_name; ?>
          </a>
          <!-- End - logo -->

          <div class="flexy-spacer"></div>

          <!-- Begin - navigation -->
          <nav class="flexy-header__navigation__wrapper hidden-xs hidden-sm"
               role="navigation">
            <?php print render($flexy_navigation__primary); ?>
          </nav>
          <!-- End - navigation -->

          <!-- Begin - responsive toggle -->
          <button
              class="flexy-header__sidebar-toggle sidr-toggle--right visible-xs visible-sm">
            <span class="icon fa fa-bars"></span>
          </button>
          <!-- End - responsive toggle -->

        </div>
      </div>
    </div>
  </header>
  <!-- End - header sticky -->

  <!-- Begin - content -->
  <main class="layout__content" role="main">

    <!--Slideshow begin-->
    <div class="container-fluid">
      <div class="background-slideshow row">
        <?php
        $view_popular_tags = views_get_view('os2web_events_slideshow');
        $view_popular_tags->set_display('block_slideshow');
        print $view_popular_tags->preview('block_slideshow');
        ?>
      </div>
    </div>
    <!--Slideshow end-->
    <section class="main-container <?php print $container_class; ?>">

      <?php print render($title_suffix); ?>
      <?php print $messages; ?>

      <?php if (!empty($tabs_primary)): ?>
        <!-- Begin - tabs primary -->
        <?php print render($tabs_primary); ?>
        <!-- End - tabs primary -->
      <?php endif; ?>

      <?php if (!empty($tabs_secondary)): ?>
        <!-- Begin - tabs secondary -->
        <?php print render($tabs_secondary); ?>
        <!-- End - tabs secondary -->
      <?php endif; ?>

      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
      <?php if (!empty($action_links)): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
    </section>

    <section class="events">
      <div class="content-width">
        <?php print render($page['content']); ?>
      </div>
    </section>

    <?php //if (!empty($page['footer'])):    ?>

    <footer class="footer">

      <div class="social-links">
        <h2><?php print t('Mød os på'); ?></h2>

        <?php if ($theme_settings['social_links']['facebook']['active']): ?>
          <a class="image-social-links__link social-icon social-icon-facebook"
             data-toggle="tooltip"
             data-placement="top"
             title="<?php print $theme_settings['social_links']['facebook']['tooltip']; ?>"
             href="<?php print $theme_settings['social_links']['facebook']['url']; ?>">
            <img src="<?php print base_path() . drupal_get_path('theme',
                'site_6juli') . '/dist/img/social/facebook.png'; ?>"
                 title="<?php print $theme_settings['social_links']['facebook']['tooltip']; ?>">
          </a>
        <?php endif; ?>

        <?php if ($theme_settings['social_links']['instagram']['active']): ?>
          <a class="image-social-links__link social-icon social-icon-instagram"
             data-toggle="tooltip"
             data-placement="top"
             title="<?php print $theme_settings['social_links']['instagram']['tooltip']; ?>"
             href="<?php print $theme_settings['social_links']['instagram']['url']; ?>">
            <img src="<?php print base_path() . drupal_get_path('theme',
                'site_6juli') . '/dist/img/social/instagram.png'; ?>"
                 title="<?php print $theme_settings['social_links']['instagram']['tooltip']; ?>">
          </a>
        <?php endif; ?>

        <?php if ($theme_settings['social_links']['youtube']['active']): ?>
          <a class="image-social-links__link social-icon social-icon-youtube"
             data-toggle="tooltip"
             data-placement="top"
             title="<?php print $theme_settings['social_links']['youtube']['tooltip']; ?>"
             href="<?php print $theme_settings['social_links']['youtube']['url']; ?>">
            <img src="<?php print base_path() . drupal_get_path('theme',
                'site_6juli') . '/dist/img/social/youtube.png'; ?>"
                 title="<?php print $theme_settings['social_links']['youtube']['tooltip']; ?>">
          </a>
        <?php endif; ?>
        <?php if ($theme_settings['social_links']['twitter']['active']): ?>
          <a class="image-social-links__link social-icon social-icon-twitter"
             data-toggle="tooltip"
             data-placement="top"
             title="<?php print $theme_settings['social_links']['twitter']['tooltip']; ?> "
             href="<?php print $theme_settings['social_links']['twitter']['url']; ?>">
            <img src="<?php print base_path() . drupal_get_path('theme',
                'site_6juli') . '/dist/img/social/twitter.png'; ?>"
                 title="<?php print $theme_settings['social_links']['twitter']['tooltip']; ?> ">
          </a>
        <?php endif; ?>

        <?php if ($theme_settings['social_links']['pinterest']['active']): ?>
          <a class="image-social-links__link social-icon social-icon-pinterest"
             data-toggle="tooltip"
             data-placement="top"
             title="<?php print $theme_settings['social_links']['pinterest']['tooltip']; ?>"
             href="<?php print $theme_settings['social_links']['pinterest']['url']; ?>">
            <img src="<?php print base_path() . drupal_get_path('theme',
                'site_6juli') . '/dist/img/social/snapchat.png'; ?>"
                 title="<?php print $theme_settings['social_links']['pinterest']['tooltip']; ?>">
          </a>
        <?php endif; ?>

      </div>

      <div class="social-footer">
      </div>
      <div class="<?php print $container_class; ?>">
        <div class="content-width">
          <?php print render($page['footer']); ?>
        </div>
      </div>
    </footer>
    <?php //endif; ?>

  </main>
  <!-- End - content -->

</div>
<!-- End - wrapper -->
