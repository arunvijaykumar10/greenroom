import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';

// Types for payroll data
interface PaymentACH {
  name: string;
  account: string;
  amount: number;
}

interface PaymentCheck {
  name: string;
  checkNumber: string;
  amount: number;
}

interface Deductions {
  agentFees: number;
  managerFees: number;
  unionDues: number;
  k401: number;
  federalTaxes: number;
  stateTaxes: number;
}

interface CompanyContributions {
  healthFund: number;
  pension: number;
  k401: number;
}

interface Payroll {
  id: string;
  payPeriod: string;
  payDate: string;
  status: string;
  numberOfPayees: number;
  employerTaxes: number;
  grossTotal: number;
  payments: {
    ach: PaymentACH[];
    checks: PaymentCheck[];
  };
  deductions: Deductions;
  companyContributions: CompanyContributions;
}

// Mock payroll data based on requirements
const mockPayrollDetails: Record<string, Payroll> = {
  'PR-2023-001': {
    id: 'PR-2023-001',
    payPeriod: 'Week ending 04/01/2023',
    payDate: '04/07/2023',
    status: 'completed',
    numberOfPayees: 12,
    employerTaxes: 2450.75,
    grossTotal: 32500.00,
    payments: {
      ach: [
        { name: 'John Smith', account: '****1234', amount: 2500.00 },
        { name: 'Jane Doe', account: '****5678', amount: 2200.00 },
        { name: 'Robert Johnson', account: '****9012', amount: 1800.00 }
      ],
      checks: [
        { name: 'Sarah Williams', checkNumber: 'CHK-1001', amount: 1950.00 },
        { name: 'Michael Brown', checkNumber: 'CHK-1002', amount: 2100.00 }
      ]
    },
    deductions: {
      agentFees: 1625.00,
      managerFees: 1300.00,
      unionDues: 812.50,
      k401: 1950.00,
      federalTaxes: 6500.00,
      stateTaxes: 2275.00
    },
    companyContributions: {
      healthFund: 1800.00,
      pension: 1950.00,
      k401: 1300.00
    }
  },
  'PR-2023-002': {
    id: 'PR-2023-002',
    payPeriod: 'Week ending 04/08/2023',
    payDate: '04/14/2023',
    status: 'completed',
    numberOfPayees: 14,
    employerTaxes: 2875.25,
    grossTotal: 38500.00,
    payments: {
      ach: [
        { name: 'John Smith', account: '****1234', amount: 2500.00 },
        { name: 'Jane Doe', account: '****5678', amount: 2200.00 },
        { name: 'Robert Johnson', account: '****9012', amount: 1800.00 }
      ],
      checks: [
        { name: 'Sarah Williams', checkNumber: 'CHK-1003', amount: 1950.00 },
        { name: 'Michael Brown', checkNumber: 'CHK-1004', amount: 2100.00 }
      ]
    },
    deductions: {
      agentFees: 1925.00,
      managerFees: 1540.00,
      unionDues: 962.50,
      k401: 2310.00,
      federalTaxes: 7700.00,
      stateTaxes: 2695.00
    },
    companyContributions: {
      healthFund: 2100.00,
      pension: 2310.00,
      k401: 1540.00
    }
  },
  'PR-2023-003': {
    id: 'PR-2023-003',
    payPeriod: 'Week ending 04/15/2023',
    payDate: '04/21/2023',
    status: 'approved',
    numberOfPayees: 15,
    employerTaxes: 3150.50,
    grossTotal: 42000.00,
    payments: {
      ach: [
        { name: 'John Smith', account: '****1234', amount: 2500.00 },
        { name: 'Jane Doe', account: '****5678', amount: 2200.00 },
        { name: 'Robert Johnson', account: '****9012', amount: 1800.00 }
      ],
      checks: [
        { name: 'Sarah Williams', checkNumber: 'CHK-1005', amount: 1950.00 },
        { name: 'Michael Brown', checkNumber: 'CHK-1006', amount: 2100.00 }
      ]
    },
    deductions: {
      agentFees: 2100.00,
      managerFees: 1680.00,
      unionDues: 1050.00,
      k401: 2520.00,
      federalTaxes: 8400.00,
      stateTaxes: 2940.00
    },
    companyContributions: {
      healthFund: 2250.00,
      pension: 2520.00,
      k401: 1680.00
    }
  },
  'PR-2023-004': {
    id: 'PR-2023-004',
    payPeriod: 'Week ending 04/22/2023',
    payDate: '04/28/2023',
    status: 'submitted',
    numberOfPayees: 15,
    employerTaxes: 3225.75,
    grossTotal: 43000.00,
    payments: {
      ach: [
        { name: 'John Smith', account: '****1234', amount: 2500.00 },
        { name: 'Jane Doe', account: '****5678', amount: 2200.00 },
        { name: 'Robert Johnson', account: '****9012', amount: 1800.00 }
      ],
      checks: [
        { name: 'Sarah Williams', checkNumber: 'CHK-1007', amount: 1950.00 },
        { name: 'Michael Brown', checkNumber: 'CHK-1008', amount: 2100.00 }
      ]
    },
    deductions: {
      agentFees: 2150.00,
      managerFees: 1720.00,
      unionDues: 1075.00,
      k401: 2580.00,
      federalTaxes: 8600.00,
      stateTaxes: 3010.00
    },
    companyContributions: {
      healthFund: 2250.00,
      pension: 2580.00,
      k401: 1720.00
    }
  }
};

