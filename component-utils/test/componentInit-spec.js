'use strict';

import shim from 'components/test-shim';
const expect = shim.expect;

const componentInit = shim.init( 'packages/component-utils/js/componentInit', {} ).default;

class DocStub {
    querySelectorAll( ) {
        return [ {}, {} ];
    }
}

class WinStub {
    constructor ( ) {
        this.document = new DocStub( );
    }
}

class ComponentStub {
    constructor( arg ) {
        this.arg = arg;
    }
}

let initiatedComponents;

/* Test */
describe( 'componentInit( Component, selector )', ( ) => {

    beforeEach( ( ) => {
        initiatedComponents = componentInit( ComponentStub, '.stub', new WinStub( ) );
    } );

    it( 'should initiate a constructor object for each element matching selector', ( ) => {
        initiatedComponents.forEach(
            component => {
                expect( component ).to.be.an.instanceof( ComponentStub );
            }
        );
    } );
} );
