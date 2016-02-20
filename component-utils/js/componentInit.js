'use strict';

import _map from 'lodash/map';
import { win as windw } from 'rei-browser-shim';

/**
 * Initiates a component for each element of a given selector
 *
 * @param { function }     Component The constructor function for a component
 * @param { string/array } selector  The selector to instanciate a component on
 * @return Returns an array of constructor objects
 */
export default function ( Component, selector, win = windw ) {
   return _map( win.document.querySelectorAll( selector ), el => new Component( el ) );
}
