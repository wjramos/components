'use strict';

import { win as windw } from 'rei-browser-shim';
import isCrawler from 'packages/component-utils/js/isCrawler';
import parseToMs from 'packages/component-utils/js/parseToMs';
import hasReferrer from 'packages/component-utils/js/hasReferrer';
import mediaSourceSwap from 'packages/component-utils/js/mediaSourceSwap';
import cc from 'cookie-cutter';

import STRING from './strings';

const DATA = STRING.DATA;
const SELECTOR = STRING.SELECTOR;

export default class SitewideOverlay {
    constructor ( element, win = windw ) {
        let $ = $ || win.jQuery;

        this.defaultName = STRING.defaultName;
        this.shown;
        this.settings;
        this.$element;
        this.$target;

        if ( element ) {
            let $element = this.$element = $( element );

            /* Get modal window */
            let target = $element.data( DATA.target ) || '#sitewide-overlay';
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
        let $target = this.$target;

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
            cookie.set( settings.cookieName, true, { expires: settings.cookieExpire } );

            /* Place component inside of overlay */
            $element.detach().appendTo( $target.children( '.dialog' ) );

            return this.show();
        }

        return this.remove();
    }

    show ( win = windw ) {
        const settings     = this.settings;
        let $elem          = this.$element;
        let $target        = this.$target;
        let $siblings      = $target.siblings();

        /* Prepare to show */
        $target.addClass( 'fade out' ).removeClass( 'hidden' )

        /* Set data attribute for page view metrics */
        $elem.data( DATA.shown, true );

        /* Set up media */
        mediaSourceSwap( $elem, win );

        /* Bind sub-elements with close events */
        $target.on(
            'click',
            SELECTOR.closeTriggers,
            () => {
                $target.addClass('fade out' );
                $siblings.removeClass( settings.backgroundEffect );

                setTimeout(
                    () => {
                        $target.remove();
                    },
                    parseToMs( $target.css( 'transition-duration' ) )
                );
            }
        );

        /* Display the Overlay */
        setTimeout(
            () => {
                $target.addClass( 'in' ).removeClass( 'out' );

                /* Add visual effect to background sibling elements */
                $siblings.addClass( settings.backgroundEffect );
            },
            parseToMs( settings.delay )
        );

        return this;
    }

    remove ( ) {
        this.shown = false;

        /* Remove overlay element */
        return this.$element.remove();
    }
}
