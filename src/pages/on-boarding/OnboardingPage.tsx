import {
  Box,
  Container,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import EmployeeGeneralInfo from "./EmployeeGneralInfo";
import EntityGeneralInfo from "./EntityGeneralInfo";
import FederalTaxWithholdings from "./FederalTaxWithholdings";
import NYStateTaxWithholdings from "./NYStateTaxWithholdings";
import OnboardingConfirmation from "./OnboardingConfirmation";
import OnboardingStepper from "./OnboardingStepper";
import PaymentDetails from "./PaymentDetails";
import ResidentialStateTax from "./ResidentialStateTax";
import RequiredStartWork from "./RequiredStartWork";
import { OnboardingFormData, PayeeType } from "./types";
import VendorTaxpayerInfo from "./VendorTaxpayerInfo";
import WorkAuthorization from "./WorkAuthorization";

const OnboardingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({
    payeeType: "Employee",
  });
  const [isComplete, setIsComplete] = useState(false);
  const [isManualOnboarding, _setIsManualOnboarding] = useState(true);
  // Always use manual onboarding for Employee type
  const isManual =
    formData.payeeType === "Employee" ? true : isManualOnboarding;
  const handleNext = () => {
    const nextStep = activeStep + 1;

    // Check if we're on the final step
    if (isManual) {
      if (
        (formData.payeeType === "Employee" ||
          formData.payeeType === "Loanout") &&
        nextStep > 5
      ) {
        handleSubmit();
        return;
      } else if (formData.payeeType === "Vendor/Contractor" && nextStep > 2) {
        handleSubmit();
        return;
      }
    } else if (!isManual && nextStep > 0) {
      // For self-onboarding, there's only one step
      handleSubmit();
      return;
    }

    setActiveStep(nextStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormChange = (data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setIsComplete(true);
  };

  const handlePayeeTypeChange = (event: any) => {
    const newPayeeType = event.target.value as PayeeType;
    setFormData((prev) => ({
      ...prev,
      payeeType: newPayeeType,
      // Reset fields that are specific to other payee types
      ssn: newPayeeType !== "Employee" ? undefined : prev.ssn,
      ein: newPayeeType !== "Employee" ? undefined : prev.ein,
      dateOfBirth: newPayeeType !== "Employee" ? undefined : prev.dateOfBirth,
      homeAddress: newPayeeType === "Employee" ? prev.homeAddress : undefined,
      businessAddress:
        newPayeeType !== "Employee" ? prev.businessAddress : undefined,
    }));
    setActiveStep(0);
  };

  const getStepContent = (step: number) => {
    // For self-onboarding (non-Employee types only), only show the first step with RequiredStartWork
    if (!isManual && step === 0) {
      return (
        <RequiredStartWork
          formData={formData}
          onFormChange={handleFormChange}
          onNext={handleNext}
        />
      );
    }

    // For manual onboarding, show the full flow
    switch (step) {
      case 0:
        if (formData.payeeType === "Employee") {
          return (
            <EmployeeGeneralInfo
              formData={formData}
              onFormChange={handleFormChange}
              onNext={handleNext}
              isManualOnboarding={isManual}
            />
          );
        } else {
          return (
            <EntityGeneralInfo
              formData={formData}
              onFormChange={handleFormChange}
              onNext={handleNext}
              isManualOnboarding={isManual}
            />
          );
        }
      case 1:
        if (formData.payeeType === "Vendor/Contractor") {
          return (
            <VendorTaxpayerInfo
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        } else if (formData.payeeType === "Loanout") {
          return (
            <WorkAuthorization
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        } else {
          return (
            <WorkAuthorization
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        }
      case 2:
        if (formData.payeeType === "Employee") {
          return (
            <FederalTaxWithholdings
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        } else if (formData.payeeType === "Loanout") {
          return (
            <VendorTaxpayerInfo
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        } else {
          return (
            <PaymentDetails
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          );
        }
      case 3:
        if (
          formData.payeeType === "Employee" ||
          formData.payeeType === "Loanout"
        ) {
          return (
            <NYStateTaxWithholdings
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        } else {
          return (
            <PaymentDetails
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          );
        }
      case 4:
        if (
          formData.payeeType === "Employee" ||
          formData.payeeType === "Loanout"
        ) {
          return (
            <ResidentialStateTax
              formData={formData}
              onFormChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        } else {
          return null;
        }
      case 5:
        return (
          <PaymentDetails
            formData={formData}
            onFormChange={handleFormChange}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  if (isComplete) {
    return <OnboardingConfirmation formData={formData} />;
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 6, px: 0 }}>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 0, sm: 4 } }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 2, sm: 5 },
            boxShadow: 8,
            maxWidth: 1280,
            mx: "auto",
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <FormControl
              sx={{
                minWidth: 220,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
              size="medium"
            >
              <InputLabel>Payee Type</InputLabel>
              <Select
                value={formData.payeeType}
                label="Payee Type"
                onChange={handlePayeeTypeChange}
              >
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Loanout">Loanout</MenuItem>
                <MenuItem value="Vendor/Contractor">Vendor/Contractor</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <OnboardingStepper
            activeStep={activeStep}
            payeeType={formData.payeeType}
            isManualOnboarding={isManual}
          />

          <Box sx={{ mt: 3 }}>{getStepContent(activeStep)}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 5,
              px: 3,
              py: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ borderRadius: 2, minWidth: 100 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                // Disable next button on final step
                (isManual &&
                  (formData.payeeType === "Employee" ||
                    formData.payeeType === "Loanout") &&
                  activeStep === 5) ||
                (formData.payeeType === "Vendor/Contractor" &&
                  activeStep === 2) ||
                (!isManual && activeStep > 0)
              }
              sx={{ borderRadius: 2, minWidth: 100, boxShadow: 2 }}
            >
              {activeStep ===
              (isManual
                ? formData.payeeType === "Vendor/Contractor"
                  ? 2
                  : 5
                : 0)
                ? "Submit"
                : "Next"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OnboardingPage;
