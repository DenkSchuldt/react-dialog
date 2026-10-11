import { fn } from 'storybook/test';
import Dialog from './Dialog.jsx';
import './Dialog.stories.scss';

export default {
  title: '@denkschuldt/react-dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    onCloseClick: fn(),
    onCancelClick: fn(),
    onConfirmClick: fn()
  },
  argTypes: {
    slideIn: {
      control: 'select',
      options: [undefined, 'top', 'bottom', 'left', 'right']
    }
  }
};

export const WithButtons = {
  args: {
    title: 'With Buttons',
    children: <div>This is the body</div>
  }
};

export const Basic = {
  args: {
    height: 150,
    title: 'Basic',
    onCancelClick: undefined,
    onConfirmClick: undefined,
    children: <div>Buttons are optional</div>
  }
};

export const CloseButtonHidden = {
  args: {
    height: 150,
    hideCloseButton: true,
    title: 'Close button hidden',
    onCancelClick: undefined,
    confirmText: 'Understood',
    children: <div>You can also hide the close button</div>
  }
};

export const SlideIn = {
  args: {
    slideIn: 'bottom',
    title: 'Sliding in',
    onCancelClick: undefined,
    confirmText: 'Cool',
    children: (
      <div>
        Initial animation can be set. Available options:
        <ul>
          <li>top</li>
          <li>bottom</li>
          <li>left</li>
          <li>right</li>
        </ul>
      </div>
    )
  }
};

export const Customizable = {
  args: {
    slideIn: 'top',
    title: 'Customizable',
    confirmText: 'Confirm',
    className: 'my-custom-styles',
    children: <div>Pass in a class with your custom styles</div>
  }
};
