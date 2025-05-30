import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Divider,
  FormControlLabel,
  Switch,
  MenuItem
} from '@mui/material';

const PaySettings: React.FC = () => {
  const [paySettings, setPaySettings] = useState({
    payFrequency: 'weekly',
    payDay: 'Friday',
    defaultPaymentMethod: 'ach',
    autoApproveTimesheets: false,
    notifyOnTimesheetSubmission: true,
    notifyOnPayrollSubmission: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Pay Settings
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Pay Schedule
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Pay Frequency"
              name="payFrequency"
              value={paySettings.payFrequency}
              onChange={handleChange}
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="bi-weekly">Bi-Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Pay Day"
              name="payDay"
              value={paySettings.payDay}
              onChange={handleChange}
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Default Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Default Payment Method"
              name="defaultPaymentMethod"
              value={paySettings.defaultPaymentMethod}
              onChange={handleChange}
            >
              <MenuItem value="ach">ACH</MenuItem>
              <MenuItem value="check">Check</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="autoApproveTimesheets"
                  checked={paySettings.autoApproveTimesheets}
                  onChange={handleChange}
                />
              }
              label="Auto-approve timesheets"
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Notifications
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="notifyOnTimesheetSubmission"
                  checked={paySettings.notifyOnTimesheetSubmission}
                  onChange={handleChange}
                />
              }
              label="Notify on timesheet submission"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="notifyOnPayrollSubmission"
                  checked={paySettings.notifyOnPayrollSubmission}
                  onChange={handleChange}
                />
              }
              label="Notify on payroll submission"
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default PaySettings;