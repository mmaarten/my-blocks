import {
  InnerBlocks,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { container, noGutters } = attributes;

  const rowClasses = classnames( {
    'row': true,
    'no-gutters': noGutters,
  } );

  const containerClasses = classnames( {
    'container': 'fixed' === container,
    'container-fluid': 'fluid' === container,
  } );

  return (
    <div className={ className }>
      { container && (
        <div className={ containerClasses }>
          <div className={ rowClasses }>
            <InnerBlocks.Content />
          </div>
        </div>
      ) }
      { ! container && (
        <div className={ rowClasses }>
          <InnerBlocks.Content />
        </div>
      ) }
    </div>
  );
};
