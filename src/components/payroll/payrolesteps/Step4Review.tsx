import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { Payee } from '../../payrollTypes';
import Step4_1Details from './Step4_1Details';
import Step4_2UnionReports from './Step4_2UnionReports';
import Step4_3FinalReview from './Step4_3FinalReview';


interface Step4ReviewProps {
  employees: Payee[];
  vendors: Payee[];
  oneTimeBills: any[];
  onBack: () => void;
  onSubmit: () => void;
}

const steps = ['Payroll Details', 'Union Reports', 'Final Review'];

const Step4Review: React.FC<Step4ReviewProps> = ({ 
  employees, 
  vendors, 
  oneTimeBills, 
  onBack, 
  onSubmit 
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [unionReportsReviewed, setUnionReportsReviewed] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUnionReportReview = (unionId: string, reviewed: boolean) => {
    setUnionReportsReviewed(prev => ({
      ...prev,
      [unionId]: reviewed
    }));
  };

  const allUnionReportsReviewed = () => {
    // In a real app, we would check against actual union reports
    return Object.values(unionReportsReviewed).every(reviewed => reviewed);
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
        <Step4_1Details 
          employees={employees} 
          vendors={vendors} 
          oneTimeBills={oneTimeBills} 
          onNext={handleNext}
          onBack={onBack}
        />
      )}
      
      {activeStep === 1 && (
        <Step4_2UnionReports 
          employees={employees}
          onReview={handleUnionReportReview}
          onBack={handleBack}
          onNext={handleNext}
          allReviewed={allUnionReportsReviewed()}
        />
      )}
      
      {activeStep === 2 && (
        <Step4_3FinalReview 
          employees={employees}
          vendors={vendors}
          oneTimeBills={oneTimeBills}
          onBack={handleBack}
          onSubmit={onSubmit}
          canSubmit={allUnionReportsReviewed()}
        />
      )}
    </Box>
  );
};

export default Step4Review;