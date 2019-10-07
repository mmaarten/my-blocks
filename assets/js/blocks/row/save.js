import {
  InnerBlocks,
} from '@wordpress/block-editor';

export default ( { ...props } ) => {
  const { attributes, className } = props;

  return (
    <div className={ className }>
      <InnerBlocks.Content />
    </div>
  );
};
