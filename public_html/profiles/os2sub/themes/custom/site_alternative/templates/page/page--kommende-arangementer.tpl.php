<!-- Begin - history manipulator -->
<div class="history-manipulator">
  <button class="history-manipulator__button history-manipulator--back" onclick="history.back()">
    Tilbage
  </button>

  <button class="history-manipulator__button history-manipulator__button--next" onclick="history.forward()">
    Frem
  </button>
</div>
<!-- End - history manipulator -->

<header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
  <div class="<?php print $container_class; ?>">
    <div class="navbar-header">
      <?php if ($logo): ?>
        <a class="logo navbar-btn pull-left" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/>
        </a>
      <?php endif; ?>

      <?php if (!empty($site_name)): ?>
        <a class="name navbar-brand" href="<?php print $front_page; ?>"
           title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
      <?php endif; ?>

      <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="sr-only"><?php print t('Toggle navigation'); ?></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      <?php endif; ?>
    </div>

    <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
      <div class="navbar-collapse collapse">
        <nav role="navigation">
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
  <div class="container-fluid">
    <div class="menu-background-slideshow hidden-xs hidden-sm row">
      <?php
      $view_slideshow = views_get_view('os2web_kulturnaut_events_lists');
      $view_slideshow->set_display('block_slideshow');
      print $view_slideshow->preview('block_slideshow');
      ?>
    </div>
  </div>
</header>

<div class="main-container <?php print $container_class; ?>">

  <header role="banner" id="page-header">
    <?php if (!empty($site_slogan)): ?>
      <p class="lead"><?php print $site_slogan; ?></p>
    <?php endif; ?>

    <?php print render($page['header']); ?>
  </header>
  <!-- /#page-header -->

  <div class="row">

    <?php if (!empty($page['sidebar_first'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>

    <section<?php print $content_column_class; ?>>
      <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
      <?php endif; ?>
      <div class="row">
        <div class="col-xs-6">
          <?php if (!empty($breadcrumb)): print $breadcrumb; endif; ?>
        </div>
        <div class="col-xs-6">
          <?php
            $block = module_invoke('views', 'block_view', '-exp-os2sub_kulturnaut_multi_search-pane_activities_multi_search');
            print render($block['content']);
          ?>
        </div>
      </div>

      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if (!empty($title)): ?>
        <h1 class="page-header"><span></span><?php print $title; ?></h1>
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

<div class="prefooter">
  <div class="<?php print $container_class; ?>">
    <div class="row">
      <div class="col-md-6">
        <h2 class="pane-title">
          <?php print t('Temaer lige nu'); ?>
        </h2>
        <?php
        $view_popular_tags = views_get_view('os2web_kulturnaut_tema_list');
        $view_popular_tags->set_display('block');
        print $view_popular_tags->preview('block');
        ?>
      </div>
      <div class="col-md-5 col-md-push-1">
        <h2 class="pane-title">
          <?php print t('Populære'); ?>
          <span class="focus">#tags</span>
        </h2>
        <?php
        $view_popular_tags = views_get_view('os2web_taxonomies_tax_editor_tag_list');
        $view_popular_tags->set_display('block');
        print $view_popular_tags->preview('block');
        ?>
      </div>
    </div>
  </div>
</div>

<?php //if (!empty($page['footer'])): ?>
<footer class="footer">
  <div class="<?php print $container_class; ?>">
    <?php print render($page['footer']); ?>
  </div>
</footer>
<?php //endif; ?>
