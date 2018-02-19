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

    // Set a cookie that determines that we are coming from the app
    // if Drupal handles this inside preprocess_html, it doesnt work
    // most places.
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var param = getParameterByName('from_app');
    if (param) {
        Cookies.set('from_webapp', 1, { expires: 365 });
    }
})(jQuery);
