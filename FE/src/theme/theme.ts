import { createTheme, alpha } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { brandColors } from './colors';

// Extend MUI Palette and Typography types
declare module '@mui/material/styles' {
  interface Palette {
    // Add custom palette properties here
  }

  interface PaletteOptions {
    // Add custom palette options here
  }

  interface TypographyVariants {
    formLabel: React.CSSProperties;
    subsectionHeading: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    formLabel?: React.CSSProperties;
    subsectionHeading?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    formLabel: true;
    subsectionHeading: true;
  }
}

// MUI Theme configuration
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: brandColors.primary.main,
      light: brandColors.primary.light,
      dark: brandColors.primary.hover,
      contrastText: brandColors.primary.foreground,
    },
    secondary: {
      main: brandColors.neutral[500], // Using neutral as secondary
      light: brandColors.neutral[200],
      dark: brandColors.neutral[900],
      contrastText: brandColors.white,
    },
    error: {
      main: brandColors.critical.main,
      light: brandColors.critical.light,
      dark: brandColors.critical.dark,
    },
    warning: {
      main: brandColors.warning.main,
      light: brandColors.warning.light,
      dark: brandColors.warning.dark,
    },
    info: {
      main: brandColors.primary.main, // Using primary blue for info
      light: brandColors.primary.light,
      dark: brandColors.primary.hover,
    },
    success: {
      main: brandColors.success.main,
      light: brandColors.success.light,
      dark: brandColors.success.dark,
    },
    background: {
      default: brandColors.white,
      paper: brandColors.white,
    },
    text: {
      primary: brandColors.neutral[900],
      secondary: brandColors.neutral[500],
      disabled: brandColors.neutral[500],
    },
    divider: brandColors.neutral[200],
  },
  typography: {
    fontFamily: 'Inter',
    // Display Heading - 36px, Semi Bold
    h4: {
      fontSize: '2.25rem', // 36px
      fontWeight: 600, // Semi Bold
      lineHeight: 'normal',
      color: brandColors.neutral[900],
    },
    // Display Heading - 30px, Semi Bold
    h5: {
      fontSize: '1.875rem', // 30px
      fontWeight: 600, // Semi Bold
      lineHeight: 'normal',
      color: brandColors.neutral[900],
    },
    // Page Heading (H1) - 24px, Semi Bold, lineHeight: 32px
    h1: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600, // Semi Bold
      lineHeight: 1.33, // 32px / 24px
      color: brandColors.neutral[900],
    },
    // Section Heading (H2) - 20px, Semi Bold, lineHeight: 28px
    h2: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600, // Semi Bold
      lineHeight: 1.4, // 28px / 20px
      color: brandColors.neutral[900],
    },
    // Card Title (H3) - 18px, Medium
    h3: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500, // Medium
      lineHeight: 'normal',
      color: brandColors.neutral[900],
    },
    // H6 - kept for compatibility (not in Figma)
    h6: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 'normal',
      color: brandColors.neutral[900],
    },
    // Body Text - 16px, Medium, color: #45556C
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 500, // Medium
      lineHeight: 'normal',
      color: brandColors.neutral[700],
    },
    // Small Text - 14px, Medium, color: #62748E
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500, // Medium
      lineHeight: 'normal',
      color: brandColors.neutral[500],
    },
    // Label/Overline - 12px, Regular, color: #62748E
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400, // Regular
      lineHeight: 'normal',
      color: brandColors.neutral[500],
    },
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400, // Regular
      lineHeight: 'normal',
      color: brandColors.neutral[500],
      textTransform: 'uppercase',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    // Form Label - 14px, Regular, color: #0f172b (neutral[900])
    formLabel: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400, // Regular
      lineHeight: 'normal',
      color: brandColors.neutral[900],
    },
    // Subsection Heading - 16px, Medium, color: #0f172b (neutral[900])
    subsectionHeading: {
      fontSize: '1rem', // 16px
      fontWeight: 500, // Medium
      lineHeight: 'normal',
      color: brandColors.neutral[900],
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '14px',
          boxShadow: 'none',
          padding: '7px 16px',
          minHeight: 36,
          '&:hover': {
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: `2px solid ${brandColors.white}`,
            outlineOffset: '2px',
          },
        },
        // Primary Button (Contained)
        contained: {
          backgroundColor: brandColors.primary.main,
          color: brandColors.white,
          '&:hover': {
            backgroundColor: brandColors.primary.hover,
            boxShadow: 'none',
          },
          '&:focus-visible': {
            backgroundColor: brandColors.primary.main,
            outline: `2px solid ${brandColors.white}`,
            outlineOffset: '2px',
            boxShadow: `0 0 0 4px ${brandColors.focus.primary}`,
          },
          '&.Mui-disabled': {
            backgroundColor: brandColors.primary.main,
            color: brandColors.white,
          },
        },
        // Secondary Button (Outlined with background) - uses secondary color
        outlined: {
          borderWidth: '1.275px',
          '&:not(.MuiButton-colorError)': {
            backgroundColor: brandColors.neutral[50],
            borderColor: brandColors.neutral[50],
            color: brandColors.neutral[900],
            '&:hover': {
              backgroundColor: brandColors.neutral[200],
              borderColor: brandColors.neutral[50],
              boxShadow: 'none',
            },
            '&:focus-visible': {
              backgroundColor: brandColors.neutral[50],
              borderColor: brandColors.neutral[50],
              outline: `2px solid ${brandColors.white}`,
              outlineOffset: '2px',
              boxShadow: `0 0 0 4px ${brandColors.focus.primary}`,
            },
            '&.Mui-disabled': {
              backgroundColor: brandColors.neutral[50],
              borderColor: brandColors.neutral[50],
              color: brandColors.neutral[500],
            },
          },
        },
        // Outline with border only (white background, border)
        outlinedPrimary: {
          backgroundColor: brandColors.white,
          borderColor: brandColors.neutral[50],
          color: brandColors.neutral[900],
          '&:hover': {
            backgroundColor: brandColors.neutral[200],
            borderColor: brandColors.neutral[50],
            boxShadow: 'none',
          },
          '&:focus-visible': {
            backgroundColor: brandColors.white,
            borderColor: brandColors.neutral[50],
            outline: `2px solid ${brandColors.white}`,
            outlineOffset: '2px',
            boxShadow: `0 0 0 4px ${brandColors.focus.primary}`,
          },
          '&.Mui-disabled': {
            backgroundColor: brandColors.white,
            borderColor: brandColors.neutral[50],
            color: brandColors.neutral[500],
          },
        },
        // Destructive Button (Error color)
        containedError: {
          backgroundColor: brandColors.critical.main,
          color: brandColors.white,
          '&:hover': {
            backgroundColor: brandColors.critical.dark,
            boxShadow: 'none',
          },
          '&:focus-visible': {
            backgroundColor: brandColors.critical.main,
            outline: `2px solid ${brandColors.white}`,
            outlineOffset: '2px',
            boxShadow: `0 0 0 4px ${brandColors.focus.destructive}`,
          },
          '&.Mui-disabled': {
            backgroundColor: brandColors.critical.main,
            color: brandColors.white,
            opacity: 0.5,
          },
        },
        // Text Button (Ghost - no border)
        text: {
          color: brandColors.neutral[900],
          '&:hover': {
            backgroundColor: brandColors.neutral[100],
            boxShadow: 'none',
          },
          '&:focus-visible': {
            backgroundColor: 'transparent',
            outline: `2px solid ${brandColors.white}`,
            outlineOffset: '2px',
            boxShadow: `0 0 0 4px ${brandColors.focus.primary}`,
          },
          '&.Mui-disabled': {
            color: brandColors.neutral[900],
            opacity: 0.5,
          },
        },
        // Size variants
        sizeSmall: {
          minHeight: 32,
          padding: '6px 12px',
          fontSize: '14px',
        },
        sizeLarge: {
          minHeight: 40,
          padding: '8px 24px',
          fontSize: '14px',
        },
        // Icon button sizes
        startIcon: {
          marginRight: '10px',
          marginLeft: 0,
        },
        endIcon: {
          marginLeft: '10px',
          marginRight: 0,
        },
      },
    },
    // Icon Button
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:focus-visible': {
            outline: `2px solid ${brandColors.white}`,
            outlineOffset: '2px',
            boxShadow: `0 0 0 4px ${brandColors.focus.primary}`,
          },
        },
        colorPrimary: {
          backgroundColor: brandColors.primary.main,
          color: brandColors.white,
          '&:hover': {
            backgroundColor: brandColors.primary.hover,
          },
          '&:focus-visible': {
            backgroundColor: brandColors.primary.main,
            boxShadow: `0 0 0 4px ${brandColors.focus.primary}`,
          },
          '&.Mui-disabled': {
            backgroundColor: brandColors.primary.main,
            color: brandColors.white,
            opacity: 0.5,
          },
        },
        sizeSmall: {
          padding: 6,
          '& svg': {
            fontSize: '16px',
          },
        },
        sizeMedium: {
          padding: 8,
          '& svg': {
            fontSize: '16px',
          },
        },
        sizeLarge: {
          padding: 10,
          '& svg': {
            fontSize: '20px',
          },
        },
      },
    },
    // Link Button (MUI Link component)
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          color: brandColors.primary.main,
          textDecoration: 'underline',
          '&:hover': {
            color: brandColors.primary.hover,
            textDecoration: 'underline',
          },
          '&:focus-visible': {
            outline: `2px solid ${brandColors.white}`,
            outlineOffset: '2px',
            borderRadius: 4,
            boxShadow: `0 0 0 4px ${brandColors.focus.link}`,
          },
          '&.Mui-disabled': {
            color: brandColors.primary.main,
            opacity: 0.5,
            textDecoration: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: `1px solid ${brandColors.neutral[200]}`,
        },
      },
    },
    // TextField (Text Inputs)
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontFamily: 'Inter',
            borderRadius: 8,
            backgroundColor: brandColors.neutral[50],
            fontSize: '14px',
            height: 36,
            '& fieldset': {
              borderColor: 'transparent',
              borderWidth: '1.275px',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused': {
              backgroundColor: brandColors.white,
              '& fieldset': {
                borderColor: brandColors.primary.main,
                borderWidth: '1.275px',
              },
            },
            '&.Mui-disabled': {
              backgroundColor: brandColors.neutral[50],
              opacity: 0.5,
              '& fieldset': {
                borderColor: 'transparent',
              },
            },
            '&.Mui-error': {
              backgroundColor: brandColors.white,
              '& fieldset': {
                borderColor: brandColors.critical.light,
                borderWidth: '1.275px',
              },
              '&.Mui-focused fieldset': {
                borderColor: brandColors.critical.light,
              },
              '& input': {
                color: brandColors.critical.dark,
                fontWeight: 500, // Medium for error state text
              },
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '4px 12px',
            color: brandColors.neutral[900],
            fontWeight: 500, // Medium for filled state
            '&::placeholder': {
              color: brandColors.neutral[500],
              fontWeight: 400, // Regular for placeholder
              opacity: 1,
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            color: brandColors.neutral[900],
            '&.Mui-focused': {
              color: brandColors.neutral[900],
            },
            '&.Mui-error': {
              color: brandColors.critical.main,
            },
          },
          '& .MuiFormHelperText-root': {
            fontFamily: 'Inter',
            fontSize: '12px',
            marginTop: '4px',
            marginLeft: 0,
            '&.Mui-error': {
              color: brandColors.critical.main,
            },
          },
          // TextArea (multiline) specific styles
          '& .MuiInputBase-inputMultiline': {
            padding: '8px 12px',
            minHeight: '63.992px',
            fontWeight: 500, // Medium for filled state
            color: brandColors.neutral[900],
            '&::placeholder': {
              color: brandColors.neutral[500],
              fontWeight: 500, // Medium for placeholder (per Figma)
              opacity: 1,
            },
          },
        },
      },
    },
    // InputAdornment (for icons in inputs)
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: brandColors.neutral[500],
          '& .MuiSvgIcon-root': {
            fontSize: 16,
            color: brandColors.neutral[500],
          },
        },
        positionStart: {
          marginRight: 0,
          paddingLeft: '12px',
        },
        positionEnd: {
          marginLeft: 0,
          paddingRight: '12px',
        },
      },
    },
    // Select Dropdown
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          borderRadius: 8,
          backgroundColor: brandColors.neutral[50],
          fontSize: '14px',
          fontWeight: 500, // Medium for selected value
          height: 36,
          color: brandColors.neutral[900], // Selected value color
          '& fieldset': {
            borderColor: 'transparent',
            borderWidth: '1.275px',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused': {
            backgroundColor: brandColors.white,
            '& fieldset': {
              borderColor: brandColors.primary.main,
              borderWidth: '1.275px',
            },
          },
          '&.Mui-disabled': {
            backgroundColor: brandColors.neutral[50],
            opacity: 0.5,
          },
        },
      },
    },
    // FormControlLabel
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiFormControlLabel-label': {
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            color: brandColors.neutral[900],
            '&.Mui-disabled': {
              color: brandColors.neutral[500],
              opacity: 0.5,
            },
          },
        },
      },
    },
    // Switch/Toggle
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 32,
          height: 18.38,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: '1.275px',
            '&.Mui-checked': {
              color: brandColors.white,
              '& + .MuiSwitch-track': {
                backgroundColor: brandColors.primary.main,
                opacity: 1,
              },
            },
            '&.Mui-disabled': {
              '& + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: brandColors.white,
            boxShadow: 'none',
          },
          '& .MuiSwitch-track': {
            borderRadius: '9999px',
            backgroundColor: brandColors.neutral[50],
            opacity: 1,
          },
        },
      },
    },
    // Checkbox
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          width: 16,
          height: 16,
          borderRadius: 4,
          backgroundColor: brandColors.white,
          border: `1.275px solid ${brandColors.neutral[50]}`,
          color: 'transparent',
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
          '&.Mui-checked': {
            color: brandColors.primary.main,
            backgroundColor: brandColors.primary.main,
            borderColor: brandColors.primary.main,
            '& .MuiSvgIcon-root': {
              color: brandColors.white,
            },
          },
          '&.Mui-disabled': {
            backgroundColor: brandColors.primary.main,
            borderColor: brandColors.primary.main,
            opacity: 0.5,
            '&.Mui-checked': {
              backgroundColor: brandColors.primary.main,
              borderColor: brandColors.primary.main,
              opacity: 0.5,
            },
          },
          '&:hover': {
            backgroundColor: brandColors.white,
          },
        },
      },
    },
    // Radio Button
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0,
          width: 16,
          height: 16,
          color: 'transparent',
          border: `1.275px solid transparent`,
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
          '&.Mui-checked': {
            color: brandColors.primary.main,
            '& .MuiSvgIcon-root': {
              color: brandColors.primary.main,
            },
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    // Slider
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 16,
          '& .MuiSlider-track': {
            backgroundColor: brandColors.primary.main,
            height: 16,
            borderRadius: '9999px',
          },
          '& .MuiSlider-rail': {
            backgroundColor: brandColors.neutral[50],
            height: 16,
            borderRadius: '9999px',
            opacity: 1,
          },
          '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
            backgroundColor: brandColors.white,
            border: `1.275px solid ${brandColors.primary.main}`,
            boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
            },
            '&.Mui-focusVisible': {
              boxShadow: `0 0 0 4px ${brandColors.focus.primary}`,
            },
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: brandColors.primary.main,
            color: brandColors.white,
            fontSize: '12px',
          },
        },
      },
    },
    // FormHelperText
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          fontWeight: 400,
          marginTop: '4px',
          marginLeft: 0,
          color: brandColors.neutral[500],
          '&.Mui-error': {
            color: brandColors.critical.main,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          borderRadius: 8,
          fontWeight: 400,
          fontSize: '12px',
          height: 24,
          padding: '3.275px 9.275px',
          borderWidth: '1.275px',
          '& .MuiChip-label': {
            padding: 0,
            lineHeight: '16px',
          },
        },
        // Default (Primary) - Blue filled (Standard Variant: Default)
        colorDefault: {
          backgroundColor: brandColors.primary.main,
          color: brandColors.white,
          borderColor: 'transparent',
        },
        // Secondary - Light gray filled (Standard Variant: Secondary)
        colorSecondary: {
          backgroundColor: brandColors.neutral[50],
          color: brandColors.neutral[900],
          borderColor: 'transparent',
        },
        // Success - Semantic Status: Success
        colorSuccess: {
          backgroundColor: brandColors.success.light,
          color: brandColors.success.dark,
          borderColor: alpha(brandColors.success.main, 0.2),
        },
        // Warning - Semantic Status: Warning
        colorWarning: {
          backgroundColor: brandColors.warning.light,
          color: brandColors.warning.dark,
          borderColor: alpha(brandColors.warning.main, 0.2),
        },
        // Error - Semantic Status: Error / Standard Variant: Destructive
        colorError: {
          backgroundColor: brandColors.critical.light,
          color: brandColors.critical.dark,
          borderColor: alpha(brandColors.critical.main, 0.2),
          // Filled variant for destructive
          '&.MuiChip-filled': {
            backgroundColor: brandColors.critical.main,
            color: brandColors.white,
            borderColor: 'transparent',
          },
        },
        // Info - Semantic Status: Info
        colorInfo: {
          backgroundColor: brandColors.primary.light,
          color: brandColors.primary.hover,
          borderColor: alpha(brandColors.primary.main, 0.2),
        },
        // Outlined variant (Standard Variant: Outline)
        outlined: {
          backgroundColor: brandColors.white,
          borderColor: brandColors.neutral[50],
          color: brandColors.neutral[900],
          '&.MuiChip-colorDefault': {
            backgroundColor: brandColors.white,
            borderColor: brandColors.neutral[50],
            color: brandColors.neutral[900],
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: brandColors.white,
            borderColor: alpha(brandColors.success.main, 0.2),
            color: brandColors.success.dark,
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: brandColors.white,
            borderColor: alpha(brandColors.warning.main, 0.2),
            color: brandColors.warning.dark,
          },
          '&.MuiChip-colorError': {
            backgroundColor: brandColors.white,
            borderColor: alpha(brandColors.critical.main, 0.2),
            color: brandColors.critical.dark,
          },
          '&.MuiChip-colorInfo': {
            backgroundColor: brandColors.white,
            borderColor: brandColors.primary.light,
            color: brandColors.primary.hover,
          },
        },
        // Filled variant (default) - for primary and destructive filled badges
        filled: {
          '&.MuiChip-colorDefault': {
            backgroundColor: brandColors.primary.main,
            color: brandColors.white,
            borderColor: 'transparent',
          },
          '&.MuiChip-colorError': {
            backgroundColor: brandColors.critical.main,
            color: brandColors.white,
            borderColor: 'transparent',
          },
        },
        // Size variants
        sizeSmall: {
          height: 20,
          fontSize: '11px',
          padding: '2px 6px',
        },
        sizeMedium: {
          height: 24,
          fontSize: '12px',
          padding: '3.275px 9.275px',
        },
      },
    },
    // Badge (Notification Badge)
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontFamily: 'Inter',
          fontSize: '12px',
          fontWeight: 500,
          minWidth: 20,
          height: 20,
          borderRadius: 8,
        },
      },
    },
    // Alert (Feedback & Alerts)
    MuiAlert: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          borderRadius: 10,
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 400,
          '& .MuiAlert-icon': {
            fontSize: 16,
            marginRight: '12px',
          },
          '& .MuiAlert-message': {
            fontFamily: 'Inter',
            padding: 0,
            fontSize: '14px',
            fontWeight: 500,
          },
          '& .MuiAlert-action': {
            paddingTop: 0,
            paddingRight: 0,
            marginRight: 0,
          },
        },
        // Success Alert
        standardSuccess: {
          backgroundColor: brandColors.success.light,
          color: brandColors.success.dark,
          border: `1.275px solid ${brandColors.success.main}`,
          '& .MuiAlert-icon': {
            color: brandColors.success.main,
          },
        },
        // Warning Alert
        standardWarning: {
          backgroundColor: brandColors.warning.light,
          color: brandColors.warning.dark,
          border: `1.275px solid ${brandColors.warning.main}`,
          '& .MuiAlert-icon': {
            color: brandColors.warning.main,
          },
        },
        // Error Alert
        standardError: {
          backgroundColor: brandColors.critical.light,
          color: brandColors.critical.main,
          border: `1.275px solid ${brandColors.critical.main}`,
          '& .MuiAlert-icon': {
            color: brandColors.critical.main,
          },
        },
        // Info Alert (Information)
        standardInfo: {
          backgroundColor: brandColors.white,
          color: brandColors.neutral[900],
          border: `1.275px solid ${brandColors.neutral[200]}`,
          '& .MuiAlert-icon': {
            color: brandColors.neutral[900],
          },
        },
        // Filled variants
        filledSuccess: {
          backgroundColor: brandColors.success.main,
          color: brandColors.white,
          '& .MuiAlert-icon': {
            color: brandColors.white,
          },
        },
        filledWarning: {
          backgroundColor: brandColors.warning.main,
          color: brandColors.white,
          '& .MuiAlert-icon': {
            color: brandColors.white,
          },
        },
        filledError: {
          backgroundColor: brandColors.critical.main,
          color: brandColors.white,
          '& .MuiAlert-icon': {
            color: brandColors.white,
          },
        },
        filledInfo: {
          backgroundColor: brandColors.primary.main,
          color: brandColors.white,
          '& .MuiAlert-icon': {
            color: brandColors.white,
          },
        },
        // Outlined variants
        outlinedSuccess: {
          backgroundColor: brandColors.white,
          color: brandColors.success.dark,
          border: `1.275px solid ${brandColors.success.main}`,
          '& .MuiAlert-icon': {
            color: brandColors.success.main,
          },
        },
        outlinedWarning: {
          backgroundColor: brandColors.white,
          color: brandColors.warning.dark,
          border: `1.275px solid ${brandColors.warning.main}`,
          '& .MuiAlert-icon': {
            color: brandColors.warning.main,
          },
        },
        outlinedError: {
          backgroundColor: brandColors.white,
          color: brandColors.critical.dark,
          border: `1.275px solid ${brandColors.critical.main}`,
          '& .MuiAlert-icon': {
            color: brandColors.critical.main,
          },
        },
        outlinedInfo: {
          backgroundColor: brandColors.white,
          color: brandColors.primary.hover,
          border: `1.275px solid ${brandColors.primary.main}`,
          '& .MuiAlert-icon': {
            color: brandColors.primary.main,
          },
        },
      },
    },
    // Snackbar (Toast Notifications)
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            fontFamily: 'Inter',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 400,
            backgroundColor: brandColors.neutral[900],
            color: brandColors.white,
            boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
            '& .MuiSnackbarContent-action': {
              paddingLeft: '16px',
              marginRight: 0,
            },
          },
        },
        anchorOriginTopCenter: {
          top: 24,
        },
        anchorOriginBottomCenter: {
          bottom: 24,
        },
        anchorOriginTopRight: {
          top: 24,
          right: 24,
        },
        anchorOriginBottomRight: {
          bottom: 24,
          right: 24,
        },
        anchorOriginTopLeft: {
          top: 24,
          left: 24,
        },
        anchorOriginBottomLeft: {
          bottom: 24,
          left: 24,
        },
      },
    },
    // SnackbarContent
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          borderRadius: 8,
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 400,
          backgroundColor: brandColors.neutral[900],
          color: brandColors.white,
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
          '& .MuiSnackbarContent-action': {
            paddingLeft: '16px',
            marginRight: 0,
            '& .MuiIconButton-root': {
              color: brandColors.white,
              padding: 4,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            },
          },
        },
      },
    },
    // Breadcrumbs
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap',
          },
          '& .MuiBreadcrumbs-separator': {
            fontFamily: 'Inter',
            margin: '0 8px',
            color: brandColors.neutral[500],
            fontSize: '14px',
          },
          '& .MuiBreadcrumbs-li': {
            '& .MuiLink-root': {
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 500,
              color: brandColors.neutral[500],
              textDecoration: 'none',
              '&:hover': {
                color: brandColors.primary.main,
                textDecoration: 'none',
              },
            },
            '&:last-child': {
              '& .MuiTypography-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 500,
                color: brandColors.neutral[900],
              },
            },
          },
        },
      },
    },
    // Tabs
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: brandColors.neutral[50],
          borderRadius: 10,
          padding: 4,
          minHeight: 'auto',
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        },
        flexContainer: {
          gap: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          textTransform: 'none',
          color: brandColors.neutral[500],
          padding: '10px 24px',
          minHeight: 40,
          borderRadius: 8,
          marginRight: 0,
          '&.Mui-selected': {
            color: brandColors.neutral[900],
            backgroundColor: brandColors.white,
            boxShadow: '0px 1px 4px rgba(12, 12, 13, 0.1), 0px 1px 4px rgba(12, 12, 13, 0.05)',
          },
          '&:hover': {
            color: brandColors.neutral[900],
            backgroundColor: 'transparent',
          },
        },
      },
    },
    // TabPanel (custom styling for tab content)
    // Note: TabPanel is typically a custom component, but we can style it via Box
    // Pagination
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPagination-ul': {
            gap: '3.983px',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          color: brandColors.neutral[900],
          minWidth: 36,
          height: 36,
          borderRadius: 8,
          border: 'none',
          '&.Mui-selected': {
            backgroundColor: brandColors.white,
            border: `1.275px solid ${brandColors.neutral[200]}`,
            color: brandColors.neutral[900],
            '&:hover': {
              backgroundColor: brandColors.neutral[50],
            },
          },
          '&:hover': {
            backgroundColor: brandColors.neutral[50],
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
        previousNext: {
          padding: '7.99px 11.99px',
          '& .MuiPaginationItem-icon': {
            fontSize: 16,
            color: brandColors.neutral[900],
          },
        },
        ellipsis: {
          color: brandColors.neutral[900],
          '& .MuiPaginationItem-icon': {
            fontSize: 16,
            color: brandColors.neutral[900],
          },
        },
      },
    },
    // Dialog / Modal
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialog-container': {
            // backdropFilter: 'blur(4px)',
          },
        },
        paper: {
          borderRadius: 14,
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
          border: `1.275px solid ${brandColors.neutral[200]}`,
          padding: '1.275px',
        },
        paperWidthXs: {
          maxWidth: 444,
        },
        paperWidthSm: {
          maxWidth: 600,
        },
        paperWidthMd: {
          maxWidth: 900,
        },
        paperWidthLg: {
          maxWidth: 1200,
        },
        paperWidthXl: {
          maxWidth: 1536,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 500,
          color: brandColors.neutral[900],
          padding: '24px 24px 16px 24px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0 24px 24px 24px',
          fontSize: '14px',
          color: brandColors.neutral[700],
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px 24px',
          gap: '12px',
        },
      },
    },
    // Backdrop (for Modal/Dialog)
    MuiBackdrop: {
      styleOverrides: {
        root: {},
      },
    },
    // Menu / Dropdown Menu
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
          border: `1.275px solid ${brandColors.neutral[200]}`,
          marginTop: 8,
          minWidth: 160,
        },
        list: {
          padding: '4px 0',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          color: brandColors.neutral[900],
          padding: '8px 16px',
          minHeight: 36,
          '&:hover': {
            backgroundColor: brandColors.neutral[50],
          },
          '&.Mui-selected': {
            backgroundColor: brandColors.primary.light,
            color: brandColors.primary.main,
            '&:hover': {
              backgroundColor: brandColors.primary.light,
            },
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            color: brandColors.neutral[900],
          },
        },
      },
    },
    // Popover
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
          border: `1.275px solid ${brandColors.neutral[200]}`,
          marginTop: 8,
        },
      },
    },
    // Tooltip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: 'Inter',
          backgroundColor: brandColors.neutral[900],
          color: brandColors.white,
          fontSize: '12px',
          fontWeight: 400,
          padding: '6px 12px',
          borderRadius: 6,
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
          maxWidth: 200,
        },
        arrow: {
          color: brandColors.neutral[900],
        },
      },
    },
    // Table (Data Display)
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1.275px solid ${brandColors.neutral[200]}`,
          overflow: 'hidden',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: 'transparent',
            borderBottom: `1.275px solid ${brandColors.neutral[200]}`,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            '&:last-child .MuiTableCell-root': {
              borderBottom: 'none',
            },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: `1.275px solid ${brandColors.neutral[200]}`,
          '&:last-child': {
            borderBottom: 'none',
          },
          '&:hover': {
            backgroundColor: brandColors.neutral[50],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          color: brandColors.neutral[900],
          padding: '7.62px 7.99px',
          borderBottom: `1.275px solid ${brandColors.neutral[200]}`,
          '&.MuiTableCell-head': {
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            color: brandColors.neutral[900],
            backgroundColor: 'transparent',
            padding: '8.68px 7.99px',
          },
          '&.MuiTableCell-body': {
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            color: brandColors.neutral[900],
          },
        },
      },
    },
    // Accordion (Data Display)
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: 'none',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
          '&:not(:last-child)': {
            borderBottom: `1.275px solid ${brandColors.neutral[200]}`,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 52,
          padding: '0 16px',
          '&.Mui-expanded': {
            minHeight: 52,
          },
          '& .MuiAccordionSummary-content': {
            margin: '14.99px 0',
            '&.Mui-expanded': {
              margin: '14.99px 0',
            },
          },
        },
        expandIconWrapper: {
          color: brandColors.neutral[900],
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 400,
          color: brandColors.neutral[700],
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
