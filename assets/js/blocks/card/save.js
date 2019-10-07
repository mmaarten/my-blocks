import {
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  Image,
} from './../../components';

const CardSave = ( { ...props } ) => {
  const { attributes, className } = props;
  const {
    image,
    imageSize,
  } = attributes;

  console.log( props );

  return (
    <div className={ className }>
      <div className="card">
        { image && (
          <img
            className="card-img-top"
            src={ image.url }
            width={ image.width }
            height={ image.height }
            alt={ image.alt }
          />
        ) }
        <div className="card-body">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};

export default CardSave;
