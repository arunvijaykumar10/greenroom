import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const PayrollSetup = () => {
  return (
    <Paper sx={{ borderRadius: 4, overflow: "hidden" }}>
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Payroll Setup
        </Typography>
        <Typography variant="subtitle1" mt={1}>
          Define and manage the payroll structure for this production.
        </Typography>
        <Typography variant="body2" mt={1}>
          Set up pay frequency, timesheet rules, check processing, and
          accounting structure. This ensures timely and accurate compensation
          for cast and crew.
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="bold">
              Pay Information
            </Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Pay Frequency: Weekly</Typography>
            <Typography>Pay Period: Jan 1 - Jan 15</Typography>
            <Typography>Pay Schedule Start Date: 2025-06-03</Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="bold">
              Timesheet Submission
            </Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>
              Timesheets to be completed by 12pm on Mon (Due: 2025-06-01)
            </Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="bold">
              Check Information
            </Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Check Number: 1001</Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="bold">
              Chart of Accounts
            </Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Uploaded File: chart-of-accounts.csv</Typography>
            <Typography>
              Duplicates will overwrite existing cost codes. You can reset this
              to the boilerplate template at any time.
            </Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="bold">
              Signature Policy
            </Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Required Signatures: 2</Typography>
            <Typography>Signature 1: signature1.png</Typography>
            <Typography>Signature 2: signature2.png</Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default PayrollSetup;
