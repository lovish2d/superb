import type { Meta, StoryObj } from '@storybook/react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Slider,
  Stack,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Search } from 'lucide-react';

const meta: Meta = {
  title: 'MUI Components/Form Controls',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextFields: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 400 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <TextField label="Label" placeholder="Placeholder" fullWidth />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Helper Text
        </Typography>
        <TextField
          label="Email"
          placeholder="Enter your email"
          helperText="We'll never share your email"
          fullWidth
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Icon (Start)
        </Typography>
        <TextField
          label="Search"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Error State
        </Typography>
        <TextField
          label="Email"
          placeholder="Enter your email"
          error
          helperText="Please enter a valid email address"
          fullWidth
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled
        </Typography>
        <TextField label="Disabled" value="Disabled value" disabled fullWidth />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Multiline (Textarea)
        </Typography>
        <TextField
          label="Description"
          placeholder="Enter description"
          multiline
          rows={4}
          fullWidth
        />
      </Box>
    </Stack>
  ),
};

export const Selects: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 400 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Select Option</InputLabel>
          <Select label="Select Option">
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Helper Text
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select label="Country">
            <MenuItem value="us">United States</MenuItem>
            <MenuItem value="uk">United Kingdom</MenuItem>
            <MenuItem value="ca">Canada</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled
        </Typography>
        <FormControl fullWidth disabled>
          <InputLabel>Disabled Select</InputLabel>
          <Select label="Disabled Select" value="option1">
            <MenuItem value="option1">Option 1</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  ),
};

export const Switches: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 400 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Stack spacing={2}>
          <FormControlLabel control={<Switch />} label="Enable notifications" />
          <FormControlLabel control={<Switch defaultChecked />} label="Enable dark mode" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled
        </Typography>
        <Stack spacing={2}>
          <FormControlLabel control={<Switch disabled />} label="Disabled" />
          <FormControlLabel control={<Switch disabled defaultChecked />} label="Disabled checked" />
        </Stack>
      </Box>
    </Stack>
  ),
};

export const Checkboxes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 400 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Stack spacing={2}>
          <FormControlLabel control={<Checkbox />} label="Option 1" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Option 2" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled
        </Typography>
        <Stack spacing={2}>
          <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
          <FormControlLabel control={<Checkbox disabled defaultChecked />} label="Disabled checked" />
        </Stack>
      </Box>
    </Stack>
  ),
};

export const RadioButtons: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 400 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <FormControl>
          <FormLabel>Select Option</FormLabel>
          <RadioGroup defaultValue="option1">
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled
        </Typography>
        <FormControl>
          <FormLabel>Disabled Group</FormLabel>
          <RadioGroup defaultValue="option1">
            <FormControlLabel value="option1" control={<Radio disabled />} label="Disabled" />
            <FormControlLabel value="option2" control={<Radio disabled />} label="Disabled 2" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Stack>
  ),
};

export const Sliders: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 400 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default
        </Typography>
        <Slider defaultValue={30} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          With Value Label
        </Typography>
        <Slider defaultValue={50} valueLabelDisplay="on" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Range
        </Typography>
        <Slider defaultValue={[20, 60]} valueLabelDisplay="on" />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Disabled
        </Typography>
        <Slider defaultValue={30} disabled />
      </Box>
    </Stack>
  ),
};

