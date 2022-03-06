import { Meta, Story } from '@storybook/react';

import { Input, InputProps } from './input';

export default {
  component: Input,
  title: 'Input',
  argTypes: { onChange: { action: 'onChange' }, onFocus: { action: 'onFocus' }, onBlur: { action: 'onBlur' } },
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  placeholder: 'Input placeholder',
  size: 'md',
  variant: 'outline',
  disabled: false,
  invalid: false,
};
