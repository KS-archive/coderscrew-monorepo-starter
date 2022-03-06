import { Meta, Story } from '@storybook/react';

import { Input } from '../input/input';
import { FormField, FormFieldProps } from './form-field';

export default {
  component: FormField,
  title: 'FormField',
} as Meta;

const Template: Story<FormFieldProps> = (args) => (
  <FormField {...args}>
    <Input />
  </FormField>
);

export const Playground = Template.bind({});
Playground.args = {
  size: 'lg',
  error: 'Error text',
};
