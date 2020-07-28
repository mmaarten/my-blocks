import {
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  getSpacerClasses,
} from './common';
import
  classnames
  from 'classnames';

export default ( { ...props } ) => {
  const { attributes } = props;
  const classes = classnames( getSpacerClasses( attributes ) );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
