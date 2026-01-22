import { Box, TextField, MenuItem, Typography, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { brandColors } from '@/theme';

type GenerateReportFormData = {
  reportType: string;
  country: string;
  city: string;
  basedOn: string;
  customer: string;
  startDate?: string;
  endDate?: string;
};

type ReportFormFieldsProps = {
  control: Control<GenerateReportFormData>;
  errors: FieldErrors<GenerateReportFormData>;
};

const LabelWithAsterisk = ({ label }: { label: string }) => (
  <Typography variant="formLabel">
    {label}{' '}
    <Typography component="span" sx={{ color: brandColors.critical.main }}>
      *
    </Typography>
  </Typography>
);

const ReportFormFields = ({ control, errors }: ReportFormFieldsProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Report Type */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('modals.generate_report.report_type_label')} />
        <Controller
          name="reportType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.reportType}
              helperText={errors.reportType?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        {t('modals.generate_report.report_type_placeholder')}
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                {t('modals.generate_report.report_type_placeholder')}
              </MenuItem>
              <MenuItem value="operational">Operational Report</MenuItem>
              <MenuItem value="financial">Financial Report</MenuItem>
              <MenuItem value="maintenance">Maintenance Report</MenuItem>
              <MenuItem value="inventory">Inventory Report</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* Country and City - Side by Side */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {/* Country */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <LabelWithAsterisk label={t('modals.generate_report.country_label')} />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                error={!!errors.country}
                helperText={errors.country?.message}
                fullWidth
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => {
                    if (!value) {
                      return (
                        <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                          {t('modals.generate_report.country_placeholder')}
                        </Typography>
                      );
                    }
                    return String(value);
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                  {t('modals.generate_report.country_placeholder')}
                </MenuItem>
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="de">Germany</MenuItem>
                <MenuItem value="fr">France</MenuItem>
                <MenuItem value="uae">UAE</MenuItem>
                <MenuItem value="sg">Singapore</MenuItem>
              </TextField>
            )}
          />
        </Box>

        {/* City */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <LabelWithAsterisk label={t('modals.generate_report.city_label')} />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                error={!!errors.city}
                helperText={errors.city?.message}
                fullWidth
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => {
                    if (!value) {
                      return (
                        <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                          {t('modals.generate_report.city_placeholder')}
                        </Typography>
                      );
                    }
                    return String(value);
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                  {t('modals.generate_report.city_placeholder')}
                </MenuItem>
                <MenuItem value="newyork">New York</MenuItem>
                <MenuItem value="london">London</MenuItem>
                <MenuItem value="frankfurt">Frankfurt</MenuItem>
                <MenuItem value="paris">Paris</MenuItem>
                <MenuItem value="dubai">Dubai</MenuItem>
                <MenuItem value="singapore">Singapore</MenuItem>
              </TextField>
            )}
          />
        </Box>
      </Box>

      {/* Based On */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('modals.generate_report.based_on_label')} />
        <Controller
          name="basedOn"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.basedOn}
              helperText={errors.basedOn?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        {t('modals.generate_report.based_on_placeholder')}
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                {t('modals.generate_report.based_on_placeholder')}
              </MenuItem>
              <MenuItem value="by_customer">By Customer</MenuItem>
              <MenuItem value="by_location">By Location</MenuItem>
              <MenuItem value="by_stand">By Stand</MenuItem>
              <MenuItem value="by_date">By Date</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* Customer */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('modals.generate_report.customer_label')} />
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
                        {t('modals.generate_report.customer_placeholder')}
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                {t('modals.generate_report.customer_placeholder')}
              </MenuItem>
              <MenuItem value="customer1">Customer 1</MenuItem>
              <MenuItem value="customer2">Customer 2</MenuItem>
              <MenuItem value="customer3">Customer 3</MenuItem>
              <MenuItem value="customer4">Customer 4</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* Start Date and End Date - Side by Side */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {/* Start Date */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="formLabel">
            {t('modals.generate_report.start_date_label')}
          </Typography>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('modals.generate_report.start_date_placeholder')}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
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

        {/* End Date */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="formLabel">
            {t('modals.generate_report.end_date_label')}
          </Typography>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('modals.generate_report.end_date_placeholder')}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
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
      </Box>
    </Box>
  );
};

export default ReportFormFields;
