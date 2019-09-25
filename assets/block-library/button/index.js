import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/button', {
	title: __( 'Button', 'my-blocks' ),
  description: __( 'Displays a button.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
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
    align: {
      type: 'string',
      default: 'left',
    },
  },
	edit,
	save,
});
