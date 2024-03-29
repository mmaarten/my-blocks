import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/spacer', {
  apiVersion: 2,
  title: __( 'Spacer', 'my-blocks' ),
  description: __( 'Displays a spacer.', 'my-blocks' ),
  category: 'common',
  supports: {
    align: ['wide', 'full'],
  },
  attributes: {
    align: {
      type: 'string',
      default: 'full',
    },
    sizes: {
      type: 'object',
      default: { xs: 4 },
    },
  },
  edit,
  save,
} );
