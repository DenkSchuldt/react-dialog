
import React from 'react';

import Dialog from './Dialog';

const Child = () => <div>This is the dialog's body</div>;

const Template = (args) => <Dialog {...args} />;

export const Component = Template.bind({});
Component.args = {
  title: 'Dialog title',
  children: <Child/>
}

export default {
  title: '@DenkSchuldt/react-dialog',
  component: Dialog
};
