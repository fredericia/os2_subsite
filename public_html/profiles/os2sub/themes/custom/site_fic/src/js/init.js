// Document ready
(function ($) {
    'use strict';

    // Enable header
    header.init();

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
