import {
  InnerBlocks,
} from '@wordpress/block-editor';

const CardSave = ( { ...props } ) => {
  const { attributes, className } = props;

  return (
    <div className={ className }>
      <div className="card">
        <img src="https://via.placeholder.com/800x600" className="card-img-top" />
        <div className="card-body">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};

export default CardSave;
