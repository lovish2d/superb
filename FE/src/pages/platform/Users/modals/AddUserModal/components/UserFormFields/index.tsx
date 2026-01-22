import { Box, TextField, MenuItem, Typography, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';

type AddUserFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  division: string;
  department: string;
  country: string;
  poolingCenter: string;
};

type UserFormFieldsProps = {
  control: Control<AddUserFormData>;
  errors: FieldErrors<AddUserFormData>;
};

const LabelWithAsterisk = ({ label }: { label: string }) => (
  <Typography variant="formLabel">
    {label}{' '}
    <Typography component="span" sx={{ color: brandColors.critical.main }}>
      *
    </Typography>
  </Typography>
);

const UserFormFields = ({ control, errors }: UserFormFieldsProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      {/* First Name */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('add_user_modal.first_name_label')} />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={t('add_user_modal.first_name_placeholder')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Last Name */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('add_user_modal.last_name_label')} />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={t('add_user_modal.last_name_placeholder')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Phone Number */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('add_user_modal.phone_label')} />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="234-567-8900"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mr: 1,
                        bgcolor: brandColors.neutral[50],
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2">🇺🇸 +1</Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>

      {/* Email Address */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('add_user_modal.email_label')} />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="user@superb.com"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Division */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('add_user_modal.division_label')} />
        <Controller
          name="division"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.division}
              helperText={errors.division?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        Select division
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                Select division
              </MenuItem>
              <MenuItem value="operations">Operations</MenuItem>
              <MenuItem value="engineering">Engineering</MenuItem>
              <MenuItem value="logistics">Logistics</MenuItem>
              <MenuItem value="administration">Administration</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* Department */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LabelWithAsterisk label={t('add_user_modal.department_label')} />
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.department}
              helperText={errors.department?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        Select Department
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                Select Department
              </MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="planning">Planning</MenuItem>
              <MenuItem value="quality_assurance">Quality Assurance</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="it">IT</MenuItem>
            </TextField>
          )}
        />
      </Box>

      {/* Country */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="formLabel">{t('add_user_modal.country_label')}</Typography>
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
                        Select Country
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                Select Country
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

      {/* Pooling Center */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="formLabel">{t('add_user_modal.pooling_center_label')}</Typography>
        <Controller
          name="poolingCenter"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors.poolingCenter}
              helperText={errors.poolingCenter?.message}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value) {
                    return (
                      <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                        Select Pooling Center
                      </Typography>
                    );
                  }
                  return String(value);
                },
              }}
            >
              <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                Select Pooling Center
              </MenuItem>
              <MenuItem value="jfk">New York (JFK)</MenuItem>
              <MenuItem value="lhr">London (LHR)</MenuItem>
              <MenuItem value="fra">Frankfurt (FRA)</MenuItem>
              <MenuItem value="dxb">Dubai (DXB)</MenuItem>
              <MenuItem value="sin">Singapore (SIN)</MenuItem>
            </TextField>
          )}
        />
      </Box>
    </Box>
  );
};

export default UserFormFields;
