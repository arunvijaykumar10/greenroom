import React, { useState, FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CompanyInformation from "./CompanyInformation";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showCompanyInfo, setShowCompanyInfo] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
  };

  const handleSignUpClick = () => {
    setShowCompanyInfo(true);
  };

  const handleBackToLogin = () => {
    setShowCompanyInfo(false);
  };

  return (
    <Container maxWidth="xs">
      <Box>
        {showCompanyInfo ? (
          <CompanyInformation />
        ) : (
          <>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Greenroom Payroll
              </Typography>
            </Box>

            <StyledPaper elevation={3}>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Typography variant="h6">Sign in</Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to your account
                </Typography>
                <FormControl fullWidth margin="normal">
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    error={!!emailError}
                    helperText={emailError}
                    label="Email address"
                    placeholder="you@example.com"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={20} />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </FormControl>

                <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Next
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="body2">New User?</Typography>
                  <Link href="#" variant="body2" color="primary">
                    Create an account
                  </Link>
                </Stack>
              </Box>
            </StyledPaper>
          </>
        )}
      </Box>
    </Container>
  );
};

export default LoginScreen;
