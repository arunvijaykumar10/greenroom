import React, { useState } from 'react';
import { Box, Paper, Typography, Tabs, Tab, Button, Divider } from '@mui/material';
import EmployeeProfile from './EmployeeProfile';
import VendorProfile from './VendorProfile';
import { Payee } from './payeeTypes';
import DocumentSection from './DocumentSection';
import PaymentHistorySection from './PaymentHistorySection';

interface PayeeProfileProps {
  payee: Payee;
  onClose: () => void;
}

const PayeeProfile: React.FC<PayeeProfileProps> = ({ payee, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    // In a real app, this would save to the backend
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">{payee.name}</Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Profile" />
        <Tab label="Documents" />
        <Tab label="Payment History" />
        <Tab label="Tax Reports" />
      </Tabs>
      
      {activeTab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleEditToggle}
              sx={{ mr: 2 }}
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
            {editMode && (
              <Button 
                variant="contained" 
                color="primary"
                disabled={!acknowledged}
                onClick={() => {
                  // Save changes
                  setEditMode(false);
                  setAcknowledged(false);
                }}
              >
                Save Changes
              </Button>
            )}
          </Box>
          
          {editMode && (
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Edit Mode
              </Typography>
              <Typography variant="body2" gutterBottom>
                Please confirm you have received this information from the party:
              </Typography>
              <Button 
                variant="outlined" 
                onClick={handleAcknowledge}
                disabled={acknowledged}
              >
                {acknowledged ? 'Information Verified' : 'I Confirm'}
              </Button>
            </Box>
          )}
          
          {payee.type === 'employee' || payee.type === 'loan-out' ? (
            <EmployeeProfile 
              payee={payee as any} 
              editMode={editMode} 
            />
          ) : (
            <VendorProfile 
              payee={payee as any} 
              editMode={editMode} 
            />
          )}
        </Box>
      )}
      
      {activeTab === 1 && <DocumentSection payee={payee} />}
      {activeTab === 2 && <PaymentHistorySection payee={payee} />}
      {activeTab === 3 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Tax Reports
          </Typography>
          <Typography>
            This would show tax reports for {payee.name} and link to full reports.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PayeeProfile;