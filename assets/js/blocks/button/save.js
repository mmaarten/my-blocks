import classnames from 'classnames';

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
  } = attributes;

  const blockClasses = classnames( {
    [className] : className,
    [`text-${align}`]: align,
  } );

  const buttonClasses = classnames( {
    'btn' : true,
    [`btn-${type}`]: type && ! outline,
    [`btn-outline-${type}`]: type && outline,
    [`btn-${size}`]: size,
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
