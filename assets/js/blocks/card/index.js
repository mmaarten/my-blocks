import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/card', {
	title: __( 'Card', 'my-blocks' ),
  description: __( 'Displays a card.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
	supports: {
		align: ['wide', 'full'],
	},
  attributes: {},
	edit,
	save,
});
