
import React from 'react';

import Dialog from './Dialog';

export default {
  title: 'App/Dialog',
  component: Dialog
};

const Child = () => <div>This is the dialog's body</div>;

const Template = (args) => <Dialog {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  title: 'Dialog title',
  cancelable: false,
  children: <Child/>
}
