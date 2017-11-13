//// |--------------------------------------------------------------------------
//// | Header
//// |--------------------------------------------------------------------------

var header = (function ($) {
  'use strict';

  var pub = {};

  /**
  * Instantiate
  */
  pub.init = function () {
        registerBootEventHandlers();
        registerEventHandlers();
  };

  /**
   * Register boot event handlers.
   */
  function registerBootEventHandlers() {}

  /**
   * Register event handlers.
   */
  function registerEventHandlers() {
    // Add submenu open/close behavior.
    $('.headerwrapper-inner .navbar-nav > li.expanded').hover(
      function() { $(this).addClass('open').children('a').attr('aria-expanded', 'true');},
      function() { $(this).removeClass('open').children('a').attr('aria-expanded', 'false');}
    ).click(function(event) {
      // Disable other event listeners.
      event.stopPropagation();
      // Restore default link behaviour.
    });
  }

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
      $('.term-fic-header .views_slideshow_main, .page-taxonomy .term-fic-header > .taxonomy-term .cycle-slideshow').height($descrH);
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

  /**
   * Custom ficHeaderCycleSlideshow behavior.
   */
  Drupal.behaviors.ficHeaderCycleSlideshow = {
    attach: function (context, settings) {
      var $slideShow = $('.cycle-slideshow');
      if (!$slideShow.once().length) {
        return;
      }

      $slideShow.cycle({
        speed: 700,
        timeout: 0,
        pager: '#cycle-nav',
        before: function(currSlideElement, nextSlideElement, options, forwardFlag) {
          var $termId = $(nextSlideElement).data('id');
          if (typeof Drupal.behaviors.ficBackstretch !== "undefined") {
            Drupal.behaviors.ficBackstretch.show($termId);
          }
        },
        pagerAnchorBuilder: function(idx, slide) {
          var $slide = $(slide);
          return '<div class="field-item"><a href="' + $slide.data('url') + '"><span>' + $slide.data('name') + '</span></a></div>';
        },
        pagerEvent: 'mouseover',
        pauseOnPagerHover: true
      });

      $('.cycle-pager a').on('click', function(e){
        e.stopPropagation();
      });
    }
  };

  return pub;

})(jQuery);
