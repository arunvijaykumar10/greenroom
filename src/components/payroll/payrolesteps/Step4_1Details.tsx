import React from 'react';
import { Box, Button, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@mui/material';
import { Payee } from '../../payrollTypes';

interface Step4_1DetailsProps {
  employees: Payee[];
  vendors: Payee[];
  oneTimeBills: any[];
  onBack: () => void;
  onNext: () => void;
}

const Step4_1Details: React.FC<Step4_1DetailsProps> = ({ 
  employees, 
  vendors, 
  oneTimeBills, 
  onBack, 
  onNext 
}) => {
  // Calculate department totals
  const departmentTotals = employees.reduce((acc, employee) => {
    const department = employee.department || 'Other';
    if (!acc[department]) {
      acc[department] = {
        wages: 0,
        adjustments: 0,
        taxes: 0,
        netPay: 0
      };
    }
    
    const wages = employee.rate || 0;
    const adjustments = employee.adjustments?.reduce((sum, adj) => sum + adj.rate, 0) || 0;
    const deductions = employee.deductions?.reduce((sum, ded) => sum + ded.amount, 0) || 0;
    
    acc[department].wages += wages;
    acc[department].adjustments += adjustments;
    acc[department].taxes += deductions * 0.3; // Simplified tax calculation
    acc[department].netPay += wages + adjustments - deductions;
    
    return acc;
  }, {} as Record<string, { wages: number; adjustments: number; taxes: number; netPay: number }>);

  // Calculate company totals
  const companyTotals = {
    totalNetPays: employees.reduce((sum, emp) => sum + (emp.rate || 0), 0),
    totalTaxes: employees.reduce((sum, emp) => sum + (emp.deductions?.reduce((dSum, ded) => dSum + ded.amount, 0) || 0), 0),
    totalReimbursements: employees.reduce((sum, emp) => sum + (emp.reimbursements?.reduce((rSum, reim) => rSum + reim.amount, 0) || 0), 0),
    totalAllowances: employees.reduce((sum, emp) => sum + (emp.allowances?.reduce((aSum, all) => aSum + all.amount, 0) || 0), 0),
    totalBenefits: 0, // Would calculate based on benefits
    totalDeductions: employees.reduce((sum, emp) => sum + (emp.deductions?.reduce((dSum, ded) => dSum + ded.amount, 0) || 0), 0),
    greenroomFee: 0, // Would calculate
    postage: 0 // Would calculate
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payroll Details Review
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review all payroll details before proceeding to union reports.
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Payees Summary
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Wages</TableCell>
                <TableCell>Deductions</TableCell>
                <TableCell>Taxes</TableCell>
                <TableCell>Net Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.jobTitle}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>${employee.rate?.toFixed(2)}</TableCell>
                  <TableCell>
                    ${employee.deductions?.reduce((sum, ded) => sum + ded.amount, 0).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    ${((employee.deductions?.reduce((sum, ded) => sum + ded.amount, 0) || 0) * 0.3).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    ${((employee.rate || 0) - (employee.deductions?.reduce((sum, ded) => sum + ded.amount, 0) || 0)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Department Totals
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Wages</TableCell>
                <TableCell>Adjustments</TableCell>
                <TableCell>Taxes</TableCell>
                <TableCell>Net Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(departmentTotals).map(([dept, totals]) => (
                <TableRow key={dept}>
                  <TableCell>{dept}</TableCell>
                  <TableCell>${totals.wages.toFixed(2)}</TableCell>
                  <TableCell>${totals.adjustments.toFixed(2)}</TableCell>
                  <TableCell>${totals.taxes.toFixed(2)}</TableCell>
                  <TableCell>${totals.netPay.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Company Totals
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Total Net Pays</TableCell>
                <TableCell>${companyTotals.totalNetPays.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Taxes</TableCell>
                <TableCell>${companyTotals.totalTaxes.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Reimbursements</TableCell>
                <TableCell>${companyTotals.totalReimbursements.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Allowances</TableCell>
                <TableCell>${companyTotals.totalAllowances.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Benefits</TableCell>
                <TableCell>${companyTotals.totalBenefits.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Deductions</TableCell>
                <TableCell>${companyTotals.totalDeductions.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Greenroom Fee</TableCell>
                <TableCell>${companyTotals.greenroomFee.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Postage</TableCell>
                <TableCell>${companyTotals.postage.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back: One-Time Bills
        </Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          sx={{ ml: 1 }}
        >
          Next: Union Reports
        </Button>
      </Box>
    </Box>
  );
};

export default Step4_1Details;