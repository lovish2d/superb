import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Popover,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { MoreVertical, Info, HelpCircle } from 'lucide-react';

const meta: Meta = {
  title: 'MUI Components/Overlays & Popups',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dialogs: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Stack spacing={3} sx={{ minWidth: 600 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Default Dialog
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Open Dialog
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>
              <Typography>
                This is the dialog content. You can place any content here, including forms, text,
                images, or other components.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Stack>
    );
  },
};

export const Menus: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
      <Stack spacing={3} sx={{ minWidth: 600 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Dropdown Menu
          </Typography>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertical size={20} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setAnchorEl(null)}>Edit</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Duplicate</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Delete</MenuItem>
          </Menu>
        </Box>
      </Stack>
    );
  },
};

export const Tooltips: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Tooltips
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Tooltip title="This is a tooltip">
            <IconButton>
              <Info size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hover to see tooltip">
            <Button variant="outlined">Hover me</Button>
          </Tooltip>
          <Tooltip title="Help information">
            <IconButton>
              <HelpCircle size={20} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Stack>
  ),
};

