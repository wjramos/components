'use strict';

import shim from 'components/test-shim';
import { stub, spy } from 'sinon';

const expect = shim.expect;

function TestComponent () {}
TestComponent.prototype.getName = function ( ) {
    return 'test';
}

let componentInitSpy = spy( );

const componentHooks = shim.init(
    'packages/component-hooks/js/main',
    {
        'packages/component-utils/js/componentInit' : componentInitSpy,
        'components/sitewide-overlay/js/main': stub(),
        'components/locate-me/js/main': stub()
    }
).default;

/* Tests */
describe( 'Component Hooks', ( ) => {
    beforeEach( ( ) => {
        componentHooks( [ TestComponent ] );
    } );

    afterEach( ( ) => {
        componentInitSpy.reset();
    } );

    it( 'should call componentInit for every included component', () => {
        expect( componentInitSpy.callCount ).to.eq( 1 );
    } );

    it( 'should pass correctly formatted selector to componentInit', () => {
        componentInitSpy.args.forEach( args => {
            expect( args[ 1 ] ).to.eq( '.js-test' );
        } );
    } );
} );
