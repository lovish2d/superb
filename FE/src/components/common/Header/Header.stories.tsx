import type { Meta, StoryObj } from '@storybook/react';
import Header from './index';

const meta = {
  title: 'Components/Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Alexander Martinez',
    userRole: 'Platform Administrator',
    notificationCount: 3,
    unitSystem: 'imperial',
    onUnitChange: (unit) => {
      console.log('Unit changed to:', unit);
    },
    onSearch: (query) => {
      console.log('Search query:', query);
    },
    onNotificationsClick: () => {
      console.log('Notifications clicked');
    },
    onUserMenuClick: (action) => {
      console.log('User menu action:', action);
    },
  },
};

export const MetricSystem: Story = {
  args: {
    userName: 'John Doe',
    userRole: 'Customer Admin',
    notificationCount: 0,
    unitSystem: 'metric',
    onUnitChange: (unit) => {
      console.log('Unit changed to:', unit);
    },
    onSearch: (query) => {
      console.log('Search query:', query);
    },
    onNotificationsClick: () => {
      console.log('Notifications clicked');
    },
    onUserMenuClick: (action) => {
      console.log('User menu action:', action);
    },
  },
};

export const NoNotifications: Story = {
  args: {
    userName: 'Jane Smith',
    userRole: 'Service Technician',
    notificationCount: 0,
    unitSystem: 'imperial',
    onUnitChange: (unit) => {
      console.log('Unit changed to:', unit);
    },
    onSearch: (query) => {
      console.log('Search query:', query);
    },
    onNotificationsClick: () => {
      console.log('Notifications clicked');
    },
    onUserMenuClick: (action) => {
      console.log('User menu action:', action);
    },
  },
};

export const ManyNotifications: Story = {
  args: {
    userName: 'Sarah Johnson',
    userRole: 'Supervisor',
    notificationCount: 12,
    unitSystem: 'imperial',
    onUnitChange: (unit) => {
      console.log('Unit changed to:', unit);
    },
    onSearch: (query) => {
      console.log('Search query:', query);
    },
    onNotificationsClick: () => {
      console.log('Notifications clicked');
    },
    onUserMenuClick: (action) => {
      console.log('User menu action:', action);
    },
  },
};

