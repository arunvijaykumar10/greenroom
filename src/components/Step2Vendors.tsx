import React, { useState, useEffect } from 'react';
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
  Collapse,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Add as AddIcon } from '@mui/icons-material';
import PayeeRow from './PayeeRow';
import { Payee } from './payrollTypes';
import { mockVendors } from '../mockData/vendorData';


interface Step2VendorsProps {
  vendors: Payee[];
  onUpdate: (vendors: Payee[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const Step2Vendors: React.FC<Step2VendorsProps> = ({ vendors, onUpdate, onBack, onNext }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [vendorData, setVendorData] = useState<Payee[]>(vendors.length > 0 ? vendors : mockVendors);
  const [tabValue, setTabValue] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newVendorType, setNewVendorType] = useState('vendor');

  const handleToggleExpand = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVendors = vendorData.map(vendor => ({
      ...vendor,
      selected: event.target.checked
    }));
    setVendorData(updatedVendors);
    onUpdate(updatedVendors);
  };

  const handleSelectVendor = (id: string, selected: boolean) => {
    const updatedVendors = vendorData.map(vendor => 
      vendor.id === id ? { ...vendor, selected } : vendor
    );
    setVendorData(updatedVendors);
    onUpdate(updatedVendors);
  };

  const handleUpdateVendor = (updatedVendor: Payee) => {
    const updatedVendors = vendorData.map(vendor => 
      vendor.id === updatedVendor.id ? updatedVendor : vendor
    );
    setVendorData(updatedVendors);
    onUpdate(updatedVendors);
  };

  // Filter vendors based on tab selection
  const filteredVendors = vendorData.filter(vendor => {
    if (tabValue === 0) return vendor.type === 'vendor' || vendor.type === 'contractor';
    if (tabValue === 1) return vendor.type === 'agent' || vendor.type === 'manager';
    if (tabValue === 2) return vendor.type === 'child-trust';
    return true;
  });

  const allSelected = filteredVendors.length > 0 && filteredVendors.every(vendor => vendor.selected);
  const someSelected = filteredVendors.some(vendor => vendor.selected) && !allSelected;

  // Handle adding a new vendor
  const handleAddVendor = () => {
    // In a real app, this would send an invitation or create a new vendor record
    const newId = `new-${Date.now()}`;
    const newVendor: Payee = {
      id: newId,
      name: `New ${
        newVendorType === 'vendor' ? 'Vendor' : 
        newVendorType === 'contractor' ? 'Contractor' : 
        newVendorType === 'agent' ? 'Agent' : 
        newVendorType === 'manager' ? 'Manager' : 'Child Trust'
      }`,
      type: newVendorType as any,
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
    
    const updatedVendors = [...vendorData, newVendor];
    setVendorData(updatedVendors);
    onUpdate(updatedVendors);
    setAddDialogOpen(false);
    
    // Switch to the appropriate tab for the new vendor
    if (newVendorType === 'vendor' || newVendorType === 'contractor') {
      setTabValue(0);
    } else if (newVendorType === 'agent' || newVendorType === 'manager') {
      setTabValue(1);
    } else {
      setTabValue(2);
    }
  };

  // Update parent component with mock data if needed
  useEffect(() => {
    if (vendors.length === 0) {
      onUpdate(vendorData);
    }
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Vendors & Contractors
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review and select vendors and contractors to include in this payroll run.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label="Vendors & Contractors" />
          <Tab label="Agents & Managers" />
          <Tab label="Child Trusts" />
        </Tabs>
        
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
        >
          Add Vendor
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
              <TableCell>Service</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Total Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No {tabValue === 0 ? 'vendors or contractors' : 
                        tabValue === 1 ? 'agents or managers' : 
                        'child trusts'} found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredVendors.map((vendor) => (
                <React.Fragment key={vendor.id}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={vendor.selected || false}
                        onChange={(e) => handleSelectVendor(vendor.id, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleToggleExpand(vendor.id)}
                      >
                        {expandedRows[vendor.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={vendor.type === 'agent' ? 'Agent' : 
                              vendor.type === 'manager' ? 'Manager' : 
                              vendor.type === 'child-trust' ? 'Child Trust' : 
                              vendor.type === 'contractor' ? 'Contractor' : 'Vendor'}
                        color={vendor.type === 'agent' || vendor.type === 'manager' ? 'primary' : 
                              vendor.type === 'child-trust' ? 'secondary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={vendor.status}
                        color={vendor.status === 'onboarded' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{vendor.jobTitle}</TableCell>
                    <TableCell>
                      {vendor.rateType === 'hourly' ? `${vendor.rate}/hr` : 
                       vendor.rateType === 'daily' ? `${vendor.rate}/day` : 
                       vendor.rateType === 'weekly' ? `${vendor.rate}/week` : 
                       vendor.type === 'agent' || vendor.type === 'manager' ? '10%' : '-'}
                    </TableCell>
                    <TableCell>
                      ${vendor.type === 'vendor' || vendor.type === 'contractor' ? 
                        (vendor.rate || 0).toFixed(2) : 
                        vendor.type === 'agent' || vendor.type === 'manager' ? 
                        '% of gross' : '-'}
                    </TableCell>
                  </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={expandedRows[vendor.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <PayeeRow 
                          payee={vendor} 
                          onUpdate={handleUpdateVendor} 
                          payeeType={vendor.type === 'contractor' ? 'contractor' : 'vendor'} 
                        />
                        
                        {vendor.reimbursements && vendor.reimbursements.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2">Reimbursements</Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Amount</TableCell>
                                  <TableCell>Code</TableCell>
                                  <TableCell>Class</TableCell>
                                  <TableCell>Note</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {vendor.reimbursements.map((reimbursement) => (
                                  <TableRow key={reimbursement.id}>
                                    <TableCell>${reimbursement.amount.toFixed(2)}</TableCell>
                                    <TableCell>{reimbursement.code}</TableCell>
                                    <TableCell>{reimbursement.class}</TableCell>
                                    <TableCell>{reimbursement.note}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )))}
          
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add Vendor Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Vendor</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Vendor Type</InputLabel>
              <Select
                value={newVendorType}
                label="Vendor Type"
                onChange={(e) => setNewVendorType(e.target.value)}
              >
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="contractor">Contractor</MenuItem>
                <MenuItem value="agent">Agent</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="child-trust">Child Trust</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="body2" color="text.secondary">
              This will create a new {
                newVendorType === 'vendor' ? 'vendor' : 
                newVendorType === 'contractor' ? 'contractor' : 
                newVendorType === 'agent' ? 'agent' : 
                newVendorType === 'manager' ? 'manager' : 'child trust'
              } record and send an invitation for onboarding.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddVendor}>Add Vendor</Button>
        </DialogActions>
      </Dialog>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back: Employees & Loan Outs
        </Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          sx={{ ml: 1 }}
        >
          Next: One-Time Bills
        </Button>
      </Box>
    </Box>
  );
};

export default Step2Vendors;