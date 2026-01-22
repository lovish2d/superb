import type { Meta, StoryObj } from '@storybook/react';
import ScheduleMaintenanceModal from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/Modals/ScheduleMaintenanceModal',
  component: ScheduleMaintenanceModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleMaintenanceModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log('Close clicked'),
    onSubmit: async (data) => {
      console.log('Maintenance scheduled:', data);
    },
  },
};
