import React, { useState } from 'react';
import { Box } from '@mui/material';
import EmployeeListView from './EmployeeListView';
import VendorListView from './VendorListView';
import PayeeProfile from './PayeeProfile';
import { Payee } from './payeeTypes';

interface PayeesLandingProps {
  payeeType: 'employee' | 'vendor';
  onPayeeSelect: (payee: Payee) => void;
  selectedPayee: Payee | null;
}

const PayeesLanding: React.FC<PayeesLandingProps> = ({ 
  payeeType, 
  onPayeeSelect,
  selectedPayee 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    union: '',
    jobTitle: '',
    department: '',
    onboardingStatus: '',
    type: ''
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Box sx={{ flex: selectedPayee ? 5 : 12 }}>
        {payeeType === 'employee' ? (
          <EmployeeListView 
            searchTerm={searchTerm}
            filters={filters}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onPayeeSelect={(payee) => onPayeeSelect(payee as unknown as Payee)}
          />
        ) : (
          <VendorListView 
            searchTerm={searchTerm}
            filters={filters}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onPayeeSelect={(payee) => onPayeeSelect(payee as unknown as Payee)}
          />
        )}
      </Box>
      
      {selectedPayee && (
        <Box sx={{ flex: 7 }}>
          <PayeeProfile 
            payee={selectedPayee}
            onClose={() => onPayeeSelect(null as unknown as Payee)}
          />
        </Box>
      )}
    </Box>
  );
};

export default PayeesLanding;