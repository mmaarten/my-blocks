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
	},
  attributes: {
		content: {
			type: 'html',
			default: '',
		},
    level: {
      type: 'number',
      default: 2,
    },
    align: {
      type: 'string',
      default: 'left',
    },
    fontWeight : {
      type: 'object',
      default: null,
    }
  },
	edit,
	save,
});
