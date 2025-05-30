import React from 'react';
import { Box, Grid, TextField, Typography, Divider } from '@mui/material';
import { EmployeePayee } from './payeeTypes';

interface EmployeeProfileProps {
  payee: EmployeePayee;
  editMode: boolean;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ payee, editMode }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employee Information
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
            value={payee.type === 'loan-out' ? 'Loan Out' : 'Employee'}
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
            label="SSN"
            value={payee.ssn || ''}
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Payment Method"
            value={payee.paymentMethod || ''}
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

export default EmployeeProfile;