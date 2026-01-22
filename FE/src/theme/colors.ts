/**
 * Superb Theme Colors - Sourced from Figma Design System
 * Figma: https://www.figma.com/design/PkmLbQQVlbwGktUnz2sTE6/Superb?node-id=3-21
 * CRITICAL: All components MUST use these colors instead of hardcoded values
 */

export const brandColors = {
  // Primary Brand Colors
  primary: {
    main: '#0163F2', // Superb Blue
    hover: '#08254B', // Hover Blue (Primary Dark) - from Buttons design
    light: '#EFF6FF', // Light Blue
    foreground: '#FFFFFF',
  },

  // Success Colors (Emerald)
  success: {
    main: '#00BC7D', // Emerald 500
    dark: '#007A55', // Emerald 700
    light: '#ECFDF5', // Emerald 50
  },

  // Warning Colors (Amber)
  warning: {
    main: '#FE9A00', // Amber 500
    dark: '#BB4D00', // Amber 700
    light: '#FFFBEB', // Amber 50
  },

  // Critical/Error Colors (Red)
  critical: {
    main: '#F00C27', // Status Critical - from Buttons design
    dark: '#B7051A', // Red 700
    light: '#FFE8EB', // Red 50
  },

  // Neutral Colors (Slate)
  neutral: {
    900: '#0F172B', // Slate 900 - Text primary, headings
    700: '#45556C', // Body text color (not in Figma palette, but used in typography)
    500: '#62748E', // Slate 500 - Text secondary, small text, labels
    200: '#E2E8F0', // Slate 200 - Borders, dividers
    100: '#F1F5F9', // Ghost button hover background (not in Figma palette, but used in components)
    50: '#F8FAFC', // Slate 50 - Backgrounds, subtle fills
  },

  // Interactive States (Focus Rings)
  focus: {
    primary: '#90A1B9', // Focus ring for primary/secondary buttons
    destructive: '#FF6467', // Focus ring for destructive buttons
    link: '#51A2FF', // Focus ring for links
  },

  // Badge Colors
  badge: {
    primary: {
      background: '#EFF6FF', // Light Blue
      border: '#E2E8F0',
      text: '#314158',
    },
    secondary: {
      background: '#F1F5F9', // Light Slate
      border: '#E2E8F0',
      text: '#314158',
    },
  },

  // Base Colors
  white: '#FFFFFF',
} as const;

// Export default
export default brandColors;
