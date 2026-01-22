import type { Meta, StoryObj } from '@storybook/react';
import AddUserModal from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/Modals/AddUserModal',
  component: AddUserModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log('Close clicked'),
    onSuccess: () => console.log('User added successfully'),
  },
};
