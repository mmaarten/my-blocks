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
  const { width, verticalAlignment } = attributes;

  const classes = classnames( className, getColumnClasses( attributes ), {
    'd-flex' : verticalAlignment,
    'align-items-start': 'top' === verticalAlignment,
    'align-items-center': 'center' === verticalAlignment,
    'align-items-end': 'bottom' === verticalAlignment,
  } );

  return (
    <div className={ classes }>
      <InnerBlocks.Content />
    </div>
  );
};
