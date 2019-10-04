
const CardSave = ( { ...props } ) => {
  const { attributes, className } = props;
  const {
    image,
  } = attributes;

  return (
    <div className={ className }>
      Save
    </div>
  );
};

export default CardSave;
