import type { Meta, StoryObj } from '@storybook/react';
import StatsSection from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/StatsSection',
  component: StatsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
