// Document ready
(function ($) {
    'use strict';

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
