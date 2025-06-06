import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import { OnboardingFormData } from './types';
import { Link } from 'react-router-dom';

interface OnboardingConfirmationProps {
  formData: OnboardingFormData;
}

const OnboardingConfirmation: React.FC<OnboardingConfirmationProps> = ({ formData }) => {
  const isManualOnboarding = !formData.invitationSent;
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5faff', py: 6, px: 0 }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          p: { xs: 2, sm: 5 },
          boxShadow: 8,
          maxWidth: 800,
          mx: 'auto',
          bgcolor: '#fff',
          textAlign: 'center'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
        </Box>
        
        <Typography variant="h4" gutterBottom>
          Onboarding {isManualOnboarding ? 'Complete' : 'Invitation Sent'}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {isManualOnboarding 
            ? `The ${formData.payeeType.toLowerCase()} has been successfully onboarded to the system.`
            : `An invitation has been sent to ${formData.email} to complete their onboarding process.`
          }
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Payee Details
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                {formData.payeeType === 'Employee' ? <PersonIcon /> : <BusinessIcon />}
              </ListItemIcon>
              <ListItemText 
                primary={formData.payeeType} 
                secondary={
                  formData.payeeType === 'Employee' 
                    ? `${formData.legalFirstName} ${formData.legalLastName}`
                    : formData.entityName
                } 
              />
            </ListItem>
            
            {formData.jobTitle && (
              <ListItem>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Job Title" 
                  secondary={formData.jobTitle} 
                />
              </ListItem>
            )}
            
            {formData.isUnionMember && (
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Union" 
                  secondary={formData.union || 'Actor\'s Equity Association'} 
                />
              </ListItem>
            )}
          </List>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Onboarding Status
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.w4Completed && (
                <Chip 
                  label="W-4 Completed" 
                  color="success" 
                  variant="outlined" 
                  size="small" 
                />
              )}
              
              {formData.i9Completed && (
                <Chip 
                  label="I-9 Completed" 
                  color="success" 
                  variant="outlined" 
                  size="small" 
                />
              )}
              
              {formData.w9Completed && (
                <Chip 
                  label="W-9 Completed" 
                  color="success" 
                  variant="outlined" 
                  size="small" 
                />
              )}
              
              {formData.invitationSent && (
                <Chip 
                  label="Invitation Sent" 
                  color="primary" 
                  variant="outlined" 
                  size="small" 
                />
              )}
              
              {formData.adminAcknowledgement && (
                <Chip 
                  label="Admin Acknowledged" 
                  color="success" 
                  variant="outlined" 
                  size="small" 
                />
              )}
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/payees"
          >
            Go to Payees
          </Button>
          
          {/* <Button 
            variant="outlined" 
            component={Link} 
            to="/on-boarding"
          >
            Onboard Another Payee
          </Button> */}
        </Box>
      </Paper>
    </Box>
  );
};

export default OnboardingConfirmation;