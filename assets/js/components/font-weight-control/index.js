import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	SelectControl,
} from '@wordpress/components';
import {
  fontWeights,
} from './../../config';

import {
  map,
  filter,
  first,
  get,
  kebabCase,
} from 'lodash';

class FontWeightControl extends Component {
  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( value ) {
    const { onChange } = this.props;

    const filtered = filter( fontWeights, fontWeight => value === get( fontWeight, 'slug' ) );

    const fontWeight = first( filtered ) || {
      name : undefined,
      slug : undefined,
      class : undefined,
    };

    if ( fontWeight.slug ) {
      fontWeight.class = `has-${ kebabCase( value ) }-font-weight`;
    }

    onChange( fontWeight );
  }

  render() {
    const { fontWeight, onChange, ...otherProps } = this.props;

    const options = map( fontWeights, ( { name, slug } ) => ( { label: name, value: slug } ) );
    const value = get( fontWeight, 'slug' );

    return (
      <SelectControl
        label={ __( 'Font Weight', 'my-blocks' ) }
        { ...otherProps }
        value={ value }
        onChange={ this.handleChange }
        options={ options }
      />
    );
  }
}

export default FontWeightControl;
