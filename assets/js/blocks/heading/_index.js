import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/heading', {
	title: __( 'Heading', 'elixir' ),
  description: __( 'Displays a heading.', 'elixir' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'elixir' ) ],
	supports: {
		align: ['wide', 'full'],
    anchor: true,
	},
  attributes: {
		content: {
			type: 'string',
			default: '',
		},
    level: {
			type: 'number',
			default: 2,
		},
    textColor: {
			type: 'string',
			default: '',
		},
    customTextColor: {
      type: 'string',
			default: '',
    },
    textAlign: {
      type: 'string',
			default: '',
    },
    fontSize: {
			type: 'string',
			default: '',
		},
  },
	edit,
	save,
});
