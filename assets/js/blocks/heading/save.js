import {
	getColorClassName,
	getFontSizeClass,
	RichText,
} from '@wordpress/block-editor';
import
  classnames
  from
'classnames';

const HeadingSave = ( { ...props } ) => {
  const { attributes, className } = props;
  const {
    content,
    level,
    textAlign,
    textColor,
    customTextColor,
    fontSize,
    customFontSize,
  } = attributes;

  const tagName = `h${level}`;
  const textColorClass = getColorClassName( 'color', textColor );
	const fontSizeClass = getFontSizeClass( fontSize );

  return (
    <div className={ className }>
      <RichText.Content
        tagName={ tagName }
        className={ classnames( {
      		'has-text-color': textColor || customTextColor,
      		[ `has-text-align-${ textAlign }` ]: textAlign,
      		[ fontSizeClass ]: fontSizeClass,
      		[ textColorClass ]: textColorClass,
        } ) }
        style={ {
      		color: textColorClass ? undefined : customTextColor,
      		fontSize: fontSizeClass ? undefined : customFontSize,
        } }
        value={ content }
      />
    </div>
  );
};

export default HeadingSave;
