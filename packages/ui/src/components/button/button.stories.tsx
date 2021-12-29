import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Components / Button',
  component: Button,
  argTypes: { onClick: { action: 'onClick' } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Button text',
  size: 'md',
  color: 'primary',
  variant: 'solid',
  disabled: false,
};
