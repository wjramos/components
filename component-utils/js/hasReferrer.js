'use strict';

import _some from 'lodash/some';
import _isArray from 'lodash/isArray';
import { win as windw } from 'rei-browser-shim';

/**
 * Checks a referrer or set or referrers against client's referrer, returs true if a match found
 *
 * @param { String / Array } referrers The set of referrers to check if present
 * @return { Boolean } Returns true if a domain match is found
 */
export default function ( referrers, win = windw ) {
    if ( referrers ) {
        referrers = !_isArray( referrers ) ? [ referrers ] : referrers;

        /* Referrer exists and has data */
        return _some(
            referrers,
            referrer => {
                const refRegex = new RegExp( `(^|\\b|(https?:\/\/([^\/]+\\.)))${ referrer }(\/|\\b|$)`, 'ig' );
                return win.document.referrer.match( refRegex );
            }
        );
    }
}
