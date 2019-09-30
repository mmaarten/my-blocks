import classnames from 'classnames';
import { getFontWeightClass } from './../../components';

const ButtonSave = ( { ...props } ) => {
  const { attributes, className } = props;
  const {
    text,
    link,
    linkTab,
    type,
    size,
    outline,
    toggle,
    rel,
    align,
    fontWeight,
  } = attributes;

  const blockClasses = classnames( {
    [className] : className,
    [`text-${align}`]: align,
  } );

  const fontWeightClass = getFontWeightClass( fontWeight );

  const buttonClasses = classnames( {
    'btn' : true,
    [`btn-${type}`]: type && ! outline,
    [`btn-outline-${type}`]: type && outline,
    [`btn-${size}`]: size,
    [ fontWeightClass ] : fontWeightClass,
  } );

  return (
    <div className={ blockClasses }>
      <a
        className={ buttonClasses }
        href={ link ? link : undefined }
        target={ linkTab ? '_blank' : undefined }
        rel={ rel ? rel : undefined }
        data-toggle={ toggle ? toggle : undefined }
        role="btn"
      >{ text }</a>
    </div>
  );
};

export default ButtonSave;
