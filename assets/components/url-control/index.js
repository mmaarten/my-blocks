import {
  BaseControl,
} from '@wordpress/components';
import {
  URLInput,
} from '@wordpress/block-editor';
import {
  withInstanceId,
} from '@wordpress/compose';

const URLControl = ( {
  label,
  hideLabelFromVision,
  value,
  help,
  className,
  instanceId,
  onChange,
  ...props
} ) => {
	const id = `inspector-text-control-${ instanceId }`;
	const onChangeValue = ( event ) => onChange( event.target.value );

	return (
		<BaseControl label={ label } hideLabelFromVision={ hideLabelFromVision } id={ id } help={ help } className={ className }>
      <URLInput
        className="elixir-url-control__input"
        id={ id }
        value={ value }
        onChange={ onChange }
        autoFocus={ false }
        hasBorder
        { ...props }
      />
		</BaseControl>
	);
}

export default withInstanceId( URLControl );
