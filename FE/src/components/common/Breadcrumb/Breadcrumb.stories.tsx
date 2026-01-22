import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './index';

const meta = {
  title: 'Components/Common/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Stand Registry',
        path: '/stands',
      },
      {
        label: 'Stands',
      },
    ],
  },
};

export const MultipleLevels: Story = {
  args: {
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
      },
      {
        label: 'Stand Registry',
        path: '/stands',
      },
      {
        label: 'Stands',
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        label: 'Dashboard',
      },
    ],
  },
};

