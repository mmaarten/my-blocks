import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, CheckboxControl } from '@wordpress/components';
import { compose, withInstanceId } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { map, find, merge, remove } from 'lodash';
import classnames from 'classnames';

class PostList extends Component {
  constructor() {
    super( ...arguments );
  }

  renderItem() {

  }

  render() {
    const { list, selected, onChange, className } = this.props;

    const classes = classnames( className, 'my-post-list' );

    return (
      <div className={ classes }>
        { map( list, ( post, index ) => {
          const isSelected = find( selected, ( o ) => ( o.id === post.id ) ) ? true : false;
          return (
            <CheckboxControl
              key={ index }
          		label={ post.title }
          		checked={ isSelected }
          		onChange={ ( isChecked ) => onChange( post, isChecked ) }
          	/>
          )
        } ) }
      </div>
    );
  }
}

class PostControl extends Component {
  constructor() {
    super( ...arguments );

    this.onChange = this.onChange.bind( this );

    this.state = {
			search: '',
      showSuggestions: false,
      selectedSuggestion: null,
      loading: false,
		};
  }

  onChange( event ) {
		const inputValue = event.target.value;
    this.setState( { search: inputValue } );
    this.updateSuggestions( inputValue );
	}

  updateSuggestions( search ) {
    console.log( 'updateSuggestions', search );

    // Show the suggestions after typing at least 2 characters
		if ( search.length < 2 ) {
			this.setState( {
				showSuggestions: false,
				selectedSuggestion: null,
				loading: false,
			} );

			return;
		}

    this.setState( {
			showSuggestions: true,
			selectedSuggestion: null,
			loading: true,
		} );

    const request = apiFetch( {
  		path: addQueryArgs( '/wp/v2/search', {
  			search,
  			per_page: 20,
  			type: 'post',
  		} ),
  	} ).then( ( posts ) => {

      const suggestions = map( posts, ( post ) => ( {
    		id: post.id,
    		url: post.url,
    		title: post.title || __( '(Untitled)' ),
    	} ) );

      this.setState( {
				suggestions,
				loading: false,
			} );

      console.log( 'suggestions', suggestions );

    } );
  }

  render() {
    const { label, hideLabelFromVision, value, help, instanceId, className, id, onChange } = this.props;
    const { search, suggestions } = this.state;

    return (
      <>
        <PostList
          list={ value }
          selected={ value }
          onChange={ ( post, isSelected ) => {
            const newValue = remove( value, ( item ) => ( item.id === post.id ) );

            onChange( newValue );
          } }
        />
        <BaseControl
          label={ label }
          hideLabelFromVision={ hideLabelFromVision }
          id={ id }
          help={ help }
          className={ className }
        >
          <input
    				id={ id }
    				type="text"
    				value={ search }
    				onChange={ this.onChange }
    				placeholder={ __( 'Type to search' ) }
    			/>
        </BaseControl>
        <PostList
          list={ suggestions }
          selected={ value }
          onChange={ ( post, isSelected ) => {
            let newValue = [];

            if ( isSelected ) {
              newValue = merge( value, [ post ] );
            } else {
              newValue = remove( value, ( item ) => ( item.id === post.id ) );
            }
            onChange( newValue );
          } }
        />
      </>
  	);
  }
}

export default compose(
	withInstanceId,
)( PostControl );
