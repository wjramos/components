'use strict';

import componentInit from 'packages/component-utils/js/componentInit';
import _kebabCase from 'lodash/kebabCase';

/* UI Components */
import SitewideOverlay from 'components/sitewide-overlay/js/main';
import Carousel from 'components/bootstrap-hooks/js/carousel';
import LocateMe from 'components/locate-me/js/main';

/* Initiate */
export default function ( components = [ SitewideOverlay, LocateMe, Carousel ] ) {

    /* Constructs class based on component name with camelcase converted to lower-case and hyphen-separated */
    return components.map(
        component => componentInit( component, '.js-' + _kebabCase( component.prototype.name ) )
    );
}
