import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AddStandModal from './index';

const meta = {
  title: 'Pages/Platform/Stands/AddStandModal',
  component: AddStandModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddStandModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <AddStandModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={async (data) => {
          console.log('Form submitted:', data);
          setOpen(false);
        }}
      />
    );
  },
};

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open Modal</button>
        <AddStandModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={async (data) => {
            console.log('Form submitted:', data);
            setOpen(false);
          }}
        />
      </>
    );
  },
};

