import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/common/Modal';
import MaintenanceFormFields from './components/MaintenanceFormFields';

// Validation Schema
const scheduleMaintenanceSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  location: z.string().min(1, 'Location is required'),
  stand: z.string().min(1, 'Stand is required'),
  setDate: z.string().optional(),
  notes: z.string().optional(),
});

type ScheduleMaintenanceFormData = z.infer<typeof scheduleMaintenanceSchema>;

type ScheduleMaintenanceModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleMaintenanceFormData) => Promise<void>;
};

const ScheduleMaintenanceModal = ({
  open,
  onClose,
  onSubmit,
}: ScheduleMaintenanceModalProps) => {
  const { t } = useTranslation('dashboard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScheduleMaintenanceFormData>({
    resolver: zodResolver(scheduleMaintenanceSchema),
    defaultValues: {
      customer: '',
      location: '',
      stand: '',
      setDate: '',
      notes: '',
    },
  });

  const handleFormSubmit = async (data: ScheduleMaintenanceFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error scheduling maintenance:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('modals.schedule_maintenance.title')}
      subtitle={t('modals.schedule_maintenance.subtitle')}
      maxWidth="sm"
      primaryAction={{
        label: t('modals.schedule_maintenance.schedule_button'),
        onClick: handleSubmit(handleFormSubmit),
        loading: isSubmitting,
      }}
      secondaryAction={{
        label: t('modals.schedule_maintenance.cancel_button'),
        onClick: onClose,
        disabled: isSubmitting,
      }}
    >
      <MaintenanceFormFields control={control} errors={errors} />
    </Modal>
  );
};

export default ScheduleMaintenanceModal;
