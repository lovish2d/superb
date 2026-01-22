import { Box, TextField, MenuItem, Typography, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { brandColors } from '@/theme';

type ScheduleMaintenanceFormData = {
  customer: string;
  location: string;
  stand: string;
  setDate?: string;
  notes?: string;
};

type MaintenanceFormFieldsProps = {
  control: Control<ScheduleMaintenanceFormData>;
  errors: FieldErrors<ScheduleMaintenanceFormData>;
};

const LabelWithAsterisk = ({ label }: { label: string }) => (
  <Typography variant="formLabel">
    {label}{' '}
    <Typography component="span" sx={{ color: brandColors.critical.main }}>
      *
    </Typography>
  </Typography>
);

const locationOptions = [
  { value: 'frankfurt', label: 'Frankfurt, Germany', flag: '🇩🇪' },
  { value: 'newyork', label: 'New York, USA', flag: '🇺🇸' },
  { value: 'london', label: 'London, UK', flag: '🇬🇧' },
  { value: 'dubai', label: 'Dubai, UAE', flag: '🇦🇪' },
  { value: 'singapore', label: 'Singapore', flag: '🇸🇬' },
];

const MaintenanceFormFields = ({ control, errors }: MaintenanceFormFieldsProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Customer */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('modals.schedule_maintenance.customer_label')} />
        <Controller
          name="customer"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.customer}
              helperText={errors.customer?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        {t('modals.schedule_maintenance.customer_placeholder')}
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                {t('modals.schedule_maintenance.customer_placeholder')}
              </MenuItem>
              <MenuItem value="customer1">Customer 1</MenuItem>
              <MenuItem value="customer2">Customer 2</MenuItem>
              <MenuItem value="customer3">Customer 3</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* Location */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('modals.schedule_maintenance.location_label')} />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.location}
              helperText={errors.location?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        {t('modals.schedule_maintenance.location_placeholder')}
                      </Typography>
                    );
                  }
                  const selectedOption = locationOptions.find((opt) => opt.value === value);
                  if (selectedOption) {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Typography component="span">{selectedOption.flag}</Typography>
                        <Typography component="span">{selectedOption.label}</Typography>
                      </Box>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                {t('modals.schedule_maintenance.location_placeholder')}
              </MenuItem>
              {locationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography component="span">{option.flag}</Typography>
                    <Typography component="span">{option.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      {/* Stand */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('modals.schedule_maintenance.stand_label')} />
        <Controller
          name="stand"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.stand}
              helperText={errors.stand?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        {t('modals.schedule_maintenance.stand_placeholder')}
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                {t('modals.schedule_maintenance.stand_placeholder')}
              </MenuItem>
              <MenuItem value="stand1">Stand 1</MenuItem>
              <MenuItem value="stand2">Stand 2</MenuItem>
              <MenuItem value="stand3">Stand 3</MenuItem>
              <MenuItem value="stand4">Stand 4</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* Set Date */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="formLabel">
          {t('modals.schedule_maintenance.set_date_label')}
        </Typography>
        <Controller
          name="setDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={t('modals.schedule_maintenance.set_date_placeholder')}
              error={!!errors.setDate}
              helperText={errors.setDate?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Calendar size={20} color={brandColors.neutral[500]} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>

      {/* Notes */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="formLabel">
          {t('modals.schedule_maintenance.notes_label')}
        </Typography>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={t('modals.schedule_maintenance.notes_placeholder')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              fullWidth
              multiline
              rows={3}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default MaintenanceFormFields;
