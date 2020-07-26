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
  const { horizontalAlignment, verticalAlignment } = attributes;

  const classes = classnames( getColumnClasses( attributes ), {
    'd-flex' : horizontalAlignment || verticalAlignment,
  } );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
