import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/modal', {
	title: __( 'Modal', 'my-blocks' ),
  description: __( 'Displays a modal.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
  attributes: {
    id : {
      type: 'string',
      default: '',
    },
    title : {
      type: 'string',
      default: '',
    },
    size : {
      type: 'string',
      default: '',
    },
    verticallyCentered : {
      type: 'boolean',
			default: false,
    },
  },
	edit,
	save,
});
