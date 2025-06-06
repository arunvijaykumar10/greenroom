import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { PayeeType } from './types';

interface OnboardingStepsListProps {
  payeeType: PayeeType;
  currentStep: number;
}

const OnboardingStepsList: React.FC<OnboardingStepsListProps> = ({ payeeType, currentStep }) => {
  // Define steps for each payee type
  const getSteps = () => {
    if (payeeType === 'Employee') {
      return [
        'General Information',
        'Work Authorization (I-9)',
        'Federal Tax Withholdings (W-4)',
        'NY State Tax Withholdings',
        'Residential State Tax',
        'Payment Details'
      ];
    } else if (payeeType === 'Loanout') {
      return [
        'Entity Information',
        'Work Authorization',
        'Taxpayer Information (W-9)',
        'NY State Tax Withholdings',
        'Residential State Tax',
        'Payment Details'
      ];
    } else { // Vendor/Contractor
      return [
        'Business Information',
        'Taxpayer Information (W-9)',
        'Payment Details'
      ];
    }
  };

  const steps = getSteps();

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
      <Typography variant="subtitle2" gutterBottom>
        Onboarding Steps for {payeeType}:
      </Typography>
      <List dense disablePadding>
        {steps.map((step, index) => (
          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              {index < currentStep ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : index === currentStep ? (
                <RadioButtonUncheckedIcon color="primary" fontSize="small" />
              ) : (
                <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText 
              primary={step} 
              primaryTypographyProps={{ 
                variant: 'body2',
                color: index === currentStep ? 'primary.main' : 'text.primary',
                fontWeight: index === currentStep ? 'medium' : 'normal'
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default OnboardingStepsList;