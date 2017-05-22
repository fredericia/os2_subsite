//// |--------------------------------------------------------------------------
//// | Page layout
//// |--------------------------------------------------------------------------
//// |
//// | This jQuery script is written by
//// | Morten Nissen
//// |
//
var pageLayout = (function ($) {
    'use strict';

    //removing anchor tag when clicking the pager
    $('.menu-background-slideshow .widget_pager a').click(function (e) {
        e.preventDefault();
    });

    $('#views-exposed-form-os2sub-kulturnaut-multi-search-pane-activities-multi-search input').change(function(){
        $('#views-exposed-form-os2sub-kulturnaut-multi-search-pane-activities-multi-search button').unbind();
    });
//
//    var pub = {};
//
//    /**
//     * Instantiate
//     */
//    pub.init = function () {
//        registerBootEventHandlers();
//        registerEventHandlers();
//    };
//
//    /**
//     * Register boot event handlers
//     */
//    function registerBootEventHandlers() {}
//
//    /**
//     * Register event handlers
//     */
//    function registerEventHandlers() {
//
//        if ( ! Modernizr.touchevents) {
//
//            $(window).on('load', function () {
//                footerAttached();
//            });
//
//            $(window).on('resize', function () {
//                footerAttached();
//            });
//        }
//    }
//
//    /**
//     * Footer attached
//     */
//    function footerAttached() {
//        if ($('body').hasClass('footer-attached')) {
//            var $footer = $('.footer');
//            var footerHeight = $footer.outerHeight(true);
//
//            $('.inner-wrapper').css('padding-bottom', footerHeight);
//        }
//    }
//
//    return pub;
})(jQuery);

//// |--------------------------------------------------------------------------
//// | Header
//// |--------------------------------------------------------------------------
//// |
//// | This jQuery script is written by
//// | Morten Nissen
//// |
//
//var header = (function ($) {
//    'use strict';
//
//    var pub = {};
//
//    /**
//     * Instantiate
//     */
//    pub.init = function () {
//        registerBootEventHandlers();
//        registerEventHandlers();
//    };
//
//    /**
//     * Register boot event handlers
//     */
//    function registerBootEventHandlers() {}
//
//    /**
//     * Register event handlers
//     */
//    function registerEventHandlers() {
//
//        if ( ! Modernizr.touchevents) {
//            var $element = $('#header'),
//                scrollTop     = $(window).scrollTop(),
//                elementOffset = $element.find('.header-bottom-inner').offset().top,
//                distance      = (elementOffset - scrollTop);
//
//            $element.sticky({
//                topSpacing: 0,
//                className: 'header-is-sticky'
//            });
//        }
//    }
//
//    return pub;
//})(jQuery);

// Document ready
(function ($) {
    // Enable page layout
    pageLayout.init();

    // Enable header
    //header.init();
})(jQuery);
//# sourceMappingURL=core.js.map