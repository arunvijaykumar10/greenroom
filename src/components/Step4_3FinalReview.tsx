import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Table, 
  TableRow, 
  TableCell, 
  TableBody, 
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Payee } from './payrollTypes';

interface Step4_3FinalReviewProps {
  employees: Payee[];
  vendors: Payee[];
  oneTimeBills: any[];
  onBack: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

const Step4_3FinalReview: React.FC<Step4_3FinalReviewProps> = ({ 
  employees, 
  vendors, 
  oneTimeBills, 
  onBack, 
  onSubmit,
  canSubmit
}) => {
  const [paymentMethod, setPaymentMethod] = useState('ach');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Calculate totals
  const totalNetPays = employees.reduce((sum, emp) => {
    const grossPay = emp.rate || 0;
    const deductions = emp.deductions?.reduce((sum, d) => sum + d.amount, 0) || 0;
    return sum + (grossPay - deductions);
  }, 0);

  const totalTaxes = employees.reduce((sum, emp) => {
    const taxDeductions = emp.deductions?.filter(d => d.type === 'tax') || [];
    return sum + taxDeductions.reduce((taxSum, tax) => taxSum + tax.amount, 0);
  }, 0);

  const totalReimbursements = [...employees, ...vendors].reduce((sum, p) => {
    return sum + (p.reimbursements?.reduce((rSum, r) => rSum + r.amount, 0) || 0);
  }, 0);

  const totalAllowances = employees.reduce((sum, emp) => {
    return sum + (emp.allowances?.reduce((aSum, a) => aSum + a.amount, 0) || 0);
  }, 0);

  const totalBenefits = employees.filter(emp => emp.union).length * 150; // $150 weekly per union employee

  const totalDeductions = employees.reduce((sum, emp) => {
    return sum + (emp.deductions?.reduce((dSum, d) => dSum + d.amount, 0) || 0);
  }, 0);

  // Company contributions
  const companyContributions = {
    healthFund: employees.filter(emp => emp.union).length * 150, // $150 weekly per union employee
    pension: employees.reduce((sum, emp) => {
      if (emp.union) {
        const salary = Math.min(emp.rate || 0, 7500); // Weekly salary cap of $7500
        return sum + (salary * 0.06); // 6% of salary
      }
      return sum;
    }, 0),
    k401: employees.reduce((sum, emp) => {
      if (emp.union) {
        const salary = Math.min(emp.rate || 0, 7500); // Weekly salary cap of $7500
        return sum + (salary * 0.04); // 4% of salary
      }
      return sum;
    }, 0)
  };

  // Calculate employer taxes (simplified)
  const employerTaxes = employees.reduce((sum, emp) => {
    const grossPay = emp.rate || 0;
    return sum + (grossPay * 0.0765); // 7.65% for Social Security and Medicare
  }, 0);

  // Calculate total gross
  const totalGross = employees.reduce((sum, emp) => sum + (emp.rate || 0), 0) + 
    vendors.reduce((sum, v) => sum + (v.rate || 0), 0) +
    oneTimeBills.reduce((sum, bill: any) => sum + (bill.amount || 0), 0);

  // Platform fees
  const greenroomFee = totalGross * 0.005; // 0.5% of total payroll
  const checkCount = employees.filter(emp => emp.paymentMethod === 'check').length + 
    vendors.filter(v => v.paymentMethod === 'check').length;
  const postageFees = checkCount * 5; // $5 per check (simplified)

  // Total payroll amount
  const totalPayrollAmount = totalNetPays + totalTaxes + totalReimbursements + 
    totalAllowances + employerTaxes + companyContributions.healthFund + 
    companyContributions.pension + companyContributions.k401 + 
    greenroomFee + postageFees;

  const handleSubmitClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = () => {
    // Create payroll data to store in localStorage
    const payrollData = {
      id: `PR-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      payPeriod: `Week ending ${new Date().toLocaleDateString()}`,
      payDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: 'submitted',
      numberOfPayees: employees.length + vendors.length,
      employerTaxes: employerTaxes,
      grossTotal: totalGross
    };
    
    // Store in localStorage for the history page to pick up
    localStorage.setItem('submittedPayroll', JSON.stringify(payrollData));
    
    setConfirmDialogOpen(false);
    onSubmit();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Final Review
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review all payroll details before final submission.
      </Typography>
      
      {!canSubmit && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          All union reports must be reviewed before submitting the payroll.
        </Alert>
      )}
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Payment Method
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            label="Payment Method"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="ach">ACH Transfer</MenuItem>
            <MenuItem value="wire">Wire Transfer</MenuItem>
          </Select>
        </FormControl>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          This payment method will be used to pay the ACH portion of the payroll. 
          Checks will be printed and sent to recipients with pre-printed signatures.
        </Typography>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Payroll Summary
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Debit Information" titleTypographyProps={{ variant: 'subtitle2' }} />
              <CardContent>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Debit Amount (ACH/Wire)</TableCell>
                        <TableCell align="right">${(totalPayrollAmount - (checkCount * 5)).toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Checks Issued Amount</TableCell>
                        <TableCell align="right">${(checkCount * 5).toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
                        <TableCell>Payroll Total Amount</TableCell>
                        <TableCell align="right">${totalPayrollAmount.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Debit Date</TableCell>
                        <TableCell align="right">{new Date().toLocaleDateString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Breakdown" titleTypographyProps={{ variant: 'subtitle2' }} />
              <CardContent>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Total Net Pays</TableCell>
                        <TableCell align="right">${totalNetPays.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Taxes</TableCell>
                        <TableCell align="right">${totalTaxes.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Reimbursements</TableCell>
                        <TableCell align="right">${totalReimbursements.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Allowances</TableCell>
                        <TableCell align="right">${totalAllowances.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Benefits</TableCell>
                        <TableCell align="right">${totalBenefits.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Deductions</TableCell>
                        <TableCell align="right">${totalDeductions.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Greenroom Fee</TableCell>
                        <TableCell align="right">${greenroomFee.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Postage</TableCell>
                        <TableCell align="right">${postageFees.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back: Union Reports
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmitClick}
          disabled={!canSubmit}
        >
          Submit Payroll
        </Button>
      </Box>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Payroll Submission</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to submit this payroll for processing. Once submitted, it will be sent to Greenroom for approval.
            The total amount of ${totalPayrollAmount.toFixed(2)} will be debited from your account.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Note: You will be able to make corrections to this payroll after submission if needed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Confirm Submission
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Step4_3FinalReview;