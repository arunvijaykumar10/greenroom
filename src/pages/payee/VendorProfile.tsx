import React from 'react';
import { Box, Grid, TextField, Typography, Divider } from '@mui/material';

// Import or define the VendorPayee type
// Example import (adjust the path as needed):
// import { VendorPayee } from '../../types/VendorPayee';

interface VendorPayee {
  name: string;
  type: string;
  email: string;
  phone?: string;
  union?: string;
  jobTitle?: string;
  department?: string;
  startDate: string | Date;
  ein?: string;
  contractAmount?: number;
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    accountType: string;
  };
}

interface VendorProfileProps {
  payee: VendorPayee;
  editMode: boolean;
}

const VendorProfile: React.FC<VendorProfileProps> = ({ payee, editMode }) => {
  const vendorTypeLabel = (type: string) => {
    switch (type) {
      case 'agent': return 'Agent';
      case 'manager': return 'Manager';
      case 'contractor': return 'Contractor';
      default: return 'Vendor';
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Vendor Information
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={payee.name}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Type"
            value={vendorTypeLabel(payee.type)}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            value={payee.email}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={payee.phone || ''}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Union"
            value={payee.union || ''}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Title"
            value={payee.jobTitle || ''}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Department"
            value={payee.department || ''}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            value={new Date(payee.startDate).toLocaleDateString()}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="EIN"
            value={payee.ein || ''}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contract Amount"
            value={payee.contractAmount ? `$${payee.contractAmount}` : ''}
            disabled={!editMode}
          />
        </Grid>
      </Grid>
      
      {payee.bankDetails && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Bank Details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={payee.bankDetails.accountNumber}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Routing Number"
                value={payee.bankDetails.routingNumber}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Type"
                value={payee.bankDetails.accountType}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default VendorProfile;