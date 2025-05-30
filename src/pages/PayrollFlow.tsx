import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import PayrollStepper from '../components/PayrollStepper';
import Step1Employees from '../components/Step1Employees';
import Step2Vendors from '../components/Step2Vendors';
import Step3OneTimeBills from '../components/Step3OneTimeBills';
import Step4Review from '../components/Step4Review';
import { Payee } from '../components/payrollTypes';
import { mockEmployees } from '../mockData/payrollDetailsData';
import { mockVendors } from '../mockData/vendorData';

const PayrollFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employees, setEmployees] = useState<Payee[]>(mockEmployees);
  const [vendors, setVendors] = useState<Payee[]>(mockVendors);
  const [oneTimeBills, setOneTimeBills] = useState<any[]>([]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const handleSubmit = () => {
    // Create a new payroll entry for the history
    const newPayroll = {
      id: `PR-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      payPeriod: `Week ending ${new Date().toLocaleDateString()}`,
      payDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: 'submitted',
      numberOfPayees: employees.length + vendors.length,
      employerTaxes: employees.reduce((sum, emp) => sum + ((emp.rate || 0) * 0.0765), 0),
      grossTotal: employees.reduce((sum, emp) => sum + (emp.rate || 0), 0) + 
                 vendors.reduce((sum, v) => sum + (v.rate || 0), 0)
    };
    
    // Save the new payroll to localStorage for the history page to pick up
    localStorage.setItem('submittedPayroll', JSON.stringify(newPayroll));
    
    // Navigate to history page
    window.location.href = '/history';
  };

  const handleUpdateEmployees = (updatedEmployees: Payee[]) => {
    setEmployees(updatedEmployees);
  };

  const handleUpdateVendors = (updatedVendors: Payee[]) => {
    setVendors(updatedVendors);
  };

  const handleUpdateOneTimeBills = (updatedBills: any[]) => {
    setOneTimeBills(updatedBills);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Run Payroll
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Pay Period: Week ending 04/15/2023
      </Typography>
      
      {/* Only show the main PayrollStepper when not in the Review step */}
      {activeStep < 3 && <PayrollStepper activeStep={activeStep} />}
      
      <Paper sx={{ p: 3 }}>
        {activeStep === 0 && (
          <Step1Employees 
            employees={employees} 
            onUpdate={handleUpdateEmployees} 
            onNext={handleNext}
          />
        )}
        
        {activeStep === 1 && (
          <Step2Vendors 
            vendors={vendors} 
            onUpdate={handleUpdateVendors} 
            onBack={handleBack} 
            onNext={handleNext}
          />
        )}
        
        {activeStep === 2 && (
          <Step3OneTimeBills 
            oneTimeBills={oneTimeBills} 
            onUpdate={handleUpdateOneTimeBills} 
            onBack={handleBack} 
            onNext={handleNext}
          />
        )}
        
        {activeStep === 3 && (
          <Step4Review 
            employees={employees}
            vendors={vendors}
            oneTimeBills={oneTimeBills}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </Paper>
    </Container>
  );
};

export default PayrollFlow;