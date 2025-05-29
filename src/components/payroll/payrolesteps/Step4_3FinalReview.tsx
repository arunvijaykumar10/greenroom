import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material';
import { ArrowBack as BackIcon, Check as SubmitIcon } from '@mui/icons-material';

interface Step4_3FinalReviewProps {
  employees: any[]; // Replace 'any' with a more specific type if available
  vendors: any[];
  oneTimeBills: any[];
  onBack: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

const Step4_3FinalReview: React.FC<Step4_3FinalReviewProps> = ({ employees, vendors, oneTimeBills, onBack, onSubmit, canSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('ach');
  const [debitDate, setDebitDate] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [confirmApproval, setConfirmApproval] = useState(false);

  // Calculate totals
  const calculateTotals = (items: any[]) => {
    return items.reduce(
      (acc: { gross: any; deductions: any; net: number; count: number; }, item: { rates: { amount: any; }[]; increments: any[]; deductions: any[]; }) => {
        const gross = item.rates[0].amount + 
                     (item.increments?.reduce((sum: any, inc: { amount: any; }) => sum + inc.amount, 0) || 0);
        const deductions = item.deductions?.reduce((sum: any, ded: { amount: any; }) => sum + ded.amount, 0) || 0;
        const net = gross - deductions;
        
        return {
          gross: acc.gross + gross,
          deductions: acc.deductions + deductions,
          net: acc.net + net,
          count: acc.count + 1
        };
      },
      { gross: 0, deductions: 0, net: 0, count: 0 }
    );
  };

  const employeeTotals = calculateTotals(employees);
  const vendorTotals = calculateTotals(vendors);
  const oneTimeBillsTotal = oneTimeBills.reduce((sum, bill) => sum + bill.amount, 0);

  const totalNetPays = employeeTotals.net + vendorTotals.net + oneTimeBillsTotal;
  const totalTaxes = employees.reduce((sum, emp) => {
    return sum + (emp.deductions?.filter((d: { type: string; }) => d.type === 'tax').reduce((s: any, d: { amount: any; }) => s + d.amount, 0) || 0);
  }, 0);
  
  const totalReimbursements = employees.reduce((sum, emp) => {
    return sum + (emp.reimbursements?.reduce((s: any, r: { amount: any; }) => s + r.amount, 0) || 0);
  }, 0);
  
  const totalAllowances = employees.reduce((sum, emp) => {
    return sum + (emp.allowances?.reduce((s: any, a: { amount: any; }) => s + a.amount, 0) || 0);
  }, 0);
  
  const totalBenefits = employees.reduce((sum, emp) => {
    return sum + (emp.deductions?.filter((d: { type: string; }) => d.type === 'benefit').reduce((s: any, d: { amount: any; }) => s + d.amount, 0) || 0);
  }, 0);
  
  const greenroomFee = (totalNetPays + totalTaxes + totalReimbursements + totalAllowances + totalBenefits) * 0.005;
  const postageFee = employees.length * 0.55; // Example postage rate

  const payrollTotal = totalNetPays + totalTaxes + totalReimbursements + totalAllowances + totalBenefits + greenroomFee + postageFee;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Final Payroll Review
      </Typography>
      <Typography variant="body1" paragraph>
        Please review all payroll details before submission. This is your final opportunity to make changes.
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Summary Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payroll Summary
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Total Employees</TableCell>
                    <TableCell align="right">{employeeTotals.count}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Vendors/Contractors</TableCell>
                    <TableCell align="right">{vendorTotals.count}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>One-Time Bills</TableCell>
                    <TableCell align="right">{oneTimeBills.length}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total Net Pays</strong></TableCell>
                    <TableCell align="right"><strong>${totalNetPays.toFixed(2)}</strong></TableCell>
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
                    <TableCell>Greenroom Platform Fee (0.5%)</TableCell>
                    <TableCell align="right">${greenroomFee.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Postage Fees</TableCell>
                    <TableCell align="right">${postageFee.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Payroll Total</strong></TableCell>
                    <TableCell align="right"><strong>${payrollTotal.toFixed(2)}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Payment Details Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="ach">ACH Transfer</MenuItem>
                <MenuItem value="wire">Wire Transfer</MenuItem>
                <MenuItem value="check">Checks</MenuItem>
                <MenuItem value="mixed">Mixed (ACH + Checks)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Debit Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={debitDate}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDebitDate(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
              <strong>Debit Amount:</strong> ${payrollTotal.toFixed(2)}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Checks to Issue:</strong> {employees.filter(e => e.paymentMethod === 'check').length}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Total Payroll Amount:</strong> ${payrollTotal.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        {/* Department Breakdown */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Department Breakdown
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell align="right">Employees</TableCell>
                    <TableCell align="right">Gross Wages</TableCell>
                    <TableCell align="right">Adjustments</TableCell>
                    <TableCell align="right">Taxes</TableCell>
                    <TableCell align="right">Net Pay</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(new Set(employees.map(e => e.department))).map(dept => {
                    const deptEmployees = employees.filter(e => e.department === dept);
                    const totals = calculateTotals(deptEmployees);
                    return (
                      <TableRow key={dept}>
                        <TableCell>{dept}</TableCell>
                        <TableCell align="right">{deptEmployees.length}</TableCell>
                        <TableCell align="right">${totals.gross.toFixed(2)}</TableCell>
                        <TableCell align="right">${
                          deptEmployees.reduce((sum, emp) => sum + 
                            (emp.increments?.reduce((s: any, inc: { amount: any; }) => s + inc.amount, 0) || 0), 0).toFixed(2)
                        }</TableCell>
                        <TableCell align="right">${
                          deptEmployees.reduce((sum, emp) => sum + 
                            (emp.deductions?.filter((d: { type: string; }) => d.type === 'tax').reduce((s: any, d: { amount: any; }) => s + d.amount, 0) || 0), 0).toFixed(2)
                        }</TableCell>
                        <TableCell align="right">${totals.net.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <FormControlLabel
        control={
          <Checkbox
            checked={confirmApproval}
            onChange={(e) => setConfirmApproval(e.target.checked)}
            color="primary"
          />
        }
        label="I confirm that all payroll information is accurate and approve this payroll for processing."
        sx={{ mt: 3, display: 'block' }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          endIcon={<SubmitIcon />}
          onClick={onSubmit}
          disabled={!confirmApproval || !canSubmit}
        >
          Submit Payroll
        </Button>
      </Box>
    </Box>
  );
};

export default Step4_3FinalReview;