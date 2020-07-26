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
    'wp-block-my-row__inner' : true,
  } );

  return (
    <div className={ className }>
      <div className={ containerClasses }>
        <div className={ rowClasses }>
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};
