import { Box, Paper, Typography, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const AccountsChart = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "background.default",
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload Chart of Accounts
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Accepts .csv, .xlsx formats. Max file size: 5MB
        </Typography>

        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          Upload File
          <input type="file" hidden />
        </Button>
      </Paper>
    </Box>
  );
};

export default AccountsChart;
