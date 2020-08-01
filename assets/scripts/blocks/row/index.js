import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/row', {
	title: __( 'Row', 'my-blocks' ),
  description: __( 'Displays a row.', 'my-blocks' ),
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
    container: {
      type: 'string',
      default: 'fixed',
    },
    noGutters : {
      type: 'boolean',
			default: false,
    },
    backgroundColor : {
      type: 'string'
    },
    textColor : {
      type: 'string'
    },
    customTextColor : {
      type : 'string',
    },
    customBackgroundColor : {
      type : 'string',
    }
  },
	edit,
	save,
});
