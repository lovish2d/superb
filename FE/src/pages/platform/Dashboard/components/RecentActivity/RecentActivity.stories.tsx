import type { Meta, StoryObj } from '@storybook/react';
import RecentActivity from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/RecentActivity',
  component: RecentActivity,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecentActivity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
