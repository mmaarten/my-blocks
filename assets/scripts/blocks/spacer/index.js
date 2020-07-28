import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/spacer', {
	title: __( 'Spacer', 'my-blocks' ),
  description: __( 'Displays a spacer.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
  supports: {
		align: ['wide', 'full'],
    anchor: true,
	},
  attributes: {
    size : {
      type: 'object',
      default: { xs: 3 },
    },
  },
	edit,
	save,
});
