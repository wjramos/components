'use strict';

import { win as windw } from 'rei-browser-shim';

/**
 * Checks a referrer or set or referrers against client's referrer, returs true if a match found
 *
 * @param { String / Array } referrers The set of referrers to check if present
 * @return { Boolean } Returns true if a domain match is found
 */
export default function ( referrers, win = windw ) {
    if ( referrers ) {
        referrers = !Array.isArray( referrers ) ? [ referrers ] : referrers;

        /* Referrer exists and has data */
        return referrers.some(
            referrer => {
                const refRegex = new RegExp( `(^|\\b|(https?:\/\/([^\/]+\\.)))${ referrer }(\/|\\b|$)`, 'ig' );
                return win.document.referrer.match( refRegex );
            }
        );
    }
}
