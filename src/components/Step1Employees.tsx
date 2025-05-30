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
  TextField,
  MenuItem,
  IconButton,
  Collapse,
  Tabs,
  Tab,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Add as AddIcon } from '@mui/icons-material';
import PayeeRow from './PayeeRow';
import { Payee } from './payrollTypes';


interface Step1EmployeesProps {
  employees: Payee[];
  onUpdate: (employees: Payee[]) => void;
  onNext: () => void;
}

const Step1Employees: React.FC<Step1EmployeesProps> = ({ employees, onUpdate, onNext }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [tabValue, setTabValue] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newWorkerType, setNewWorkerType] = useState('employee');
  
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
    },
    {
      id: '3',
      name: 'Robert Johnson',
      type: 'loan-out',
      status: 'onboarded',
      jobTitle: 'Director',
      department: 'Direction',
      rateType: 'weekly',
      rate: 3000,
      adjustments: [],
      increments: [],
      deductions: [],
      allowances: [],
      reimbursements: [],
      timesheetApproved: true,
      selected: true
    }
  ]);

  const handleToggleExpand = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter employees based on tab selection
  const filteredEmployees = employeeData.filter(employee => {
    if (tabValue === 0) return employee.type === 'employee';
    if (tabValue === 1) return employee.type === 'loan-out';
    return true;
  });

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEmployees = employeeData.map(emp => {
      // Only update employees of the current tab type
      if ((tabValue === 0 && emp.type === 'employee') || 
          (tabValue === 1 && emp.type === 'loan-out')) {
        return { ...emp, selected: event.target.checked };
      }
      return emp;
    });
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

  const handleUpdateEmployee = (updatedEmployee: Payee) => {
    const updatedEmployees = employeeData.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployeeData(updatedEmployees);
    onUpdate(updatedEmployees.filter(emp => emp.selected));
  };

  const handleAddWorker = () => {
    // In a real app, this would send an invitation or create a new worker record
    const newId = `new-${Date.now()}`;
    const newWorker: Payee = {
      id: newId,
      name: `New ${newWorkerType === 'employee' ? 'Employee' : 'Loan-out'}`,
      type: newWorkerType as 'employee' | 'loan-out',
      status: 'not-onboarded',
      jobTitle: '',
      rateType: 'hourly',
      rate: 0,
      adjustments: [],
      increments: [],
      deductions: [],
      allowances: [],
      reimbursements: [],
      selected: true
    };
    
    setEmployeeData([...employeeData, newWorker]);
    setAddDialogOpen(false);
  };

  const allSelected = filteredEmployees.length > 0 && filteredEmployees.every(emp => emp.selected);
  const someSelected = filteredEmployees.some(emp => emp.selected) && !allSelected;

  const canProceed = employeeData.some(emp => emp.selected);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employees & Loan Outs
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review and select employees to include in this payroll run. You can include employees who are not yet fully onboarded.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label="Employees" />
          <Tab label="Loan Outs" />
        </Tabs>
        
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
        >
          Add Worker
        </Button>
      </Box>
      
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
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No {tabValue === 0 ? 'employees' : 'loan outs'} found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
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
                    <TableCell>
                      <Chip 
                        label={employee.type === 'employee' ? 'Employee' : 'Loan Out'}
                        color={employee.type === 'employee' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status}
                        color={employee.status === 'onboarded' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{employee.union || 'Non-Union'}</TableCell>
                    <TableCell>{employee.jobTitle}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      {employee.rateType === 'hourly' ? `${employee.rate}/hr` : 
                       employee.rateType === 'daily' ? `${employee.rate}/day` : 
                       employee.rateType === 'weekly' ? `${employee.rate}/wk` : 
                       `${employee.rate}`}
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
                            payeeType={
                              employee.type === 'loan-out'
                                ? 'contractor'
                                : employee.type === 'employee'
                                ? 'employee'
                                : employee.type === 'vendor'
                                ? 'vendor'
                                : 'employee'
                            }
                          />
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add Worker Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Worker</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Worker Type</InputLabel>
              <Select
                value={newWorkerType}
                label="Worker Type"
                onChange={(e) => setNewWorkerType(e.target.value)}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="loan-out">Loan Out</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="body2" color="text.secondary">
              This will create a new {newWorkerType === 'employee' ? 'employee' : 'loan-out'} record and send an invitation for onboarding.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddWorker}>Add Worker</Button>
        </DialogActions>
      </Dialog>
      
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