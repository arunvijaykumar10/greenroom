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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const InviteAdminsForm = ({
  entityType = "Corporation",
  onSkip,
}: {
  entityType?: string;
  onSkip?: () => void;
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
    <Paper sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Invite Additional Admins
      </Typography>

      {!isSingleMemberLLC && (
        <Alert severity="info" sx={{ mb: 2 }}>
          We strongly recommend adding additional admins for this production.
          You may invite up to 10 admins. Each admin will be required to
          complete registration and MFA.
        </Alert>
      )}

      <Stack spacing={3}>
        {admins.map((admin, idx) => (
          <Box key={idx} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="First Name *"
              name="firstName"
              value={admin.firstName}
              onChange={(e) => handleChange(idx, "firstName", e.target.value)}
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Last Name *"
              name="lastName"
              value={admin.lastName}
              onChange={(e) => handleChange(idx, "lastName", e.target.value)}
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Email *"
              name="email"
              value={admin.email}
              onChange={(e) => handleChange(idx, "email", e.target.value)}
              required
              fullWidth
              size="small"
              type="email"
            />
            <TextField
              label="Role/Title"
              name="role"
              value={admin.role}
              onChange={(e) => handleChange(idx, "role", e.target.value)}
              fullWidth
              size="small"
            />
            {admins.length > 1 && (
              <IconButton aria-label="remove" onClick={() => handleRemove(idx)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleAddAdmin} variant="contained">
            Add Another Admin
          </Button>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          {onSkip && (
            <Button variant="outlined" onClick={onSkip}>
              Skip for Now
            </Button>
          )}
          <Button variant="contained" type="submit">
            Send Invites
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default InviteAdminsForm;
