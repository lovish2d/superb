import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import StandsTable from './index';
import type { Stand } from '@/types/stand.types';

const meta = {
  title: 'Pages/Stands/StandsTable',
  component: StandsTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StandsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockStands: Stand[] = [
  {
    id: '1',
    standId: 'S-V2500F-A003',
    trackingId: 'TRK-DOH5Z2K8L',
    standType: 'third-party',
    measurement: {
      length: 3600,
      width: 2400,
      height: 1550,
      unit: 'mm',
      weight: 2150,
      weightUnit: 'Kg',
    },
    oem: {
      name: 'Frank Brown',
      engine: 'V2500',
    },
    engineCompatibility: ['Trent 1000', 'GEnx', 'CFM56', 'PW4000'],
    engineStatus: 'empty',
    customer: {
      name: 'Qatar Airways',
      location: 'Frankfurt',
      countryCode: 'DE',
    },
    status: 'in_transit',
  },
  {
    id: '2',
    standId: 'S-V2500F-A004',
    trackingId: 'TRK-DOH5Z2K9M',
    standType: 'homebase',
    measurement: {
      length: 3600,
      width: 2400,
      height: 1550,
      unit: 'mm',
      weight: 2150,
      weightUnit: 'Kg',
    },
    oem: {
      name: 'Frank Brown',
      engine: 'V2500',
    },
    engineCompatibility: ['Trent 1000', 'GEnx'],
    engineStatus: 'occupied',
    customer: {
      name: 'Lufthansa',
      location: 'Munich',
      countryCode: 'DE',
    },
    status: 'in_transit',
  },
];

const StandsTableWithState = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <StandsTable
      stands={mockStands}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      onSort={(column) => console.log('Sort by:', column)}
    />
  );
};

export const Default: Story = {
  render: () => <StandsTableWithState />,
};

