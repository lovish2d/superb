import type { ReactNode } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { X } from 'lucide-react';
import { brandColors } from '@/theme';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
};

const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  primaryAction,
  secondaryAction,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1.5,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
        backdrop: {
          sx: {
            backgroundColor: 'rgba(15, 23, 43, 0.5)',
          },
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ color: brandColors.neutral[900] }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{ color: brandColors.neutral[500], mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {showCloseButton && (
            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          )}
        </Box>
      </Box>
      <DialogContent
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {children}
      </DialogContent>
      {(primaryAction || secondaryAction) && (
        <DialogActions
          sx={{
            px: 3,
            py: 2.5,
            gap: 1.5,
          }}
        >
          {secondaryAction && (
            <Button
              variant="outlined"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled || primaryAction?.loading}
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant={primaryAction.variant || 'contained'}
              color={primaryAction.color || 'primary'}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled || primaryAction.loading}
            >
              {primaryAction.loading ? 'Loading...' : primaryAction.label}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;

