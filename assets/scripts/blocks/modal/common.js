import classnames from 'classnames';

export const getDialogClasses = ( attributes ) => {
  const { verticallyCentered, size } = attributes;

  return classnames({
    'modal-dialog': true,
    'modal-dialog-centered' : verticallyCentered,
    [`modal-${ size }`] : size,
  });
};
