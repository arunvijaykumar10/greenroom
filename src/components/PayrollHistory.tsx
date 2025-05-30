import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon
} from '@mui/icons-material';

// Mock payroll history data based on requirements
const mockPayrollHistory = [
  {
    id: 'PR-2023-001',
    payPeriod: 'Week ending 04/01/2023',
    payDate: '04/07/2023',
    status: 'completed',
    numberOfPayees: 12,
    employerTaxes: 2450.75,
    grossTotal: 32500.00
  },
  {
    id: 'PR-2023-002',
    payPeriod: 'Week ending 04/08/2023',
    payDate: '04/14/2023',
    status: 'completed',
    numberOfPayees: 14,
    employerTaxes: 2875.25,
    grossTotal: 38500.00
  },
  {
    id: 'PR-2023-003',
    payPeriod: 'Week ending 04/15/2023',
    payDate: '04/21/2023',
    status: 'approved',
    numberOfPayees: 15,
    employerTaxes: 3150.50,
    grossTotal: 42000.00
  },
  {
    id: 'PR-2023-004',
    payPeriod: 'Week ending 04/22/2023',
    payDate: '04/28/2023',
    status: 'submitted',
    numberOfPayees: 15,
    employerTaxes: 3225.75,
    grossTotal: 43000.00
  },
  {
    id: 'PR-2023-005',
    payPeriod: '04/23/2023 - 04/29/2023',
    payDate: '05/05/2023',
    status: 'draft',
    numberOfPayees: 16,
    employerTaxes: 3300.25,
    grossTotal: 44500.00
  }
];

const PayrollHistory: React.FC = () => {
  const [payrolls] = useState(mockPayrollHistory);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPayrollId, setSelectedPayrollId] = useState<string | null>(null);

  const handleViewPayroll = (payrollId: string) => {
    // In a real app, this would navigate to the payroll details view
    console.log('View payroll:', payrollId);
    window.alert(`Viewing payroll details for ${payrollId}`);
  };

  const handleCorrectClick = (payrollId: string) => {
    setSelectedPayrollId(payrollId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmCorrection = () => {
    if (selectedPayrollId) {
      // In a real app, this would create a correction draft
      console.log('Correcting payroll:', selectedPayrollId);
      window.alert(`Created correction draft for ${selectedPayrollId}`);
    }
    setConfirmDialogOpen(false);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Chip label="Submitted" color="primary" size="small" />;
      case 'approved':
        return <Chip label="Approved" color="secondary" size="small" />;
      case 'completed':
        return <Chip label="Completed" color="success" size="small" />;
      case 'corrected':
        return <Chip label="Corrected" color="warning" size="small" />;
      default:
        return <Chip label="Draft" color="default" size="small" />;
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payroll History
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pay Period</TableCell>
              <TableCell>Pay Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Number of Payees</TableCell>
              <TableCell>Employer Taxes</TableCell>
              <TableCell>Gross Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No payroll history found
                </TableCell>
              </TableRow>
            ) : (
              payrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell>{payroll.id}</TableCell>
                  <TableCell>{payroll.payPeriod}</TableCell>
                  <TableCell>{payroll.payDate}</TableCell>
                  <TableCell>{getStatusChip(payroll.status)}</TableCell>
                  <TableCell>{payroll.numberOfPayees}</TableCell>
                  <TableCell>${payroll.employerTaxes.toFixed(2)}</TableCell>
                  <TableCell>${payroll.grossTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      onClick={() => handleViewPayroll(payroll.id)}
                      title="View Payroll Details"
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    {payroll.status === 'submitted' && (
                      <IconButton 
                        size="small" 
                        onClick={() => handleCorrectClick(payroll.id)}
                        title="Correct Payroll"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog for Corrections */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Payroll Correction</DialogTitle>
        <DialogContent>
          <Typography>
            This will invalidate the submitted payroll and create a new draft for corrections. 
            The change will be communicated to Greenroom. Do you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmCorrection} variant="contained" color="primary">
            Proceed with Correction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayrollHistory;