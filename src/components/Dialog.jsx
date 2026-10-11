
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useCallback, useEffect, useRef } from 'react';

import Button from './Button';

import './Dialog.scss';

import icClose from './../images/ic-close.svg';


const Dialog = ({
  width, height, title, onCloseClick, children, className, slideIn,
  onConfirmClick, onCancelClick,
  draggable = true,
  cancelableOutside = true,
  cancelText = 'CANCEL',
  confirmText = 'OK',
  cancelDisabled = false,
  confirmDisabled = false,
  hideCloseButton = false,
  closeOnEscPress = false
}) => {
  const dialog = useRef(null);
  const draggableNode = useRef(null);
  const closeTimer = useRef(null);
  const onClose = useRef(onCloseClick);

  useEffect(() => {
    onClose.current = onCloseClick;
  }, [onCloseClick]);

  useEffect(() => () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const handleCloseClick = useCallback(() => {
    if (closeTimer.current !== null || !dialog.current) {
      return;
    }

    dialog.current.classList.add('dnk-dialog-hide-background');
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      onClose.current();
    }, 90);
  }, []);

  useEffect(() => {
    if (!closeOnEscPress) {
      return;
    }

    const handleCloseOnEscPress = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        handleCloseClick();
      }
    };

    document.addEventListener('keydown', handleCloseOnEscPress);
    return () => {
      document.removeEventListener('keydown', handleCloseOnEscPress);
    };
  }, [closeOnEscPress, handleCloseClick]);
  return (
    <div
      ref={dialog}
      className={`dnk-dialog ${className || ''}`}
      onClick={cancelableOutside ? handleCloseClick : undefined}>
      <div style={{ margin: 'auto' }}>
        <Draggable
          nodeRef={draggableNode}
          disabled={!draggable}
          cancel='.dnk-dialog-close, .dnk-dialog-body'>
          <div
            ref={draggableNode}
            style={
              ['top', 'bottom', 'left', 'right'].includes(slideIn) ?
              { animationName: `slide-in-from-${slideIn}` } :
              undefined
            }
            className='dnk-dialog-content-wrapper'>
            <div
              style={{
                ...(
                  width ?
                  {
                    width: `${width}px`,
                    minWidth: `${width}px`,
                    maxWidth: `${width}px`
                  } :
                  undefined
                ),
                ...(
                  height ?
                  {
                    height: `${height}px`,
                    minHeight: `${height}px`,
                    maxHeight: `${height}px`
                  } :
                  undefined
                )
              }}
              className={`dnk-dialog-content ${draggable ? 'dnk-draggable' : ''}`}
              onClick={e => e.stopPropagation()}>
              {
                !hideCloseButton &&
                <button
                  type='button'
                  aria-label='Close dialog'
                  onClick={handleCloseClick}
                  style={{ cursor: 'pointer' }}
                  className='dnk-dialog-close'>
                  <img
                    src={icClose}
                    alt=''/>
                </button>
              }
              {
                title &&
                <header className='dnk-dialog-header'>
                  { title }
                </header>
              }
              <div className='dnk-dialog-body'>
                { children }
                {
                  (onConfirmClick || onCancelClick) &&
                  <div className='dnk-dialog-body-buttons'>
                    {
                      onCancelClick &&
                      <Button
                        text={cancelText}
                        onClick={onCancelClick}
                        disabled={cancelDisabled}/>
                    }
                    {
                      onConfirmClick &&
                      <Button
                        primary
                        text={confirmText}
                        onClick={onConfirmClick}
                        disabled={confirmDisabled}/>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  )
}

Dialog.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  draggable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onCancelClick: PropTypes.func,
  cancelText: PropTypes.string,
  onConfirmClick: PropTypes.func,
  confirmText: PropTypes.string,
  cancelableOutside: PropTypes.bool,
  onCloseClick: PropTypes.func.isRequired,
  cancelDisabled: PropTypes.bool,
  confirmDisabled: PropTypes.bool,
  hideCloseButton: PropTypes.bool,
  closeOnEscPress: PropTypes.bool,
  slideIn: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

export default Dialog;
