import {
  InnerBlocks,
  getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { get } from 'lodash';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { container, noGutters, textColor, backgroundColor, customTextColor, customBackgroundColor } = attributes;

  const textColorClass = getColorClassName( 'text-color', textColor );
	const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );

  const rowClasses = classnames( {
    'row': true,
    'no-gutters': noGutters,
    [textColorClass] : textColorClass,
    [backgroundColorClass] : backgroundColorClass,
    'has-background': customBackgroundColor || get( backgroundColor, 'value' ),
  } );

  const styles = {
    backgroundColor: customBackgroundColor,
    color: customTextColor,
  };

  const containerClasses = classnames( {
    'container': 'fixed' === container,
    'container-fluid': 'fluid' === container,
  } );

  return (
    <div className={ className } style={ styles }>
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
