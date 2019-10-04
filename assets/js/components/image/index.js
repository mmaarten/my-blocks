import { withSelect } from '@wordpress/data';

const Image = ( { ...props } ) => {
  const { id, size, attachment, ...otherProps } = props;

  if ( ! attachment || 'image' !== attachment.media_type ) {
    return null;
  }

  const sizes = attachment.media_details.sizes;
  let _size = sizes.full;

  if ( size && sizes[ size ] ) {
    _size = sizes[ size ];
  } else if ( sizes.thumbnail ) {
    _size = sizes.thumbnail;
  }

  return (
    <img
      src={ _size.source_url }
      width={ _size.width }
      height={ _size.height }
      alt={ attachment.alt }
      { ...otherProps }
    />
  );
};

export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
	const { id } = ownProps;

	return {
		attachment: id ? getMedia( id ) : null,
	};
} )( Image );
