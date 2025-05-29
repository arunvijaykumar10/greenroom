import React from 'react';
import { Button, Paper, Typography, Box, Alert } from '@mui/material';
import RunPayroll from './RunPayroll';
import { Payroll } from '../payrollTypes';

interface PayrollLandingProps {
  payrollSetupCompleted: boolean;
  onRunPayroll: () => void;
  currentPayroll: Payroll | null;
}

const PayrollLanding: React.FC<PayrollLandingProps> = ({ 
  payrollSetupCompleted, 
  onRunPayroll,
  currentPayroll
}) => {
  const currentDate = new Date();
  const weekEnding = new Date(currentDate);
  weekEnding.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // Next Saturday
  
  const isLate = currentDate.getDay() > 5; // Assuming payroll should be run by Friday

  return (
    <Box>
      {isLate && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Payroll is not being run on time. Please complete payroll processing as soon as possible.
        </Alert>
      )}
      
      {!payrollSetupCompleted ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Payroll Setup Required
          </Typography>
          <Typography>
            Please complete the payroll setup before attempting to run payroll.
          </Typography>
        </Paper>
      ) : currentPayroll ? (
        <RunPayroll payroll={currentPayroll} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={onRunPayroll}
            sx={{ width: 'fit-content' }}
          >
            Run Payroll (week ending {weekEnding.toLocaleDateString()})
          </Button>
          
          <Typography variant="body2" color="text.secondary">
            You can start the payroll run even if not all employees are onboarded or timesheets are approved.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PayrollLanding;