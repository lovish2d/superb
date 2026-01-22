import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Stack, Box, Divider } from '@mui/material';
import { brandColors } from '@/theme';

const meta = {
  title: 'MUI Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 900 }}>
      <Box>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          Display Variants
        </Typography>
        <Stack spacing={1}>
          <Typography variant="h1">h1. Page Heading (24px, Semi Bold)</Typography>
          <Typography variant="h2">h2. Section Heading (20px, Semi Bold)</Typography>
          <Typography variant="h3">h3. Card Title (18px, Medium)</Typography>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          Headline Variants
        </Typography>
        <Stack spacing={1}>
          <Typography variant="h4">h4. Heading 4 (24px, Semi Bold)</Typography>
          <Typography variant="h5">h5. Heading 5 (20px, Semi Bold)</Typography>
          <Typography variant="h6">h6. Heading 6 (16px, Semi Bold)</Typography>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          Body Variants
        </Typography>
        <Stack spacing={1}>
          <Typography variant="subtitle1">subtitle1. Larger subtitle text</Typography>
          <Typography variant="subtitle2">subtitle2. Smaller subtitle text</Typography>
          <Typography variant="body1">
            body1. Body Text - Standard paragraph text used for most content (16px, Medium)
          </Typography>
          <Typography variant="body2">
            body2. Small Text - Used for secondary information, descriptions, and help text (14px, Medium)
          </Typography>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="overline" color="text.secondary" gutterBottom>
          Other Variants
        </Typography>
        <Stack spacing={1}>
          <Typography variant="button">button. BUTTON TEXT</Typography>
          <Typography variant="caption">caption. Label / Overline (12px, Regular)</Typography>
          <Typography variant="overline">overline. LABEL / OVERLINE (12px, Regular, Uppercase)</Typography>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Theme Colors
        </Typography>
        <Stack spacing={1}>
          <Typography color="primary">Primary Color Text</Typography>
          <Typography color="secondary">Secondary Color Text</Typography>
          <Typography color="success">Success Color Text</Typography>
          <Typography color="error">Error Color Text</Typography>
          <Typography color="warning">Warning Color Text</Typography>
          <Typography color="info">Info Color Text</Typography>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Text Colors
        </Typography>
        <Stack spacing={1}>
          <Typography color="text.primary">Primary Text (#0F172B)</Typography>
          <Typography color="text.secondary">Secondary Text (#62748E)</Typography>
          <Typography color="text.disabled">Disabled Text (#E2E8F0)</Typography>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Custom Brand Colors
        </Typography>
        <Stack spacing={1}>
          <Typography sx={{ color: brandColors.primary.main }}>Brand Primary (#0163F2)</Typography>
          <Typography sx={{ color: brandColors.success.main }}>Brand Success (#00BC7D)</Typography>
          <Typography sx={{ color: brandColors.critical.main }}>
            Brand Critical (#F00C27)
          </Typography>
          <Typography sx={{ color: brandColors.warning.main }}>Brand Warning (#FE9A00)</Typography>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Left Aligned (Default)
        </Typography>
        <Typography align="left">This text is left aligned.</Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Center Aligned
        </Typography>
        <Typography align="center">This text is center aligned.</Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Right Aligned
        </Typography>
        <Typography align="right">This text is right aligned.</Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Justified
        </Typography>
        <Typography align="justify">
          This text is justified. The text is stretched to align with both left and right margins,
          creating a clean block of text.
        </Typography>
      </Box>
    </Stack>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Text Decoration
        </Typography>
        <Stack spacing={1}>
          <Typography>Normal text without decoration</Typography>
          <Typography sx={{ textDecoration: 'underline' }}>Underlined text</Typography>
          <Typography sx={{ textDecoration: 'line-through' }}>Strikethrough text</Typography>
          <Typography sx={{ fontStyle: 'italic' }}>Italic text</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>Bold text</Typography>
          <Typography sx={{ fontWeight: 300 }}>Light text</Typography>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Text Transform
        </Typography>
        <Stack spacing={1}>
          <Typography sx={{ textTransform: 'uppercase' }}>uppercase text</Typography>
          <Typography sx={{ textTransform: 'lowercase' }}>LOWERCASE TEXT</Typography>
          <Typography sx={{ textTransform: 'capitalize' }}>capitalize each word</Typography>
        </Stack>
      </Box>
    </Stack>
  ),
};

export const TextOverflow: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Single Line Ellipsis
        </Typography>
        <Typography
          noWrap
          sx={{ border: `1px solid ${brandColors.neutral[200]}`, p: 1, borderRadius: 1 }}
        >
          This is a very long text that will be truncated with an ellipsis when it exceeds the
          container width. The text continues but you won't see it.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Multi-line Clamp (2 lines)
        </Typography>
        <Typography
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            border: `1px solid ${brandColors.neutral[200]}`,
            p: 1,
            borderRadius: 1,
          }}
        >
          This is a longer paragraph that will be clamped to exactly 2 lines. Any text that goes
          beyond the second line will be hidden and replaced with an ellipsis. This is useful for
          card descriptions and preview text.
        </Typography>
      </Box>
    </Stack>
  ),
};

export const CommonUseCases: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: 800 }}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Page Header
        </Typography>
        <Typography variant="h3" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your service operations today.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="overline" color="text.secondary">
          Card Title & Description
        </Typography>
        <Typography variant="h6" gutterBottom>
          Service Request #SR-2024-001
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Engine maintenance and inspection for Boeing 737-800
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="caption" color="text.secondary">
            Created: Dec 26, 2024
          </Typography>
          <Typography variant="caption" color="success.main">
            Status: In Progress
          </Typography>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="overline" color="text.secondary">
          Form Label & Helper
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Equipment Name *
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Enter a unique name for the equipment
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="overline" color="text.secondary">
          Error Message
        </Typography>
        <Typography variant="body2" color="error">
          This field is required. Please enter a valid email address.
        </Typography>
      </Box>
    </Stack>
  ),
};
