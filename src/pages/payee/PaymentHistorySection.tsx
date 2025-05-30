import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Chip
} from '@mui/material';
import { 
  Receipt as ReceiptIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';
import { Payee } from './payeeTypes';

interface PaymentHistoryProps {
  payee: Payee;
}

const PaymentHistorySection: React.FC<PaymentHistoryProps> = ({ payee }) => {
  // Mock payment history data
  const payments = [
    {
      id: 'pay1',
      payPeriod: 'Week ending 04/01/2023',
      payDate: '04/07/2023',
      grossAmount: 2500.00,
      deductions: 625.00,
      netAmount: 1875.00,
      status: 'paid'
    },
    {
      id: 'pay2',
      payPeriod: 'Week ending 04/08/2023',
      payDate: '04/14/2023',
      grossAmount: 2500.00,
      deductions: 625.00,
      netAmount: 1875.00,
      status: 'paid'
    },
    {
      id: 'pay3',
      payPeriod: 'Week ending 04/15/2023',
      payDate: '04/21/2023',
      grossAmount: 2500.00,
      deductions: 625.00,
      netAmount: 1875.00,
      status: 'processing'
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment History
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pay Period</TableCell>
              <TableCell>Pay Date</TableCell>
              <TableCell align="right">Gross Amount</TableCell>
              <TableCell align="right">Deductions</TableCell>
              <TableCell align="right">Net Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.payPeriod}</TableCell>
                <TableCell>{payment.payDate}</TableCell>
                <TableCell align="right">${payment.grossAmount.toFixed(2)}</TableCell>
                <TableCell align="right">${payment.deductions.toFixed(2)}</TableCell>
                <TableCell align="right">${payment.netAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={payment.status === 'paid' ? 'Paid' : 'Processing'} 
                    color={payment.status === 'paid' ? 'success' : 'info'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<PdfIcon />}
                    size="small"
                    disabled={payment.status !== 'paid'}
                  >
                    Pay Stub
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" startIcon={<ReceiptIcon />}>
          View Tax Documents
        </Button>
        <Button variant="outlined">
          Export Payment History
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentHistorySection;