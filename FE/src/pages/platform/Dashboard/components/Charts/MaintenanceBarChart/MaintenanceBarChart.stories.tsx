import type { Meta, StoryObj } from '@storybook/react';
import MaintenanceBarChart from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/Charts/MaintenanceBarChart',
  component: MaintenanceBarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MaintenanceBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
