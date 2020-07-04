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
  const { verticalAlignment } = attributes;

  const classes = classnames( getColumnClasses( attributes ), {
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