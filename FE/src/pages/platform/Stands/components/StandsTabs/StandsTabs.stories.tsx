import type { Meta, StoryObj } from '@storybook/react';
import StandsTabs from './index';

const meta = {
  title: 'Pages/Stands/StandsTabs',
  component: StandsTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StandsTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: 'all',
    onTabChange: (tab) => console.log('Tab changed:', tab),
    counts: {
      all: 21,
      new_listed: 3,
      available: 8,
      in_use: 7,
      in_transit: 1,
      maintenance: 3,
      deactivated: 0,
    },
  },
};

