import type { Meta, StoryObj } from '@storybook/react';
import DashboardFilters from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/DashboardFilters',
  component: DashboardFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
