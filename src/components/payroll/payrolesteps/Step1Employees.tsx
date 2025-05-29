import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Checkbox,
  TableContainer,
  IconButton,
  Collapse
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import type { Payee } from '../../payrollTypes';
import PayeeRow from '../PayeeRow';

interface Step1EmployeesProps {
  employees: Payee[];
  onUpdate: (employees: Payee[]) => void;
  onNext: () => void;
}

const Step1Employees: React.FC<Step1EmployeesProps> = ({  onUpdate, onNext }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  // Sample data - in a real app, this would come from an API
  const [employeeData, setEmployeeData] = useState<Payee[]>([
    {
      id: '1',
      name: 'John Doe',
      type: 'employee',
      status: 'onboarded',
      union: 'Actors Equity',
      jobTitle: 'Actor',
      department: 'Performance',
      rateType: 'weekly',
      rate: 2000,
      adjustments: [],
      increments: [],
      deductions: [],
      allowances: [],
      reimbursements: [],
      timesheetApproved: true,
      selected: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      type: 'employee',
      status: 'not-onboarded',
      jobTitle: 'Stage Manager',
      department: 'Production',
      rateType: 'weekly',
      rate: 1500,
      adjustments: [],
      increments: [],
      deductions: [],
      allowances: [],
      reimbursements: [],
      timesheetApproved: false,
      selected: false
    }
  ]);

  const handleToggleExpand = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEmployees = employeeData.map(emp => ({
      ...emp,
      selected: event.target.checked
    }));
    setEmployeeData(updatedEmployees);
    onUpdate(updatedEmployees.filter(emp => emp.selected));
  };

  const handleSelectEmployee = (id: string, selected: boolean) => {
    const updatedEmployees = employeeData.map(emp => 
      emp.id === id ? { ...emp, selected } : emp
    );
    setEmployeeData(updatedEmployees);
    onUpdate(updatedEmployees.filter(emp => emp.selected));
  };

  const handleUpdateEmployee = (payee: Payee) => {
    const updatedEmployees = employeeData.map(emp => 
      emp.id === payee.id ? payee : emp
    );
    setEmployeeData(updatedEmployees);
    onUpdate(updatedEmployees.filter(emp => emp.selected));
  };

  const allSelected = employeeData.length > 0 && employeeData.every(emp => emp.selected);
  const someSelected = employeeData.some(emp => emp.selected) && !allSelected;

  const canProceed = employeeData.some(emp => emp.selected);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employees & Loan Outs
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review and select employees to include in this payroll run. You can include employees who are not yet fully onboarded.
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={someSelected}
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Union</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Total Gross</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((employee) => (
              <React.Fragment key={employee.id}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={employee.selected || false}
                      onChange={(e) => handleSelectEmployee(employee.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleToggleExpand(employee.id)}
                    >
                      {expandedRows[employee.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.type}</TableCell>
                  <TableCell>
                    <Typography color={employee.status === 'onboarded' ? 'success.main' : 'error.main'}>
                      {employee.status}
                    </Typography>
                  </TableCell>
                  <TableCell>{employee.union || 'Non-Union'}</TableCell>
                  <TableCell>{employee.jobTitle}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    {employee.rateType === 'hourly' ? `$${employee.rate}/hr` : 
                     employee.rateType === 'daily' ? `$${employee.rate}/day` : 
                     employee.rateType === 'weekly' ? `$${employee.rate}/wk` : 
                     `$${employee.rate}`}
                  </TableCell>
                  <TableCell>
                    ${(employee.rate ?? 0) + (employee.increments?.reduce((sum, inc) => sum + inc.rate, 0) || 0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={expandedRows[employee.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <PayeeRow 
                          payee={employee} 
                          onUpdate={handleUpdateEmployee} 
                          payeeType="employee" 
                        />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          onClick={onNext}
          disabled={!canProceed}
          sx={{ ml: 1 }}
        >
          Next: Vendors & Contractors
        </Button>
      </Box>
    </Box>
  );
};

export default Step1Employees;