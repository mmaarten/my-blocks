import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, Button, Icon } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { withInstanceId } from '@wordpress/compose';
import classnames from 'classnames';

class PostControl extends Component {
  constructor() {
    super( ...arguments );

    this.onChange = this.onChange.bind( this );
    this.onClear = this.onClear.bind( this );

    this.state = {
      search: null,
    };
  }

  onChange( search, post ) {
    this.setState( { search : !! post ? post.title : search } );
    this.props.onChange( post );
  }

  onClear() {
    this.setState( { search : null } );
    this.props.onChange( null );
  }

  render() {
    const {
      search,
    } = this.state;
    const {
      label,
      hideLabelFromVision,
      value,
      help,
      className,
      instanceId,
      onChange,
    } = this.props;

    const id = `my-post-control-${ instanceId }`;

    return (
  		<BaseControl
        label={ label }
        hideLabelFromVision={ hideLabelFromVision }
        id={ id }
        help={ help }
        className={ classnames( className, 'my-post-control' )  }
      >
        { value && (
          <div className="my-post-control__selected">
            <input
              className="block-editor-url-input has-border"
              id={ id }
              type="text"
              disabled={ true }
              value={ value.title }
            />
            <Button
              onClick={ this.onClear }
              isLink={true}
            ><Icon icon="no-alt" /></Button>
          </div>
        ) }
        { ! value && (
          <URLInput
            className="my-post-control__input"
            id={ id }
            value={ search }
            autoFocus={ false }
            hasBorder
            onChange={ this.onChange }
          />
        ) }
  		</BaseControl>
  	);
  }
}

export default withInstanceId( PostControl );
