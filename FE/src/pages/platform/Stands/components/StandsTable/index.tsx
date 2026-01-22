import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Chip,
  Typography,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowUpDown, MoreVertical, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import type { Stand } from '@/types/stand.types';
import CountryFlag from '@/components/common/CountryFlag';

type StandsTableProps = {
  stands: Stand[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onSort?: (column: string) => void;
  sortColumn?: string;
};

const StandsTable = ({
  stands,
  selectedIds,
  onSelectionChange,
  onSort,
  sortColumn,
}: StandsTableProps) => {
  const { t } = useTranslation('stands');

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelectionChange(stands.map((stand) => stand.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const isSelected = (id: string) => selectedIds.includes(id);
  const isAllSelected = stands.length > 0 && selectedIds.length === stands.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < stands.length;

  const getStatusLabel = (status: Stand['status']) => {
    const statusMap: Record<Stand['status'], string> = {
      available: t('tabs.available'),
      in_use: t('tabs.in_use'),
      in_transit: t('tabs.in_transit'),
      maintenance: t('tabs.maintenance'),
      new_listed: t('tabs.new_listed'),
      deactivated: t('tabs.deactivated'),
    };
    return statusMap[status] || status;
  };

  const getStatusChipProps = (status: Stand['status']) => {
    switch (status) {
      case 'available':
        return { color: 'success' as const };
      case 'maintenance':
        return { color: 'error' as const };
      case 'new_listed':
        return { color: 'warning' as const };
      case 'in_use':
      case 'in_transit':
        return { color: 'info' as const };
      case 'deactivated':
        return { variant: 'outlined' as const, color: 'secondary' as const };
      default:
        return { variant: 'outlined' as const, color: 'secondary' as const };
    }
  };

  const getStandTypeLabel = (type: Stand['standType']) => {
    switch (type) {
      case 'homebase':
        return 'Homebase';
      case 'pool':
        return 'Pool';
      case 'third-party':
        return 'Third-party';
      default:
        return type;
    }
  };

  return (
    <TableContainer
      sx={{
        backgroundColor: brandColors.white,
        // No border radius/border here, handled by parent Card
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: brandColors.white,
              '& .MuiTableCell-head': {
                color: brandColors.neutral[500],
                textTransform: 'none',
                padding: '12px 16px',
                borderBottom: `1.275px solid ${brandColors.neutral[200]}`,
              },
              '& .MuiTableCell-paddingCheckbox': {
                padding: '12px 16px 12px 24px',
              },
            }}
          >
            <TableCell padding="checkbox" sx={{ width: 48 }}>
              <Checkbox
                indeterminate={isIndeterminate}
                checked={isAllSelected}
                onChange={handleSelectAll}
                sx={{
                  padding: 0,
                  color: brandColors.neutral[200], // Lighter default state
                  '&.Mui-checked': {
                    color: brandColors.primary.main,
                  },
                  '&.MuiCheckbox-indeterminate': {
                    color: brandColors.primary.main,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.25rem',
                  },
                }}
              />
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: onSort ? 'pointer' : 'default',
                }}
                onClick={() => onSort?.('standId')}
              >
                {t('table.stand_id')}
                {onSort && (
                  <ArrowUpDown
                    size={14}
                    color={sortColumn === 'standId' ? brandColors.neutral[900] : brandColors.neutral[500]}
                  />
                )}
              </Box>
            </TableCell>
            <TableCell>{t('table.stand_type')}</TableCell>
            <TableCell>{t('table.stand_measurement')}</TableCell>
            <TableCell>{t('table.oem_engine')}</TableCell>
            <TableCell>{t('table.engine_compatibility')}</TableCell>
            <TableCell>{t('table.engine_status')}</TableCell>
            <TableCell>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: onSort ? 'pointer' : 'default',
                }}
                onClick={() => onSort?.('customer')}
              >
                {t('table.customer')}
                {onSort && (
                  <ArrowUpDown
                    size={14}
                    color={sortColumn === 'customer' ? brandColors.neutral[900] : brandColors.neutral[500]}
                  />
                )}
              </Box>
            </TableCell>
            <TableCell>{t('table.status')}</TableCell>
            <TableCell align="right">{t('table.action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stands.map((stand) => {
            const selected = isSelected(stand.id);

            return (
              <TableRow
                key={stand.id}
                selected={selected}
                sx={{
                  '&:hover': {
                    backgroundColor: brandColors.neutral[50],
                  },
                  '&.Mui-selected': {
                    backgroundColor: brandColors.neutral[50], // Keep it subtle for selection too
                    '&:hover': {
                      backgroundColor: brandColors.neutral[50],
                    },
                  },
                  '& .MuiTableCell-body': {
                    color: brandColors.neutral[900],
                    padding: '16px 16px',
                    borderBottom: `1.275px solid ${brandColors.neutral[200]}`,
                  },
                  '& .MuiTableCell-paddingCheckbox': {
                    padding: '16px 16px 16px 24px',
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected}
                    onChange={() => handleSelectRow(stand.id)}
                    sx={{
                      padding: 0,
                      color: brandColors.neutral[200],
                      '&.Mui-checked': {
                        color: brandColors.primary.main,
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <Link
                      to={`/stands/${stand.id}`}
                      style={{
                        color: brandColors.primary.main,
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'underline';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'none';
                      }}
                    >
                      {stand.standId}
                    </Link>
                    <Typography
                      variant="caption"
                      sx={{
                        color: brandColors.neutral[500],
                      }}
                    >
                      {stand.trackingId}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStandTypeLabel(stand.standType)}
                    size="small"
                    color="secondary"
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: brandColors.neutral[900],
                      }}
                    >
                      {stand.measurement.length}x{stand.measurement.width}x{stand.measurement.height} {stand.measurement.unit}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: brandColors.neutral[500],
                      }}
                    >
                      {stand.measurement.weight} {stand.measurement.weightUnit}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: brandColors.neutral[900],
                      }}
                    >
                      {stand.oem.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: brandColors.neutral[500],
                      }}
                    >
                      {stand.oem.engine}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {stand.engineCompatibility.slice(0, 2).map((engine, index) => (
                      <Chip
                        key={index}
                        label={engine}
                        size="small"
                        color="secondary"
                        sx={{
                          borderRadius: '12px',
                        }}
                      />
                    ))}
                    {stand.engineCompatibility.length > 2 && (
                      <Chip
                        label={`+${stand.engineCompatibility.length - 2}`}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: '12px',
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Circle
                      size={8}
                      fill={stand.engineStatus === 'empty' ? brandColors.neutral[200] : brandColors.success.main}
                      color={stand.engineStatus === 'empty' ? brandColors.neutral[200] : brandColors.success.main}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: brandColors.neutral[700],
                        textTransform: 'capitalize',
                      }}
                    >
                      {stand.engineStatus}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: brandColors.neutral[900],
                      }}
                    >
                      {stand.customer.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {stand.customer.countryCode && (
                        <CountryFlag countryCode={stand.customer.countryCode} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          color: brandColors.neutral[500],
                        }}
                      >
                        {stand.customer.location}
                      </Typography>
                    </Stack>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(stand.status)}
                    size="small"
                    {...getStatusChipProps(stand.status)}
                    sx={{
                      textTransform: 'capitalize',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    sx={{
                      color: brandColors.neutral[500],
                      '&:hover': {
                        backgroundColor: brandColors.neutral[50],
                        color: brandColors.neutral[700],
                      },
                    }}
                  >
                    <MoreVertical size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody >
      </Table >
    </TableContainer >
  );
};

export default StandsTable;
