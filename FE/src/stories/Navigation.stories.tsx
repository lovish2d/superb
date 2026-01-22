import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumbs,
  Link,
  Typography,
  Tabs,
  Tab,
  Pagination,
  Stack,
  Box,
} from '@mui/material';
import { useState } from 'react';

const meta: Meta = {
  title: 'MUI Components/Navigation',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BreadcrumbsNav: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Breadcrumbs>
          <Link href="#" underline="hover">
            Home
          </Link>
          <Link href="#" underline="hover">
            Dashboard
          </Link>
          <Typography>Current Page</Typography>
        </Breadcrumbs>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With More Levels
        </Typography>
        <Breadcrumbs>
          <Link href="#" underline="hover">
            Home
          </Link>
          <Link href="#" underline="hover">
            Settings
          </Link>
          <Link href="#" underline="hover">
            Profile
          </Link>
          <Typography>Edit</Typography>
        </Breadcrumbs>
      </Box>
    </Stack>
  ),
};

export const TabsNav: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <Stack spacing={3} sx={{ minWidth: 600 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Default Tabs
          </Typography>
          <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
            <Tab label="Tab 3" />
          </Tabs>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            With More Tabs
          </Typography>
          <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
            <Tab label="Overview" />
            <Tab label="Details" />
            <Tab label="Settings" />
            <Tab label="History" />
          </Tabs>
        </Box>
      </Stack>
    );
  },
};

export const PaginationNav: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Pagination count={10} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Page Number
        </Typography>
        <Pagination count={10} page={3} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Large
        </Typography>
        <Pagination count={10} size="large" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Small
        </Typography>
        <Pagination count={10} size="small" />
      </Box>
    </Stack>
  ),
};

