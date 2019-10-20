import {
  InnerBlocks,
} from '@wordpress/block-editor';

const PostSave = ( { ...props } ) => {
  const { attributes, className } = props;

  return (
    <div className={ className }>
      Save
    </div>
  );
};

export default PostSave;
