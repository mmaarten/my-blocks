import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
  BaseControl,
	PanelBody,
  SelectControl,
  ToggleControl,
  Toolbar,
  SVG,
	Path,
  Button,
  Icon,
  Placeholder,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
  BlockControls,
  withColors,
  PanelColorSettings,
} from '@wordpress/block-editor';
import {
  compose,
} from '@wordpress/compose';
import {
  withDispatch,
  withSelect,
} from '@wordpress/data';
import {
  createBlock,
} from '@wordpress/blocks';
import {
  get,
} from 'lodash';
import
  classnames
  from 'classnames';

const ALLOWED_BLOCKS = [ 'my/column' ];

const TEMPLATE_OPTIONS = [
	{
		title: __( 'Two columns; equal split' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z" /></SVG>,
		template: [
			[ 'my/column', { width: { md: 6 } } ],
			[ 'my/column', { width: { md: 6 } } ],
		],
	},
	{
		title: __( 'Two columns; one-third, two-thirds split' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z" /></SVG>,
		template: [
			[ 'my/column', { width: { md: 4 } } ],
			[ 'my/column', { width: { md: 8 } } ],
		],
	},
	{
		title: __( 'Two columns; two-thirds, one-third split' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z" /></SVG>,
		template: [
			[ 'my/column', { width: { md: 8 } } ],
			[ 'my/column', { width: { md: 4 } } ],
		],
	},
	{
		title: __( 'Three columns; equal split' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z" /></SVG>,
		template: [
			[ 'my/column', { width: { md: 4 } } ],
			[ 'my/column', { width: { md: 4 } } ],
			[ 'my/column', { width: { md: 4 } } ],
		],
	},
	{
		title: __( 'Three columns; wide center column' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z" /></SVG>,
		template: [
			[ 'my/column', { width: { md: 3 } } ],
			[ 'my/column', { width: { md: 6 } } ],
			[ 'my/column', { width: { md: 3 } } ],
		],
	},
];

class RowEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
      updateColumns,
      addBlock,
      columns,
      backgroundColor,
			setBackgroundColor,
      textColor,
			setTextColor,
    } = this.props;

    const {
      container,
      noGutters,
      customTextColor,
      customBackgroundColor,
    } = attributes;

    const classes = classnames( {
      [ className ]: className,
      'has-no-gutters': noGutters,
      [`has-${container}-container`]: container,
      [backgroundColor.class]: backgroundColor.class,
      [textColor.class]: textColor.class,
      'has-background': customBackgroundColor || get( backgroundColor, 'value' ),
    } );

    const styles = {
			backgroundColor: customBackgroundColor,
			color: customTextColor,
		};

    return (
      <>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
            <SelectControl
              label={ __('Container', 'my-blocks') }
              value={ container }
              onChange={ ( container ) => setAttributes( { container } ) }
              options={ [
                { label: __( "- Don't Set -", 'my-blocks' ), value: '' },
                { label: __( 'Fixed Width', 'my-blocks' ), value: 'fixed' },
                { label: __( 'Full Width', 'my-blocks' ), value: 'fluid' },
              ] }
            />
            <ToggleControl
              label={ __( 'No Gutters', 'my-blocks' ) }
              checked={ noGutters }
              onChange={ ( noGutters ) => setAttributes( { noGutters } ) }
            />
          </PanelBody>
          <PanelColorSettings
						title={ __('Color Settings', 'my-blocks') }
						colorSettings={[
							{
								label: __('Text Color'),
								onChange: setTextColor,
								value: textColor.color,
							},
              {
								label: __('Background Color'),
								onChange: setBackgroundColor,
								value: backgroundColor.color,
							}
						]}
					/>
        </InspectorControls>
        <BlockControls>
          <Toolbar controls={
            [
              {
                icon: 'plus',
                title: __( 'Add Column' ),
          			isActive: false,
          			onClick: () => { addBlock( 'my/column' ) }
              }
            ]
          }
          />
        </BlockControls>
        <div className={ classes } style={ styles }>
          { ! columns && (
            <Placeholder
             label={ __( 'Columns', 'my-blocks') }
             instructions={ __( 'Select a layout to start with.', 'my-blocks' ) }
            >
              { TEMPLATE_OPTIONS.map( (options, index) => {
                return (
                  <Button
                    key={ `layout-${index}` }
                    title={ get( options, 'title' ) }
                    onClick={ () => {
                      options.template.map( data => {
                        addBlock( data[0], data[1] || undefined )
                      } )
                    } }
                    isSecondary
                   ><Icon icon={ get( options, 'icon' ) } /></Button>
                )
              } ) }
            </Placeholder>
          ) }
          { !! columns && (
            <InnerBlocks
              allowedBlocks={ ALLOWED_BLOCKS }
      				__experimentalMoverDirection="horizontal"
      				__experimentalTagName="div"
      				renderAppender={ false }
             />
          ) }
        </div>
      </>
    );
  }
}

export default compose( [
  withColors( 'backgroundColor', 'textColor' ),
  withSelect( ( select, props ) => {
    const { clientId } = props;
    const { getBlockCount } = select( 'core/block-editor' );

    return {
      columns : getBlockCount( clientId ),
    };
  } ),
  withDispatch( ( dispatch, ownProps, registry ) => ( {
    addBlock( blockType, attributes ) {
      const { clientId } = ownProps;
      const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
      const { getBlocks } = registry.select( 'core/block-editor' );

      let innerBlocks = getBlocks( clientId );

      innerBlocks = [
        ...innerBlocks,
        ...[ createBlock( blockType, attributes ) ],
      ];

      replaceInnerBlocks( clientId, innerBlocks, false );
    }
  } )
) ] )( RowEdit );
