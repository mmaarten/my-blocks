import {
  InnerBlocks,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { noGutters } = attributes;

  const rowClasses = classnames( {
    'row': true,
    'no-gutters': noGutters,
  } );

  return (
    <div className={ className }>
      <div className={ rowClasses }>
        <InnerBlocks.Content />
      </div>
    </div>
  );
};
