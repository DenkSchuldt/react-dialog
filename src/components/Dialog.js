
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

import Button from './Button';

import './Dialog.scss';

import icClose from './../images/ic-close.svg';


const Dialog = (props) => {
  const {
    width, height, title, onClose, cancelable, children, onConfirm, onCancel,
    confirmText, cancelText, className, draggable, cancelDisabled,
    confirmDisabled
  } = props;
  let dialog = useRef()
  const onCloseClick = () => {
    dialog.current.classList.add('dnk-dialog-hide-background');
    setTimeout(() => {
      onClose();
    }, 90);
  };
  return (
    <div
      ref={dialog}
      className={`dnk-dialog ${className || ''}`}
      onClick={cancelable ? onCloseClick : undefined}>
      <div style={{ margin: 'auto' }}>
        <Draggable
          disabled={!draggable}>
          <div className='dnk-dialog-content-wrapper'>
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
              <button
                type='button'
                onClick={onCloseClick}
                className='dnk-dialog-close'>
                <img
                  src={icClose}
                  alt=''/>
              </button>
              {
                title &&
                <header className='dnk-dialog-header'>
                  { title }
                </header>
              }
              <div className='dnk-dialog-body'>
                { children }
                {
                  (onConfirm || onCancel) &&
                  <div className='dnk-dialog-body-buttons'>
                    {
                      onCancel &&
                      <Button
                        onClick={onCancel}
                        text={cancelText}
                        disabled={cancelDisabled}/>
                    }
                    {
                      onConfirm &&
                      <Button
                        primary
                        onClick={onConfirm}
                        text={confirmText}
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
  cancelable: PropTypes.bool,
  draggable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
};

Dialog.defaultProps = {
  draggable: true,
  cancelable: true,
  cancelText: 'CANCEL',
  cancelDisabled: false,
  confirmText: 'OK',
  confirmDisabled: false
};

export default Dialog;
