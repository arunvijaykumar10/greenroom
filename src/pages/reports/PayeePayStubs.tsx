import React from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
} from "@mui/material";

const PayeePayStub: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" color="primary" gutterBottom>
        Payee Pay Stub
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Payee Information</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <strong>Name:</strong> John Doe
            </Typography>
            <Typography>
              <strong>SSN:</strong> ***-**-1234
            </Typography>
            <Typography>
              <strong>Job Title:</strong> Actor
            </Typography>
            <Typography>
              <strong>Department:</strong> Performance
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Union:</strong> SAG-AFTRA
            </Typography>
            <Typography>
              <strong>Work Dates:</strong> Apr 01 - Apr 07
            </Typography>
            <Typography>
              <strong>State (Work/Res):</strong> NY / NY
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Earnings</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>
              <strong>Base Rate:</strong> $2,000
            </Typography>
            <Typography>
              <strong>Increments:</strong> $300
            </Typography>
            <Typography>
              <strong>Reimbursements:</strong> $150
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <strong>Allowances:</strong> $200
            </Typography>
            <Typography>
              <strong>Greenroom Fee:</strong> $50
            </Typography>
            <Typography>
              <strong>Total Gross:</strong> $2,700
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Employee Deductions</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Federal Tax: $300</Typography>
            <Typography>FICA: $150</Typography>
            <Typography>Medicare: $45</Typography>
            <Typography>401K: $100</Typography>
            <Typography>Union Dues: $50</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>NYS Tax: $120</Typography>
            <Typography>NYC Tax: $80</Typography>
            <Typography>NYS PFL: $10</Typography>
            <Typography>Agent Fee: $90</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6">Employer Contributions</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>FICA: $150</Typography>
            <Typography>Medicare: $45</Typography>
            <Typography>FUTA: $30</Typography>
            <Typography>SUTA: $60</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>NYC MCTMT: $20</Typography>
            <Typography>Health: $250</Typography>
            <Typography>Pension: $180</Typography>
            <Typography>401K Match: $100</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PayeePayStub;
