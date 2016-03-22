'use strict';

var focusableElements = [
    'a',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable]'
].join( ',' );

module.exports = {
    focusableElements : focusableElements
};
