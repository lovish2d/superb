import type { Meta, StoryObj } from '@storybook/react';
import { Chip, Stack, Box, Typography } from '@mui/material';

const meta = {
  title: 'MUI Components/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Primary (Default)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Primary" color="default" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Secondary
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Secondary" color="secondary" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Success
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Success" color="success" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Warning
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Warning" color="warning" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Error
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Error" color="error" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Info
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Info" color="info" />
        </Stack>
      </Box>
    </Stack>
  ),
};

export const OutlinedVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Outlined Chips
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Default" variant="outlined" color="default" />
          <Chip label="Success" variant="outlined" color="success" />
          <Chip label="Warning" variant="outlined" color="warning" />
          <Chip label="Error" variant="outlined" color="error" />
          <Chip label="Info" variant="outlined" color="info" />
        </Stack>
      </Box>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Small
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Chip label="Small" size="small" color="default" />
          <Chip label="Small" size="small" color="success" />
          <Chip label="Small" size="small" color="error" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Medium (Default)
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Chip label="Medium" size="medium" color="default" />
          <Chip label="Medium" size="medium" color="success" />
          <Chip label="Medium" size="medium" color="error" />
        </Stack>
      </Box>
    </Stack>
  ),
};


