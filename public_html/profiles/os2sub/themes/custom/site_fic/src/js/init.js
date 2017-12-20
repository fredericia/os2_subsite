// Document ready
(function ($) {
    'use strict';

    // Resolves $.browser issue (see: https://stackoverflow.com/questions/14798403/typeerror-browser-is-undefined)
    var matched, browser;

    jQuery.uaMatch = function( ua ) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

        return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    };

    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    jQuery.browser = browser;

    // Enable header
    header.init();

    // Sidr
    $('.slinky-menu')
        .find('ul, li, a')
        .removeClass();

    $('.sidr__toggle').sidr({
        name: 'sidr-main',
        side: 'right',
        renaming: false,
        source: '.sidr-source-provider'
    });

    // Slinky
    $('.sidr .slinky-menu').slinky({
        title: true,
        label: ''
    });

    // Close CTools modal on backdrop click
    Drupal.behaviors.ctools_backdrop_close = {
        attach: function(context, settings){
            $('#modalBackdrop, #modalContent').once('ctools_backdrop_close', function() {
                $('.ctools-modal-content').click(function(event) {
                    event.stopPropagation();
                });

                $(this).on('click', function(event) {
                    Drupal.CTools.Modal.dismiss();
                });
            });
        }
    }

})(jQuery);
