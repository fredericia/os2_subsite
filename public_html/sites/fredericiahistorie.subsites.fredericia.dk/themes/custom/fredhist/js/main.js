jQuery(document).ready(function($) {
  // Top searchbar
  $("header .top-icons .search").click(function() {
    $("header .search-form .form-item").toggleClass("show-search");
    $("header .top-icons .facebook").toggleClass("show-search");
    $(this).addClass("show-search");
  });

  $('header .search-form .form-text').attr('placeholder', 'Søg her');

  $('#left .search-form .form-submit').attr('value', 'Søg');

  if ($('.submenu-items ul li.active-trail ul').hasClass('menu')) {
    $(".submenu-items").addClass('active');
  }
  // Check if browser supports HTML5 Audio tag - if not, use flash fallback
  AudioPlayer.setup("/sites/fredericiahistorie.subsites.fredericia.dk/themes/custom/fredhist/js/player.swf", {
      width: 290
  });
  var audioTag = document.createElement('audio');
  if ($("html").hasClass("ie7") || $("html").hasClass("ie8") || $("html").hasClass("ie9")) {
    $('audio').each(function(n,v){
      var videoSource = $(this).attr("src");
      $(this).attr("id", "audioplayer-"+n);
      AudioPlayer.embed("audioplayer-"+n, {soundFile: videoSource});
    });
  }

});
