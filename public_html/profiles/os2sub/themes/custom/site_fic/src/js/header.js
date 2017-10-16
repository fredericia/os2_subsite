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
       if (typeof settings.ficBackstretch === 'undefined') {
         return;
       }

       var $images = [],
         $backstretchWrapper = $('.page-header-wrapper');
       for (var $termId in settings.ficBackstretch) {
         $images.push(settings.ficBackstretch[$termId]);
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

       for (var $searchTermId in Drupal.settings.ficBackstretch) {
         if ($termId == $searchTermId) {
           $backstretch.show($i);
           break;
         }
         $i++;
       }
     }
   };

   return pub;

})(jQuery);
