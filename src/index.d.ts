import type { MouseEventHandler, ReactElement, ReactNode } from 'react';

export interface DialogProps {
  /** Dialog width in pixels. */
  width?: number;
  /** Dialog height in pixels. */
  height?: number;
  title?: string;
  /** Enables dragging. Defaults to true. */
  draggable?: boolean;
  className?: string;
  children?: ReactNode;
  slideIn?: 'top' | 'bottom' | 'left' | 'right';
  /** Allows clicking the backdrop to close the dialog. Defaults to true. */
  cancelableOutside?: boolean;
  /** Enables closing with Escape. Defaults to false. */
  closeOnEscPress?: boolean;
  /** Hides the close button. Defaults to false. */
  hideCloseButton?: boolean;
  /** Called after the 90 ms close delay; remove the dialog in this callback to dismiss it. */
  onCloseClick: () => void;
  /** Defaults to 'CANCEL'. */
  cancelText?: string;
  onCancelClick?: MouseEventHandler<HTMLButtonElement>;
  /** Defaults to false. */
  cancelDisabled?: boolean;
  /** Defaults to 'OK'. */
  confirmText?: string;
  onConfirmClick?: MouseEventHandler<HTMLButtonElement>;
  /** Defaults to false. */
  confirmDisabled?: boolean;
}

declare function Dialog(props: DialogProps): ReactElement;

export default Dialog;
