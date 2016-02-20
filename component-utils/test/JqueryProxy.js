'use strict';

import _camelCase from 'lodash/camelCase';

export default class JqueryProxy{
    constructor ( config ) {
        if ( Array.isArray( config ) ) {
            config.forEach( elem => new JqueryProxy( elem ) );
        } else {
            this.dataConfig = config.data || {};
            this.attrConfig = config.attr || {};
            this.siblingsConfig = config.siblings || [];
            this.events = {};
            this.classList = config.classList || [];
        }
    }

    siblings ( ) {
        let siblings = [];
        this.siblingsConfig.forEach(
            sibling => siblings.push( sibling )
        );

        return new JqueryProxy( siblings );
    }

    children ( ) {
        let children = [];
        this.siblingsConfig.forEach(
            child => children.push( child )
        );

        return new JqueryProxy( children );
    }

    data ( dataName ) {
        return this.dataConfig[ _camelCase( dataName ) ];
    }

    detach ( ) {
        return this;
    }

    appendTo ( ) {
        return this;
    }

    html ( ) {
        return this;
    }

    replaceWith ( ) {
        return this;
    }

    attr ( attrName ) {
        return this.attrConfig[ attrName ];
    }

    css ( property ) {
        return this;
    }

    on ( action, callback ) {
        this.events[ action ] = () => callback;
        return this;
    }

    trigger ( action ) {
        this.events[ action ]( );
        return this;
    }

    addClass ( clss ) {
        this.classList = this.classList || [];
        this.classList.push( clss );
        return this;
    }

    removeClass ( clss ) {
        if ( this.classList.length ) {
            this.classList.splice( this.classList.indexOf( clss ) );
        }
        return this;
    }

    show ( ) {
        return this;
    }

    hide ( ) {
        return this;
    }

    remove ( ) {
        return;
    }
}
