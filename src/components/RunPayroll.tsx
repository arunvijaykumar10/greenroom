import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Paper, Typography } from '@mui/material';
import { Payroll, Payee } from './payrollTypes';
import Step1Employees from './Step1Employees';
import Step2Vendors from './Step2Vendors';
import Step3OneTimeBills from './Step3OneTimeBills';
import Step4Review from './Step4Review';


interface RunPayrollProps {
  payroll: Payroll;
}

const steps = ['Employees & Loan Outs', 'Vendors & Contractors', 'One-Time Bills', 'Review & Submit'];

const RunPayroll: React.FC<RunPayrollProps> = ({ payroll }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [employees, setEmployees] = useState<Payee[]>([]);
  const [vendors, setVendors] = useState<Payee[]>([]);
  const [oneTimeBills, setOneTimeBills] = useState<any[]>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleEmployeesUpdate = (updatedEmployees: Payee[]) => {
    setEmployees(updatedEmployees);
  };

  const handleVendorsUpdate = (updatedVendors: Payee[]) => {
    setVendors(updatedVendors);
  };

  const handleOneTimeBillsUpdate = (updatedBills: any[]) => {
    setOneTimeBills(updatedBills);
  };

  const handleSubmitPayroll = () => {
    // Submit payroll logic here
    console.log('Submitting payroll:', { employees, vendors, oneTimeBills });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === 0 && (
        <Step1Employees 
          employees={employees} 
          onUpdate={handleEmployeesUpdate} 
          onNext={handleNext}
        />
      )}
      
      {activeStep === 1 && (
        <Step2Vendors 
          vendors={vendors} 
          onUpdate={handleVendorsUpdate} 
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      
      {activeStep === 2 && (
        <Step3OneTimeBills 
          bills={oneTimeBills} 
          onUpdate={handleOneTimeBillsUpdate} 
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
          onSubmit={handleSubmitPayroll}
        />
      )}
    </Box>
  );
};

export default RunPayroll;