import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from './typography';

export default {
  title: 'Components / Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Typography example text',
  as: 'div',
  color: 'primary',
  family: 'body',
  weight: 'normal',
  size: 'lg',
};
