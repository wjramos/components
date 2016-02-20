'use strict';

import shim from 'components/test-shim';
import assert from 'assert';

const hasReferrer = shim.init( 'packages/component-utils/js/hasReferrer', {} ).default;

class DocStub {
    constructor( ref ) {
        this.referrer = ref || '';
    }
}

class WinStub {
    constructor ( ref ) {
        this.document = new DocStub( ref );
    }
}

let winReferrer = new WinStub( 'https://www.google.com/' );
let winNoReferrer = new WinStub( );

/* Test */
describe( 'hasReferrer( String )', ( ) => {
    it( 'should return true if referrer found', ( ) => {
        assert( hasReferrer( 'google.com', winReferrer ) );
    } );

    it( 'should return false if referrer not found', ( ) => {
        assert( !hasReferrer( 'google.com', winNoReferrer ) );
        assert( !hasReferrer( 'yahoo.com', winReferrer ) );
        assert( !hasReferrer( 'le.com', winReferrer ) );
    } );

    it( 'should return false if unexpected input', ( ) => {
        assert( !hasReferrer( 123, winReferrer ) );
        assert( !hasReferrer( [], winReferrer ) );
        assert( !hasReferrer( null, winReferrer ) );
        assert( !hasReferrer( 0, winReferrer ) );
        assert( !hasReferrer( true, winReferrer ) );
        assert( !hasReferrer( false, winReferrer ) );
    } );
} );
