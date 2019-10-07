import { SelectControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { map } from 'lodash';

const ImageSizeControl = ( { imageSizes, ...otherProps} ) => {
  const options = map( imageSizes, ( { name, slug } ) => ( { label: name, value: slug } ) );

	return (
    <SelectControl
      options={ options }
      { ...otherProps }
    />
	);
}

export default withSelect( ( select, ownProps ) => {
	const { getSettings } = select( 'core/block-editor' );
	const { imageSizes } = getSettings();

	return {
		imageSizes,
	};
} )( ImageSizeControl );
