import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import { get, find } from 'lodash';
import { getFontWeightClass } from './utils';

const withFontWeights = createHigherOrderComponent( ( WrapperComponent ) => {
  return class extends Component {

    constructor( props ) {
      super( props );

      this.fontWeights = [
        {
          name : __( 'Lighter' ),
          slug : 'lighter',
        },
        {
          name : __( 'Light' ),
          slug : 'light',
        },
        {
          name : __( 'Normal' ),
          slug : 'normal',
        },
        {
          name : __( 'Bold' ),
          slug : 'bold',
        },
        {
          name : __( 'Bolder' ),
          slug : 'bolder',
        },
      ];

      this.setFontWeight = this.setFontWeight.bind( this );
    }

    getFontWeightObject() {

      const { fontWeight } = this.props.attributes;

      const empty = {
        name: undefined,
        slug: undefined,
        class: undefined,
      };

      if ( ! fontWeight ) {
    		return empty;
    	}

      const fontWeightObject = find( this.fontWeights, { slug : fontWeight } );

      if ( fontWeightObject ) {
        return { ...fontWeightObject, ...{
          class : getFontWeightClass( fontWeightObject.slug ),
        } };
      }

      return empty;
    }

    setFontWeight( fontWeight ) {
      const fontWeightObject = find( this.fontWeights, { slug : fontWeight } );
      this.props.setAttributes( {
        fontWeight : get( fontWeightObject, 'slug' ),
      });
    }

    render() {
      return (
        <WrapperComponent
          { ...this.props }
          fontWeights={ this.fontWeights }
          fontWeight={ this.getFontWeightObject() }
          setFontWeight={ this.setFontWeight }
        />
      );
    }
  }
}, 'withFontWeights' );

export default withFontWeights;
