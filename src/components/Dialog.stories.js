
import React from 'react';

import Dialog from './Dialog';
import './Dialog.stories.scss';


const Template = (args) => <Dialog {...args} />;

export const WithButtons = Template.bind({});
const WithButtonsChild = () => <div>This is the body</div>;
WithButtons.args = {
  title: 'With Buttons',
  children: <WithButtonsChild/>
}

export const Basic = Template.bind({});
const BasicChild = () => <div>Buttons are optional</div>;
Basic.args = {
  height: 150,
  title: 'Basic',
  onCancelClick: undefined,
  onConfirmClick: undefined,
  children: <BasicChild/>
}

export const CloseButtonHidden = Template.bind({});
const CloseButtonHiddenChild = () => (
  <div>You can also hide the close button</div>
);
CloseButtonHidden.args = {
  height: 150,
  hideCloseButton: true,
  title: 'Close button hidden',
  onCancelClick: undefined,
  confirmText: 'Understood',
  children: <CloseButtonHiddenChild/>
}

export const SlideIn = Template.bind({});
const SlideInChild = () => (
  <div>
    Initial animation can be set. Available options:
    <ul>
      <li>top</li>
      <li>bottom</li>
      <li>left</li>
      <li>right</li>
    </ul>
  </div>
);
SlideIn.args = {
  slideIn: 'bottom',
  title: 'Sliding in',
  onCancelClick: undefined,
  confirmText: 'Cool',
  children: <SlideInChild/>
}

export const Customizable = Template.bind({});
const CustomizableChild = () => (
  <div>
    Pass in a class with your custom styles
  </div>
);
Customizable.args = {
  slideIn: 'top',
  title: 'Customizable',
  confirmText: 'Confirm',
  className: 'my-custom-styles',
  children: <CustomizableChild/>
}

export default {
  title: '@denkschuldt/react-dialog',
  component: Dialog
};
