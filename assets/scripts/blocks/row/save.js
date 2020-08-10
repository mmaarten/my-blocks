import {
  InnerBlocks,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { get } from 'lodash';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const {
    container,
    noGutters,
    verticalAlignment,
  } = attributes;

  const rowClasses = classnames( {
    'row': true,
    'no-gutters': noGutters,
    [`align-items-${verticalAlignment}`] : verticalAlignment,
  } );

  const containerClasses = classnames( {
    'container': 'fixed' === container,
    'container-fluid': 'fluid' === container,
  } );

  return (
    <div className={ className }>
      <div className={ containerClasses }>
        <div className={ rowClasses }>
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};
