'use strict';

import _kebabCase from 'lodash/kebabCase';
import _find from 'lodash/find';

export default class ElementProxy {
    constructor( attributes ) {
        this.style = { visibility: '' };
        this.innerHTML = '';
        this.attributes = [] || null;
        this.classList = [];
        this.classList.add = {
            apply ( classList, classes ) {
                this.classList = classList.concat( classes );
            }
        };

        for ( let attribute in attributes ) {
          this.attributes.push( {
              'name': _kebabCase( attribute ),
              'value': attributes[ attribute ]
          } );
        }
    }

    querySelector( ) {
        return new ElementProxy();
    }

    getAttribute( attribute ) {
        attribute = _find( this.attributes, { 'name': _kebabCase( attribute ) } );
        return attribute && attribute.value ? attribute.value : '';
    }

    hasAttribute( attribute ) {
        attribute = _find( this.attributes, { 'name': _kebabCase( attribute ) } );
        return attribute && attribute.value;
    }

    setAttribute( attribute, value ) {
        this.attributes = [
            {
                name: _kebabCase( attribute ),
                value: value
            }
        ];

        return this;
    }
}
