import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/buttons', {
  apiVersion: 2,
  title: __( 'Buttons', 'my-blocks' ),
  description: __( 'Displays buttons.', 'my-blocks' ),
  category: 'common',
  attributes: {
    justifyContent: {
      type: 'string',
      default: 'left',
    },
  },
  edit,
  save,
} );
