import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Tabs, 
  Tab, 
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import { OnboardingFormData, PayeeType } from './types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`onboarding-tabpanel-${index}`}
      aria-labelledby={`onboarding-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const OnboardingLanding: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedPayeeType, setSelectedPayeeType] = useState<PayeeType>('Employee');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleManualOnboarding = (payeeType: PayeeType) => {
    navigate('/onboarding/manual', { state: { payeeType, isManual: true } });
  };

  const handleOpenInviteDialog = (payeeType: PayeeType) => {
    setSelectedPayeeType(payeeType);
    setInviteDialogOpen(true);
  };

  const handleSendInvite = () => {
    // In a real app, this would send an API request to create an invitation
    console.log('Sending invitation for', selectedPayeeType, 'to', inviteEmail);
    console.log('Custom message:', inviteMessage);
    
    // Mock successful invitation
    setTimeout(() => {
      setInviteSent(true);
      // Reset form after showing success message
      setTimeout(() => {
        setInviteDialogOpen(false);
        setInviteEmail('');
        setInviteMessage('');
        setInviteSent(false);
      }, 2000);
    }, 1000);
  };

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5faff', py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="onboarding tabs"
              centered
              sx={{ bgcolor: '#f0f7ff' }}
            >
              <Tab label="Manual Onboarding" icon={<PersonAddIcon />} iconPosition="start" />
              <Tab label="Self-Onboarding" icon={<EmailIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {/* Manual Onboarding Tab */}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" gutterBottom align="center">
              Manual Onboarding (Admin Entry)
            </Typography>
            <Typography variant="body2" paragraph align="center" color="text.secondary">
              Use this option when you have all the required information and documents from the payee.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {(['Employee', 'Loanout', 'Vendor/Contractor'] as PayeeType[]).map((payeeType) => (
                <Grid item xs={12} md={4} key={payeeType}>
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {payeeType}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {payeeType === 'Employee' 
                          ? 'For W-2 employees with tax withholdings' 
                          : payeeType === 'Loanout' 
                            ? 'For individuals operating through their own corporation/LLC' 
                            : 'For independent contractors and service providers'}
                      </Typography>
                      
                      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                        Required Steps:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                        {onboardingSteps[payeeType].map((step, index) => (
                          <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                            {step}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={() => handleManualOnboarding(payeeType)}
                      >
                        Start Manual Onboarding
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Self-Onboarding Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom align="center">
              Self-Onboarding (Email Invitation)
            </Typography>
            <Typography variant="body2" paragraph align="center" color="text.secondary">
              Send an invitation to the payee to complete their own onboarding process.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {(['Employee', 'Loanout', 'Vendor/Contractor'] as PayeeType[]).map((payeeType) => (
                <Grid item xs={12} md={4} key={payeeType}>
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {payeeType}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {payeeType === 'Employee' 
                          ? 'The employee will complete all required tax and payment forms' 
                          : payeeType === 'Loanout' 
                            ? 'The loanout entity will provide business and tax information' 
                            : 'The vendor will provide W-9 and payment information'}
                      </Typography>
                      
                      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                        Forms to Complete:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                        {payeeType === 'Employee' && (
                          <>
                            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>W-4 (Federal Tax Withholding)</Typography>
                            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>I-9 (Employment Eligibility)</Typography>
                            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>State Tax Forms</Typography>
                          </>
                        )}
                        {payeeType === 'Loanout' && (
                          <>
                            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>W-9 (Taxpayer Information)</Typography>
                            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>State Tax Forms</Typography>
                          </>
                        )}
                        {payeeType === 'Vendor/Contractor' && (
                          <>
                            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>W-9 (Taxpayer Information)</Typography>
                          </>
                        )}
                        <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>Direct Deposit Information</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        onClick={() => handleOpenInviteDialog(payeeType)}
                      >
                        Send Self-Onboarding Invitation
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Paper>
      </Container>

      {/* Invitation Dialog */}
      <Dialog 
        open={inviteDialogOpen} 
        onClose={() => !inviteSent && setInviteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Send {selectedPayeeType} Self-Onboarding Invitation
        </DialogTitle>
        <DialogContent>
          {inviteSent ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Invitation sent successfully!
            </Alert>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                sx={{ mt: 2 }}
              />
              <TextField
                margin="dense"
                label="Custom Message (Optional)"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                placeholder="Enter a custom message to include in the invitation email..."
                sx={{ mt: 2 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                The invitation will include a secure link for the {selectedPayeeType.toLowerCase()} to complete their onboarding process.
              </Typography>
            </>
          )}
        </DialogContent>
        {!inviteSent && (
          <DialogActions>
            <Button onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSendInvite} 
              variant="contained" 
              disabled={!inviteEmail}
            >
              Send Invitation
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default OnboardingLanding;