# Component Utility Function Modules
## Why?
Each of the included utility function modules are generally applicable and reusable functions that are used in components, but can be utilized elsewhere. The intention of isolating these function modules is to avoid repeating code within components, produce more semantic names for common tasks, and slim down components to only the prototype functions that are strictly applicable to the component itself.

## What is included?
- `addClass( element[s], class[es] )` => Adds a class or classes ( as a String or Array ) to an element or list of elements ( HTMLElement or NodeList ).
- `bindChildren( element[s], child[ren]Selector[s], event, callbackFunction )` => Binds a callback function that triggers on an event to elements matching a selector that are descendents of an element.
- `camelToHyphen( string )` => Transforms a string to replace camelCasing to hyphen-lower.
- `componentInit( component, selector )` => Binds a new component instance to each element matching a given selector.
- `copyAttrib( attributeToCopy, newAttribute )` => Copies the value of a given attribute to a new attribute, or overwriting an existing one, with a specified name.
- `domReady( callbackFunction )` => Simplifies commonly used DOMReady event binding.
- `eachElem( element[s], callbackFunction )` => Iterates through an Array-like object ( where forEach is not available ) and passes the element to a callback function -- preserving the original state of the object.
- `getObjByKey( listOfObjects, propertyToFind, [ specificValue ] )` => Finds in a list of objects an object with a matching property or value of that property.
- `getSiblings( element )` => Gets a list of elements with all sibling elements ( children of an element's parent, excluding self ).
- `getTransition( element )` => Gets the computed transition time for an element in milliseconds.
- `hasClass( element, class )` => Returns true if a given class is present on an element.
- `hasCookie( cookieName )` => Returns true if a cookie with a given name is present on the current page.
- `hasReferrer( urlString )` => Returns true if client has a specified referrer.
- `isCrawler( )` => Returns true if client userAgent matches self-identifying search crawler userAgent patterns.
- `mediaSourceSwap( element )` => Swaps media sources based on media available and current breakpoint, preventing loading assets that are never shown
- `parseToMs( timeString )` => If a unit is present, this will return hours, minutes, or seconds in milliseconds.
- `removeClass( element[s], class[es] )` => Removes class or classes ( as a String or Array ) from an element or list of elements ( HTMLElement or NodeList ).
- `setCookie( name, value, expiresIn )` => Sets a client cookie with a name and value with set expiration in specified number of days ( -1 for persistant cookie ).
- `toArray( thingToTransform, [ flatten = true ] )` => Converts a string ( split at commas and spaces ), number, nodeList, HTMLElement, object, array into an optionally flattened array. Nested strings will also be split.