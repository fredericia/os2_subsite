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

    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function () {
        //removing anchor tag when clicking the pager
        $('.menu-background-slideshow .widget_pager a').click(function (e) {
            e.preventDefault();
        });

        $('#views-exposed-form-os2sub-kulturnaut-multi-search-pane-activities-multi-search input').change(function(){
            $('#views-exposed-form-os2sub-kulturnaut-multi-search-pane-activities-multi-search button').unbind();
        });

        //removing gradient on mobile devices
        var windowsWidth = $(window).width();
        if (windowsWidth < 992 || navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            alert('iOS');
            $('.views-field-field-os2web-kulturnaut-slidesho .img-container').each(function( index, element ){
                var imageUrl = $(this).data("image");
                $( this ).css("background-image", "url('" + imageUrl + "')");
            });
        }
    };


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
    return pub;
})(jQuery);
