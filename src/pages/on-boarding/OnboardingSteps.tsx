import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { PayeeType } from './types';

interface OnboardingStepsProps {
  payeeType: PayeeType;
  isManualOnboarding?: boolean;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({ 
  payeeType, 
  isManualOnboarding = true 
}) => {
  // Define steps for each payee type
  const steps = {
    Employee: [
      'General Information',
      'Work Authorization (I-9)',
      'Federal Tax Withholdings (W-4)',
      'NY State Tax Withholdings',
      'Residential State Tax',
      'Payment Details'
    ],
    Loanout: [
      'Entity Information',
      'Work Authorization',
      'Taxpayer Information (W-9)',
      'NY State Tax Withholdings',
      'Residential State Tax',
      'Payment Details'
    ],
    'Vendor/Contractor': [
      'Business Information',
      'Taxpayer Information (W-9)',
      'Payment Details'
    ]
  };

  // Get steps based on payee type
  const payeeSteps = steps[payeeType] || [];

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        {isManualOnboarding ? 'Manual Onboarding Steps:' : 'Self-Onboarding Steps:'}
      </Typography>
      <List dense>
        {payeeSteps.map((step, index) => (
          <ListItem key={index}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleOutlineIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={step} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OnboardingSteps;