'use strict';

import _camelCase from 'lodash/camelCase';

export default class JqueryProxy {
    constructor ( config = {} ) {
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

    after ( ) {
        return this;
    }

    next ( ) {
        return this;
    }

    data ( property, val ) {
        if ( !val ) {
            return this.dataConfig[ _camelCase( property ) ];
        }
        this.data[ property ] = val;

        return this;
    }

    find ( ) {
        return new JqueryProxy( );
    }

    detach ( ) {
        return this;
    }

    focus ( ) {
        return this;
    }

    keyup ( ) {
        return this;
    }

    keydown ( ) {
        return this;
    }

    appendTo ( ) {
        return this;
    }

    html ( ) {
        return this;
    }

    has ( ) {
        return this;
    }

    replaceWith ( ) {
        return this;
    }

    attr ( attrName ) {
        return this.attrConfig[ attrName ];
    }

    css ( property, val ) {
        if ( !val ) {
            return this.dataConfig[ _camelCase( property ) ];
        }
        this.css[ property ] = val;

        return this;
    }

    on ( action, callback ) {
        this.events[ action ] = () => callback;

        return this;
    }

    click ( callback ) {
        return this.on( 'click', callback );
    }

    trigger ( action ) {
        if ( this.events[ action ] ) {
            this.events[ action ]( );
        }

        return this;
    }

    hasClass ( className ) {
        return this.classList.contains( className );
    }

    addClass ( className ) {
        this.classList = this.classList || [];
        this.classList.push( className );

        return this;
    }

    removeClass ( className ) {
        if ( this.classList.length ) {
            this.classList.splice( this.classList.indexOf( className ) );
        }

        return this;
    }

    toggleClass( className ) {
        let classes = className.split( ' ' );

        classes.forEach(
            clss => {
                if ( this.classList && this.classList.length && this.classList.indexOf( clss ) > -1 ) {
                    return this.removeClass( clss );
                }

                return this.addClass( clss );
            }
        );

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
