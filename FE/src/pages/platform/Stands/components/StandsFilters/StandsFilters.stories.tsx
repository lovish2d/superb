import type { Meta, StoryObj } from '@storybook/react';
import StandsFilters from './index';

const meta = {
  title: 'Pages/Stands/StandsFilters',
  component: StandsFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StandsFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchValue: '',
    onSearchChange: (value) => console.log('Search changed:', value),
    selectedCountry: 'All Countries',
    onCountryChange: (value) => console.log('Country changed:', value),
    selectedCity: 'All Cities',
    onCityChange: (value) => console.log('City changed:', value),
    selectedSort: 'Recently Added',
    onSortChange: (value) => console.log('Sort changed:', value),
    viewMode: 'list',
    onViewModeChange: (mode) => console.log('View mode changed:', mode),
  },
};

