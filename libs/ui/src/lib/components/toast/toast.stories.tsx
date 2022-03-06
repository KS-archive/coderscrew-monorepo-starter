import { Meta, Story } from '@storybook/react';

import { Button } from '../button/button';
import { toast } from './toast';
import { ToastProvider } from './toast.provider';
import { Toaster, ToasterProps } from './toaster';

export default {
  component: Toaster,
  title: 'Toast',
} as Meta;

const Template: Story<ToasterProps> = (args) => (
  <ToastProvider {...args}>
    <Button color="success" onClick={() => toast.success('Operation successful!')}>
      Show success toast
    </Button>
    <br />
    <Button color="error" onClick={() => toast.error('Something went wrong')}>
      Show error toast
    </Button>
    <br />
    <Button color="info" onClick={() => toast.loading('Wait for it...')}>
      Show loading toast
    </Button>
  </ToastProvider>
);

export const Playground = Template.bind({});
Playground.args = {
  duration: 3000,
  maxCount: 1,
};
