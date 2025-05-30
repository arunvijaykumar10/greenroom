import { Stack, Button } from "@mui/material";
import RegistrationFormContent from "./RegistrationFormContent";

interface FormProps {
  activeStep: number;
  onBack: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const RegistrationForm = ({ activeStep, onBack, onSubmit }: FormProps) => {
  return (
    <Stack spacing={3} py={3}>
      <RegistrationFormContent activeStep={activeStep} />

      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={onBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button variant="contained" type="submit" onClick={() => onSubmit({})}>
          {activeStep === 2 ? "Submit" : "Next"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default RegistrationForm;