interface PayrollDetailsProps {
  payrollId: string;
  employees: any[];
  vendors: any[];
  onBack: () => void;
}

const PayrollDetails: React.FC<PayrollDetailsProps> = ({
  payrollId,
  employees,
  vendors,
  onBack
}) => {
  const [tabValue, setTabValue] = useState(0);
  
  // Get payroll details from mock data
  const payroll = mockPayrollDetails[payrollId] || {
    id: payrollId,
    payPeriod: 'Unknown',
    payDate: 'Unknown',
    status: 'unknown',
    numberOfPayees: 0,
    employerTaxes: 0,
    grossTotal: 0,
    payments: { ach: [], checks: [] },
    deductions: { agentFees: 0, managerFees: 0, unionDues: 0, k401: 0, federalTaxes: 0, stateTaxes: 0 },
    companyContributions: { healthFund: 0, pension: 0, k401: 0 }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Chip label="Submitted" color="primary" />;
      case 'approved':
        return <Chip label="Approved" color="secondary" />;
      case 'completed':
        return <Chip label="Completed" color="success" />;
      case 'corrected':
        return <Chip label="Corrected" color="warning" />;
      default:
        return <Chip label="Draft" color="default" />;
    }
  };

  // Platform fees
  const greenroomFee = payroll.grossTotal * 0.005; // 0.5% of total payroll
  const postageFees = payroll.payments.checks.length * 5; // $5 per check

  // Total payroll amount
  const totalPayrollAmount = payroll.grossTotal + payroll.employerTaxes + 
    payroll.companyContributions.healthFund + payroll.companyContributions.pension + 
    payroll.companyContributions.k401 + greenroomFee + postageFees;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Payroll Details</Typography>
        {getStatusChip(payroll.status)}
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Payroll ID</Typography>
            <Typography variant="body1" gutterBottom>{payroll.id}</Typography>
            
            <Typography variant="subtitle2">Pay Period</Typography>
            <Typography variant="body1" gutterBottom>{payroll.payPeriod}</Typography>
            
            <Typography variant="subtitle2">Pay Date</Typography>
            <Typography variant="body1" gutterBottom>{payroll.payDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Status</Typography>
            <Typography variant="body1" gutterBottom>{payroll.status}</Typography>
            
            <Typography variant="subtitle2">Number of Payees</Typography>
            <Typography variant="body1" gutterBottom>{payroll.numberOfPayees}</Typography>
            
            <Typography variant="subtitle2">Gross Total</Typography>
            <Typography variant="body1" gutterBottom>${payroll.grossTotal.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
        <Tab label="Summary" />
        <Tab label="Payments" />
        <Tab label="Deductions" />
        <Tab label="Company Contributions" />
        <Tab label="Payment Methods" />
      </Tabs>

      {tabValue === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Payroll Summary</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
                
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total Gross Pay</TableCell>
                  <TableCell align="right">${payroll.grossTotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Taxes</TableCell>
                  <TableCell align="right">${(payroll.deductions.federalTaxes + payroll.deductions.stateTaxes).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Agent Fees</TableCell>
                  <TableCell align="right">${payroll.deductions.agentFees.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Manager Fees</TableCell>
                  <TableCell align="right">${payroll.deductions.managerFees.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Union Dues</TableCell>
                  <TableCell align="right">${payroll.deductions.unionDues.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total 401k Contributions</TableCell>
                  <TableCell align="right">${payroll.deductions.k401.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Company Contributions</TableCell>
                  <TableCell align="right">${(
                    payroll.companyContributions.healthFund + 
                    payroll.companyContributions.pension + 
                    payroll.companyContributions.k401
                  ).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Employer Taxes</TableCell>
                  <TableCell align="right">${payroll.employerTaxes.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Greenroom Platform Fee</TableCell>
                  <TableCell align="right">${greenroomFee.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Postage Fees</TableCell>
                  <TableCell align="right">${postageFees.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">${totalPayrollAmount.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 4 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Payment Methods</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="ACH/Wire Transfers" titleTypographyProps={{ variant: 'subtitle1' }} />
                <CardContent>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Payee</TableCell>
                          <TableCell>Account</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payroll.payments.ach.map((payment, index) => (
                          <TableRow key={index}>
                            <TableCell>{payment.name}</TableCell>
                            <TableCell>{payment.account}</TableCell>
                            <TableCell align="right">${payment.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        {payroll.payments.ach.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} align="center">No ACH/Wire transfers</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Checks" titleTypographyProps={{ variant: 'subtitle1' }} />
                <CardContent>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Payee</TableCell>
                          <TableCell>Check Number</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payroll.payments.checks.map((payment, index) => (
                          <TableRow key={index}>
                            <TableCell>{payment.name}</TableCell>
                            <TableCell>{payment.checkNumber}</TableCell>
                            <TableCell align="right">${payment.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        {payroll.payments.checks.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} align="center">No checks issued</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="outlined" onClick={onBack}>
          Back to Payroll History
        </Button>
      </Box>
    </Box>
  );
};

export default PayrollDetails;