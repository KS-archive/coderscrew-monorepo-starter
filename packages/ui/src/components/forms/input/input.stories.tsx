import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './input';

export default {
  title: 'Components / Input',
  component: Input,
  argTypes: { onChange: { action: 'onChange' }, onFocus: { action: 'onFocus' }, onBlur: { action: 'onBlur' } },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  placeholder: 'Input placeholder',
  size: 'md',
  variant: 'outline',
  disabled: false,
  invalid: false,
};
