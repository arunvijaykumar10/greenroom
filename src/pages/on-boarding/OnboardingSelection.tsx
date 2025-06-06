import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Card, 
  CardContent, 
  CardActions,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import HandshakeIcon from '@mui/icons-material/Handshake';

interface OnboardingSelectionProps {
  userRole?: 'admin' | 'manager' | 'employee';
}

const OnboardingSelection: React.FC<OnboardingSelectionProps> = ({ userRole = 'admin' }) => {
  const navigate = useNavigate();

  // Define onboarding steps for different payee types
  const onboardingSteps = {
    employee: [
      'General Information',
      'Work Authorization (I-9)',
      'Federal Tax Withholdings (W-4)',
      'State Tax Withholdings',
      'Payment Details'
    ],
    loanout: [
      'Entity Information',
      'Work Authorization',
      'Taxpayer Information (W-9)',
      'State Tax Forms',
      'Payment Details'
    ],
    vendor: [
      'Business Information',
      'Taxpayer Information (W-9)',
      'Payment Details'
    ]
  };

  // Handle navigation to appropriate onboarding page
  const handleManualOnboarding = (payeeType: string) => {
    navigate('/onboarding', { state: { payeeType, isManual: true } });
  };

  const handleSelfOnboarding = (payeeType: string) => {
    navigate('/self-onboarding', { state: { payeeType } });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5faff', py: 6, px: 3 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, mx: 'auto', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="500">
          Payee Onboarding System
        </Typography>
        
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
          Select the appropriate onboarding method and payee type to begin the process
        </Typography>

        <Grid container spacing={4}>
          {/* Employee Card */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5" component="div">
                    Employee
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" paragraph>
                  For W-2 employees who will be paid directly through payroll with tax withholdings.
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Required Steps:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  {onboardingSteps.employee.map((step, index) => (
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
                  onClick={() => handleManualOnboarding('Employee')}
                  sx={{ mb: 1 }}
                >
                  Manual Onboarding
                </Button>
                {userRole === 'admin' && (
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={() => handleSelfOnboarding('Employee')}
                  >
                    Send Self-Onboarding Invite
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>

          {/* Loanout Card */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BusinessIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5" component="div">
                    Loanout
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" paragraph>
                  For individuals who operate through their own corporation or LLC for tax purposes.
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Required Steps:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  {onboardingSteps.loanout.map((step, index) => (
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
                  onClick={() => handleManualOnboarding('Loanout')}
                  sx={{ mb: 1 }}
                >
                  Manual Onboarding
                </Button>
                {userRole === 'admin' && (
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={() => handleSelfOnboarding('Loanout')}
                  >
                    Send Self-Onboarding Invite
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>

          {/* Vendor/Contractor Card */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HandshakeIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5" component="div">
                    Vendor/Contractor
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" paragraph>
                  For independent contractors, vendors, and service providers who will receive 1099 forms.
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Required Steps:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  {onboardingSteps.vendor.map((step, index) => (
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
                  onClick={() => handleManualOnboarding('Vendor/Contractor')}
                  sx={{ mb: 1 }}
                >
                  Manual Onboarding
                </Button>
                {userRole === 'admin' && (
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={() => handleSelfOnboarding('Vendor/Contractor')}
                  >
                    Send Self-Onboarding Invite
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {userRole === 'admin' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Manual onboarding is completed by administrators. Self-onboarding sends an email invitation to the payee.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default OnboardingSelection;