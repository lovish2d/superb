import type { Meta, StoryObj } from '@storybook/react';
import StandsPieChart from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/Charts/StandsPieChart',
  component: StandsPieChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StandsPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
