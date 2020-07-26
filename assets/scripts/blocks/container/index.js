import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/container', {
	title: __( 'Container', 'my-blocks' ),
  description: __( 'Displays a container.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
	supports: {
		align: ['wide', 'full'],
    anchor: true,
	},
  attributes: {
    align: {
      type: 'string',
      default: 'full',
    },
    type : {
      type: 'string',
      default: 'fixed',
    },
  },
	edit,
	save,
});
