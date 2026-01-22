import type { Meta, StoryObj } from '@storybook/react';
import GenerateReportModal from './index';

const meta = {
  title: 'Pages/Platform/Dashboard/Modals/GenerateReportModal',
  component: GenerateReportModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GenerateReportModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log('Close clicked'),
    onSubmit: async (data) => {
      console.log('Report generated:', data);
    },
  },
};
