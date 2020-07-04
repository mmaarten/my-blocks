import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/sample', {
	title: __( 'Sample', 'my-blocks' ),
  description: __( 'Sample block.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
  attributes: {},
	edit,
	save,
});
