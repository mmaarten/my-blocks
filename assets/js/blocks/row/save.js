import {
  InnerBlocks,
  getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { container, backgroundColor, customBackgroundColor } = attributes;

  const backgroundClass = getColorClassName( 'background-color', backgroundColor );
  const classes = classnames( className, backgroundClass, {
  'has-background': backgroundColor || customBackgroundColor,
  } );

  const containerClasses = classnames( {
    'container': 'fluid' !== container,
    'container-fluid': 'fluid' === container,
  } );

  return (
    <div className={ classes }>
      <div className={ containerClasses }>
        <div className="row">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};
