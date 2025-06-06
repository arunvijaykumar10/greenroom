import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import CompanyInformationForm from "./setup/CompanyInformationForm";
import { UnionConfigurationForm } from "./setup/UnionConfigurationForm";
import LinkBankAccountForm from "./setup/LinkBankAccountForm";
import ConfigureSignatureForm from "./setup/ConfigureSignatureForm";
import PayrollSetupForm from "./setup/PayrollSetupForm";
import SendToReview from "./setup/SendToReview";
import AccountsChart from "./setup/AccountsChart";
import InviteAdminsForm from "./setup/InviteAdminsForm";
import OnboardingPage from "./on-boarding/OnboardingPage";
import WaitingApprovalScreen from "./setup/WaitingApprovalScreen";

const steps = [
  { label: "Company Information", component: <CompanyInformationForm /> },
  { label: "Union Configuration", component: <UnionConfigurationForm /> },
  { label: "Bank Setup", component: <LinkBankAccountForm /> },
  { label: "Signature Setup", component: <ConfigureSignatureForm /> },
  { label: "Payroll & Taxes", component: <PayrollSetupForm /> },
  { label: "Send to review", component: <SendToReview /> },
  {
    label: "Custom Chart of Accounts",
    component: <AccountsChart />,
    skip: true,
  },
  { label: "Invite Admins", component: <InviteAdminsForm />, skip: true },
  {
    label: "Onboarding",
    component: <OnboardingPage />,
  },
];

const DashboardSetupStepper: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([0]);
  const [status, setStatus] = React.useState<"ongoing" | "completed">(
    "ongoing"
  );

  const handleStepClick = (index: number) => {
    if (index <= Math.max(...completedSteps, activeStep)) {
      setActiveStep(index);
    }
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    if (nextStep < steps.length) {
      setActiveStep(nextStep);
      setCompletedSteps((prev) => Array.from(new Set([...prev, nextStep])));
    }
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    if (prevStep >= 0) {
      setActiveStep(prevStep);
    }
  };

  const handleFinish = () => {
    setStatus("completed");
  };

  const StepComponent = steps[activeStep].skip
    ? React.cloneElement(steps[activeStep].component, { onSkip: handleNext })
    : steps[activeStep].component;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {status === "ongoing" ? (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Setup Progress
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, idx) => {
              const isCompleted =
                idx <= Math.max(...completedSteps, activeStep);
              return (
                <Step key={step.label} completed={isCompleted}>
                  <StepLabel
                    onClick={() => handleStepClick(idx)}
                    sx={{
                      cursor: isCompleted ? "pointer" : "not-allowed",
                      opacity: isCompleted ? 1 : 0.5,
                      pointerEvents: isCompleted ? "auto" : "none",
                      fontWeight: idx === activeStep ? 700 : 400,
                      color: idx === activeStep ? "primary.main" : "inherit",
                      "& .MuiStepLabel-label": {
                        color: idx === activeStep ? "primary.main" : "inherit",
                        fontWeight: idx === activeStep ? 700 : 400,
                      },
                    }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Box sx={{ mt: 4 }}>{StepComponent}</Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="success"
                onClick={handleFinish}
              >
                Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      ) : (
        <WaitingApprovalScreen />
      )}
    </Container>
  );
};

export default DashboardSetupStepper;
