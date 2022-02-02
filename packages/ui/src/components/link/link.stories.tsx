import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Link } from './link';

export default {
  title: 'Components / Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Link example text',
  family: 'body',
  weight: 'medium',
  size: 'lg',
};
