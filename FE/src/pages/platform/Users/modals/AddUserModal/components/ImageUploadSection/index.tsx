import { useRef, useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Image, Upload } from 'lucide-react';
import { brandColors } from '@/theme';

type ImageUploadSectionProps = {
  disabled?: boolean;
};

const ImageUploadSection = ({ disabled = false }: ImageUploadSectionProps) => {
  const { t } = useTranslation('dashboard');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const isValidType = file.type === 'image/png' || file.type === 'image/jpeg';
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isValidType || !isValidSize) {
      setUploadError(t('add_user_modal.error.invalid_image'));
      event.target.value = '';
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  return (
    <>
      {uploadError && (
        <Alert severity="warning" sx={{ mb: 1 }}>
          {uploadError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: brandColors.neutral[50],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {imagePreview ? (
            <Box
              component="img"
              src={imagePreview}
              alt={t('add_user_modal.upload_image')}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Image size={32} color={brandColors.primary.main} />
          )}
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Upload size={16} />}
            sx={{
              mb: 1,
              textTransform: 'none',
              color: brandColors.neutral[900],
              borderColor: brandColors.neutral[200],
            }}
            onClick={handleUploadClick}
            disabled={disabled}
          >
            {t('add_user_modal.upload_image')}
          </Button>
          <Typography variant="body2" sx={{ color: brandColors.neutral[500] }}>
            {t('add_user_modal.upload_helper')}
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default ImageUploadSection;
