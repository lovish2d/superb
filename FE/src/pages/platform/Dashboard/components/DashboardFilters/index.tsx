import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button } from '@mui/material';
import { Filter } from 'lucide-react';
import { brandColors } from '@/theme';
import FilterDropdown from '@/components/common/FilterDropdown';
import ResultsCount from './components/ResultsCount';

const DashboardFilters = () => {
  const { t } = useTranslation('dashboard');
  const [resultCount] = useState(156);

  const filterOptions = {
    customers: [t('filters.all_customers'), 'Lufthansa', 'Emirates', 'Qatar Airways'],
    countries: [t('filters.all_countries'), 'Germany', 'UAE', 'Qatar', 'USA'],
    poolingCenters: [t('filters.all_pooling_centers'), 'Frankfurt', 'Dubai', 'Doha', 'New York'],
    types: [t('filters.all_types'), 'GPU', 'ACU', 'ASU'],
    status: [t('filters.all_status'), 'Available', 'In Use', 'Maintenance'],
  };

  const [selectedFilters, setSelectedFilters] = useState({
    customers: filterOptions.customers[0],
    countries: filterOptions.countries[0],
    poolingCenters: filterOptions.poolingCenters[0],
    types: filterOptions.types[0],
    status: filterOptions.status[0],
  });

  const handleFilterChange = (filterKey: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      customers: filterOptions.customers[0],
      countries: filterOptions.countries[0],
      poolingCenters: filterOptions.poolingCenters[0],
      types: filterOptions.types[0],
      status: filterOptions.status[0],
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: brandColors.white,
        border: '1px solid',
        borderColor: brandColors.neutral[200],
        borderRadius: '10px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        {/* Filters Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            width: '100%',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Filters Label and Dropdowns */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              flex: '1 1 auto',
              minWidth: 0,
              flexWrap: 'wrap',
            }}
          >
            {/* Filters Label */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexShrink: 0,
              }}
            >
              <Filter size={16} color={brandColors.neutral[900]} />
              <Typography
                variant="body2"
                sx={{ color: brandColors.neutral[900], whiteSpace: 'nowrap' }}
              >
                {t('filters.label')}
              </Typography>
            </Box>

            {/* Filter Dropdowns - Now properly wrapping */}
            <FilterDropdown
              value={selectedFilters.customers}
              options={filterOptions.customers}
              onChange={(value) => handleFilterChange('customers', value)}
            />
            <FilterDropdown
              value={selectedFilters.countries}
              options={filterOptions.countries}
              onChange={(value) => handleFilterChange('countries', value)}
            />
            <FilterDropdown
              value={selectedFilters.poolingCenters}
              options={filterOptions.poolingCenters}
              onChange={(value) => handleFilterChange('poolingCenters', value)}
              disabled
              width={176}
            />
            <FilterDropdown
              value={selectedFilters.types}
              options={filterOptions.types}
              onChange={(value) => handleFilterChange('types', value)}
            />
            <FilterDropdown
              value={selectedFilters.status}
              options={filterOptions.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </Box>

          {/* Results Count and Clear Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexShrink: 0,
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <ResultsCount count={resultCount} label={t('filters.results')} />

            <Button
              variant="contained"
              onClick={handleClearFilters}
              sx={{
                height: 36,
                px: 2,
                py: '7px',
                borderRadius: '8px',
                backgroundColor: brandColors.primary.main,
                color: brandColors.white,
                textTransform: 'none',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                '&:hover': {
                  backgroundColor: brandColors.primary.hover,
                },
              }}
            >
              {t('filters.clear_filters')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardFilters;
