import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, CheckboxControl } from '@wordpress/components';
import { compose, withInstanceId } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { map, find, merge, remove, isArray } from 'lodash';
import classnames from 'classnames';

class PostList extends Component {
  constructor() {
    super( ...arguments );
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
              className="my-post-list__item"
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

    this.onSearchChange = this.onSearchChange.bind( this );

    this.state = {
			search: '',
      suggestions: [],
      loading: false,
		};
  }

  onSearchChange( event ) {
		const inputValue = event.target.value;
    this.setState( { search: inputValue } );
    this.updateSuggestions( inputValue );
	}

  updateSuggestions( search ) {

    // Show the suggestions after typing at least 2 characters
		if ( search.length < 2 ) {
			this.setState( {
				loading: false,
			} );

			return;
		}

    this.setState( {
			loading: true,
		} );

    const request = apiFetch( {
  		path: addQueryArgs( '/wp/v2/search', {
  			search,
  			per_page: 20,
  			type: 'post',
  		} ),
  	} )

    request.then( ( posts ) => {
      // A fetch Promise doesn't have an abort option. It's mimicked by
			// comparing the request reference in on the instance, which is
			// reset or deleted on subsequent requests or unmounting.
			if ( this.suggestionsRequest !== request ) {
				return;
			}

      const suggestions = map( posts, ( post ) => ( {
    		id: post.id,
    		url: post.url,
    		title: post.title || __( '(Untitled)' ),
    	} ) );

      this.setState( {
				suggestions,
				loading: false,
			} );
    } );

    request.catch( () => {
			if ( this.suggestionsRequest === request ) {
				this.setState( {
					loading: false,
				} );
			}
		} );

    this.suggestionsRequest = request;
  }

  render() {
    const { value, onChange, className } = this.props;
    const { search, suggestions, isLoading } = this.state;

    return (
      <div className={ classnames( className, 'my-post-control' ) }>
        <PostList
          className="my-post-control__selected-list"
          list={ value }
          selected={ value }
          onChange={ ( post, isSelected ) => {
            let newValue = isArray( value ) ? [ ...value ] : [];
            remove( newValue, ( o ) => ( o.id === post.id ) );
            onChange( newValue );
          } }
        />
        <div className="my-post-control__search">
          <input
            className="my-post-control__search-input is-full-width"
    				type="text"
    				value={ search }
    				onChange={ this.onSearchChange }
    				placeholder={ __( 'Type to search' ) }
    			/>
        </div>
        <PostList
          className="my-post-control__suggestions-list"
          list={ suggestions }
          selected={ value }
          onChange={ ( post, isSelected ) => {
            let newValue = isArray( value ) ? [ ...value ] : [];

            if ( isSelected ) {
              newValue.push( post );
            } else {
              remove( newValue, ( o ) => ( o.id === post.id ) );
            }
            onChange( newValue );
          } }
        />
      </div>
  	);
  }
}

export default PostControl;
