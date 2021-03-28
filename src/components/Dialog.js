
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

import Button from './Button';

import './Dialog.scss';

import icClose from './../images/ic-close.svg';


const Dialog = (props) => {
  const {
    width, height, title, onCloseClick, cancelableOutside, children,
    onConfirmClick, onCancelClick, confirmText, cancelText, className,
    draggable, cancelDisabled, confirmDisabled, slideIn, hideCloseButton
  } = props;
  let dialog = useRef()
  const handleCloseClick = () => {
    dialog.current.classList.add('dnk-dialog-hide-background');
    setTimeout(() => {
      onCloseClick();
    }, 90);
  };
  return (
    <div
      ref={dialog}
      className={`dnk-dialog ${className || ''}`}
      onClick={cancelableOutside ? handleCloseClick : undefined}>
      <div style={{ margin: 'auto' }}>
        <Draggable
          disabled={!draggable}>
          <div
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
                  onClick={handleCloseClick}
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
  with: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  draggable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element,
  onCancelClick: PropTypes.func,
  cancelText: PropTypes.string,
  onConfirmClick: PropTypes.func,
  confirmText: PropTypes.string,
  cancelableOutside: PropTypes.bool,
  onCloseClick: PropTypes.func.isRequired,
  cancelDisabled: PropTypes.bool,
  confirmDisabled: PropTypes.bool,
  hideCloseButton: PropTypes.bool,
  slideIn: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

Dialog.defaultProps = {
  draggable: true,
  cancelText: 'CANCEL',
  cancelDisabled: false,
  confirmText: 'OK',
  confirmDisabled: false,
  cancelableOutside: true,
  hideCloseButton: false
};

export default Dialog;
