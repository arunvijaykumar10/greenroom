import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  Box,
  Alert,
  Grid,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const InviteAdminsForm = ({
  entityType = "Corporation",
}: {
  entityType?: string;
}) => {
  const [admins, setAdmins] = useState([
    { firstName: "", lastName: "", email: "", role: "" },
  ]);

  const isSingleMemberLLC = entityType === "Single-Member LLC";

  const handleChange = (idx: number, field: string, value: string) => {
    setAdmins((prev) =>
      prev.map((admin, i) => (i === idx ? { ...admin, [field]: value } : admin))
    );
  };

  const handleRemove = (idx: number) => {
    setAdmins((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddAdmin = () => {
    setAdmins((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "", role: "" },
    ]);
  };

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 900,
        mx: "auto",
        borderRadius: 3,
        backgroundColor: "background.default",
      }}
      elevation={3}
    >
      <Typography variant="h6" gutterBottom>
        Invite Additional Admins
      </Typography>

      {!isSingleMemberLLC && (
        <Alert severity="info" sx={{ mb: 3 }}>
          We strongly recommend adding additional admins for this production.
          You may invite up to 10 admins. Each admin will be required to
          complete registration and MFA.
        </Alert>
      )}

      <Stack spacing={4}>
        {admins.map((admin, idx) => (
          <Box
            key={idx}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  label="First Name *"
                  value={admin.firstName}
                  onChange={(e) =>
                    handleChange(idx, "firstName", e.target.value)
                  }
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Last Name *"
                  value={admin.lastName}
                  onChange={(e) =>
                    handleChange(idx, "lastName", e.target.value)
                  }
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Email *"
                  value={admin.email}
                  onChange={(e) => handleChange(idx, "email", e.target.value)}
                  required
                  size="small"
                  type="email"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Role/Title"
                  value={admin.role}
                  onChange={(e) => handleChange(idx, "role", e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>

            {admins.length > 1 && (
              <IconButton
                onClick={() => handleRemove(idx)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "error.main",
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleAddAdmin}
            variant="outlined"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Add Another Admin
          </Button>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" type="submit" size="large">
            Send Invites
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default InviteAdminsForm;
