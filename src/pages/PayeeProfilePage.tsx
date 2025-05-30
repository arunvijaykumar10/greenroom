import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Grid, 
  Button, 
  Divider, 
  Chip, 
  FormControlLabel, 
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  Person, 
  Work, 
  Payments, 
  AccessTime, 
  Receipt, 
  Description, 
  Edit, 
  History
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import DocumentSection from './payee/DocumentSection';
import PaymentHistorySection from './payee/PaymentHistorySection';

interface PayeeProfile {
  id: string;
  name: string;
  type: 'employee' | 'loan-out' | 'vendor' | 'contractor' | 'agent' | 'manager';
  union?: string;
  jobTitle: string;
  department?: string;
  status: 'onboarded' | 'not-onboarded';
  startDate: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  paymentInfo: {
    method: 'ach' | 'check';
    accountDetails?: {
      accountNumber: string;
      routingNumber: string;
      accountType: 'checking' | 'savings';
    };
  };
  documents: {
    id: string;
    name: string;
    type: string;
    dateUploaded: string;
  }[];
}

// Mock data for demonstration
const mockPayeeProfile: PayeeProfile = {
  id: '12345',
  name: 'John Smith',
  type: 'employee',
  union: 'Actors Equity Association',
  jobTitle: 'Lead Actor',
  department: 'Cast',
  status: 'onboarded',
  startDate: '2023-01-15',
  contactInfo: {
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, New York, NY 10001'
  },
  paymentInfo: {
    method: 'ach',
    accountDetails: {
      accountNumber: '****1234',
      routingNumber: '****5678',
      accountType: 'checking'
    }
  },
  documents: [
    { id: 'doc1', name: 'W-4 Form', type: 'Tax Form', dateUploaded: '2023-01-10' },
    { id: 'doc2', name: 'I-9 Form', type: 'Employment Eligibility', dateUploaded: '2023-01-10' },
    { id: 'doc3', name: 'Direct Deposit Form', type: 'Payment', dateUploaded: '2023-01-10' }
  ]
};

const PayeeProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [acknowledgement, setAcknowledgement] = useState(false);
  
  // In a real app, you would fetch the payee data based on the ID
  const payee = mockPayeeProfile;
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleEdit = () => {
    setEditMode(true);
  };
  
  const handleSave = () => {
    if (acknowledgement) {
      // In a real app, you would save the changes to the backend
      setEditMode(false);
      setAcknowledgement(false);
    }
  };
  
  const handleCancel = () => {
    setEditMode(false);
    setAcknowledgement(false);
  };
  
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{payee.name}</Typography>
        <Chip 
          label={payee.status === 'onboarded' ? 'Onboarded' : 'Not Onboarded'} 
          color={payee.status === 'onboarded' ? 'success' : 'warning'}
        />
      </Box>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab icon={<Person />} label="Profile" />
          <Tab icon={<Work />} label="Employment" />
          <Tab icon={<Payments />} label="Payment" />
          <Tab icon={<Description />} label="Documents" />
          <Tab icon={<AccessTime />} label="Timesheets" />
          <Tab icon={<Receipt />} label="Pay History" />
          <Tab icon={<History />} label="Change History" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Personal Information</Typography>
                {!editMode && (
                  <Button startIcon={<Edit />} onClick={handleEdit}>
                    Edit
                  </Button>
                )}
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Name</Typography>
                  <Typography variant="body1" gutterBottom>{payee.name}</Typography>
                  
                  <Typography variant="subtitle2">Type</Typography>
                  <Typography variant="body1" gutterBottom>
                    {payee.type.charAt(0).toUpperCase() + payee.type.slice(1)}
                  </Typography>
                  
                  <Typography variant="subtitle2">Union</Typography>
                  <Typography variant="body1" gutterBottom>{payee.union || 'Non-Union'}</Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body1" gutterBottom>{payee.contactInfo.email}</Typography>
                  
                  <Typography variant="subtitle2">Phone</Typography>
                  <Typography variant="body1" gutterBottom>{payee.contactInfo.phone}</Typography>
                  
                  <Typography variant="subtitle2">Address</Typography>
                  <Typography variant="body1" gutterBottom>{payee.contactInfo.address}</Typography>
                </Grid>
              </Grid>
              
              {editMode && (
                <Box sx={{ mt: 3 }}>
                  <Divider sx={{ my: 2 }} />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={acknowledgement} 
                        onChange={(e) => setAcknowledgement(e.target.checked)} 
                      />
                    }
                    label="I confirm I have received this information from the party"
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleCancel} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={handleSave}
                      disabled={!acknowledgement}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Employment Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Job Title</Typography>
                  <Typography variant="body1" gutterBottom>{payee.jobTitle}</Typography>
                  
                  <Typography variant="subtitle2">Department</Typography>
                  <Typography variant="body1" gutterBottom>{payee.department}</Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Start Date</Typography>
                  <Typography variant="body1" gutterBottom>{payee.startDate}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Payment Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Payment Method</Typography>
                  <Typography variant="body1" gutterBottom>
                    {payee.paymentInfo.method === 'ach' ? 'Direct Deposit (ACH)' : 'Check'}
                  </Typography>
                  
                  {payee.paymentInfo.method === 'ach' && payee.paymentInfo.accountDetails && (
                    <>
                      <Typography variant="subtitle2">Account Number</Typography>
                      <Typography variant="body1" gutterBottom>
                        {payee.paymentInfo.accountDetails.accountNumber}
                      </Typography>
                      
                      <Typography variant="subtitle2">Routing Number</Typography>
                      <Typography variant="body1" gutterBottom>
                        {payee.paymentInfo.accountDetails.routingNumber}
                      </Typography>
                      
                      <Typography variant="subtitle2">Account Type</Typography>
                      <Typography variant="body1" gutterBottom>
                        {payee.paymentInfo.accountDetails.accountType.charAt(0).toUpperCase() + 
                         payee.paymentInfo.accountDetails.accountType.slice(1)}
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
          
          {tabValue === 3 && <DocumentSection payee={payee} />}
          
          {tabValue === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>Timesheets</Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate(`/timesheets?payeeId=${payee.id}`)}
              >
                View Timesheets
              </Button>
            </Box>
          )}
          
          {tabValue === 5 && <PaymentHistorySection payee={payee} />}
          
          {tabValue === 6 && (
            <Box>
              <Typography variant="h6" gutterBottom>Change History</Typography>
              <List>
                <ListItem divider>
                  <ListItemText 
                    primary="Profile information updated" 
                    secondary="Updated by Jane Smith • 2023-03-15 10:30 AM" 
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText 
                    primary="Payment method changed to Direct Deposit" 
                    secondary="Updated by Jane Smith • 2023-02-20 02:15 PM" 
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText 
                    primary="Initial onboarding completed" 
                    secondary="Updated by System • 2023-01-15 09:00 AM" 
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="outlined" onClick={() => navigate('/payees')}>
          Back to Payees
        </Button>
      </Box>
    </Box>
  );
};

export default PayeeProfilePage;