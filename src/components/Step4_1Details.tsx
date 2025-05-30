import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs, Tab } from '@mui/material';
import { Payee, PayeeSummary, DepartmentTotal, CompanyTotal } from './payrollTypes';
import {  mockPayeeSummary, mockDepartmentTotals, mockCompanyTotal } from '../mockData/payrollDetailsData';

interface Step4_1DetailsProps {
  employees: Payee[];
  vendors: Payee[];
  oneTimeBills: any[];
  onBack: () => void;
  onNext: () => void;
}

const Step4_1Details: React.FC<Step4_1DetailsProps> = ({ 
  employees, 
  onBack, 
  onNext 
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [payeeSummary, setPayeeSummary] = useState<PayeeSummary[]>([]);
  const [departmentTotals, setDepartmentTotals] = useState<DepartmentTotal[]>([]);
  const [companyTotals, setCompanyTotals] = useState<CompanyTotal>({
    totalNetPays: 0,
    totalTaxes: 0,
    totalReimbursements: 0,
    totalAllowances: 0,
    totalBenefits: 0,
    totalDeductions: 0,
    greenroomFee: 0,
    postage: 0
  });

  useEffect(() => {
    // If we have real employees, calculate real data, otherwise use mock data
    if (employees.length > 0) {
      // Calculate payee summary
      const calculatedPayeeSummary = employees.map(employee => {
        const wages = (employee.rate || 0) + (employee.adjustments?.reduce((sum, adj) => sum + adj.rate, 0) || 0);
        const deductions = employee.deductions?.reduce((sum, ded) => sum + ded.amount, 0) || 0;
        const taxes = employee.deductions?.filter(d => d.type === 'tax').reduce((sum, tax) => sum + tax.amount, 0) || 0;
        
        return {
          name: employee.name,
          jobTitle: employee.jobTitle || '',
          department: employee.department || 'Unassigned',
          wages,
          deductions,
          taxes,
          netPay: wages - deductions,
          employerFringe: employee.union ? 150 : 0 // $150 health fund for union employees
        };
      });
      setPayeeSummary(calculatedPayeeSummary);
      
      // Calculate department totals
      const deptMap: Record<string, DepartmentTotal> = {};
      employees.forEach(employee => {
        const department = employee.department || 'Other';
        if (!deptMap[department]) {
          deptMap[department] = {
            department,
            wages: 0,
            adjustments: 0,
            contributions: 0,
            taxes: 0
          };
        }
        
        const wages = employee.rate || 0;
        const adjustments = employee.adjustments?.reduce((sum, adj) => sum + adj.rate, 0) || 0;
        const taxes = employee.deductions?.filter(d => d.type === 'tax').reduce((sum, tax) => sum + tax.amount, 0) || 0;
        const contributions = employee.union ? 150 : 0;
        
        deptMap[department].wages += wages;
        deptMap[department].adjustments += adjustments;
        deptMap[department].taxes += taxes;
        deptMap[department].contributions += contributions;
      });
      setDepartmentTotals(Object.values(deptMap));
      
      // Calculate company totals
      const totalNetPays = employees.reduce((sum, emp) => {
        const wages = (emp.rate || 0) + (emp.adjustments?.reduce((sum, adj) => sum + adj.rate, 0) || 0);
        const deductions = emp.deductions?.reduce((sum, ded) => sum + ded.amount, 0) || 0;
        return sum + (wages - deductions);
      }, 0);
      
      const totalTaxes = employees.reduce((sum, emp) => 
        sum + (emp.deductions?.filter(d => d.type === 'tax').reduce((dSum, ded) => dSum + ded.amount, 0) || 0), 0);
      
      const totalReimbursements = employees.reduce((sum, emp) => 
        sum + (emp.reimbursements?.reduce((rSum, reim) => rSum + reim.amount, 0) || 0), 0);
      
      const totalAllowances = employees.reduce((sum, emp) => 
        sum + (emp.allowances?.reduce((aSum, all) => aSum + all.amount, 0) || 0), 0);
      
      const totalBenefits = employees.filter(emp => emp.union).length * 150;
      
      const totalDeductions = employees.reduce((sum, emp) => 
        sum + (emp.deductions?.reduce((dSum, ded) => dSum + ded.amount, 0) || 0), 0);
      
      const totalPayroll = employees.reduce((sum, emp) => sum + (emp.rate || 0), 0);
      const greenroomFee = totalPayroll * 0.005; // 0.5% of total payroll
      const postage = employees.length * 5; // $5 per check
      
      setCompanyTotals({
        totalNetPays,
        totalTaxes,
        totalReimbursements,
        totalAllowances,
        totalBenefits,
        totalDeductions,
        greenroomFee,
        postage
      });
    } else {
      // Use mock data
      setPayeeSummary(mockPayeeSummary);
      setDepartmentTotals(mockDepartmentTotals);
      setCompanyTotals(mockCompanyTotal);
    }
  }, [employees]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payroll Details Review
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review all payroll details before proceeding to union reports.
      </Typography>
      
      <Tabs 
        value={tabValue} 
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Payees Summary" />
        <Tab label="Department Totals" />
        <Tab label="Company Totals" />
      </Tabs>
      
      {tabValue === 0 && (
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
                  <TableCell>Employer Fringe</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payeeSummary.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">No payees found</TableCell>
                  </TableRow>
                ) : (
                  payeeSummary.map((payee, index) => (
                    <TableRow key={index}>
                      <TableCell>{payee.name}</TableCell>
                      <TableCell>{payee.jobTitle}</TableCell>
                      <TableCell>{payee.department}</TableCell>
                      <TableCell>${payee.wages.toFixed(2)}</TableCell>
                      <TableCell>${payee.deductions.toFixed(2)}</TableCell>
                      <TableCell>${payee.taxes.toFixed(2)}</TableCell>
                      <TableCell>${payee.netPay.toFixed(2)}</TableCell>
                      <TableCell>${payee.employerFringe.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      
      {tabValue === 1 && (
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
                  <TableCell>Contributions</TableCell>
                  <TableCell>Taxes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departmentTotals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No department data found</TableCell>
                  </TableRow>
                ) : (
                  departmentTotals.map((dept, index) => (
                    <TableRow key={index}>
                      <TableCell>{dept.department}</TableCell>
                      <TableCell>${dept.wages.toFixed(2)}</TableCell>
                      <TableCell>${dept.adjustments.toFixed(2)}</TableCell>
                      <TableCell>${dept.contributions.toFixed(2)}</TableCell>
                      <TableCell>${dept.taxes.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      
      {tabValue === 2 && (
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
                <TableRow sx={{ '& td': { fontWeight: 'bold' } }}>
                  <TableCell>Total Payroll Amount</TableCell>
                  <TableCell>${(companyTotals.totalNetPays + companyTotals.totalTaxes + companyTotals.greenroomFee + companyTotals.postage).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      
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