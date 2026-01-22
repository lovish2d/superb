import type { Meta, StoryObj } from '@storybook/react';
import StandsOverview from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/StandsOverview',
  component: StandsOverview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StandsOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
