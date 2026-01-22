import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const meta: Meta = {
  title: 'MUI Components/Data Display',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Tables: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 800 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default Table
        </Typography>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell align="right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV002</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell align="right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV003</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell align="right">$500.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
          A list of recent invoices.
        </Typography>
      </Box>
    </Stack>
  ),
};

export const Accordions: Story = {
  render: () => (
    <Stack spacing={3} sx={{ minWidth: 600 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Default Accordion
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Is it accessible?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Is it styled?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes. It comes with default styles that match the Material Design specification.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Is it animated?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes. The accordion component includes smooth animations for expanding and collapsing.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  ),
};

