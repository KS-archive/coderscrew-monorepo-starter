import { Meta, Story } from '@storybook/react';

import { Typography, TypographyProps } from './typography';

export default {
  component: Typography,
  title: 'Typography',
} as Meta;

const Template: Story<TypographyProps> = (args) => <Typography {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: 'Typography example text',
  as: 'div',
  color: 'primary',
  family: 'body',
  weight: 'normal',
  size: 'lg',
};
