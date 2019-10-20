import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/post', {
	title: __( 'Post', 'my-blocks' ),
  description: __( 'Displays a post.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
	supports: {
		align: ['wide', 'full'],
	},
  attributes: {
    // post : {
    //   type: 'object',
    // },
    posts : {
      type: 'array',
    },
    template : {
      type: 'string',
    },
  },
	edit,
	save,
});
