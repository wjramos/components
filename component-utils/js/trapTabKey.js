'use strict';

var focusableElements = require( './strings' ).focusableElements;

/**
 * Keeps focus inside a jQ element. On tab keypress it will move
 * focus form the last elem to the first. On shift-tab keypress it
 * will move focus from first elem to last.
 *
 * @param  {Object} elem element to keep focus in
 * @param  {Object} evt  event object
 */
module.exports = function ( elem, evt ) {
    var win = window || require( 'rei-browser-shim' ).win;
    var $ = $ || win.jQuery || require( 'jquery2' );
    var $elem = elem instanceof $ ? elem : $( elem );

    // if tab or shift-tab pressed
    if ( evt.which === 9 ) {

        // get list of all children elements in given object
        var o = $elem.find( '*' );

        // get list of focusable items
        var focusableItems = o.filter( focusableElements ).filter( ':visible' );

        // get currently focused item
        var focusedItem = $( ':focus' );

        // get the number of focusable items
        var numberOfFocusableItems = focusableItems.length;

        // get the index of the currently focused item
        var focusedItemIndex = focusableItems.index( focusedItem );

        if ( evt.shiftKey ) {
            // back tab
            // if focused on first item and user preses back-tab, go to the last focusable item
            if ( focusedItemIndex === 0 ) {
                focusableItems.get( numberOfFocusableItems - 1 ).focus();
                evt.preventDefault();
            }

        } else {
            // forward tab
            // if focused on the last item and user preses tab, go to the first focusable item
            if ( focusedItemIndex === numberOfFocusableItems - 1 ) {
                focusableItems.get( 0 ).focus();
                evt.preventDefault();
            }
        }
    }
};
