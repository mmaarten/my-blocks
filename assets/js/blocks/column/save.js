import {
  InnerBlocks,
} from '@wordpress/block-editor';
import
  classnames
  from 'classnames';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { width } = attributes;

  const classes = classnames( {
    [ className ] : className,
    [ `col-md-${ width }` ] : width,
    [ `col-md` ] : !! width ? false : true,
  } );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
