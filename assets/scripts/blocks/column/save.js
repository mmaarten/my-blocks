import {
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  getColumnClasses,
} from './common';
import
  classnames
  from 'classnames';

export default ( { ...props } ) => {
  const { attributes } = props;
  const classes = classnames( getColumnClasses( attributes ) );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
