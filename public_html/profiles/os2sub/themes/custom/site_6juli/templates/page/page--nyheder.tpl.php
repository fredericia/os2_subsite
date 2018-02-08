<?php
//Titleand url for social-share
$social_share_url = url(drupal_get_path_alias('/'),
    ['absolute' => TRUE]) . current_path();
$social_share_title = $title;
if (!$social_share_title) {
  $social_share_title = str_replace(parse_url($social_share_url,
      PHP_URL_SCHEME) . '://',
    '',
    $social_share_url);
}
?>
<header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
  <div class="navbar">
    <div class="row">
      <div class="header-logo">
        <a class="image-top-logo__link" href="<?php print $front_page; ?>"><img
              src="<?php print base_path() . drupal_get_path('theme',
                  'site_6juli') . '/dist/img/logo/6-juli-dagene-fredericia.png'; ?>"></a>
        <div class="site-name"><a href="<?php print $front_page; ?>">
            6. juli-dagene <br> Fredericia</a>
        </div>
      </div>


      <div class="menu">
        <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
          <div class="mobile-nav">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target=".navbar-collapse">
              <span
                  class="sr-only"><?php print t('Toggle navigation'); ?></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
        <?php endif; ?>


        <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
          <div class="navbar-collapse collapse">
            <nav id="navigation-menu" role="navigation">
              <?php if (!empty($primary_nav)): ?>
                <?php print render($primary_nav); ?>
              <?php endif; ?>
              <?php if (!empty($secondary_nav)): ?>
                <?php print render($secondary_nav); ?>
              <?php endif; ?>
              <?php if (!empty($page['navigation'])): ?>
                <?php print render($page['navigation']); ?>
              <?php endif; ?>
            </nav>
          </div>
        <?php endif; ?>
      </div>
    </div>

  </div>

</header>
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
<div class="main-container <?php print $container_class; ?>">

  <header role="banner" id="page-header">
    <?php if (!empty($site_slogan)): ?>
      <p class="lead"><?php print $site_slogan; ?></p>
    <?php endif; ?>

    <?php print render($page['header']); ?>
  </header> <!-- /#page-header -->
  <div class="content-width">

    <div class="row">


      <?php if (!empty($page['sidebar_first'])): ?>
        <aside class="col-sm-3" role="complementary">
          <?php print render($page['sidebar_first']); ?>
        </aside>  <!-- /#sidebar-first -->
      <?php endif; ?>

      <section<?php print $content_column_class; ?>>
        <?php if (!empty($page['highlighted'])): ?>
          <div
              class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
        <?php endif; ?>
        <a id="main-content"></a>
        <?php print render($title_prefix); ?>
        <?php if (!empty($title)): ?>
          <h1 class="page-header"><?php print $title; ?></h1>
        <?php endif; ?>
        <?php print render($title_suffix); ?>
        <?php print $messages; ?>
        <?php if (!empty($tabs)): ?>
          <?php print render($tabs); ?>
        <?php endif; ?>
        <?php if (!empty($page['help'])): ?>
          <?php print render($page['help']); ?>
        <?php endif; ?>
        <?php if (!empty($action_links)): ?>
          <ul class="action-links"><?php print render($action_links); ?></ul>
        <?php endif; ?>
        <?php print render($page['content']); ?>
      </section>

      <?php if (!empty($page['sidebar_second'])): ?>
        <aside class="col-sm-3" role="complementary">
          <?php print render($page['sidebar_second']); ?>
        </aside>  <!-- /#sidebar-second -->
      <?php endif; ?>

    </div>
  </div>
</div>

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
