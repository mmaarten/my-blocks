import {
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  getColumnsClasses,
} from './common';
import
  classnames
  from 'classnames';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { width } = attributes;

  const classes = classnames( className, getColumnsClasses( attributes ) );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
