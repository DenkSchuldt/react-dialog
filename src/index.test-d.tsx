import Dialog, { type DialogProps } from './index.js';

const minimal = <Dialog onCloseClick={() => {}} />;
const options: DialogProps = {
  width: 400,
  height: 300,
  title: 'Example dialog',
  className: 'custom-dialog',
  slideIn: 'top',
  draggable: true,
  cancelableOutside: true,
  closeOnEscPress: true,
  hideCloseButton: false,
  onCloseClick: () => {},
  cancelText: 'Go back',
  cancelDisabled: false,
  onCancelClick: (event) => {
    const button: HTMLButtonElement = event.currentTarget;
    button.focus();
  },
  confirmText: 'Continue',
  confirmDisabled: false,
  onConfirmClick: (event) => {
    const button: HTMLButtonElement = event.currentTarget;
    button.focus();
  }
};
const withChildren = <Dialog {...options}>Text <span>and an element</span>{42}</Dialog>;

// @ts-expect-error The close callback is required.
const missingClose = <Dialog />;
// @ts-expect-error Dimensions are specified as numbers of pixels.
const stringWidth = <Dialog onCloseClick={() => {}} width='100%' />;
// @ts-expect-error Only the four documented slide directions are supported.
const invalidSlide = <Dialog onCloseClick={() => {}} slideIn='diagonal' />;
// @ts-expect-error Titles use the existing string API.
const invalidTitle = <Dialog onCloseClick={() => {}} title={<span>Title</span>} />;
// @ts-expect-error onCloseClick receives no event argument.
const invalidClose = <Dialog onCloseClick={(event: MouseEvent) => event.preventDefault()} />;
// @ts-expect-error Action handlers receive a React button mouse event.
const invalidAction = <Dialog onCloseClick={() => {}} onConfirmClick={(value: string) => value} />;

void [minimal, withChildren, missingClose, stringWidth, invalidSlide, invalidTitle, invalidClose, invalidAction];
