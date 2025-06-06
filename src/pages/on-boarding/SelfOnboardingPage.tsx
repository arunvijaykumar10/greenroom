import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { OnboardingFormData } from './types';
import WorkAuthorization from './WorkAuthorization';
import FederalTaxWithholdings from './FederalTaxWithholdings';
import NYStateTaxWithholdings from './NYStateTaxWithholdings';
import ResidentialStateTax from './ResidentialStateTax';
import PaymentDetails from './PaymentDetails';
import VendorTaxpayerInfo from './VendorTaxpayerInfo';

interface SelfOnboardingPageProps {
  token?: string; // Token from the invitation link
}

const SelfOnboardingPage: React.FC<SelfOnboardingPageProps> = ({ token }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({
    payeeType: 'Employee', // Default, will be updated from API
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Simulate fetching payee data based on token
  useEffect(() => {
    // In a real app, this would be an API call to validate the token and get payee data
    setTimeout(() => {
      // Mock data - in real app this would come from the API
      setFormData({
        payeeType: 'Employee',
        legalFirstName: 'John',
        legalLastName: 'Doe',
        email: 'john.doe@example.com',
        isUnionMember: true,
        union: 'Actor\'s Equity Association',
        jobTitle: 'Actor',
        jobStartDate: '2023-05-01',
      });
      setIsLoading(false);
    }, 1500);
  }, [token]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormChange = (data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit the data to the API
    console.log('Form submitted:', formData);
    setIsComplete(true);
  };

  // Get steps based on payee type
  const getSteps = () => {
    if (formData.payeeType === 'Employee') {
      return [
        'Work Authorization (I-9)',
        'Federal Tax Withholdings (W-4)',
        'NY State Tax Withholdings',
        'Residential State Tax',
        'Payment Details'
      ];
    } else if (formData.payeeType === 'Loanout') {
      return [
        'Work Authorization (I-9)',
        'Taxpayer Information (W-9)',
        'NY State Tax Withholdings',
        'Residential State Tax',
        'Payment Details'
      ];
    } else { // Vendor/Contractor
      return [
        'Taxpayer Information (W-9)',
        'Payment Details'
      ];
    }
  };

  const steps = getSteps();

  const getStepContent = (step: number) => {
    if (formData.payeeType === 'Employee') {
      switch (step) {
        case 0:
          return (
            <WorkAuthorization
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 1:
          return (
            <FederalTaxWithholdings
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 2:
          return (
            <NYStateTaxWithholdings
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 3:
          return (
            <ResidentialStateTax
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 4:
          return (
            <PaymentDetails
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          );
        default:
          return 'Unknown step';
      }
    } else if (formData.payeeType === 'Loanout') {
      switch (step) {
        case 0:
          return (
            <WorkAuthorization
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 1:
          return (
            <VendorTaxpayerInfo
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 2:
          return (
            <NYStateTaxWithholdings
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 3:
          return (
            <ResidentialStateTax
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 4:
          return (
            <PaymentDetails
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          );
        default:
          return 'Unknown step';
      }
    } else { // Vendor/Contractor
      switch (step) {
        case 0:
          return (
            <VendorTaxpayerInfo
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        case 1:
          return (
            <PaymentDetails
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          );
        default:
          return 'Unknown step';
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (isComplete) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="body1">
          Your onboarding information has been submitted successfully. The production team will contact you if any additional information is needed.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5faff', py: 6, px: 0 }}>
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 2, sm: 5 },
            boxShadow: 8,
            bgcolor: '#fff',
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Complete Your Onboarding
          </Typography>
          
          <Typography variant="body1" paragraph align="center">
            Please provide the required information to complete your onboarding process.
          </Typography>

          <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ mt: 3 }}>
            {getStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SelfOnboardingPage;