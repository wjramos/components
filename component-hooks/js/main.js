'use strict';

import componentInit from 'packages/component-utils/js/componentInit';
import _forEach from 'lodash/forEach';
import _kebabCase from 'lodash/kebabCase';

/* UI Components */
import SitewideOverlay from 'components/sitewide-overlay/js/main';

/* Initiate */
export default function ( components = [ SitewideOverlay ] ) {

    /* Constructs class based on component name with camelcase converted to lower-case and hyphen-separated */
    return _forEach( components, component => componentInit( component, component.name ? '.js-' + _kebabCase( component.name ) : '' ) );
}
