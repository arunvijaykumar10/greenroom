import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptIcon from '@mui/icons-material/Receipt';

const OtherPayrollOptions: React.FC = () => {
  const handleNavigate = (path: string) => {
    console.log(`Navigating to ${path}`);
    // In a real app, this would use router navigation
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Other Payroll Options
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Investor Distribution</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Distribute earnings to your investors directly from payroll. Set up investor profiles and payment schedules.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => handleNavigate('/investors')}
                  >
                    Investors
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => handleNavigate('/run-investor-distribution')}
                  >
                    Run Investor Distribution
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Off-Cycle Payroll</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Run a payroll outside of your regular pay schedule. Useful for special circumstances or one-time payments.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleNavigate('/off-cycle-payroll')}
              >
                Run Off-Cycle Payroll
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EditIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Payroll Corrections</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Make adjustments to previously processed payrolls. Correct errors or add missing information.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleNavigate('/payroll-corrections')}
              >
                Make Corrections
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Run Prepay Payroll</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Report payments made outside of payroll to include them in W2 or 1099 records. No payments will be processed.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleNavigate('/prepay-payroll')}
              >
                Run Prepay Payroll
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OtherPayrollOptions;