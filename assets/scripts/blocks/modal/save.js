import { __ } from '@wordpress/i18n';
import {
  InnerBlocks,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import {
    getDialogClasses
} from './common';

export default ( { ...props } ) => {
  const { attributes, className } = props;
  const { id, title, size, verticallyCentered } = attributes;

  const dialogClasses = getDialogClasses( attributes );
  const titleId = title && id ? `${id}-title` : '';

  return (
    <div className={ className }>
      <div className="modal fade" id={ id } tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby={ titleId }>
        <div className={ dialogClasses } role="document">
          <div className="modal-content">
            <div className="modal-header">
              { title && (
                <h5 className="modal-title" id={ titleId }>{ title }</h5>
              ) }
              <button type="button" className="close" data-dismiss="modal" aria-label={ __('Close', 'my-theme') }>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
