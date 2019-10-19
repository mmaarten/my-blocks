import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/heading', {
	title: __( 'Heading', 'my-blocks' ),
  description: __( 'Displays a heading.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
	supports: {
		align: ['wide', 'full'],
	},
  attributes: {
		content: {
			type: 'string',
		},
		level: {
			type: 'number',
      default: 2,
		},
    textAlign: {
      type: 'string',
    },
    textColor : {
      type : 'string',
    },
    customTextColor : {
      type : 'string',
    },
    fontSize : {
      type: 'string',
    },
    customFontSize : {
      type: 'number',
    },
  },
	edit,
	save,
});
