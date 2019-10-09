import {
  InnerBlocks,
} from '@wordpress/block-editor';

export default ( { ...props } ) => {
  const { attributes, className } = props;

  return (
    <div className={ className }>
      <div className="container-fluid">
        <div className="row">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};
