import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/card', {
	title: __( 'Card', 'elixir' ),
  description: __( 'Displays a card.', 'elixir' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'elixir' ) ],
	supports: {
		align: ['wide', 'full'],
    anchor: true,
	},
  attributes: {
		image: {
			type: 'object',
		},
    imageSize : {
      type: 'string',
      default: 'large',
    },
    post : {
      type : 'object',
    }
  },
	edit,
	save,
});
