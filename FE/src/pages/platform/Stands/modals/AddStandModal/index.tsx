import { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Chip,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme';
import Modal from '@/components/common/Modal';

// Zod schema for form validation
const addStandFormSchema = z.object({
  standImage: z.instanceof(File).optional(),
  engineType: z.string().min(1, 'Engine type is required'),
  standOemManufacturer: z.string().min(1, 'Stand OEM manufacturer is required'),
  ownershipStatus: z.string().min(1, 'Ownership status is required'),
  engineOemAuto: z.string().optional(),
  engineStatus: z.string().min(1, 'Engine status is required'),
  trackingId: z.string().optional(),
  otherCompatibleEngines: z.array(z.string()).optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  poolingCenter: z.string().min(1, 'Pooling center is required'),
  category: z.string().min(1, 'Category is required'),
  basePartNumber: z.string().min(1, 'Base part number is required'),
  baseSerialNumber: z.string().min(1, 'Base serial number is required'),
  cradlePartNumber: z.string().min(1, 'Cradle part number is required'),
  cradleSerialNumber: z.string().min(1, 'Cradle serial number is required'),
  manufactureDate: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  specifications: z.string().optional(),
  attachments: z.array(z.instanceof(File)).optional(),
});

type AddStandFormData = z.infer<typeof addStandFormSchema>;

type AddStandModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: AddStandFormData) => void;
};

