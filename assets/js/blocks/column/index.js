import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/column', {
	title: __( 'Column', 'my-blocks' ),
  description: __( 'Displays a column.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
  parent: [ 'my/row' ],
  supports: {
		inserter: false,
		reusable: false,
		html: false,
	},
  attributes: {
    width : {
      type: 'number',
      min: 1,
      max: 12,
    }
  },
	edit,
	save,
});
