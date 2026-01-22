import { Box, TextField, MenuItem, IconButton, InputAdornment, Typography } from '@mui/material';
import { Search, ArrowUpDown, Grid3x3, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import chevronDownIcon from '@/assets/images/dashboard/chevron-down.svg';

type StandsFiltersProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCountry: string;
  onCountryChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
};

const StandsFilters = ({
  searchValue,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  selectedCity,
  onCityChange,
  selectedSort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: StandsFiltersProps) => {
  const { t } = useTranslation('stands');

  const countryOptions = [t('filters.all_countries'), 'Germany', 'UAE', 'Qatar', 'USA'];
  const cityOptions = [t('filters.all_cities'), 'Frankfurt', 'Dubai', 'Doha', 'New York'];
  const sortOptions = [t('filters.recently_added'), 'Oldest First', 'Name A-Z', 'Name Z-A'];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        p: 2, // Add padding to act as header
        borderBottom: `1px solid ${brandColors.neutral[200]}`,
      }}
    >
      <TextField
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t('filters.search_placeholder')}
        sx={{
          maxWidth: '487px',
          flex: 1,
          '& .MuiOutlinedInput-root': {
            height: '36px',
            backgroundColor: brandColors.white,
            borderRadius: '8px',
            '& fieldset': {
              borderColor: brandColors.neutral[200],
            },
            '&:hover fieldset': {
              borderColor: brandColors.neutral[200],
            },
            '&.Mui-focused fieldset': {
              borderColor: brandColors.primary.main,
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '4px 12px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} color={brandColors.neutral[500]} />
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexShrink: 0,
        }}
      >
        <TextField
          select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          sx={{
            width: '150px',
            '& .MuiOutlinedInput-root': {
              height: '36px',
              backgroundColor: brandColors.neutral[50], // F4F4F5
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
                <Typography variant="body2" component="span">
                  {selected as string}
                </Typography>
                <Box
                  component="img"
                  src={chevronDownIcon}
                  alt=""
                  sx={{
                    width: 16,
                    height: 16,
                    flexShrink: 0,
                    opacity: 0.5, // Matches the faded icon
                  }}
                />
              </Box>
            ),
          }}
        >
          {countryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          sx={{
            width: '150px',
            '& .MuiOutlinedInput-root': {
              height: '36px',
              backgroundColor: brandColors.neutral[50],
              borderRadius: '8px',
              opacity: 0.5, // Faded per design? "All Cities" button has opacity 0.5 in spec?
              '& fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiSelect-select': {
              padding: '1.275px 13.265px',
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
                <Typography variant="body2" component="span">
                  {selected as string}
                </Typography>
                <Box
                  component="img"
                  src={chevronDownIcon}
                  alt=""
                  sx={{
                    width: '15.993px',
                    height: '15.993px',
                    flexShrink: 0,
                    opacity: 0.5,
                  }}
                />
              </Box>
            ),
          }}
        >
          {cityOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          sx={{
            width: '176.515px',
            '& .MuiOutlinedInput-root': {
              height: '36px',
              backgroundColor: brandColors.neutral[50],
              borderRadius: '8px',
              '& fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiSelect-select': {
              padding: '1.275px 13.265px',
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
                  gap: 1,
                }}
              >
                <ArrowUpDown size={16} color={brandColors.neutral[500]} />
                <Box component="span">
                  {selected as string}
                </Box>
                <Box
                  component="img"
                  src={chevronDownIcon}
                  alt=""
                  sx={{
                    width: '15.993px',
                    height: '15.993px',
                    flexShrink: 0,
                    opacity: 0.5,
                  }}
                />
              </Box>
            ),
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: brandColors.neutral[50],
            padding: '4px',
            borderRadius: '8px',
            height: '35px', // Match design height
            boxSizing: 'border-box',
          }}
        >
          <IconButton
            onClick={() => onViewModeChange('grid')}
            sx={{
              width: '30px',
              height: '27px',
              p: 0,
              borderRadius: '6px',
              backgroundColor: viewMode === 'grid' ? brandColors.primary.main : 'transparent',
              color: viewMode === 'grid' ? brandColors.white : brandColors.neutral[500],
              '&:hover': {
                backgroundColor: viewMode === 'grid' ? brandColors.primary.hover : brandColors.neutral[100],
              },
            }}
          >
            <Grid3x3 size={16} />
          </IconButton>
          <IconButton
            onClick={() => onViewModeChange('list')}
            sx={{
              width: '30px',
              height: '27px',
              p: 0,
              borderRadius: '6px',
              backgroundColor: viewMode === 'list' ? brandColors.primary.main : 'transparent',
              color: viewMode === 'list' ? brandColors.white : brandColors.neutral[500],
              '&:hover': {
                backgroundColor: viewMode === 'list' ? brandColors.primary.hover : brandColors.neutral[100],
              },
            }}
          >
            <List size={16} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default StandsFilters;

