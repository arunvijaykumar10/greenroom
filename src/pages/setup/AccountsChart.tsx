import { Box, Paper, Typography, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface AccountsChartProps {
  onSkip?: () => void;
}

const AccountsChart: React.FC<AccountsChartProps> = ({ onSkip }) => {
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Upload Chart of Accounts
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{ mb: 2 }}
        >
          Upload File
        </Button>
        {onSkip && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={onSkip}>
              Skip for Now
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AccountsChart;
