import { useState } from "react";

import {
  Box,
  Step,
  Card,
  Stack,
  Stepper,
  StepLabel,
  Typography,
  CardContent,
} from "@mui/material";

import RegistrationForm from "./RegistrationForm";
import { useNavigate } from "react-router-dom";

const REGISTRATION_STEPS = [
  "Company Information",
  "Administrator Details",
  "Payroll Details",
];

enum StepIndex {
  CompanyInfo,
  AdminInfo,
  Payroll,
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<StepIndex>(
    StepIndex.CompanyInfo
  );
  const [_formData, setFormData] = useState({
    companyInfo: null,
    adminInfo: null,
    payrollInfo: null,
  });

  const navigate = useNavigate();

  const handleStepSubmit = async (stepData: any) => {
    switch (currentStep) {
      case StepIndex.CompanyInfo:
        setFormData((prev) => ({ ...prev, companyInfo: stepData }));
        setCurrentStep(StepIndex.AdminInfo);
        break;

      case StepIndex.AdminInfo:
        setFormData((prev) => ({ ...prev, adminInfo: stepData }));
        setCurrentStep(StepIndex.Payroll);
        break;

      case StepIndex.Payroll:
        setFormData((prev) => ({ ...prev, payrollInfo: stepData }));
        navigate("/dashboard");
        break;

      default:
        break;
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > StepIndex.CompanyInfo) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        px: 0,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 4,
          boxShadow: 10,
          bgcolor: "#fff",
          p: { xs: 1, sm: 2 },
        }}
      >
        <CardContent>
          <Stack spacing={4}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ color: "#1976d2", fontWeight: 700 }}
            >
              Register
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ color: "#1976d2", fontWeight: 600 }}
            >
              {REGISTRATION_STEPS[currentStep]}
            </Typography>

            <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: 2 }}>
              {REGISTRATION_STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel sx={{ fontWeight: 600 }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box
              sx={{
                bgcolor: "#fafdff",
                borderRadius: 3,
                boxShadow: 1,
                p: { xs: 2, sm: 4 },
              }}
            >
              <RegistrationForm
                activeStep={currentStep}
                onBack={goToPreviousStep}
                onSubmit={handleStepSubmit}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
