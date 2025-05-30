import React from 'react';
import { 
  Box, 
  TextField, 
  MenuItem, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  TableContainer,
  Chip,
  Button,
  Typography
} from '@mui/material';
import { EmployeePayee } from './payeeTypes';

type OnboardingStatus = 'onboarded' | 'pending' | 'not-started';

interface EmployeeListViewProps {
  searchTerm: string;
  filters: {
    union: string;
    jobTitle: string;
    department: string;
    onboardingStatus: string;
    type: string;
  };
  onSearch: (term: string) => void;
  onFilterChange: (filterName: string, value: string) => void;
  onPayeeSelect: (payee: EmployeePayee) => void;
}

// Sample data - in a real app, this would come from an API
const sampleEmployees: EmployeePayee[] = [
  {
    id: 'emp-1',
    name: 'John Smith',
    type: 'employee',
    union: 'Actors Equity',
    jobTitle: 'Lead Actor',
    department: 'Performance',
    onboardingStatus: 'onboarded',
    startDate: '2023-01-15',
    email: 'john.smith@example.com',
    ssn: '***-**-****',
  },
  {
    id: 'emp-2',
    name: 'Jane Doe LLC',
    type: 'loan-out',
    union: 'Stage Directors',
    jobTitle: 'Director',
    department: 'Production',
    onboardingStatus: 'pending',
    startDate: '2023-02-01',
    email: 'jane@doe-llc.com',
  }
];

const EmployeeListView: React.FC<EmployeeListViewProps> = ({ 
  searchTerm, 
  filters, 
  onSearch, 
  onFilterChange,
  onPayeeSelect
}) => {
  const filteredEmployees = sampleEmployees.filter(employee => {
    // Search filter
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Other filters
    const matchesUnion = !filters.union || employee.union === filters.union;
    const matchesJobTitle = !filters.jobTitle || employee.jobTitle === filters.jobTitle;
    const matchesDepartment = !filters.department || employee.department === filters.department;
    const matchesOnboarding = !filters.onboardingStatus || employee.onboardingStatus === filters.onboardingStatus;
    const matchesType = !filters.type || employee.type === filters.type;
    
    return matchesSearch && matchesUnion && matchesJobTitle && matchesDepartment && 
      matchesOnboarding && matchesType;
  });

  const uniqueValues = (key: keyof EmployeePayee) => {
    const values = new Set(sampleEmployees.map(e => e[key]));
    return Array.from(values).filter(v => v !== undefined);
  };

  const onboardingStatusColor = (status: OnboardingStatus) => {
    switch (status) {
      case 'onboarded': return 'success';
      case 'pending': return 'warning';
      case 'not-started': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        
        <TextField
          select
          label="Union"
          size="small"
          value={filters.union}
          onChange={(e) => onFilterChange('union', e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Unions</MenuItem>
          {uniqueValues('union')
            .filter((union): union is string => typeof union === 'string')
            .map(union => (
              <MenuItem key={union} value={union}>{union}</MenuItem>
            ))}
        </TextField>
        
        <TextField
          select
          label="Job Title"
          size="small"
          value={filters.jobTitle}
          onChange={(e) => onFilterChange('jobTitle', e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Job Titles</MenuItem>
          {uniqueValues('jobTitle')
            .filter((title): title is string => typeof title === 'string')
            .map(title => (
              <MenuItem key={title} value={title}>{title}</MenuItem>
            ))}
        </TextField>
        
        <TextField
          select
          label="Department"
          size="small"
          value={filters.department}
          onChange={(e) => onFilterChange('department', e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Departments</MenuItem>
          {uniqueValues('department')
            .filter((dept): dept is string => typeof dept === 'string')
            .map(dept => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
        </TextField>
        
        <TextField
          select
          label="Onboarding"
          size="small"
          value={filters.onboardingStatus}
          onChange={(e) => onFilterChange('onboardingStatus', e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="onboarded">Onboarded</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="not-started">Not Started</MenuItem>
        </TextField>
        
        <TextField
          select
          label="Type"
          size="small"
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="loan-out">Loan Out</MenuItem>
        </TextField>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary">
          Add New Employee
        </Button>
      </Box>
      
      {filteredEmployees.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No employees found matching your criteria</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Union</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Onboarding</TableCell>
                <TableCell>Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow 
                  key={employee.id} 
                  hover 
                  onClick={() => onPayeeSelect(employee)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>
                    {employee.type === 'loan-out' ? 'Loan Out' : 'Employee'}
                  </TableCell>
                  <TableCell>{employee.union || '-'}</TableCell>
                  <TableCell>{employee.jobTitle || '-'}</TableCell>
                  <TableCell>{employee.department || '-'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={employee.onboardingStatus} 
                      color={onboardingStatusColor(employee.onboardingStatus as OnboardingStatus)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(employee.startDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmployeeListView;