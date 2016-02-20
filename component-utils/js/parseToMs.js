'use strict';

/**
 * Formats number to string with commas for thousands
 *
 * @param  { number } number The number to format
 * @return { string | NaN } Returns string of number formatted to thousands
 */
export default function ( time ) {
    if ( typeof time === 'string' ) {
        const timeStr = time.toLowerCase( );

        // Hours input
        if ( timeStr.indexOf( 'h' ) > -1 ) {
            return parseFloat( timeStr ) * 1000 * 60 * 60;
        }

        // Minutes input
        if ( timeStr.indexOf( 'm' ) > -1 ) {
            return parseFloat( timeStr ) * 1000 * 60;
        }

        // Seconds input
        if ( timeStr.indexOf( 's' ) > -1 ) {
            return parseFloat( timeStr ) * 1000;
        }
    }

    // Assume ms input
    return parseInt( time ) || 0;
}
