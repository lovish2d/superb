import type { Meta, StoryObj } from '@storybook/react';
import ForgotPassword from './index';

const meta = {
  title: 'Pages/Public/ForgotPassword',
  component: ForgotPassword,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

