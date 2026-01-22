import type { Meta, StoryObj } from '@storybook/react';
import StandsActionBar from './index';

const meta = {
  title: 'Pages/Stands/StandsActionBar',
  component: StandsActionBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StandsActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedCategory: 'All Categories',
    onCategoryChange: (value) => console.log('Category changed:', value),
    onAddStand: () => console.log('Add stand clicked'),
  },
};

