import {
  InnerBlocks,
  getColorClassName,
} from '@wordpress/block-editor';
import {
  getColumnClasses,
} from './common';
import
  classnames
  from 'classnames';

export default ( { ...props } ) => {
  const { attributes } = props;
  const {
    textColor,
    backgroundColor,
    customTextColor,
    customBackgroundColor,
  } = attributes;

  const textColorClass = getColorClassName( 'text-color', textColor );
  const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );

  const classes = classnames( getColumnClasses( attributes ), {
    [textColorClass] : textColorClass,
    [backgroundColorClass] : backgroundColorClass,
  } );

  const styles = {
    backgroundColor: customBackgroundColor,
    color: customTextColor,
  };

  return (
    <div className={ classes } style={ styles }>
      <InnerBlocks.Content />
    </div>
  );
};
