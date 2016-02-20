'use strict';

import shim from 'components/test-shim';
import assert from 'assert';
import crawlerAgents from './crawlerUserAgents';
import browserAgents from './browserUserAgents';


const isCrawler = shim.init( 'packages/component-utils/js/isCrawler', {} ).default;

class NavStub {
    constructor( ua ) {
        this.userAgent = ua || '';
    }
}

class WinStub {
    constructor ( ua ) {
        this.navigator = new NavStub( ua );
    }
}

/* Test */
describe( 'hasReferrer( String )', ( ) => {
    it( 'should return true if user agent matches common crawler patterns', ( ) => {
        crawlerAgents.forEach(
            crawler => assert( isCrawler( new WinStub( crawler ) ) )
        );
    } );
    it( 'should return false for everything else', ( ) => {
        browserAgents.forEach(
            browser => assert( !isCrawler( new WinStub( browser ) ) )
        );
    } );
} );
