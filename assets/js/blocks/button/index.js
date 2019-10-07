import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/button', {
	title: __( 'Button', 'elixir' ),
  description: __( 'Displays a button.', 'elixir' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'elixir' ) ],
	supports: {
		align: ['wide', 'full'],
	},
  attributes: {
		text: {
			type: 'string',
			default: '',
		},
		link: {
			type: 'string',
      default: '',
		},
		linkTab: {
			type: 'boolean',
      default: false,
		},
		type: {
			type: 'string',
			default: 'primary',
		},
		size: {
			type: 'string',
			default: '',
		},
		outline: {
			type: 'boolean',
			default: false,
		},
		toggle: {
			type: 'string',
			default: '',
		},
    rel: {
			type: 'string',
			default: '',
		},
    textAlign: {
      type: 'string',
      default: '',
    },
  },
	edit,
	save,
});
