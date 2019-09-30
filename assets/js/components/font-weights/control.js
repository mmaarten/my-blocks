import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { map, get } from 'lodash';

const FontWeightsControl = ( { ...props } ) => {
  const { fontWeight, fontWeights, setFontWeight, ...otherProps } = props;
  const optionNone = { label: __( 'Default' ), value: null };

  let options = map( fontWeights, ( { name, slug } ) => ( { label : name, value : slug } ) );
  options = [ ...[ optionNone ], ...options ];

  return (
    <SelectControl
      label={ __( 'Font Weight', 'my-blocks' ) }
      { ...otherProps }
      value={ get( fontWeight, 'slug' ) }
      onChange={ setFontWeight }
      options={ options }
    />
  );
};

export default FontWeightsControl;
