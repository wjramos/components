 'use strict';

import { win as windw } from 'rei-browser-shim';
import trackLinks from 'packages/track-links';
import _forEach from 'lodash/forEach';

export default function ( selector, attribute = 'data-location-name', win = windw ) {
    return _forEach(
        win.document.querySelectorAll( selector ),
        component => trackLinks( component, component.getAttribute( attribute ) )
    );
}