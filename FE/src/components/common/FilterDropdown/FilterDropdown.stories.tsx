import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box } from '@mui/material';
import FilterDropdown from './index';

const meta = {
  title: 'Components/Common/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable filter dropdown component based on the Figma design system. Used for filtering data across the application with consistent styling and behavior. Features automatic text truncation with tooltip on hover for long values.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    options: {
      control: 'object',
      description: 'Array of options to display in the dropdown',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Width of the dropdown in pixels or as a string (e.g., "100%")',
      table: {
        defaultValue: { summary: '150' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
  },
} satisfies Meta<typeof FilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveWrapper = (props: {
  value: string;
  options: string[];
  disabled?: boolean;
  width?: number | string;
  placeholder?: string;
}) => {
  const [value, setValue] = useState(props.value);

  return (
    <FilterDropdown
      {...props}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        console.log('Selected:', newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'All Customers',
    options: ['All Customers', 'Lufthansa', 'Emirates', 'Qatar Airways', 'Delta Airlines'],
    disabled: false,
    width: 150,
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'All Pooling Centers',
    options: ['All Pooling Centers', 'Frankfurt', 'Dubai', 'Doha', 'New York'],
    disabled: true,
    width: 176,
  },
};

export const Width150px: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'All Countries',
    options: ['All Countries', 'Germany', 'United Arab Emirates', 'Qatar', 'United States'],
    disabled: false,
    width: 150,
  },
};

export const Width176px: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'All Pooling Centers',
    options: ['All Pooling Centers', 'Frankfurt Hub', 'Dubai International', 'Doha Center'],
    disabled: false,
    width: 176,
  },
};

export const Width200px: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'All Equipment Types',
    options: ['All Equipment Types', 'GPU', 'ACU', 'ASU', 'Ground Power Unit'],
    disabled: false,
    width: 200,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <Box sx={{ width: '400px' }}>
      <InteractiveWrapper {...args} />
    </Box>
  ),
  args: {
    value: 'All Status',
    options: ['All Status', 'Available', 'In Use', 'Maintenance', 'Out of Service'],
    disabled: false,
    width: '100%',
  },
};

export const ManyOptions: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'Select Country',
    options: [
      'Select Country',
      'Germany',
      'United Arab Emirates',
      'Qatar',
      'United States',
      'United Kingdom',
      'France',
      'Spain',
      'Italy',
      'Netherlands',
      'Switzerland',
      'Austria',
      'Belgium',
    ],
    disabled: false,
    width: 200,
  },
};

export const LongTextOptions: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'All Customer Organizations',
    options: [
      'All Customer Organizations',
      'Lufthansa German Airlines',
      'Emirates International Airways',
      'Qatar Airways Group',
      'Delta Air Lines Incorporated',
    ],
    disabled: false,
    width: 220,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates text truncation with ellipsis. Hover over the dropdown to see a tooltip with the full selected value.',
      },
    },
  },
};

export const TruncatedTextWithTooltip: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'Lufthansa German Airlines International Corporation',
    options: [
      'Lufthansa German Airlines International Corporation',
      'Emirates International Airways Group Limited',
      'Qatar Airways Company Q.C.S.C. Holdings',
    ],
    disabled: false,
    width: 150,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing text truncation with ellipsis. The text is too long for the 150px width, so it gets truncated. **Hover over the dropdown** to see the full text in a tooltip.',
      },
    },
  },
};

export const ShortOptions: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    value: 'All',
    options: ['All', 'GPU', 'ACU', 'ASU'],
    disabled: false,
    width: 120,
  },
};

export const MultipleFilters: Story = {
  render: () => {
    const [customers, setCustomers] = useState('All Customers');
    const [countries, setCountries] = useState('All Countries');
    const [centers, setCenters] = useState('All Pooling Centers');
    const [types, setTypes] = useState('All Types');
    const [status, setStatus] = useState('All Status');

    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FilterDropdown
          value={customers}
          options={['All Customers', 'Lufthansa', 'Emirates', 'Qatar Airways']}
          onChange={setCustomers}
        />
        <FilterDropdown
          value={countries}
          options={['All Countries', 'Germany', 'UAE', 'Qatar', 'USA']}
          onChange={setCountries}
        />
        <FilterDropdown
          value={centers}
          options={['All Pooling Centers', 'Frankfurt', 'Dubai', 'Doha']}
          onChange={setCenters}
          disabled
          width={176}
        />
        <FilterDropdown
          value={types}
          options={['All Types', 'GPU', 'ACU', 'ASU']}
          onChange={setTypes}
        />
        <FilterDropdown
          value={status}
          options={['All Status', 'Available', 'In Use', 'Maintenance']}
          onChange={setStatus}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing multiple filter dropdowns used together, as seen in the dashboard filters. One dropdown is disabled to show the disabled state.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState('Default State');
    const [value2] = useState('Disabled State');

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ fontSize: '14px', fontWeight: 500 }}>Default State</Box>
          <FilterDropdown
            value={value1}
            options={['Default State', 'Option 1', 'Option 2', 'Option 3']}
            onChange={setValue1}
            width={150}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ fontSize: '14px', fontWeight: 500 }}>Disabled State</Box>
          <FilterDropdown
            value={value2}
            options={['Disabled State', 'Option 1', 'Option 2', 'Option 3']}
            onChange={() => {}}
            disabled
            width={150}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ fontSize: '14px', fontWeight: 500 }}>Width 150px (Default)</Box>
          <FilterDropdown
            value={value1}
            options={['Width 150px', 'Option 1', 'Option 2']}
            onChange={setValue1}
            width={150}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ fontSize: '14px', fontWeight: 500 }}>Width 176px</Box>
          <FilterDropdown
            value={value1}
            options={['Width 176px', 'Option 1', 'Option 2']}
            onChange={setValue1}
            width={176}
          />
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive view of all component states: default, disabled, and different width variants.',
      },
    },
  },
};
