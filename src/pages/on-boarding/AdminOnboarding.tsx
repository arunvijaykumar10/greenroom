import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Stack, Typography, Paper } from "@mui/material";

const roles = ["Owner", "Manager", "Employee"];

const AdminOnboarding: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    alert("Submitted: " + JSON.stringify(form));
  };

  return (
    <Box  display="flex" justifyContent="center" alignItems="center">
      <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, maxWidth: 600, width: "100%", boxShadow: 3, mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#1976d2", fontWeight: 700 }}>
          Admin Onboarding
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              select
              label="Role / Title"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 600 }}>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminOnboarding;
