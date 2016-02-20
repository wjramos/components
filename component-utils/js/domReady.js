'use strict';

import { win as windw } from 'rei-browser-shim';

/**
 * Binds an function to the loaded event on document
 *
 * @param  { Function } funct The function to bind
 */
export default function ( funct, win = windw ) {
    return win.document.addEventListener( 'DOMContentLoaded', funct, false );
}
