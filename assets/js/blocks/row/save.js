import {
  InnerBlocks,
  getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( { ...props } ) => {
  const { attributes } = props;
  const { container, backgroundColor, customBackgroundColor } = attributes;

  const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	const classes = classnames( {
		'has-background': backgroundColor || customBackgroundColor,
    [ backgroundClass ] : backgroundClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
	};

  const containerClasses = classnames( {
    'container': 'fluid' !== container,
    'container-fluid': 'fluid' === container,
  } );

  return (
    <div className={ classes } style={ styles }>
      <div className={ containerClasses }>
        <div className="row">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};
