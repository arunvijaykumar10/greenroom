import React from 'react';
import { Box, Typography, Divider, Button, Grid, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import {
  AccountBalanceWallet as InvestorIcon,
  Payment as OffCycleIcon,
  Build as CorrectionsIcon,
  Receipt as PrepayIcon
} from '@mui/icons-material';

const OtherPayrollOptions = () => {
  const options = [
    {
      title: 'Investor Distribution',
      description: 'Distribute earnings to your investors directly from payroll.',
      icon: <InvestorIcon />,
      subOptions: ['Investors', 'Run Investor Distribution']
    },
    {
      title: 'Off-Cycle Payroll',
      description: 'Run a payroll outside of your regular pay schedule.',
      icon: <OffCycleIcon />
    },
    {
      title: 'Payroll Corrections',
      description: 'Make adjustments to previously processed payrolls.',
      icon: <CorrectionsIcon />
    },
    {
      title: 'Run Prepay Payroll',
      description: 'Report payments made outside of payroll to include them in W2 or 1099 records.',
      icon: <PrepayIcon />
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Other Payroll Options
      </Typography>
      <Typography variant="body1" paragraph>
        Additional payroll services and special payroll processing options.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {options.map((option, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ mr: 2, color: 'primary.main' }}>
                  {option.icon}
                </Box>
                <Typography variant="h6">{option.title}</Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                {option.description}
              </Typography>
              
              {option.subOptions && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Sub-options:
                  </Typography>
                  <List dense>
                    {option.subOptions.map((subOption, subIndex) => (
                      <ListItem key={subIndex}>
                        <ListItemText primary={subOption} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" color="primary">
                  Learn More
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payroll Support
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="body1" paragraph>
          Need help with any of these options? Contact our payroll support team for assistance.
        </Typography>
        
        <Button variant="contained" color="primary">
          Contact Support
        </Button>
      </Paper>
    </Box>
  );
};

export default OtherPayrollOptions;