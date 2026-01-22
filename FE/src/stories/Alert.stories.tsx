import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, Snackbar, Stack, Box, Typography, IconButton } from '@mui/material';
import { X } from 'lucide-react';

const meta = {
  title: 'MUI Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Success
        </Typography>
        <Alert severity="success">This is a success alert — check it out!</Alert>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Warning
        </Typography>
        <Alert severity="warning">This is a warning alert — check it out!</Alert>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Error
        </Typography>
        <Alert severity="error">This is an error alert — check it out!</Alert>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Info
        </Typography>
        <Alert severity="info">This is an info alert — check it out!</Alert>
      </Box>
    </Stack>
  ),
};

export const FilledVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Filled Alerts
        </Typography>
        <Stack spacing={2}>
          <Alert severity="success" variant="filled">
            This is a filled success alert
          </Alert>
          <Alert severity="warning" variant="filled">
            This is a filled warning alert
          </Alert>
          <Alert severity="error" variant="filled">
            This is a filled error alert
          </Alert>
          <Alert severity="info" variant="filled">
            This is a filled info alert
          </Alert>
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
          Outlined Alerts
        </Typography>
        <Stack spacing={2}>
          <Alert severity="success" variant="outlined">
            This is an outlined success alert
          </Alert>
          <Alert severity="warning" variant="outlined">
            This is an outlined warning alert
          </Alert>
          <Alert severity="error" variant="outlined">
            This is an outlined error alert
          </Alert>
          <Alert severity="info" variant="outlined">
            This is an outlined info alert
          </Alert>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Alerts with Title
        </Typography>
        <Stack spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert with a title
          </Alert>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert with a title
          </Alert>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const Snackbars: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Snackbar (Toast Notification)
        </Typography>
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Snackbar
            open={true}
            message="This is a snackbar notification"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            action={
              <IconButton size="small" color="inherit">
                <X size={16} />
              </IconButton>
            }
          />
        </Box>
      </Box>
    </Stack>
  ),
};


