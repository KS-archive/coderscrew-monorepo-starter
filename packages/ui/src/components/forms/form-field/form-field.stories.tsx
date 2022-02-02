import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from '../input';
import { FormField } from './form-field';

export default {
  title: 'Components / FormField',
  component: FormField,
} as ComponentMeta<typeof FormField>;

const Template: ComponentStory<typeof FormField> = (args) => (
  <FormField {...args}>
    <Input />
  </FormField>
);

export const Playground = Template.bind({});

Playground.args = {
  size: 'lg',
  error: 'Error text',
};
