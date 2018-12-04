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

    // Remove .nolink and .separator
    $('.slinky-menu, .navigation-bar__dropup')
        .find('.nolink, .separator')
        .parent()
        .remove();

    // Sidr
    $('.slinky-menu')
        .find('ul, li, a')
        .removeClass();

    $('.sidr__toggle').sidr({
        name: 'sidr-main',
        side: 'left',
        displace: false,
        renaming: false,
        source: '.sidr-source-provider'
    });

    // Slinky
    $('.sidr .slinky-menu').slinky({
        title: true,
        label: ''
    });

    $('select').change(function() {
        var $this = $(this);
        if ($this.val() == '') {
            $this.addClass('empty');
        } else {
            $this.removeClass('empty');
        }
    }).change();

    // Close CTools modal on backdrop click
    Drupal.behaviors.ctools_backdrop_close = {
        attach: function(context, settings){
            $('#modalBackdrop, #modalContent').once('ctools_backdrop_close', function() {
                $('.popups-body').click(function(event) {
                    event.stopPropagation();
                });

                $(this).on('click', function(event) {
                    Drupal.CTools.Modal.dismiss();
                });
            });
        }
    };

    function _set_height_on_page_wrapper() {
        var $header = $('.page-header-wrapper'),
            $backstretch = $('.backstretch'),
            height = $backstretch.outerHeight(true);

        $header.css('height', height);
    }
    _set_height_on_page_wrapper(); // Load upon boot

    // Init stackable responsive table plugin.
    Drupal.behaviors.stackable = {
        attach: function(context, settings){
            $('table').once('stackable', function() {
                $(this).stacktable();
            });
        }
    };

    // Lity
    $('a[rel="modalbox"]').on('click', function(event) {
        event.preventDefault();

        var $element = $(this),
            href = $element.attr('href');

        lity(href);
    });

    // Navigation bar
    $('.navigation-bar__toggle').on('click', function(event) {
        event.preventDefault();

        var $element = $(this),
            $parent = $element.parents('.navigation-bar');

        $parent.toggleClass('visible');
    })

    // All links to PDFs should open in a new window.
    $('a[href$=".pdf"]').each(function() {
        var $element = $(this);

        $element.attr('target', '_blank');
    });

})(jQuery);
