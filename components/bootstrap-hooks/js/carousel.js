'use strict';

import { win as windw } from 'rei-browser-shim';
import parseToMs from 'packages/component-utils/js/parseToMs';

class Carousel {
    constructor ( element, win = windw ) {
        const $ = $ || win.jQuery || require( 'jquery2' );
        if ( element && $.fn.carousel ) {
            let $element = this.$element = $( element );
            let settings = this.settings = {};
            this.$slides = $element.children( );

            settings.interval = parseToMs( $element.data( 'interval' ) ) || 6000;

            /* Option-setting via data attributes is provided by bootstrap by default, just init */
            return this.setup( );
        }
    }

    setup ( ) {
        let $element    = this.$element;
        let $slides     = this.$slides;
        let $carousel = $( '<div />',
                             {
                                class : 'carousel carousel-fade js-carousel slide',
                                'data-ride' : 'carousel'
                             }
                        );
        let $inner = $( '<div />',
                            { class : "carousel-inner",
                               role : "listbox"
                            }
                            );
        let $indicators = $( '<form />',
                             { class : "carousel-indicators" }
                           );
        let $prevNav = $( '<button />',
                            {
                                class : 'carousel-control left',
                                'data-slide' : 'prev',
                                'tabindex' : -1
                            }
                        ).append(
                            $( '<span />', {
                                class: 'icon icon-rei-left-arrow position center',
                                'aria-hidden' : 'true'
                            } )
                        ).append(
                            $( '<span />', {
                                class: 'sr-only',
                                text: 'Previous'
                            } )
                        );
        let $nextNav = $( '<button />',
                            {
                                class : 'carousel-control right',
                                'data-slide' : 'next',
                                'tabindex' : -1
                            }
                        ).append(
                            $( '<span />', {
                                class: 'icon icon-rei-right-arrow position center',
                                'aria-hidden' : 'true'
                            } )
                        ).append(
                            $( '<span />', {
                                class: 'sr-only',
                                text: 'Next'
                            } )
                        );
            // `<button class = "left carousel-control" data-slide = "prev" tabindex = "-1">\n
            //    <span class = "icon icon-rei-left-arrow position center" aria-hidden  = "true"></span>\n
            //    <span class = "sr-only">Previous</span>\n
            //  </button>\n
            //  <button class = "right carousel-control" data-slide = "next" tabindex = "-1">\n
            //    <span class = "icon icon-rei-right-arrow position center" aria-hidden = "true"></span>\n
            //    <span class = "sr-only">Next</span>
            //  </button>`

        $slides.each(
            index => {
                // let $slide = $( `<div class = "item${ index === 0 ? ' active' : '' }" data-slide-to = "${ index }"></div>` );
                $inner.append(
                    $( '<div />',
                        {
                           class : `item${ index === 0 ? ' active' : '' },
                           'data-slide-to' : ${ index }`
                        }
                    ).append(
                        $( this ).clone( )
                    )
                )
                /* Set up slides */
                // $inner.append( $slide.append( $( this ).clone() ).clone() );

                /* Construct indicators list */
                $indicators.append(
                    $( '<fieldset />', {
                       class : index === 0 ? 'active' : ''
                   } ).append (
                       $( '<label />',
                           {
                               class: 'sr-only',
                               for: `slide-${ index }`,
                               text: `Navigate to slide: ${ index }`
                           }
                        )
                   ).append(
                       $( '<input />',
                          {
                            type: 'radio',
                            'data-target': '',
                            selected: index === 0 ? 'selected' : false
                          }
                      )
                   )
                );
            }
        );

        $carousel.append( $inner.clone() ).append( $indicators.clone() ).append( $prevNav.clone() ).append( $nextNav.clone() );

        return $element.replaceWith( $carousel.carousel( ) );
    }
}

Carousel.prototype.name = 'Carousel';

export default Carousel;
