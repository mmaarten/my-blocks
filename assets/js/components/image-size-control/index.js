import {
  BaseControl,
  SelectControl,
} from '@wordpress/components';
import {
  URLInput,
} from '@wordpress/block-editor';
import {
  compose,
  withInstanceId,
} from '@wordpress/compose';
import {
  withSelect
} from '@wordpress/data';
import {
  map
} from 'lodash';

const ImageSizeControl = ( {
  label,
  hideLabelFromVision,
  value,
  help,
  className,
  instanceId,
  imageSizes,
  ...props
} ) => {
	const id = `inspector-image-size-control-${ instanceId }`;
  const options = map( imageSizes, ( { name, slug } ) => ( { label: name, value: slug } ) );

	return (
		<BaseControl
      label={ label }
      hideLabelFromVision={ hideLabelFromVision }
      id={ id }
      help={ help }
      className={ className }
    >
      <SelectControl
        id={ id }
        value={ value }
        options={ options }
        { ...props }
      />
		</BaseControl>
	);
}

export default compose( [
  withInstanceId,
  withSelect( ( select, ownProps ) => {
  	const { getSettings } = select( 'core/block-editor' );
  	const { imageSizes } = getSettings();

  	return {
  		imageSizes,
  	};
  } )
] )( ImageSizeControl );