const AddStandModal = ({ open, onClose, onSubmit }: AddStandModalProps) => {
  const { t } = useTranslation('stands');
  const [physicalDimensionsTab, setPhysicalDimensionsTab] = useState<'without' | 'with'>('without');
  const [selectedEngines, setSelectedEngines] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<AddStandFormData>({
    resolver: zodResolver(addStandFormSchema),
    defaultValues: {
      engineType: '',
      standOemManufacturer: '',
      ownershipStatus: '',
      engineOemAuto: '',
      engineStatus: '',
      trackingId: '',
      otherCompatibleEngines: [],
      country: '',
      city: '',
      poolingCenter: '',
      category: '',
      basePartNumber: '',
      baseSerialNumber: '',
      cradlePartNumber: '',
      cradleSerialNumber: '',
      manufactureDate: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      specifications: '',
      attachments: [],
    },
  });

  const engineStatus = useWatch({ control, name: 'engineStatus' });

  const onSubmitForm = async (data: AddStandFormData) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleRemoveEngine = (engine: string) => {
    setSelectedEngines(selectedEngines.filter((e) => e !== engine));
  };

  const handleFileUpload = (field: 'standImage' | 'attachments', file: File | File[]) => {
    if (field === 'standImage' && file instanceof File) {
      setValue('standImage', file);
    } else if (field === 'attachments' && Array.isArray(file)) {
      setValue('attachments', file);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t('modals.add_stand.title')}
      subtitle={t('modals.add_stand.subtitle')}
      maxWidth="sm"
      fullWidth
      primaryAction={{
        label: t('modals.add_stand.actions.register_stand'),
        onClick: handleSubmit(onSubmitForm),
        disabled: isSubmitting,
        loading: isSubmitting,
        variant: 'contained',
      }}
      secondaryAction={{
        label: t('modals.add_stand.actions.cancel'),
        onClick: handleClose,
        disabled: isSubmitting,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Stand Image Upload */}
        <Box>
          <Typography variant="subsectionHeading" sx={{ mb: 1 }}>
            {t('modals.add_stand.sections.stand_image')}
          </Typography>
          <Box
            sx={{
              border: `1.2px dashed ${brandColors.neutral[200]}`,
              borderRadius: '10px',
              height: '192px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
              '&:hover': {
                borderColor: brandColors.primary.main,
              },
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/png,image/jpeg';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleFileUpload('standImage', file);
              };
              input.click();
            }}
          >
            <Upload size={32} color={brandColors.neutral[500]} />
            <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
              {t('modals.add_stand.fields.stand_image_upload')}
            </Typography>
            <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
              {t('modals.add_stand.fields.stand_image_format')}
            </Typography>
          </Box>
        </Box>

        {/* Identity & Stand Registration */}
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('modals.add_stand.sections.identity_registration')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="engineType"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.engine_type')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.engineType}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select {t('modals.add_stand.fields.engine_type')}
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select {t('modals.add_stand.fields.engine_type')}
                      </MenuItem>
                      <MenuItem value="trent_xwb">Trent XWB</MenuItem>
                      <MenuItem value="ge9x">GE9X</MenuItem>
                      <MenuItem value="cfm56">CFM56</MenuItem>
                    </TextField>
                    {errors.engineType && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.engineType.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                name="standOemManufacturer"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.stand_oem_manufacturer')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.standOemManufacturer}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select OEM
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select OEM
                      </MenuItem>
                      <MenuItem value="frank_brown">Frank Brown</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                    {errors.standOemManufacturer && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.standOemManufacturer.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="ownershipStatus"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.ownership_status')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.ownershipStatus}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select {t('modals.add_stand.fields.ownership_status')}
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select {t('modals.add_stand.fields.ownership_status')}
                      </MenuItem>
                      <MenuItem value="purchased_new">Purchased new</MenuItem>
                      <MenuItem value="leased">Leased</MenuItem>
                      <MenuItem value="rented">Rented</MenuItem>
                    </TextField>
                    {errors.ownershipStatus && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.ownershipStatus.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                name="engineOemAuto"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.engine_oem_auto')}
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      disabled
                    />
                  </Box>
                )}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="engineStatus"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.engine_status')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.engineStatus}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select {t('modals.add_stand.fields.engine_status')}
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select {t('modals.add_stand.fields.engine_status')}
                      </MenuItem>
                      <MenuItem value="without">○ Without Engine</MenuItem>
                      <MenuItem value="with">✓ With Engine</MenuItem>
                    </TextField>
                    {errors.engineStatus && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.engineStatus.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="formLabel">
                  {t('modals.add_stand.fields.tracking_id')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Controller
                    name="trackingId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        placeholder={t('modals.add_stand.fields.tracking_id_placeholder')}
                        sx={{ flex: 1 }}
                      />
                    )}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const getRandomString = () => Math.random().toString(36).substring(2, 10).toUpperCase();
                      const generatedId = `TRK-${getRandomString()}`;
                      setValue('trackingId', generatedId);
                    }}
                    sx={{ minWidth: '96px' }}
                  >
                    {t('modals.add_stand.fields.generate')}
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Other Compatible Engines */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subsectionHeading">
                {t('modals.add_stand.fields.other_compatible_engines')}
              </Typography>
              <Controller
                name="otherCompatibleEngines"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    value=""
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value && !selectedEngines.includes(value)) {
                        const newEngines = [...selectedEngines, value];
                        setSelectedEngines(newEngines);
                        field.onChange(newEngines);
                      }
                    }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: () => {
                        return (
                          <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                            Please select {t('modals.add_stand.fields.other_compatible_engines')}
                          </Typography>
                        );
                      },
                    }}
                  >
                    <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                      Please select {t('modals.add_stand.fields.other_compatible_engines')}
                    </MenuItem>
                    <MenuItem value="trent_xwb">Trent XWB</MenuItem>
                    <MenuItem value="ge9x">GE9X</MenuItem>
                    <MenuItem value="cfm56">CFM56</MenuItem>
                  </TextField>
                )}
              />
              {selectedEngines.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                  {selectedEngines.map((engine) => (
                    <Chip
                      key={engine}
                      label={engine.replace('_', ' ').toUpperCase()}
                      onDelete={() => handleRemoveEngine(engine)}
                      size="small"
                      color="secondary"
                      sx={{
                        '& .MuiChip-deleteIcon': {
                          color: brandColors.neutral[900],
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: brandColors.neutral[200] }} />

        {/* Location & Pooling Center */}
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('modals.add_stand.sections.location_pooling')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.country')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.country}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select {t('modals.add_stand.fields.country')}
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select {t('modals.add_stand.fields.country')}
                      </MenuItem>
                      <MenuItem value="us">United States</MenuItem>
                      <MenuItem value="uk">United Kingdom</MenuItem>
                      <MenuItem value="de">Germany</MenuItem>
                    </TextField>
                    {errors.country && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.country.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.city')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.city}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select {t('modals.add_stand.fields.city')}
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select {t('modals.add_stand.fields.city')}
                      </MenuItem>
                      <MenuItem value="new_york">New York</MenuItem>
                      <MenuItem value="london">London</MenuItem>
                      <MenuItem value="frankfurt">Frankfurt</MenuItem>
                    </TextField>
                    {errors.city && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.city.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="poolingCenter"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.pooling_center')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.poolingCenter}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select {t('modals.add_stand.fields.pooling_center')}
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select {t('modals.add_stand.fields.pooling_center')}
                      </MenuItem>
                      <MenuItem value="center1">Pooling Center 1</MenuItem>
                      <MenuItem value="center2">Pooling Center 2</MenuItem>
                    </TextField>
                    {errors.poolingCenter && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.poolingCenter.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.category')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      select
                      fullWidth
                      error={!!errors.category}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => {
                          if (!value) {
                            return (
                              <Typography component="span" sx={{ color: brandColors.neutral[500] }}>
                                Please select {t('modals.add_stand.fields.category')}
                              </Typography>
                            );
                          }
                          return String(value);
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: brandColors.neutral[500] }}>
                        Please select {t('modals.add_stand.fields.category')}
                      </MenuItem>
                      <MenuItem value="homebase">Homebase</MenuItem>
                      <MenuItem value="pool">Pool</MenuItem>
                      <MenuItem value="third_party">Third Party</MenuItem>
                    </TextField>
                    {errors.category && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.category.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: brandColors.neutral[200] }} />

        {/* Base & Cradle Components */}
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('modals.add_stand.sections.base_cradle')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="basePartNumber"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.base_part_number')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.base_part_number_placeholder')}
                      error={!!errors.basePartNumber}
                    />
                    {errors.basePartNumber && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.basePartNumber.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                name="baseSerialNumber"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.base_serial_number')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.base_serial_number_placeholder')}
                      error={!!errors.baseSerialNumber}
                    />
                    {errors.baseSerialNumber && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.baseSerialNumber.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="cradlePartNumber"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.cradle_part_number')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.cradle_part_number_placeholder')}
                      error={!!errors.cradlePartNumber}
                    />
                    {errors.cradlePartNumber && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.cradlePartNumber.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
              <Controller
                name="cradleSerialNumber"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.cradle_serial_number')}{' '}
                      <Typography component="span" sx={{ color: brandColors.critical.main }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.cradle_serial_number_placeholder')}
                      error={!!errors.cradleSerialNumber}
                    />
                    {errors.cradleSerialNumber && (
                      <Typography
                        variant="caption"
                        sx={{ color: brandColors.critical.main, display: 'block', mt: 0.5 }}
                      >
                        {errors.cradleSerialNumber.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>

            <Controller
              name="manufactureDate"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="subsectionHeading">
                    {t('modals.add_stand.fields.manufacture_date')}
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    placeholder={t('modals.add_stand.fields.manufacture_date_placeholder')}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              )}
            />
          </Box>
        </Box>

        <Divider sx={{ borderColor: brandColors.neutral[200] }} />

        {/* Physical Dimensions */}
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('modals.add_stand.sections.physical_dimensions')}
          </Typography>
          <Box
            sx={{
              backgroundColor: brandColors.neutral[50],
              borderRadius: '10px',
              padding: '4px',
              mb: 2,
            }}
          >
            <Tabs
              value={physicalDimensionsTab}
              onChange={(_, newValue) => {
                const getNewValue = () => newValue as 'without' | 'with';
                setPhysicalDimensionsTab(getNewValue());
              }}
            >
              <Tab
                value="without"
                label={t('modals.add_stand.tabs.without_engine')}
                sx={{
                  flex: 1,
                }}
              />
              <Tab
                value="with"
                label={t('modals.add_stand.tabs.with_engine')}
                sx={{
                  flex: 1,
                }}
              />
            </Tabs>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="length"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.length')}
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.length_placeholder')}
                      type="number"
                    />
                  </Box>
                )}
              />
              <Controller
                name="width"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.width')}
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.width_placeholder')}
                      type="number"
                    />
                  </Box>
                )}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.height')}
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.height_placeholder')}
                      type="number"
                    />
                  </Box>
                )}
              />
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="formLabel">
                      {t('modals.add_stand.fields.weight')}
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t('modals.add_stand.fields.weight_placeholder')}
                      type="number"
                    />
                  </Box>
                )}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: brandColors.neutral[200] }} />

        {/* Specifications */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subsectionHeading">
            {t('modals.add_stand.sections.specifications')}
          </Typography>
          <Controller
            name="specifications"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                // rows={4}
                placeholder={t('modals.add_stand.fields.specifications_placeholder')}
              />
            )}
          />
        </Box>

        {/* Attachments */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subsectionHeading">
            {t('modals.add_stand.sections.attachments')}
          </Typography>
          <Box
            sx={{
              border: `1.2px dashed ${brandColors.neutral[200]}`,
              borderRadius: '10px',
              height: '192px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
              '&:hover': {
                borderColor: brandColors.primary.main,
              },
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.accept = 'application/pdf,image/*';
              input.onchange = (e) => {
                const files = Array.from((e.target as HTMLInputElement).files || []);
                if (files.length > 0) handleFileUpload('attachments', files);
              };
              input.click();
            }}
          >
            <Upload size={32} color={brandColors.neutral[500]} />
            <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
              {t('modals.add_stand.fields.attachments_upload')}
            </Typography>
            <Typography variant="caption" sx={{ color: brandColors.neutral[500] }}>
              {t('modals.add_stand.fields.attachments_format')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddStandModal;