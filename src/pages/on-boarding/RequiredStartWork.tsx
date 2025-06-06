import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControlLabel, 
  Checkbox, 
  TextField, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import { OnboardingFormData } from './types';

interface RequiredStartWorkProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
}

const RequiredStartWork: React.FC<RequiredStartWorkProps> = ({ 
  formData, 
  onFormChange, 
  onNext 
}) => {
  const [invitationSubject, setInvitationSubject] = useState(
    `Complete your onboarding for ${formData.payeeType === 'Employee' ? 'employment' : 'payment'}`
  );
  const [invitationBody, setInvitationBody] = useState(
    `Dear ${formData.legalFirstName || formData.entityName || 'Payee'},\n\nPlease complete your onboarding process by clicking the link below. This will allow us to process your payments correctly.\n\nThank you,\nThe Production Team`
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onFormChange({ [name]: checked });
  };

  const handleInvitationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'invitationSubject') {
      setInvitationSubject(value);
      onFormChange({ invitationSubject: value });
    } else if (name === 'invitationBody') {
      setInvitationBody(value);
      onFormChange({ invitationMessage: value });
    }
  };

  const handleSendInvitation = () => {
    onFormChange({ 
      invitationSent: true,
      invitationEmail: formData.email,
      invitationSubject: invitationSubject,
      invitationMessage: invitationBody
    });
    onNext();
  };

  // Determine required documents based on payee type
  const getRequiredDocuments = () => {
    const documents = [];
    
    if (formData.payeeType === 'Employee') {
      documents.push({
        id: 'w4Completed',
        name: 'W-4 (Employee\'s Withholding Certificate)',
        required: true
      });
      documents.push({
        id: 'i9Completed',
        name: 'I-9 (Employment Eligibility Verification)',
        required: true
      });
    } else if (formData.payeeType === 'Loanout') {
      documents.push({
        id: 'i9Completed',
        name: 'I-9 (Employment Eligibility Verification)',
        required: true
      });
      documents.push({
        id: 'w9Completed',
        name: 'W-9 (Request for Taxpayer ID Number and Certification)',
        required: true
      });
    } else { // Vendor/Contractor
      documents.push({
        id: 'w9Completed',
        name: 'W-9 (Request for Taxpayer ID Number and Certification)',
        required: true
      });
    }
    
    // Add optional documents
    documents.push({
      id: 'antiHarassment',
      name: 'Anti Harassment Policy',
      required: false
    });
    documents.push({
      id: 'confidentiality',
      name: 'Confidentiality Policy',
      required: false
    });
    
    // Add wage theft prevention for non-union hourly employees
    if (formData.payeeType === 'Employee' && 
        !formData.isUnionMember && 
        formData.payRates?.some(rate => rate.period === 'Hour')) {
      documents.push({
        id: 'wageTheft',
        name: 'Wage Theft Prevention Policy',
        required: false
      });
    }
    
    return documents;
  };

  const requiredDocuments = getRequiredDocuments();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Required Documents
      </Typography>

      <Typography variant="body1" paragraph>
        The following documents need to be completed before the worker can be added to payroll.
      </Typography>

      <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
        <List>
          {requiredDocuments.map((doc) => (
            <ListItem key={doc.id} disablePadding sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <DescriptionIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={doc.name} 
                secondary={doc.required ? 'Required' : 'Optional'} 
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData[doc.id as keyof OnboardingFormData] || false}
                    onChange={handleChange}
                    name={doc.id}
                    required={doc.required}
                  />
                }
                label="Completed"
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Self-Onboarding Invitation
      </Typography>

      <Typography variant="body1" paragraph>
        You can invite the {formData.payeeType.toLowerCase()} to complete their own onboarding by sending them an email with a secure link.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Subject"
            name="invitationSubject"
            value={invitationSubject}
            onChange={handleInvitationChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Message"
            name="invitationBody"
            value={invitationBody}
            onChange={handleInvitationChange}
            multiline
            rows={6}
            margin="normal"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.adminAcknowledgement || false}
              onChange={handleChange}
              name="adminAcknowledgement"
            />
          }
          label="I confirm I have received this information from the party"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSendInvitation}
          disabled={!formData.adminAcknowledgement}
        >
          Send Invitation
        </Button>
      </Box>
    </Box>
  );
};

export default RequiredStartWork;