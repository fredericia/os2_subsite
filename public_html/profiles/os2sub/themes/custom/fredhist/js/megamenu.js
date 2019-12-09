var classnumber;

jQuery(document).ready(function($) {
  // add class 'show-menu' to dropdown menu
  $(".main-menu .menu-level-1 ul li ul, .dropdown-menu").hover(function () {
    $(".dropdown-menu .dropdown-bg").addClass("show-menu");
    $(this).parent().addClass("dropdown-active");
    $(".mini-center .topimage").addClass("ie8");
    $(".mini-center .topimage-description .pane-content").addClass("ie8");
  });
  
  $(".main-menu .menu-level-1 > ul.menu > li.expanded > a").click(function () {
    if($(this).parents("li:first").hasClass("dropdown-active")) {
      window.location.replace($(this).attr("href"));
    } else {
      $(".dropdown-menu .dropdown-bg").addClass("show-menu");
      $(".dropdown-menu .dropdown-bg").removeClass("height-low");
      $(".main-menu .menu-level-1 ul.menu > li").removeClass("dropdown-active");
      $(this).parent().addClass("dropdown-active");
      $(".mini-center .topimage").addClass("ie8");
      $(".mini-center .topimage-description .pane-content").addClass("ie8");
      if ($(window).width() > 1024) {
        return false;
      }
    }
  });
  
  // For low-height dropdowns
  $(".main-menu .menu-level-1 ul.menu > li a.height-low").click(function () {
    $(".dropdown-menu .dropdown-bg").addClass("height-low");
  });
  // Add low-height class to dropdown-bg if current menu item has 'height-low' class set
  $('.main-menu .menu-level-1 ul li ul, .dropdown-menu').mouseenter(function() {
    if ( $('.main-menu .menu-level-1 ul.menu > .menu-mlid-'+ classnumber + ' a.height-low')[0] ) { 
      $(".dropdown-menu .dropdown-bg").addClass("height-low");
    }
  });  

  // Collect current menu id
  $(".main-menu .menu-level-1 > ul.menu > li.expanded").mouseenter(function() {
    classnumber = jQuery(this).attr("class").match(/menu-mlid-(.*)/)[1].split(" ")[0];
  });

  $(".dropdown-menu").mouseenter(function() {
    $('.main-menu .menu-level-1 ul.menu > .menu-mlid-'+ classnumber).addClass("dropdown-active");
  });

  // remove 'show menu' class on mouseout
  $(".dropdown-menu").mouseout(function () {
    $(".dropdown-menu .dropdown-bg, .dropdown-menu").removeClass("show-menu");
    $(".dropdown-menu .dropdown-bg, .dropdown-menu").removeClass("height-low");
    $(".main-menu .menu-level-1 ul.menu > li.expanded").removeClass("dropdown-active");
    $(".mini-center .topimage").removeClass("ie8");
    $(".mini-center .topimage-description .pane-content").addClass("ie8");
  });
  
  // remove 'show menu' class on mouseout
  if ($('html').hasClass('ie8')) {
    $(".main-menu .menu-level-1 > ul.menu > li > a, .mini-top .inner").hover(function () {
      $(".dropdown-menu .dropdown-bg, .dropdown-menu").removeClass("show-menu");
      $(".dropdown-menu .dropdown-bg, .dropdown-menu").removeClass("height-low");
    }); 
  } else {
    $(".main-menu .menu-level-1 > ul.menu > li > a, .mini-top .inner").hover(function () {
      $(".dropdown-menu .dropdown-bg, .dropdown-menu").removeClass("show-menu");
      $(".dropdown-menu .dropdown-bg, .dropdown-menu").removeClass("height-low");
      $(".main-menu .menu-level-1 ul.menu > li.expanded").removeClass("dropdown-active");
      $(".mini-center .topimage").removeClass("ie8");
      $(".mini-center .topimage-description .pane-content").addClass("ie8");
    });
  }

  // Mobile menu
  $(".mini-bottom .mobile").click(function () {
    $(".dropdown-menu .dropdown-bg").toggleClass("show-menu");
    $(".mini-bottom .main-menu").toggleClass("mobile-active");
  });
    
  // If browser window larger than 1024px, don't show dropdown
  jQuery(window).resize(function() {
    if ($(window).width() > 1024) {
        $('.dropdown-menu .dropdown-bg').removeClass("show-menu");
        $('.mini-bottom .main-menu').removeClass("mobile-active");
      }
  });
});