
import React from 'react';

import Button from './Button';

const Template = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  primary: false,
  text: 'OK'
}

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  text: 'OK'
}

export default {
  title: 'App/Button',
  component: Button
};
