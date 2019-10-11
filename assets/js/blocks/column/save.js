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
  const { attributes, className } = props;
  const { width } = attributes;

  const classes = classnames( className, getColumnClasses( attributes ) );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
