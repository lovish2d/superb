import { Box } from '@mui/material';
import { brandColors } from '@/theme';
import StandsFilters from '../StandsFilters';
import StandsTable from '../StandsTable';
import StandsGrid from '../StandsGrid';
import type { Stand } from '@/types/stand.types';

type StandsContentProps = {
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
    selectedCountry: string;
    onCountryChange: (value: string) => void;
    selectedCity: string;
    onCityChange: (value: string) => void;
    selectedSort: string;
    onSortChange: (value: string) => void;
    stands: Stand[];
    selectedIds: string[];
    onSelectionChange: (selectedIds: string[]) => void;
    onSort?: (column: string) => void;
    sortColumn?: string;
};

const StandsContent = ({
    viewMode,
    onViewModeChange,
    searchValue,
    onSearchChange,
    selectedCountry,
    onCountryChange,
    selectedCity,
    onCityChange,
    selectedSort,
    onSortChange,
    stands,
    selectedIds,
    onSelectionChange,
    onSort,
    sortColumn,
}: StandsContentProps) => {

    const FiltersComponent = (
        <StandsFilters
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            selectedCountry={selectedCountry}
            onCountryChange={onCountryChange}
            selectedCity={selectedCity}
            onCityChange={onCityChange}
            selectedSort={selectedSort}
            onSortChange={onSortChange}
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
        />
    );

    if (viewMode === 'list') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor: brandColors.white,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.neutral[200]}`,
                    overflow: 'hidden',
                }}
            >
                {FiltersComponent}

                <StandsTable
                    stands={stands}
                    selectedIds={selectedIds}
                    onSelectionChange={onSelectionChange}
                    onSort={onSort}
                    sortColumn={sortColumn}
                />
            </Box>
        );
    }

    // Grid View
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box
                sx={{
                    backgroundColor: brandColors.white,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.neutral[200]}`,
                    overflow: 'hidden',
                }}
            >
                {FiltersComponent}
            </Box>

            <StandsGrid
                stands={stands}
                selectedIds={selectedIds}
                onSelectionChange={onSelectionChange}
            />
        </Box>
    );
};

export default StandsContent;
