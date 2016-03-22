'use strict';

import { win as windw } from 'rei-browser-shim';
import isCrawler from 'packages/component-utils/js/isCrawler';
import parseToMs from 'packages/component-utils/js/parseToMs';
import hasReferrer from 'packages/component-utils/js/hasReferrer';
import mediaSourceSwap from 'packages/component-utils/js/mediaSourceSwap';
import trapTabKey from 'packages/component-utils/js/trapTabKey';
import cc from 'cookie-cutter';

import STRING from './strings';

const DATA = STRING.DATA;
const SELECTOR = STRING.SELECTOR;

class SitewideOverlay {
    constructor ( element, win = windw ) {
        const $ = $ || win.jQuery || require( 'jquery2' );
        this.$document = $( win.document );
        this.shown;
        this.settings;
        this.$element;
        this.$target;

        if ( element ) {
            let $element = this.$element = $( element );

            /* Get modal window */
            let target  = $element.data( DATA.target ) || '#sitewide-overlay';
            let $target = this.$target = $( target );

            if ( $element && $target ) {

                return this.setup( win );
            }

            return this.remove();
        }
    }

    setup ( win = windw ) {
        const cookie = cc( win.document );
        let $element = this.$element;
        let $target  = this.$target;

        /* Get cases where overlay shouldn't be shown */
        let cookieName      = $element.data( DATA.cookieName ) || 'seenOverlay';
        let blockedReferrer = $element.data( DATA.blockedReferrer );

        if ( !isCrawler( win ) && !cookie.get( cookieName ) && !hasReferrer( blockedReferrer, win ) ) {
            let duration = this.$element.data( DATA.cookieExpire );
            let settings = this.settings = {
                cookieExpire     : duration >= 0 ? new Date( new Date( ).setDate( new Date( ).getDate( ) + duration ) ).toUTCString( ) : 'Fri, 31 Dec 9999 23:59:59 GMT',
                delay            : $element.data( DATA.delay )            || 0,
                backgroundEffect : $element.data( DATA.backgroundEffect ) || '',
                cookieName,
                blockedReferrer
            }

            /* Show if there's somewhere to put it */
            this.shown = true;

            /* Set Cookie to prevent repeated views on consecutive visits */
            cookie.set( settings.cookieName, true, { expires : settings.cookieExpire } );

            /* Place component inside of overlay */
            $element.detach().appendTo( $target.children( '.dialog' ) );

            return this.show();
        }

        return this.remove();
    }

    show ( win = windw ) {
        const settings = this.settings;
        let $elem      = this.$element;
        let $target    = this.$target;
        let $siblings  = $target.siblings();

        /* Prepare to show */
        $target.toggleClass( 'fade out hidden' );

        /* Set data attribute for page view metrics */
        $elem.data( DATA.shown, true ).removeClass( 'js-sitewide-overlay' );

        /* Set up media */
        mediaSourceSwap( $elem, win );

        /* Bind sub-elements with close events */
        $target.on(
            'click',
            SELECTOR.closeTriggers,
            () => this.hide()
        );

        /* Display the Overlay after specified time after document is ready */
        setTimeout(
            () => {
                this.metrics();
                $target.toggleClass( 'in out' );
                this.$document.keydown(
                    e => {
                        if ( e.which === 9 ) {
                            trapTabKey( $elem, e );
                        }

                        if ( e.which === 27 ) {
                            e.preventDefault();
                            return this.hide();
                        }
                    }
                );

                /* Add visual effect to background sibling elements */
                $siblings.toggleClass( settings.backgroundEffect );
            },
            parseToMs( settings.delay )
        );

        return this;
    }

    metrics ( win = windw ) {
        /* Fire view metrics on display */
        const metrics = require( 'components/metrics' );
        let loadData = metrics.viewData || {};

        /* TODO: Find a better way to specify these */
        metrics.view( {
            pageName        : 'email_signup_modal',
            subSection1     : 'email',
            templateType    : 'rei_commerce',
            siteId          : 'rei'
        } );
    }

    remove ( ) {
        this.shown = false;

        /* Remove overlay element */
        return this.$element.remove();
    }

    hide ( ) {
        const settings = this.settings;
        let $elem      = this.$element;
        let $target    = this.$target;
        let $siblings  = $target.siblings();

        $target.toggleClass( 'in out' );
        $siblings.toggleClass( settings.backgroundEffect );

        setTimeout(
            () => {
                $target.remove( );
            },
            parseToMs( $target.css( 'transition-duration' ) )
        );
    }
}

SitewideOverlay.prototype.name = 'SitewideOverlay';

export default SitewideOverlay;
