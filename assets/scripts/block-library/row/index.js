import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType('my/row', {
  apiVersion: 2,
  title: __( 'Row', 'my-blocks' ),
  description: __( 'Displays a row.', 'my-blocks' ),
	category: 'common',
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
    verticalAlignment : {
      type : 'string',
    },
  },
	edit,
	save,
});
