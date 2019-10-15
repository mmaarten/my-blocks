import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
  RangeControl,
  SelectControl,
  Toolbar,
  SVG,
	Path,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
  BlockControls,
  PanelColorSettings,
	withColors,
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
  times,
  dropRight,
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
			[ 'my/column' ],
			[ 'my/column' ],
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
			[ 'my/column' ],
			[ 'my/column' ],
			[ 'my/column' ],
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

    this.state = {
      template : this.getColumnsTemplate( this.props.columns ),
    };
  }

  getColumnsTemplate( columns, attributes ) {
    return times( columns, () => [ 'my/column', attributes ] )
  }

  render() {
    const {
      template,
    } = this.state;
    const {
      attributes,
      setAttributes,
      className,
      updateColumns,
      columns,
      setBackgroundColor,
	    backgroundColor,
    } = this.props;

    const {
      container,
    } = attributes;

    const showTemplateSelector = template.length ? false : true;

    const styles = {
		    backgroundColor: backgroundColor.color,
  	};

    const classes = classnames( {
      [ className ]: className,
      [`has-${container}-container`]: container,
      [ backgroundColor.class ]: backgroundColor.class,
      'has-background': !! backgroundColor.color,
    } );

    return (
      <>
        { ! showTemplateSelector && (
          <>
            <InspectorControls>
              <PanelBody title={ __( 'Container Settings' ) } initialOpen={ false }>
                <SelectControl
                  value={ container }
                  onChange={ ( value ) => setAttributes( { container: value } ) }
                  options={ [
                    { label: __( 'Fixed Width', 'my-blocks' ), value: 'fixed' },
                    { label: __( 'Full Width', 'my-blocks' ), value: 'fluid' },
                  ] }
                />
              </PanelBody>
              <PanelColorSettings
      					title={ __( 'Color Settings' ) }
      					colorSettings={ [
      						{
      							value: backgroundColor.color,
      							onChange: setBackgroundColor,
      							label: __( 'Background Color' ),
      						},
      					] }
      				/>
            </InspectorControls>
            <BlockControls>
              <Toolbar controls={
                [
                  {
                    icon: 'plus',
                    title: __( 'Add Column' ),
              			isActive: false,
              			onClick: () => { updateColumns( columns, columns + 1 ) }
                  }
                ]
              }
              />
            </BlockControls>
          </>
        ) }
        <div className={ classes } style={ styles }>
          <InnerBlocks
            __experimentalTemplateOptions={ TEMPLATE_OPTIONS }
  					__experimentalOnSelectTemplateOption={ ( selectedTemplate ) => {
              // User did not choose a template.
              if ( selectedTemplate === undefined ) {
                selectedTemplate = this.getColumnsTemplate( 1, {
                  width: { md: 12 },
                } );
						  }
              // Set template.
              this.setState( {
                template : selectedTemplate,
              } );
  					} }
  					__experimentalAllowTemplateOptionSkip
            template={ showTemplateSelector ? null : template }
            allowedBlocks={ ALLOWED_BLOCKS }
            templateLock={ 'all' }
           />
        </div>
      </>
    );
  }
}

export default compose( [
  withColors( 'backgroundColor' ),
  withSelect( ( select, props ) => {
    const { clientId, attributes } = props;
    const { getBlockCount } = select( 'core/block-editor' );

    return {
      columns : getBlockCount( clientId ),
    };
  } ),
  withDispatch( ( dispatch, ownProps, registry ) => ( {
    updateColumns( previousColumns, newColumns ) {
      const { clientId } = ownProps;
		  const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		  const { getBlocks } = registry.select( 'core/block-editor' );

      let innerBlocks = getBlocks( clientId );

      if ( newColumns > previousColumns ) {
        innerBlocks = [
  				...innerBlocks,
  				...times( newColumns - previousColumns, () => {
  					return createBlock( 'my/column' );
  				} ),
        ];
      } else {
        // The removed column will be the last of the inner blocks.
			  innerBlocks = dropRight( innerBlocks, previousColumns - newColumns );
      }

      replaceInnerBlocks( clientId, innerBlocks, false );
    },

  } ) ),

] )( RowEdit );
