// Document ready
(function ($) {
    'use strict';

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
        $('.views-field-field-os2web-kulturnaut-slidesho .img-container').each(function( index, element ){
            var imageUrl = $(this).data("image");
            $( this ).css("background-image", "url('" + imageUrl + "')");
        });
    }

    var $see_classes = $('.see-classes');

    $('footer').on('click', function(event) {
        $see_classes.show();
    });

    var classes_html = $('html').attr('class');
    $see_classes.find('.html').html(classes_html);

    var classes_body = $('body').attr('class');
    $see_classes.find('.body').html(classes_body);

})(jQuery);
