import classnames from 'classnames';

import {
	getColorClassName,
  getFontSizeClass,
	RichText,
} from '@wordpress/block-editor';

const HeadingSave = ( props ) => {
  const { attributes, className } = props;
  const {
		level,
		content,
    textColor,
		customTextColor,
    fontSize,
    customFontSize,
    textAlign,
	} = attributes;

	const tagName = `h${ level }`;

	const textColorClass = getColorClassName( 'color', textColor );
  const fontSizeClass = getFontSizeClass( fontSize );

	const headingClasses = classnames( {
		[ textColorClass ]: textColorClass,
    [ fontSizeClass ]: fontSizeClass,
		[ `has-text-align-${ textAlign }` ]: textAlign,
	} );

  const headingStyles = {
    color: textColorClass ? undefined : customTextColor,
    fontSize: fontSizeClass ? undefined : customFontSize,
  };

	return (
    <div className={ className }>
  		<RichText.Content
        tagName={ tagName }
  			className={ headingClasses }
  			style={ headingStyles }
  			value={ content }
  		/>
    </div>
	);
};

export default HeadingSave;
