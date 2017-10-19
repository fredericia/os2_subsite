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
       duration : 1000000
     });
   },

   show : function($termId) {
     var $i = 0,
       $backstretch = $('.page-header-wrapper').data('backstretch');

     if (typeof Drupal.settings.ficBackstretch === 'undefined'
      || typeof $backstretch === 'undefined') {
       return;
     }

     for (var i = 0; i < Drupal.settings.ficBackstretch.length; i++) {
         if ($termId == Drupal.settings.ficBackstretch[i].tid) {
         $backstretch.show($i);
         break;
       }
       $i++;
     }
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

// Document ready
(function ($) {
    'use strict';

    // Enable header
    header.init();
})(jQuery);

//# sourceMappingURL=core.js.map