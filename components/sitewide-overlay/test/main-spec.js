'use strict';

import shim from 'components/test-shim';
import { stub } from 'sinon';

import JqueryProxy from 'packages/component-utils/test/JqueryProxy.js';
import WinProxy from 'packages/component-utils/test/WinProxy.js';

import STRING from 'components/sitewide-overlay/js/strings';

const DATA = STRING.DATA;
const expect = shim.expect;


let jqConfig = {
    data: {
        overlayCookieExpire: 2,
        overlayCookieName: 'seenOverlay',
        overlayDelay: '2s',
        overlayWrapper: '#sitewide-overlay',
        overlayBackgroundEffect: 'blur',
        overlayBlockedReferrer : 'google.com'
    }
}

/* Module Under Test */
const Overlay = shim.init( 'components/sitewide-overlay/js/main', {
    'packages/component-utils/js' : {
        'packages/component-utils/js/mediaSourceSwap': stub( ),
        'jquery2' : stub( )
    }
} ).default;

/* Window environments */
let winBase = new WinProxy( {} );

let winCookied = new WinProxy( {
    document: {
        cookie: 'seenOverlay=true;',
    }
} );

let winCrawler = new WinProxy( {
    navigator: {
        userAgent: 'crawler'
    }
} );

let winBlockedReferrer = new WinProxy( {
    document: {
        referrer: 'https://www.google.com/'
    }
} );

let overlayBase = new Overlay( jqConfig, winBase );
let overlayCookied = new Overlay( jqConfig, winCookied );
let overlayCrawler = new Overlay( jqConfig, winCrawler );
let overlayBlockedReferrer = new Overlay( jqConfig, winBlockedReferrer )

/* Tests */
describe( 'SitewideOverlay', ( ) => {

    it( 'should be assigned an element', ( ) => {
        expect( overlayBase.$element ).to.be.an( 'object' ).and.to.be.an.instanceof( JqueryProxy );
    } );

    it( 'should assigned settings based on element attributes', ( ) => {
        for ( let setting in overlayBase.settings ) {
            let attributeValue = overlayBase.$element.attr( `data-overlay-delay` );
            if ( attributeValue ) {
                expect( overlayBase.settings[ setting ] ).to.eq( attributeValue );
            }
        }
    } );

    it( 'should show for most browser configurations', ( ) => {
        expect( overlayBase.shown ).to.be.true;
    } );

    it( 'should set a cookie when shown', ( ) => {
        expect( winBase.document.cookie ).to.not.be.empty;
    } );

    it( 'should not show for user with cookie set', ( ) => {
        expect( overlayCookied.shown ).to.be.false;
    } );

    it( 'should not show for common search crawlers', ( ) => {
        expect( overlayCrawler.shown ).to.be.false;
    } );

    it( 'should not show for blocked referrer', ( ) => {
        expect( overlayBlockedReferrer.shown ).to.be.false;
    } );
} );