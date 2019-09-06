
(function( $ ){
  "use strict";

  function init() {

    $('.wp-block-acf-owl-carousel .owl-carousel').each( function(){
        updateOwlCarousel( this );
    });

  }

  function adminInit() {

    if ( typeof acf !== 'undefined' ) {

      acf.addAction( 'render_block_preview', function( $elem, block ) {

        switch ( block.name ) {
          case 'acf/owl-carousel' :
            updateOwlCarousel( $elem.find( '.owl-carousel' ) );
            break;
        }
      });

    }
  }

  function updateOwlCarousel( elem ) {
    // TODO : check if already instantiated.
    $( elem ).owlCarousel( $( elem ).data( 'options' ) );
  }

  document.addEventListener( 'DOMContentLoaded', function(){

      var isAdmin = $( 'body' ).is( '.wp-admin' );

      if ( isAdmin ) adminInit(); else init();

  });

})( jQuery );
