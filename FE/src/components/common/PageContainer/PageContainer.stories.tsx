import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Box } from '@mui/material';
import PageContainer from './index';

const meta = {
  title: 'Components/Common/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Page Title
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is the page content inside the PageContainer component.
      </Typography>
    </PageContainer>
  ),
};

export const WithCustomPadding: Story = {
  render: () => (
    <PageContainer sx={{ p: 6 }}>
      <Typography variant="h4" gutterBottom>
        Custom Padding
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This container has custom padding of 48px (6 * 8px).
      </Typography>
    </PageContainer>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <PageContainer sx={{ bgcolor: 'background.default' }}>
      <Typography variant="h4" gutterBottom>
        With Background
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This container has a background color applied.
      </Typography>
    </PageContainer>
  ),
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Dashboard Overview',
    subtitle: "Welcome back! Here's what's happening today.",
    children: (
      <Typography variant="body1" color="text.secondary">
        Page content goes here.
      </Typography>
    ),
  },
};

export const WithTitleSubtitleAndTimestamp: Story = {
  args: {
    title: 'Dashboard Overview',
    subtitle: "Welcome back! Here's what's happening today.",
    lastUpdated: 'Last updated: 26/12/2025, 17:58:59',
    children: (
      <Typography variant="body1" color="text.secondary">
        Page content goes here.
      </Typography>
    ),
  },
};

export const WithMultipleSections: Story = {
  render: () => (
    <PageContainer
      title="Dashboard Overview"
      subtitle="Welcome back! Here's what's happening today."
      lastUpdated="Last updated: 26/12/2025, 17:58:59"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          width: '100%',
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Box
            key={item}
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Card {item}</Typography>
          </Box>
        ))}
      </Box>
    </PageContainer>
  ),
};

