import {
  InnerBlocks,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { type } = attributes;

  const classes = classnames( {
    className : className,
    'container': 'fixed' === type,
    'container-fluid': 'fluid' === type,
  } );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
