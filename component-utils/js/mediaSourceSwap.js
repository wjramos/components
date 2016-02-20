'use strict';

import _forEach from 'lodash/forEach';
import _toArray from 'lodash/toArray';
import { getWindowSize } from 'components/breakpoint-detector/js/main';

/**
 * Sets an element's media (image or video) sources depending on breakpoint -- Prevents loading unnecessary resources
 *
 * @param { element/nodeList } elem The element containing the media
 */
export default function ( elems, autoplay = true ) {
    elems = !elems.length ? _toArray( elems ) : elems;
    const breakpoint = getWindowSize( );

    _forEach( elems, elem => {

        const videos = elem.querySelectorAll( 'video' );
        const images = elem.querySelectorAll( 'img' );

        /* Add true src from data attribute to prevent unneeded partial load when not visible -- If no image fallback, displays video/poster on mobile */
        if ( !!videos.length && ( ( breakpoint !== 'xs' && breakpoint !== 's' ) || !images.length ) ) {

            /* Load video assets if above small breakpoint */
            return _forEach( videos, video => {

                /* Set the poster if it exists */
                let poster = video.getAttribute( 'data-poster' );

                if ( poster ){
                    video.setAttribute( 'poster', poster );
                }

                /* Get all the sources and set real attributes */
                _forEach( video.querySelectorAll( 'source' ), source => {
                    let src = source.getAttribute( 'data-src' );

                    if ( src ){
                        source.setAttribute( 'src', src );
                    }
                } );

                /* Load sources to be usable by video, then play it! */
                video.load();

                if ( autoplay ) {
                    video.play();
                }
            } );

        }

        /* Either no video, or a breakpoint where we care about data usage */
        return _forEach( images, image => {
            let src = image.getAttribute( 'data-src' );

            if ( src ) {
                image.setAttribute( 'src', src );
            }
        } );
    } );
}
