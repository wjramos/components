'use strict';

import shim from 'components/test-shim';
const expect = shim.expect;

const parseToMs = shim.init( 'packages/component-utils/js/parseToMs', {} ).default;

/* Test */
describe( 'parseToMs( String )', ( ) => {

    it( 'should return number in ms for hour input ( String containing h/H )', ( ) => {
        expect( parseToMs( '10h' ) ).to.equal( 10 * 60 * 60 * 1000 );
        expect( parseToMs( '10H' ) ).to.equal( 10 * 60 * 60 * 1000 );
        expect( parseToMs( '10hrs' ) ).to.equal( 10 * 60 * 60 * 1000 );
        expect( parseToMs( '10 hrs' ) ).to.equal( 10 * 60 * 60 * 1000 );
        expect( parseToMs( '10 hours' ) ).to.equal( 10 * 60 * 60 * 1000 );
    } );

    it( 'should return number in ms for minute input ( String containing m/M )', ( ) => {
        expect( parseToMs( '10m' ) ).to.equal( 10 * 60 * 1000 );
        expect( parseToMs( '10M' ) ).to.equal( 10 * 60 * 1000 );
        expect( parseToMs( '10min' ) ).to.equal( 10 * 60 * 1000 );
        expect( parseToMs( '10 min' ) ).to.equal( 10 * 60 * 1000 );
        expect( parseToMs( '10 minutes' ) ).to.equal( 10 * 60 * 1000 );
    } );

    it( 'should return number in ms for second input ( String containing s/S )', ( ) => {
        expect( parseToMs( '10s' ) ).to.equal( 10 * 1000 );
        expect( parseToMs( '10S' ) ).to.equal( 10 * 1000 );
        expect( parseToMs( '10sec' ) ).to.equal( 10 * 1000 );
        expect( parseToMs( '10 sec' ) ).to.equal( 10 * 1000 );
        expect( parseToMs( '10 seconds' ) ).to.equal( 10 * 1000 );
    } );

    it( 'should return number in ms for number / unitless input', ( ) => {
        expect( parseToMs( '10' ) ).to.equal( 10 );
        expect( parseToMs( 10 ) ).to.equal( 10 );
    } );

    it( 'should return 0 for invalid input', ( ) => {
        expect( parseToMs( '' ) ).to.equal( 0 );
        expect( parseToMs( [ ] ) ).to.equal( 0 );
        expect( parseToMs( { } ) ).to.equal( 0 );
        expect( parseToMs( null ) ).to.equal( 0 );
        expect( parseToMs( true ) ).to.equal( 0 );
        expect( parseToMs( false ) ).to.equal( 0 );
        expect( parseToMs( undefined ) ).to.equal( 0 );

    } );
} );
