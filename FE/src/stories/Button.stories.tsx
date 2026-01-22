import type { Meta, StoryObj } from '@storybook/react';
import { Button, Stack, Box, Typography } from '@mui/material';
import { Plus, Save, Trash2, Edit, Download, Upload } from 'lucide-react';

const meta = {
  title: 'MUI Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Primary (Contained)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" color="primary">
            Action
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Secondary (Outlined with background)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Outline (White background with border)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="outlined" color="primary">
            View Details
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Ghost (Text only)
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="text">Edit</Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Destructive
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" color="error">
            Delete
          </Button>
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
          Contained - Sizes
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained" size="small">
            Small
          </Button>
          <Button variant="contained" size="medium">
            Medium
          </Button>
          <Button variant="contained" size="large">
            Large
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Outlined - Sizes
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" size="small">
            Small
          </Button>
          <Button variant="outlined" size="medium">
            Medium
          </Button>
          <Button variant="outlined" size="large">
            Large
          </Button>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Icons - Start Position
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" startIcon={<Plus size={18} />}>
            Create
          </Button>
          <Button variant="outlined" startIcon={<Edit size={18} />}>
            Edit
          </Button>
          <Button variant="contained" color="error" startIcon={<Trash2 size={18} />}>
            Delete
          </Button>
          <Button variant="outlined" color="success" startIcon={<Save size={18} />}>
            Save
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Icons - End Position
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained" endIcon={<Download size={18} />}>
            Download
          </Button>
          <Button variant="outlined" endIcon={<Upload size={18} />}>
            Upload
          </Button>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled State
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" disabled>
            Contained
          </Button>
          <Button variant="outlined" disabled>
            Outlined
          </Button>
          <Button variant="text" disabled>
            Text
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Full Width
        </Typography>
        <Stack spacing={2} sx={{ width: 400 }}>
          <Button variant="contained" fullWidth>
            Full Width Contained
          </Button>
          <Button variant="outlined" fullWidth>
            Full Width Outlined
          </Button>
        </Stack>
      </Box>
    </Stack>
  ),
};
