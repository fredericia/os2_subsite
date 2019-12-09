jQuery(document).ready(function($) { 
  // Gallery
  // $(".node-type-gallery .views-slideshow-controls-bottom").click(function () {
  //   $(".gallery .view-content .text").addClass("show-info");
  //   $(".gallery .views-slideshow-controls-text-next a, .gallery .views-slideshow-controls-text-previous a ").addClass("hide");
  //   $(this).addClass("show-info");
  //   window.setTimeout(function(){$(".gallery .view-content .text .content").addClass("show-text");}, 500);
  //   $('.gallery .views-slideshow-controls-text-pause').trigger('click');
  // });
  
  // $(".gallery .view-content .text .close-btn").click(function () {
  //   $(".gallery .view-content .text").removeClass("show-info");
  //   $(".gallery .views-slideshow-controls-text-next a, .gallery .views-slideshow-controls-text-previous a ").removeClass("hide");
  //   $(".node-type-gallery .views-slideshow-controls-bottom").removeClass("show-info");
  //   $(".gallery .view-content .text .content").removeClass("show-text");
  //   $('.gallery .views-slideshow-controls-text-pause').trigger('click');
  // });

  // Gallery scroll-to-thumbs
  $( ".views-slideshow-controls-bottom" ).append( "<a name='thumbs'></a>" );

  $(".views-slideshow-controls-bottom div > div img").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  
    // Back function
  $('.mini .top-btns a.close').click(function(){
    parent.history.back();
    return false;
  });
});

// Bind keyboard keys
jQuery(document).keydown(function(event){
  switch (event.keyCode) {
    case 37:
        jQuery('.gallery .views-slideshow-controls-text-previous a').trigger('click');
      break
    case 39:
        jQuery('.gallery .views-slideshow-controls-text-next a').trigger('click');
      break;
    case 27:
        parent.history.back();
        return false;
      break;
}});