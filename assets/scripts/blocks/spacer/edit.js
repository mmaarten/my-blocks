import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
  PanelBody,
  RangeControl,
} from '@wordpress/components';
import {
  InspectorControls,
} from '@wordpress/block-editor';
import { get, assign } from 'lodash';
import { getSpacerClasses } from './common';
import { BreakpointNavigation } from './../../components';
import classnames from 'classnames';

class SpacerEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
    } = this.props;

    const { size } = attributes;

    const classes = classnames( className, getSpacerClasses( attributes ) );

    return (
      <div className={ classes }>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
          <BreakpointNavigation
            onChange={ ( breakpoint ) => (
              <>
                <RangeControl
                  label={ __( 'Size' ) }
                  value={ get( size, breakpoint, '' ) }
                  onChange={ ( value ) => {
                    setAttributes( {
                      size: assign( {}, size, { [ breakpoint ]: value } )
                    } );
                  } }
                  min={ 1 }
                  max={ 5 }
                  allowReset
                />
              </>
            ) }
          />
          </PanelBody>
        </InspectorControls>
      </div>
    );
  }
}

export default SpacerEdit;
