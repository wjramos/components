'use strict';

import { win as windw } from 'rei-browser-shim';

/**
 * Returns true if client user agent matches common search crawler patterns
 *
 * @return { bool } T/F for whether user agent matches search crawler pattern
 */
export default function ( win = windw ) {
    return win.navigator.userAgent.match( /bot|crawl|slurp|spider/i ) !== null;
}
