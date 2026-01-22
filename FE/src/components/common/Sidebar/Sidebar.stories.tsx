import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from './index';

const meta = {
  title: 'Components/Common/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activePath: '/stands',
    onNavigate: (path: string) => {
      console.log('Navigate to:', path);
    },
    onLogout: () => {
      console.log('Logout clicked');
    },
    collapsed: false,
    onToggleCollapse: () => {
      console.log('Toggle collapse');
    },
  },
};

export const Collapsed: Story = {
  args: {
    activePath: '/dashboard',
    onNavigate: (path: string) => {
      console.log('Navigate to:', path);
    },
    onLogout: () => {
      console.log('Logout clicked');
    },
    collapsed: true,
    onToggleCollapse: () => {
      console.log('Toggle collapse');
    },
  },
};

export const DashboardActive: Story = {
  args: {
    activePath: '/dashboard',
    onNavigate: (path: string) => {
      console.log('Navigate to:', path);
    },
    onLogout: () => {
      console.log('Logout clicked');
    },
    collapsed: false,
    onToggleCollapse: () => {
      console.log('Toggle collapse');
    },
  },
};

export const StandsActive: Story = {
  args: {
    activePath: '/stands',
    onNavigate: (path: string) => {
      console.log('Navigate to:', path);
    },
    onLogout: () => {
      console.log('Logout clicked');
    },
    collapsed: false,
    onToggleCollapse: () => {
      console.log('Toggle collapse');
    },
  },
};

