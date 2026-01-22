import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/common/Modal';
import { useRegisterMutation } from '@/store/api/authApi';
import type { ApiError } from '@/types/auth.types';
import ImageUploadSection from './components/ImageUploadSection';
import UserFormFields from './components/UserFormFields';

// Validation Schema
const addUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  division: z.string().min(1, 'Division is required'),
  department: z.string().min(1, 'Department is required'),
  country: z.string().min(1, 'Country is required'),
  poolingCenter: z.string().min(1, 'Pooling Center is required'),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const AddUserModal = ({ open, onClose, onSuccess }: AddUserModalProps) => {
  const { t } = useTranslation('dashboard');
  const [register, { isLoading: isSubmitting }] = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      division: '',
      department: '',
      country: '',
      poolingCenter: '',
    },
  });

  const handleFormSubmit = async (data: AddUserFormData) => {
    setError(null);
    try {
      const response = await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        division: data.division,
        department: data.department,
        country: data.country,
        poolingCenter: data.poolingCenter,
      }).unwrap();

      if (response.success) {
        reset();
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      const apiError = err as { data?: ApiError; status?: number };
      if (apiError.data?.message) {
        setError(apiError.data.message);
      } else if (apiError.data?.detail) {
        setError(apiError.data.detail);
      } else {
        setError(t('add_user_modal.error.generic'));
      }
      console.error('Error registering user:', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('add_user_modal.title')}
      subtitle={t('add_user_modal.subtitle')}
      maxWidth="sm"
      primaryAction={{
        label: t('add_user_modal.add_user_btn'),
        onClick: handleSubmit(handleFormSubmit),
        loading: isSubmitting,
      }}
      secondaryAction={{
        label: t('add_user_modal.cancel_btn'),
        onClick: onClose,
        disabled: isSubmitting,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Image Upload Section */}
        <ImageUploadSection disabled={isSubmitting} />

        {/* Form Fields */}
        <UserFormFields control={control} errors={errors} />
      </Box>
    </Modal>
  );
};

export default AddUserModal;
