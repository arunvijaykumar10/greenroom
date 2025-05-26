import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Paper,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "900px",
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}

const CreateUserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [_showSuccess, setShowSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (_e: React.FormEvent) => {
    _e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show Snackbar on success
      setSnackbarOpen(true);
      setShowSuccess(true);
      setIsSubmitting(false);

      // Reset the form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <StyledPaper>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New User
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* First Name Field */}
            <FormControl fullWidth margin="normal" error={!!errors.firstName}>
              <TextField
                label="First Name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                placeholder="Your first name"
                fullWidth
                required
                disabled={isSubmitting}
              />
            </FormControl>

            {/* Last Name Field */}
            <FormControl fullWidth margin="normal" error={!!errors.lastName}>
              <TextField
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                placeholder="Your last name"
                fullWidth
                required
                disabled={isSubmitting}
              />
            </FormControl>

            {/* Email Field */}
            <FormControl fullWidth margin="normal" error={!!errors.email}>
              <TextField
                label="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="example@domain.com"
                fullWidth
                required
                autoComplete="new-email"
                disabled={isSubmitting}
              />
            </FormControl>

            {/* Mobile Field */}
            <FormControl fullWidth margin="normal" error={!!errors.mobile}>
              <TextField
                label="Mobile"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                // placeholder="(XXX)-XXX-XXXX"
                fullWidth
                required
                disabled={isSubmitting}
              />
            </FormControl>

            {/* Password Field */}
            <FormControl fullWidth margin="normal" error={!!errors.password}>
              <TextField
                label="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                error={!!errors.password}
                helperText={errors.password}
                placeholder="At least 6 characters"
                fullWidth
                required
                autoComplete="new-password"
                disabled={isSubmitting}
              />
            </FormControl>
          </Stack>

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ px: 3, py: 1.5 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </StyledPaper>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          User created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateUserForm;
