import {
  Component,
  createRef,
} from '@wordpress/element';
import {
  ColorPalette,
  withFallbackStyles,
} from '@wordpress/components';
import {
  map,
  filter,
  first,
  get,
  kebabCase,
} from 'lodash';

class ColorControl extends Component {

  constructor() {
    super( ...arguments );

    this.state = {
      colors : undefined,
    };

    this.ref = createRef();
    this.handleChange = this.handleChange.bind( this );
  }

  componentDidMount() {
    const { getComputedStyle } = window;

    let colors = [];
    this.ref.current.childNodes.forEach(function(node){
      const { color } = getComputedStyle( node );
      const { name, slug } = get( node, 'dataset' );
      colors.push( { name, slug, color } );
    });
    this.setState( { colors } );
  }

  handleChange( value ) {
    const { colors } = this.state;
    const { onChange } = this.props;

    const search = filter( colors, ( { color } ) => value === color );
    const color = first( search );

    let data = {
      ...{
        name: undefined,
        slug: undefined,
        color: undefined,
        class: undefined,
      },
      ...color
    };

    if ( data.slug ) {
      data.class = `text-${ kebabCase( data.slug ) }`
    }

    onChange( data );
  }

  render() {
    const { colors } = this.state;
    const { slugs, color } = this.props;

    return (
      <>
        <ColorPalette
          colors={ colors }
          value={ get( color, 'color' ) }
          onChange={ this.handleChange }
        />
        <div
          className="my-blocks-text-utilities"
          ref={ this.ref }
        >
          { map( slugs, ( slug ) => (
            <span
              className={ `text-${ slug }` }
              data-name={ slug }
              data-slug={ slug }
            />
          ) ) }
        </div>
      </>
    )
  }
}

export default ColorControl;
