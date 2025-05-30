import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const TaxSetup = () => {
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
          Tax Setup
        </Typography>
        <Typography variant="subtitle1" mt={1}>
          Configure quarterly and yearly tax filing dates.
        </Typography>
        <Typography variant="body2" mt={1}>
          Set the automated tax filing dates and times to ensure compliance.
          Defaults are provided, and all entries are mandatory. Ensure each is
          scheduled before its legal deadline.
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Q1 Tax Filing</Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Filing Date & Time: April 11, 12:00 AM</Typography>
            <Typography>Deadline: Not after April 15</Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Q2 Tax Filing</Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Filing Date & Time: June 11, 12:00 AM</Typography>
            <Typography>Deadline: Not after June 15</Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Q3 Tax Filing</Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Filing Date & Time: October 11, 12:00 AM</Typography>
            <Typography>Deadline: Not after October 15</Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Q4 Tax Filing</Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Filing Date & Time: January 11, 12:00 AM</Typography>
            <Typography>Deadline: Not after January 15 (following year)</Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ mt: 4 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Yearly Tax Filing</Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack spacing={1} mt={2}>
            <Typography>Filing Date & Time: January 26, 12:00 AM</Typography>
            <Typography>Deadline: Not after January 31 (following year)</Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default TaxSetup;
