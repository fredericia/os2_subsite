/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/*
 * This file is used/requested by the 'Styles' button.
 * The 'Styles' button is not enabled by default in DrupalFull and DrupalFiltered toolbars.
 */
if(typeof(CKEDITOR) !== 'undefined') {
	// config.stylesSet.push({ name : 'Nice Table', element : 'table', wrap:false, attributes : { 'class' : 'mt-nice-table', 'title' :'Nice Table' } });
    CKEDITOR.addStylesSet( 'drupal',
    [

        /* Bootstrap Styles */

        /* Typography */
        { name : 'Overskift (H2)'        , element : 'h2', attributes: { 'class': 'h2' } },
        { name : 'Afsnitsoverskift (H3)'        , element : 'h3', attributes: { 'class': 'h3' } },
        { name : 'Overskrift 4'        , element : 'h4', attributes: { 'class': 'h4' } },
        { name : 'Overskrift 5'        , element : 'h5', attributes: { 'class': 'h5' } },
        { name : 'Overskrift 6'        , element : 'h6', attributes: { 'class': 'h6' } },
        { name : 'Lightbox'        , element : 'a', attributes: { 'rel': 'lightbox' } },

        { name : 'Fremhævet tekst'        , element : 'span', attributes: { 'class': 'primary-highlighted' } },
        { name : 'Fremhævet tekst alt'    , element : 'span', attributes: { 'class': 'secondary-highlighted' } },

        { name : 'Indledning'     , element : 'p', attributes: { 'class': 'lead' } },
        { name : 'Afsnit'     , element : 'p', attributes: { } },

        {
            name : 'Liste',
            element : 'ul',
            attributes :
            {
                'class' : 'list-unstyled'
            }
        },
        {
            name : 'Liste - horisontal',
            element : 'ul',
            attributes :
            {
                'class' : 'list-inline'
            }
        },
        {
            name : 'Tabel',
            element : 'table',
            attributes :
            {
                'class' : 'table'
            }
        },
        {
            name : 'Tabel - stribet',
            element : 'table',
            attributes :
            {
                'class' : 'table table-striped'
            }
        },
        {
            name : 'Tabel - m ramme',
            element : 'table',
            attributes :
            {
                'class' : 'table table-bordered'
            }
        },
        {
            name : 'Tabel - mouse-over effekt',
            element : 'table',
            attributes :
            {
                'class' : 'table table-hover'
            }
        },
        {
            name : 'Tabel - lille margin',
            element : 'table',
            attributes :
            {
                'class' : 'table table-condensed'
            }
        },
        {
            name : 'Billede - runde hjørner',
            element : 'img',
            attributes :
            {
                'class' : 'img-rounded'
            }
        },
        {
            name : 'Billede - rundt',
            element : 'img',
            attributes :
            {
                'class' : 'img-circle'
            }
        },
        {
            name : 'Billede - med ramme',
            element : 'img',
            attributes :
            {
                'class' : 'img-bordered'
            }
        }
    ]);

    CKEDITOR.on('dialogDefinition', function(ev) {
        // Take the dialog name and its definition from the event data.
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;

        // Check if the definition is from the dialog window you are
        // interested in (the "Image" dialog window).
        if ( dialogName == 'image' ) {
            // Get a reference to the "Advanced" tab.
            var advancedTab = dialogDefinition.getContents('advanced');

            // Set the default value for the Class field.
            var imgClass = advancedTab.get('txtGenClass');
            // Add the same class like we add in styles above.
            imgClass['default'] = 'img-bordered';
        }

        // Check if the definition is from the dialog window you are
        // interested in (the "Table" dialog window).
        if ( dialogName == 'table' ) {
            // Get a reference to the "Advanced" tab.
            var infoTab = dialogDefinition.getContents('info');
            // Set the default value for the txtBorder field.
            var txtBorder = infoTab.get('txtBorder');
            txtBorder['default'] = 0;

            // Get a reference to the "Advanced" tab.
            var advancedTab = dialogDefinition.getContents('advanced');
            // Set the default value for the Class field.
            var classes = advancedTab.get('advCSSClasses');
            // Add the same class like we add in styles above.
            classes['default'] = 'table table-striped';
        }
    });
}
