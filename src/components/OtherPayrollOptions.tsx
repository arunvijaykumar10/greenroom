import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Divider
} from '@mui/material';

const OtherPayrollOptions: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Other Payroll Options
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Investor Distribution
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Distribute earnings to your investors directly from payroll.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button variant="outlined" size="small">
                  Investors
                </Button>
                <Button variant="outlined" size="small">
                  Run Distribution
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Off-Cycle Payroll
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Run a payroll outside of your regular pay schedule.
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                Run Off-Cycle Payroll
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Payroll Corrections
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Make adjustments to previously processed payrolls.
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                Correct Payroll
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Run Prepay Payroll
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Report payments made outside of payroll to include them in W2 or 1099 records.
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 2 }}>
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