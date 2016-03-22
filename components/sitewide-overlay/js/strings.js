'use strict';

export default {
    viewOverlay   : { interstitialModal: true },
    viewNoOverlay : { interstitialModal: false },
    DATA          : {
        shown            : 'overlay-shown',
        delay            : 'overlay-delay',
        target           : 'overlay-target-wrapper',
        cookieName       : 'overlay-cookie-name',
        cookieExpire     : 'overlay-cookie-expires',
        blockedReferrer  : 'overlay-blocked-referrer',
        backgroundEffect : 'overlay-background-effect'
    },
    SELECTOR      : {
        closeTriggers : '.backdrop, .close, .close-overlay'
    }
};
