import { Box, Typography, Paper, CircularProgress } from "@mui/material";

const WaitingApprovalScreen = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          maxWidth: 420,
          textAlign: "center",
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <CircularProgress sx={{ mb: 3 }} color="primary" />
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Pending Approval from Greenroom
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This process may take 2 to 3 business days. You’ll be notified once
          it’s approved.
        </Typography>
      </Paper>
    </Box>
  );
};

export default WaitingApprovalScreen;
