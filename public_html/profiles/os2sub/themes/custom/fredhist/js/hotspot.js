jQuery(document).ready(function($) {

  $("#hotspot-container .hotspot-tooltip").mouseenter(function() {
    $("#hotspot-container .hotspot-tooltip").removeClass("show");
    $(this).addClass("show");
  });

  $("#hotspot-container .hotspot-tooltip").each(function() {
    var posLeft = $(".icon", this).offset().left - $("#hotspot-container").offset().left;
    var containerWidth = $("#hotspot-container").width() - 140;
    // if tooltip overflows container, adjust position (left)
    if(posLeft < 135){
      var overflow = -135 + posLeft;
      var moveLeft = -135 - overflow;
      var moveLeftArrow = 120 + overflow;
      $(".text", this).css("left", moveLeft);
      $(".arrow", this).css("left", moveLeftArrow);
    }
    // if tooltip overflows container, adjust position (right)
    if(posLeft > containerWidth){
      var overflow = (containerWidth + 140) - posLeft;
      var moveRight = -overflow + -137;
      var moveRightArrow = overflow + 122;
      if ($(window).width() < 600) {
        // adjust for phones
         moveRight = -overflow + -154;
         moveRightArrow = overflow + 142;
      }
      if ($(window).width() < 350) {
         moveRight = -overflow + -206;
         moveRightArrow = overflow + 192;
      }
      $(".text", this).css("left", moveRight);
      $(".arrow", this).css("left", moveRightArrow);
    }
  });

});
