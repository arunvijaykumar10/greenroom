import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import PayrollHistory from '../components/PayrollHistory';
import PayrollDetails from '../components/PayrollDetails';
import { mockEmployees } from '../mockData/payrollDetailsData';
import { mockVendors } from '../mockData/vendorData';

const PayrollHistoryPage: React.FC = () => {
  const [selectedPayrollId, setSelectedPayrollId] = useState<string | null>(null);

  // Check for newly submitted payroll from localStorage
  useEffect(() => {
    const storedPayroll = localStorage.getItem('submittedPayroll');
    if (storedPayroll) {
      try {
        // In a real app, we would add this to our payroll list
        console.log('New payroll submitted:', JSON.parse(storedPayroll));
        // Clear from localStorage
        localStorage.removeItem('submittedPayroll');
      } catch (error) {
        console.error('Error parsing submitted payroll:', error);
      }
    }
  }, []);

  const handleViewPayroll = (payrollId: string) => {
    setSelectedPayrollId(payrollId);
  };

  const handleBack = () => {
    setSelectedPayrollId(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Payroll History
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        {selectedPayrollId ? (
          <PayrollDetails 
            payrollId={selectedPayrollId}
            employees={mockEmployees}
            vendors={mockVendors}
            onBack={handleBack}
          />
        ) : (
          <PayrollHistory />
        )}
      </Paper>
    </Container>
  );
};

export default PayrollHistoryPage;