<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup templates
 */
?>
<header role="navigation" id="page-header" class="page-header-wrapper">
  <div class="header-container container">
    <div class="logo-wrapper col-sm-5">
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
    <nav role="navigation" id="topnav" class="topnav-wrapper user-nav col-sm-7">
      <?php if ( !empty($secondary_nav) ): ?>
        <?php print render($secondary_nav); ?>
      <?php endif; ?>
      <?php if ( !empty($page['navigation']) ): ?>
        <?php print render($page['navigation']); ?>
      <?php endif; ?>
    </nav>
    <nav id="navbar" role="banner" class="col-sm-7 <?php print $navbar_classes; ?>">
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
    <?php print render($page['header']); ?>
  </div>
</header>


<div class="main-container">


  <!-- /#page-header -->

  <div class="row search-and-title">

    <?php if ( !empty($page['sidebar_first']) ): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>

    <section<?php print $content_column_class; ?>>
      <div class="container">
        <?php if ( !empty($page['highlighted']) ): ?>
          <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
        <?php endif; ?>
        <div class="row">
          <div class="col-xs-6">
            <?php if ( !empty($breadcrumb) ): print $breadcrumb;
            endif; ?>
          </div>
          <div class="col-xs-6">
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

  
<footer class="footer">
  <?php if (!empty($page['footer'])) : ?>
    <div class="container footer-container">
      <?php print render($page['footer']); ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($page['footer1'])) : ?>
    <div class="container footer-container footer1-container">
      <?php print render($page['footer1']); ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($page['footer2']) 
        OR !empty($theme_settings['contact_information']) 
        OR $theme_settings['layout']['footer']['show_social_links'] ) : ?>
    <div class="footer-dark">
      <div class="container footer-dark-container">
        <div class="row">
            <div class="contact-information col-sm-4">
              <?php print render($page['footer3']); ?>
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
            <?php if (!empty($page['footer4'])) : ?>
              <div class="col-sm-5">
                <section role="complementary">
        	        <div class="footer4">
          	        <?php print render($page['footer4']); ?>
          	     </div>
                </section>
    	        </div>
            <?php endif ?>
            <?php if (!empty($page['footer5'])) : ?>
              <div class="col-sm-3">
                <section role="complementary">
                  <div class="footer5">
                    <div class="custom-links">
                      <?php print render($page['footer5']); ?>
                    </div>
                  </div>
                </section>
              </div>

              <div class="social-links col-sm-3 col-sm-push-9">
                <?php if ($theme_settings['social_links']['social_links_block_name']): ?>
                  <h3 class="block-title"><?php print $theme_settings['social_links']['social_links_block_name']; ?></h3>
                <?php endif; ?>
                <?php print render($page['footer3']); ?>
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
      
                  <?php if ($theme_settings['social_links']['twitter']['active']): ?>
                    <li>
                      <a 
                        href="<?php print $theme_settings['social_links']['twitter']['url']; ?>" 
                        target="_blank" 
                        class="social-icon social-icon-twitter" 
                        data-toggle="tooltip"
                        data-placement="top" 
                        title="<?php print $theme_settings['social_links']['twitter']['tooltip']; ?>">
                      </a>
                    </li>
                  <?php endif; ?>
      
                  <?php if ($theme_settings['social_links']['googleplus']['active']): ?>
                    <li>
                      <a 
                        href="<?php print $theme_settings['social_links']['googleplus']['url']; ?>" 
                        target="_blank"
                        class="social-icon social-icon-google-plus"
                        data-toggle="tooltip" 
                        data-placement="top"
                        title="<?php print $theme_settings['social_links']['googleplus']['tooltip']; ?>">
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
                  <?php if ($theme_settings['social_links']['pinterest']['active']): ?>
                    <li>
                      <a 
                        href="<?php print $theme_settings['social_links']['pinterest']['url']; ?>"
                        target="_blank" class="social-icon social-icon-pinterest" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="<?php print $theme_settings['social_links']['pinterest']['tooltip']; ?>">
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
      
                  <?php if ($theme_settings['social_links']['vimeo']['active']): ?>
                    <li>
                      <a href="<?php print $theme_settings['social_links']['vimeo']['url']; ?>" 
                         target="_blank" 
                         class="social-icon social-icon-vimeo" 
                         data-toggle="tooltip" 
                         data-placement="top" 
                         title="<?php print $theme_settings['social_links']['vimeo']['tooltip']; ?>">
                      </a>
                    </li>
                  <?php endif; ?>
                </ul>	
              </div>
            <?php endif; ?>
        </div>
      </div>
    </div>
  <?php endif ?>
    <?php if (!empty($page['footer1'])) : ?>
    <div class="container footer-container footer1-container">
      <?php print render($page['footer1']); ?>
    </div>
  <?php else: ?> 	            
    <?php if (!empty($section_logo)): ?>
      <div class="section-logo"><?php print $section_logo; ?></div>
    <?php endif; ?>	   
  <?php endif; ?>	   
</footer>
