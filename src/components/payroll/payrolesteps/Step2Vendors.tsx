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
import { Payee } from '../../payrollTypes';
import PayeeRow from '../PayeeRow';

interface Step2VendorsProps {
  vendors: Payee[];
  onUpdate: (vendors: Payee[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const Step2Vendors: React.FC<Step2VendorsProps> = ({ onUpdate, onBack, onNext }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  // Sample data - in a real app, this would come from an API
  const [vendorData, setVendorData] = useState<Payee[]>([
    {
        id: 'v1',
        name: 'ABC Lighting Co.',
        type: 'vendor',
        status: 'onboarded',
        jobTitle: 'Lighting Equipment',
        rateType: 'weekly',
        rate: 3500,
        reimbursements: [],
        selected: true,
        adjustments: [],
        increments: [],
        deductions: [],
        allowances: [],
        rates: [{ type: 'weekly', amount: 3500 }],
        selectedRateIndex: 0
    },
    {
      id: 'v2',
      name: 'Jane Smith Management',
      type: 'manager',
      status: 'onboarded',
      jobTitle: 'Talent Management',
      rateType: 'percentage',
      rate: 10, // 10% of gross
      reimbursements: [],
      selected: true,
      adjustments: [],
      increments: [],
      deductions: [],
      allowances: [],
      included: true,
      rates: [{ type: 'percentage', amount: 10 }],
      selectedRateIndex: 0
    }
  ]);

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
    onUpdate(updatedVendors.filter(vendor => vendor.selected));
  };

  const handleSelectVendor = (id: string, selected: boolean) => {
    const updatedVendors = vendorData.map(vendor => 
      vendor.id === id ? { ...vendor, selected } : vendor
    );
    setVendorData(updatedVendors);
    onUpdate(updatedVendors.filter(vendor => vendor.selected));
  };

  const handleUpdateVendor = (updatedVendor: Payee) => {
    const updatedVendors = vendorData.map(vendor => 
      vendor.id === updatedVendor.id ? updatedVendor : vendor
    );
    setVendorData(updatedVendors);
    onUpdate(updatedVendors.filter(vendor => vendor.selected));
  };

  const allSelected = vendorData.length > 0 && vendorData.every(vendor => vendor.selected);
  const someSelected = vendorData.some(vendor => vendor.selected) && !allSelected;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Vendors & Contractors
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review and select vendors and contractors to include in this payroll run.
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
              <TableCell>Service</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Total Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendorData.map((vendor) => (
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
                    {vendor.type === 'agent' ? 'Agent' : 
                     vendor.type === 'manager' ? 'Manager' : 
                     vendor.type === 'child-trust' ? 'Child Trust' : 
                     'Vendor/Contractor'}
                  </TableCell>
                  <TableCell>
                    <Typography color={vendor.status === 'onboarded' ? 'success.main' : 'error.main'}>
                      {vendor.status}
                    </Typography>
                  </TableCell>
                  <TableCell>{vendor.jobTitle}</TableCell>
                  <TableCell>
                    {vendor.rateType === 'percentage' ? `${vendor.rate}%` : `$${vendor.rate}`}
                  </TableCell>
                  <TableCell>
                    ${vendor.rate}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={expandedRows[vendor.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <PayeeRow 
                          payee={vendor} 
                          onUpdate={handleUpdateVendor} 
                          payeeType="vendor" 
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