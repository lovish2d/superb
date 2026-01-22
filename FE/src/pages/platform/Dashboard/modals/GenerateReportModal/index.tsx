import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/common/Modal';
import ReportFormFields from './components/ReportFormFields';

// Validation Schema
const generateReportSchema = z.object({
  reportType: z.string().min(1, 'Report type is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  basedOn: z.string().min(1, 'Based on is required'),
  customer: z.string().min(1, 'Customer is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type GenerateReportFormData = z.infer<typeof generateReportSchema>;

type GenerateReportModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: GenerateReportFormData) => Promise<void>;
};

const GenerateReportModal = ({ open, onClose, onSubmit }: GenerateReportModalProps) => {
  const { t } = useTranslation('dashboard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GenerateReportFormData>({
    resolver: zodResolver(generateReportSchema),
    defaultValues: {
      reportType: '',
      country: '',
      city: '',
      basedOn: '',
      customer: '',
      startDate: '',
      endDate: '',
    },
  });

  const handleFormSubmit = async (data: GenerateReportFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('modals.generate_report.title')}
      subtitle={t('modals.generate_report.subtitle')}
      maxWidth="sm"
      primaryAction={{
        label: t('modals.generate_report.generate_button'),
        onClick: handleSubmit(handleFormSubmit),
        loading: isSubmitting,
      }}
      secondaryAction={{
        label: t('modals.generate_report.cancel_button'),
        onClick: onClose,
        disabled: isSubmitting,
      }}
    >
      <ReportFormFields control={control} errors={errors} />
    </Modal>
  );
};

export default GenerateReportModal;
