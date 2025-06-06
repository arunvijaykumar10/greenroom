import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Grid,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { PayeeType } from './types';

interface OnboardingTypeSelectorProps {
  onSelectType: (type: PayeeType, isManual: boolean) => void;
}

const OnboardingTypeSelector: React.FC<OnboardingTypeSelectorProps> = ({ onSelectType }) => {
  // Define onboarding steps for different payee types
  const onboardingSteps = {
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

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Select Payee Type
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Employee Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Employee
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" paragraph>
                For W-2 employees who will be paid directly through payroll with tax withholdings.
              </Typography>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Required Steps:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {onboardingSteps.Employee.map((step, index) => (
                  <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                    {step}
                  </Typography>
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => onSelectType('Employee', true)}
              >
                Start Onboarding
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Loanout Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Loanout
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" paragraph>
                For individuals who operate through their own corporation or LLC for tax purposes.
              </Typography>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Required Steps:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {onboardingSteps.Loanout.map((step, index) => (
                  <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                    {step}
                  </Typography>
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => onSelectType('Loanout', true)}
              >
                Manual Onboarding
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => onSelectType('Loanout', false)}
              >
                Self-Onboarding
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Vendor/Contractor Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HandshakeIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Vendor/Contractor
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" paragraph>
                For independent contractors, vendors, and service providers who will receive 1099 forms.
              </Typography>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Required Steps:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {onboardingSteps['Vendor/Contractor'].map((step, index) => (
                  <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                    {step}
                  </Typography>
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => onSelectType('Vendor/Contractor', true)}
              >
                Manual Onboarding
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => onSelectType('Vendor/Contractor', false)}
              >
                Self-Onboarding
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Note: Employee onboarding must be completed manually. Self-onboarding is available for Loanout and Vendor/Contractor payees.
        </Typography>
      </Box>
    </Box>
  );
};

export default OnboardingTypeSelector;