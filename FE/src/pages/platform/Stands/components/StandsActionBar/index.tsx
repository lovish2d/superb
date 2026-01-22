import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import chevronDownIcon from '@/assets/images/dashboard/chevron-down.svg';

type StandsActionBarProps = {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onAddStand: () => void;
};

const StandsActionBar = ({ selectedCategory, onCategoryChange, onAddStand }: StandsActionBarProps) => {
  const { t } = useTranslation('stands');

  const categoryOptions = [t('filters.all_categories'), 'Homebase', 'Pool', 'Third-party'];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        mb: 3,
      }}
    >
      <Typography variant="h3">
        {t('header.all_stands')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          sx={{
            width: '150px',
            '& .MuiOutlinedInput-root': {
              height: '36px',
              backgroundColor: brandColors.neutral[50],
              borderRadius: '8px',
              '& fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiSelect-select': {
              padding: '8px 13px',
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
                }}
              >
                <Box component="span">
                  {selected as string}
                </Box>
                <Box
                  component="img"
                  src={chevronDownIcon}
                  alt=""
                  sx={{
                    width: 16,
                    height: 16,
                    flexShrink: 0,
                    opacity: 0.5,
                  }}
                />
              </Box>
            ),
          }}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={onAddStand}
        >
          {t('header.add_stand')}
        </Button>
      </Box>
    </Box>
  );
};

export default StandsActionBar;

