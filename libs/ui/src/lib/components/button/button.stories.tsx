import { Meta, Story } from '@storybook/react';

import { Button, ButtonProps } from './button';

export default {
  component: Button,
  title: 'Button',
  argTypes: { onClick: { action: 'onClick' }, onFocus: { action: 'onFocus' }, onBlur: { action: 'onBlur' } },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: 'Button text',
  size: 'md',
  color: 'primary',
  variant: 'solid',
  disabled: false,
};
