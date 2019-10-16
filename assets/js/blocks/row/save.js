import {
  InnerBlocks,
  getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { container } = attributes;

  const containerClasses = classnames( {
    'container': 'fluid' !== container,
    'container-fluid': 'fluid' === container,
  } );

  return (
    <div className={ className }>
      <div className={ containerClasses }>
        <div className="row">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};
