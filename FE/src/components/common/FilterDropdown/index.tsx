import { Box, TextField, MenuItem, Typography, Tooltip } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { brandColors } from '@/theme';

type FilterDropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  width?: number | string;
  placeholder?: string;
};

const FilterDropdown = ({
  value,
  options,
  onChange,
  disabled = false,
  width = 150,
  placeholder,
}: FilterDropdownProps) => {
  return (
    <TextField
      select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      sx={{
        width: typeof width === 'number' ? `${width}px` : width,
        minWidth: typeof width === 'number' ? `${width}px` : width,
        flexShrink: 0,
        '& .MuiOutlinedInput-root': {
          height: '36px',
          borderRadius: '8px',
          border: '1px solid transparent',
          color: brandColors.neutral[900],
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused': {
            backgroundColor: brandColors.white,
            '& fieldset': {
              border: `1.275px solid ${brandColors.primary.main}`,
            },
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            '& fieldset': {
              border: 'none',
            },
          },
        },
        '& .MuiSelect-select': {
          padding: '8px 13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '& .MuiSelect-icon': {
          display: 'none',
        },
      }}
      SelectProps={{
        renderValue: (selected) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: '8px',
            }}
          >
            <Tooltip title={selected as string} arrow placement="top">
              <Typography
                variant="body2"
                sx={{
                  color: disabled ? brandColors.neutral[900] : brandColors.neutral[900],
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {selected as string}
              </Typography>
            </Tooltip>
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <ChevronDown
                size={16}
                color={disabled ? brandColors.neutral[900] : brandColors.neutral[900]}
              />
            </Box>
          </Box>
        ),
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterDropdown;
