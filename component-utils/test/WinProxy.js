'use strict';

import JqueryProxy from './JqueryProxy';

export default class WinProxy {
    constructor ( config ) {
        this.navigator = config.navigator ? {
            userAgent: config.navigator.userAgent || ''
        } : { userAgent: '' };

        this.document = config.document ? {
            cookie:   config.document.cookie   || '',
            referrer: config.document.referrer || ''
        } : { cookie: '', referrer: '' };

        config.jQuery = config.jQuery || {};

        this.jQuery = config.jQuery ? config => new JqueryProxy( config ) : {};
    }
}
