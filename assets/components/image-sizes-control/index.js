import {
  __,
} from '@wordpress/i18n';
import {
	SelectControl,
} from '@wordpress/components';
import {
  withSelect,
} from '@wordpress/data';
import {
  compose,
} from '@wordpress/compose';
import {
  map,
} from 'lodash';

const ImageSizesControl = ( { imageSizes, ...props } ) => {

  const options = map( imageSizes, ( { name, slug } ) => ( { value: slug, label: name } ) );

  return (
    <SelectControl
      label={ __( 'Image Size:', 'my-blocks' ) }
      options={ options }
      { ...props }
    />
  );
};

export default compose( [
  withSelect( ( select, props ) => {
    const { getSettings } = select( 'core/block-editor' );
    const { imageSizes } = getSettings();

    return {
      imageSizes : imageSizes,
    };
  } ),
] )( ImageSizesControl );
