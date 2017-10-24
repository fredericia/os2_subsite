//// |--------------------------------------------------------------------------
//// | Header
//// |--------------------------------------------------------------------------

var header = (function ($) {
  'use strict';

  var pub = {};

  /**
  * Instantiate
  */
  pub.init = function () {};

  /**
  * Custom backstretch behavior.
  */
  Drupal.behaviors.ficBackstretch = {
   attach: function (context, settings) {
     if (typeof settings.ficBackstretch === 'undefined'
       || $('.backstretch').length > 0) {
       return;
     }

     var $images = [],
       $backstretchWrapper = $('.page-header-wrapper');
     for (var i = 0; i < settings.ficBackstretch.length; i++) {
       $images.push(settings.ficBackstretch[i].url);
     }
     $backstretchWrapper.backstretch($images, {
       // Slides should be never changed automaticly.
       duration : 1000000, fade: 750, paused: true
     });
   },

   show : function($id) {
     var $i = 0,
       $backstretch = $('.page-header-wrapper').data('backstretch');

     if (typeof Drupal.settings.ficBackstretch === 'undefined'
      || typeof $backstretch === 'undefined') {
       return;
     }

     for (var i = 0; i < Drupal.settings.ficBackstretch.length; i++) {
         if ($id == Drupal.settings.ficBackstretch[i].id) {
         $backstretch.show($i);
         break;
       }
       $i++;
     }
   }
  };

  /**
   * Custom headerRegion behavior.
   */
  Drupal.behaviors.headerRegion = {
    attach: function (context, settings) {
      if (!$('.term-fic-header').length) {
        return;
      }

      var $wH = $(window).height(),
        // All static value defiden accordingly with design.
        $brandigH = 178 + 20,
        $navigationH = 150 + 20,
        $scrollDownH = 174,
        $descrH = $wH - $brandigH - $navigationH - $scrollDownH,
        $minH = 300,
        $maxH = 700;

      $descrH = $descrH < $minH ? $minH : ($descrH > $maxH ? $maxH : $descrH);
      $('.front .term-fic-header .views_slideshow_main, .page-taxonomy .term-fic-header > .taxonomy-term').height($descrH);
    }
  };

      Drupal.theme.prototype.fic_modal = function () {
    var html = '';
    html += '<div id="ctools-modal" class="popups-box my-first-popup">';
    html += ' <div class="ctools-modal-content my-popup ">';
    html += ' <span class="popups-close"><a class="close" href="#">×</a></span>';
    html += ' <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
    html += ' </div>';
    html += '</div>';
    return html;
  };

  return pub;

})(jQuery);
