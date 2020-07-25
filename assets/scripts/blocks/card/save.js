import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { image } = attributes;

  return (
    <div className={ className }>
      <div className="card">
        { image && (
          <img
           className="card-img-top"
           src={ image.url }
           alt={ image.alt }
           title={ image.title }
          />
        ) }
        <div className="card-body">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};
