import { useState } from 'react';
import { Button } from '@mui/material';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/common/PageContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import StandsActionBar from './components/StandsActionBar';
import StandsTabs from './components/StandsTabs';
import StandsContent from './components/StandsContent';
import AddStandModal from './modals/AddStandModal';
import type { Stand } from '@/types/stand.types';

type StandStatus = 'all' | 'available' | 'in_use' | 'in_transit' | 'maintenance' | 'new_listed' | 'deactivated';

const Stands = () => {
  const { t } = useTranslation('stands');
  const [activeTab, setActiveTab] = useState<StandStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState(t('filters.all_categories'));
  const [searchValue, setSearchValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(t('filters.all_countries'));
  const [selectedCity, setSelectedCity] = useState(t('filters.all_cities'));
  const [selectedSort, setSelectedSort] = useState(t('filters.recently_added'));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedStandIds, setSelectedStandIds] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isAddStandModalOpen, setIsAddStandModalOpen] = useState(false);

  const handleExport = () => {
    // Export functionality
  };

  const handleAddStand = () => {
    setIsAddStandModalOpen(true);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Mock data - replace with API call later
  const mockStands: Stand[] = [
    {
      id: '1',
      standId: 'S-V2500F-A003',
      trackingId: 'TRK-DOH5Z2K8L',
      standType: 'third-party',
      measurement: {
        length: 3600,
        width: 2400,
        height: 1550,
        unit: 'mm',
        weight: 2150,
        weightUnit: 'Kg',
      },
      oem: {
        name: 'Frank Brown',
        engine: 'V2500',
      },
      engineCompatibility: ['Trent 1000', 'GEnx', 'CFM56', 'PW4000'],
      engineStatus: 'empty',
      customer: {
        name: 'Qatar Airways',
        location: 'Frankfurt',
        countryCode: 'DE',
      },
      status: 'in_transit',
    },
    {
      id: '2',
      standId: 'S-V2500F-A004',
      trackingId: 'TRK-DOH5Z2K9M',
      standType: 'homebase',
      measurement: {
        length: 3600,
        width: 2400,
        height: 1550,
        unit: 'mm',
        weight: 2150,
        weightUnit: 'Kg',
      },
      oem: {
        name: 'Frank Brown',
        engine: 'V2500',
      },
      engineCompatibility: ['Trent 1000', 'GEnx'],
      engineStatus: 'occupied',
      customer: {
        name: 'Lufthansa',
        location: 'Munich',
        countryCode: 'DE',
      },
      status: 'in_transit',
    },
    {
      id: '3',
      standId: 'S-V2500F-A005',
      trackingId: 'TRK-DOH5Z2K0N',
      standType: 'pool',
      measurement: {
        length: 3600,
        width: 2400,
        height: 1550,
        unit: 'mm',
        weight: 2150,
        weightUnit: 'Kg',
      },
      oem: {
        name: 'Frank Brown',
        engine: 'V2500',
      },
      engineCompatibility: ['Trent 1000', 'GEnx', 'CFM56'],
      engineStatus: 'empty',
      customer: {
        name: 'Emirates',
        location: 'Dubai',
        countryCode: 'AE',
      },
      status: 'in_transit',
    },
    {
      id: '4',
      standId: 'S-V2500F-A006',
      trackingId: 'TRK-DOH5Z2K1O',
      standType: 'third-party',
      measurement: {
        length: 3600,
        width: 2400,
        height: 1550,
        unit: 'mm',
        weight: 2150,
        weightUnit: 'Kg',
      },
      oem: {
        name: 'Frank Brown',
        engine: 'V2500',
      },
      engineCompatibility: ['Trent 1000', 'GEnx'],
      engineStatus: 'empty',
      customer: {
        name: 'Qatar Airways',
        location: 'Doha',
        countryCode: 'QA',
      },
      status: 'in_transit',
    },
    {
      id: '5',
      standId: 'S-V2500F-A007',
      trackingId: 'TRK-DOH5Z2K2P',
      standType: 'homebase',
      measurement: {
        length: 3600,
        width: 2400,
        height: 1550,
        unit: 'mm',
        weight: 2150,
        weightUnit: 'Kg',
      },
      oem: {
        name: 'Frank Brown',
        engine: 'V2500',
      },
      engineCompatibility: ['Trent 1000', 'GEnx', 'CFM56', 'PW4000'],
      engineStatus: 'occupied',
      customer: {
        name: 'Lufthansa',
        location: 'Frankfurt',
        countryCode: 'DE',
      },
      status: 'in_transit',
    },
    {
      id: '6',
      standId: 'S-V2500F-A008',
      trackingId: 'TRK-DOH5Z2K3Q',
      standType: 'pool',
      measurement: {
        length: 3600,
        width: 2400,
        height: 1550,
        unit: 'mm',
        weight: 2150,
        weightUnit: 'Kg',
      },
      oem: {
        name: 'Frank Brown',
        engine: 'V2500',
      },
      engineCompatibility: ['Trent 1000', 'GEnx'],
      engineStatus: 'empty',
      customer: {
        name: 'Emirates',
        location: 'Dubai',
        countryCode: 'AE',
      },
      status: 'in_transit',
    },
  ];

  const tabCounts = {
    all: 21,
    available: 8,
    in_use: 7,
    in_transit: 1,
    maintenance: 3,
    new_listed: 3,
    deactivated: 0,
  };

  // Show breadcrumb - always show for Overview page
  const breadcrumbItems = [
    {
      label: t('breadcrumb.stands'),
      path: '/stands',
    },
    {
      label: t('breadcrumb.overview'),
    },
  ];

  return (
    <PageContainer
      title={t('page.title')}
      subtitle={t('page.subtitle')}
      breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      headerRightContent={
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Download size={16} />}
          onClick={handleExport}
        >
          {t('header.export')}
        </Button>
      }
    >
      <StandsActionBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onAddStand={handleAddStand}
      />

      <StandsTabs activeTab={activeTab} onTabChange={setActiveTab} counts={tabCounts} />

      <StandsContent
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        stands={mockStands}
        selectedIds={selectedStandIds}
        onSelectionChange={setSelectedStandIds}
        onSort={handleSort}
        sortColumn={sortColumn}
      />
      <AddStandModal
        open={isAddStandModalOpen}
        onClose={() => setIsAddStandModalOpen(false)}
        onSubmit={async (data) => {
          // Handle form submission here
          console.log('Stand data submitted:', data);
          setIsAddStandModalOpen(false);
        }}
      />
    </PageContainer>
  );
};

export default Stands;


