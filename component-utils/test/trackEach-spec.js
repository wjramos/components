'use strict';

import shim from 'components/test-shim/js/main';
import { stub, spy } from 'sinon';
import elementProxy from './elementProxy.js';
const expect = shim.expect;

/* Testing functions */

/* Produce a stubbed nodelist of X length */
function elemsStub( items ) {
    let components = [];

    // Builds sample widget nodeList
    for ( var i = 0; i < items; i++ ) {

        components[ i ] = new elementProxy();

        // Only set data attribute on even
        if ( items % 2 === 0 ) {
            components[ i ].setAttribute( 'data-analytics-id', 'widget-_-sample_' + i );
        }
    }

    return components;
}

// Test consistency between arguments passed and attributes available
function correctArgs( components, spy ){
    for ( let i = 0; i < components.length; i++ ) {
        if ( spy.args[ i ][ 1 ] !== components[i].getAttribute( 'data-analytics-id' ) ) {
            return false;
        }
    }

    return true;
}

let nodeListStub;
let trackLinksSpy;
let analytics;

// Analyze results */
describe( 'Widget analytics', ( ) => {

    beforeEach( ( ) => {

        trackLinksSpy = spy();

        /* Stubs */
        analytics = shim.init(
            'packages/component-utils/js/trackEach', {
                'packages/track-links' : trackLinksSpy,
                'rei-browser-shim' : {
                    win: {
                        document : {
                            querySelectorAll : stub()
                        }
                    }
                }
            }
        ).default;

        shim.getStub( 'document' ).querySelectorAll.returns( elemsStub( 10 ) );

        nodeListStub = shim.win.document.querySelectorAll( '.stubbed' );

        /* Run script to test */
        analytics( '.stubbed', 'data-analytics-id' );
    } );

    afterEach( ( ) => {
            shim.restore( );
    } );

    it( 'should call trackLinks for every component', ( ) => {
        expect( trackLinksSpy.callCount ).to.equal( nodeListStub.length );
    } );

    it( 'should pass prefix argument only if the component instance has data attribute set', ( ) => {
        expect( correctArgs( nodeListStub, trackLinksSpy ) ).to.be.true;
    } );

} );
