import type { Meta, StoryObj } from '@storybook/react';
import QuickActions from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/QuickActions',
  component: QuickActions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuickActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
