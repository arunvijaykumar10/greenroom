import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SaveIcon from '@mui/icons-material/Save';

const PaySettings: React.FC = () => {
  const [payFrequency, setPayFrequency] = useState('weekly');
  const [payDay, setPayDay] = useState('friday');
  const [payPeriodEnd, setPayPeriodEnd] = useState('saturday');
  const [payDate, setPayDate] = useState<Date | null>(new Date());
  const [directDeposit, setDirectDeposit] = useState(true);
  const [bankAccount, setBankAccount] = useState('primary');
  const [checkPrinting, setCheckPrinting] = useState(true);
  const [signature, setSignature] = useState('default');
  
  const handleSaveSettings = () => {
    console.log('Saving pay settings...');
    // In a real app, this would save to backend
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pay Settings
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Changes to pay settings will take effect on the next pay period.
      </Alert>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Pay Schedule
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Pay Frequency
              </Typography>
              <RadioGroup
                value={payFrequency}
                onChange={(e) => setPayFrequency(e.target.value)}
              >
                <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                <FormControlLabel value="biweekly" control={<Radio />} label="Bi-weekly" />
                <FormControlLabel value="semimonthly" control={<Radio />} label="Semi-monthly" />
                <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
              </RadioGroup>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Pay Day
              </Typography>
              <TextField
                select
                value={payDay}
                onChange={(e) => setPayDay(e.target.value)}
                fullWidth
              >
                <MenuItem value="monday">Monday</MenuItem>
                <MenuItem value="tuesday">Tuesday</MenuItem>
                <MenuItem value="wednesday">Wednesday</MenuItem>
                <MenuItem value="thursday">Thursday</MenuItem>
                <MenuItem value="friday">Friday</MenuItem>
              </TextField>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Pay Period End
              </Typography>
              <TextField
                select
                value={payPeriodEnd}
                onChange={(e) => setPayPeriodEnd(e.target.value)}
                fullWidth
              >
                <MenuItem value="sunday">Sunday</MenuItem>
                <MenuItem value="monday">Monday</MenuItem>
                <MenuItem value="tuesday">Tuesday</MenuItem>
                <MenuItem value="wednesday">Wednesday</MenuItem>
                <MenuItem value="thursday">Thursday</MenuItem>
                <MenuItem value="friday">Friday</MenuItem>
                <MenuItem value="saturday">Saturday</MenuItem>
              </TextField>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Next Pay Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={payDate}
                  onChange={(newValue) => {
                    if (newValue instanceof Date) {
                      setPayDate(newValue);
                    } else if (newValue && typeof (newValue as any).toDate === 'function') {
                      setPayDate((newValue as any).toDate());
                    } else if (newValue === null) {
                      setPayDate(null);
                    }
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Payment Methods
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={directDeposit}
                    onChange={(e) => setDirectDeposit(e.target.checked)}
                  />
                }
                label="Enable Direct Deposit"
              />
              <Typography variant="caption" color="text.secondary">
                Allow employees to receive payments via ACH direct deposit
              </Typography>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Default Bank Account for Payroll
              </Typography>
              <TextField
                select
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                fullWidth
              >
                <MenuItem value="primary">Primary Business Account (****1234)</MenuItem>
                <MenuItem value="secondary">Secondary Business Account (****5678)</MenuItem>
                <MenuItem value="payroll">Dedicated Payroll Account (****9012)</MenuItem>
              </TextField>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkPrinting}
                    onChange={(e) => setCheckPrinting(e.target.checked)}
                  />
                }
                label="Enable Check Printing"
              />
              <Typography variant="caption" color="text.secondary">
                Allow printing checks for employees who don't use direct deposit
              </Typography>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Check Signature
              </Typography>
              <TextField
                select
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                fullWidth
                disabled={!checkPrinting}
              >
                <MenuItem value="default">Default Signature (John Smith)</MenuItem>
                <MenuItem value="alternate">Alternate Signature (Jane Doe)</MenuItem>
                <MenuItem value="both">Both Signatures</MenuItem>
              </TextField>
            </FormControl>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaySettings;