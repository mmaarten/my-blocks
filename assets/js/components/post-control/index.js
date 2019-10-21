import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, CheckboxControl } from '@wordpress/components';
import { compose, withInstanceId } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { map, find, merge, remove, isArray, first } from 'lodash';
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
    this.onPostListChange = this.onPostListChange.bind( this );
    this.onSuggestionListChange = this.onSuggestionListChange.bind( this );

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

  onPostListChange( post ) {
    let posts = isArray( this.props.value ) ? [ ...this.props.value ] : [];
    remove( posts, ( o ) => ( o.id === post.id ) );
    this.props.onChange( posts );
  }

  onSuggestionListChange( post, isSelected ) {
    const { value, isMultiple, onChange } = this.props;

    let posts = isArray( value ) ? [ ...value ] : [];

    if (isMultiple) {
      if ( isSelected ) {
        posts.push( post );
      } else {
        remove( posts, ( o ) => ( o.id === post.id ) );
      }
      onChange( posts );
    } else {
      onChange( isSelected ? { ...post } : null );
    }
  }

  updateSuggestions( search ) {

    // Show the suggestions after typing at least 2 characters
		if ( search.length < 2 ) {
			this.setState( { loading: false } );
			return;
		}

    this.setState( { loading: true } );

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

      this.setState( { suggestions, loading: false } );
    } );

    request.catch( () => {
			if ( this.suggestionsRequest === request ) {
				this.setState( { loading: false } );
			}
		} );

    this.suggestionsRequest = request;
  }

  render() {
    const { value, onChange, className, isMultiple } = this.props;
    const { search, suggestions, isLoading } = this.state;

    let posts = [];

    if ( value ) {
      posts = isArray( value ) ? value : [ value ];
    }

    if (! isMultiple && posts.length > 1) {
      posts = [ posts[0] ];
    }

    return (
      <div className={ classnames( className, 'my-post-control' ) }>
        { 0 == posts.length && (
          <p>{ __('No post set.') }</p>
        ) }
        { !! posts.length && (
          <PostList
            className="my-post-control__selected-list"
            list={ posts }
            selected={ posts }
            onChange={ this.onPostListChange }
          />
        ) }

        <div className="my-post-control__search">
          <input
            className="my-post-control__search-input is-full-width"
    				type="search"
    				value={ search }
    				onChange={ this.onSearchChange }
    				placeholder={ __( 'Type to search' ) }
    			/>
        </div>
        { !! search && (
          <>
            { 0 === suggestions.length && (
              <p>{ __('Nothing items found.') }</p>
            ) }
            { !! suggestions.length && (
              <PostList
                className="my-post-control__suggestions-list"
                list={ suggestions }
                selected={ posts }
                onChange={ this.onSuggestionListChange }
              />
            ) }
          </>
        ) }
      </div>
  	);
  }
}

export default PostControl;
