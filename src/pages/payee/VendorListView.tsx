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

// Define OnboardingStatus type
type OnboardingStatus = 'onboarded' | 'pending' | 'not-started';

// Define VendorPayee type
interface VendorPayee {
  id: string;
  name: string;
  type: string;
  union?: string;
  jobTitle?: string;
  department?: string;
  onboardingStatus: OnboardingStatus;
  startDate: string;
  email?: string;
  ein?: string;
  documents?: any[];
  changeHistory?: any[];
}

interface VendorListViewProps {
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
  onPayeeSelect: (payee: VendorPayee) => void;
}

// Sample data - in a real app, this would come from an API
const sampleVendors: VendorPayee[] = [
  {
    id: 'ven-1',
    name: 'ABC Lighting Co.',
    type: 'vendor',
    jobTitle: 'Lighting Equipment',
    department: 'Technical',
    onboardingStatus: 'onboarded',
    startDate: '2023-01-10',
    email: 'contact@abclighting.com',
    ein: '**-*******',
    documents: [],
    changeHistory: []
  },
  {
    id: 'ven-2',
    name: 'Jane Smith Management',
    type: 'manager',
    jobTitle: 'Talent Manager',
    department: 'Talent',
    onboardingStatus: 'pending',
    startDate: '2023-02-15',
    email: 'jane@smithmanagement.com',
    documents: [],
    changeHistory: []
  }
];

const VendorListView: React.FC<VendorListViewProps> = ({ 
  searchTerm, 
  filters, 
  onSearch, 
  onFilterChange,
  onPayeeSelect
}) => {
  const filteredVendors = sampleVendors.filter(vendor => {
    // Search filter
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Other filters
    const matchesUnion = !filters.union || vendor.union === filters.union;
    const matchesJobTitle = !filters.jobTitle || vendor.jobTitle === filters.jobTitle;
    const matchesDepartment = !filters.department || vendor.department === filters.department;
    const matchesOnboarding = !filters.onboardingStatus || vendor.onboardingStatus === filters.onboardingStatus;
    const matchesType = !filters.type || vendor.type === filters.type;
    
    return matchesSearch && matchesUnion && matchesJobTitle && matchesDepartment && 
      matchesOnboarding && matchesType;
  });

  const uniqueValues = (key: keyof VendorPayee) => {
    const values = new Set(sampleVendors.map(v => v[key]));
    // Only return string values for use as keys/children
    return Array.from(values).filter(
      (v): v is string => typeof v === 'string'
    );
  };

  const onboardingStatusColor = (status: OnboardingStatus) => {
    switch (status) {
      case 'onboarded': return 'success';
      case 'pending': return 'warning';
      case 'not-started': return 'error';
      default: return 'default';
    }
  };

  const vendorTypeLabel = (type: string) => {
    switch (type) {
      case 'agent': return 'Agent';
      case 'manager': return 'Manager';
      case 'contractor': return 'Contractor';
      default: return 'Vendor';
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
          {uniqueValues('union').map(union => (
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
          {uniqueValues('jobTitle').map(title => (
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
          {uniqueValues('department').map(dept => (
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
          <MenuItem value="vendor">Vendor</MenuItem>
          <MenuItem value="contractor">Contractor</MenuItem>
          <MenuItem value="agent">Agent</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </TextField>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary">
          Add New Vendor
        </Button>
      </Box>
      
      {filteredVendors.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No vendors found matching your criteria</Typography>
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
              {filteredVendors.map((vendor) => (
                <TableRow 
                  key={vendor.id} 
                  hover 
                  onClick={() => onPayeeSelect(vendor)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendorTypeLabel(vendor.type)}</TableCell>
                  <TableCell>{vendor.union || '-'}</TableCell>
                  <TableCell>{vendor.jobTitle || '-'}</TableCell>
                  <TableCell>{vendor.department || '-'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={vendor.onboardingStatus} 
                      color={onboardingStatusColor(vendor.onboardingStatus)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(vendor.startDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default VendorListView;