import { TextField, MenuItem, Stack } from "@mui/material";

const entityTypes = ["LLC", "Corporation", "Sole Proprietor", "Partnership"];
const states = ["NY", "CA", "TX", "FL"];
const payFrequencies = ["Weekly", "Bi-Weekly", "Monthly"];
const payPeriods = ["Current", "Previous", "Next"];
const roles = ["Actor", "Star", "Principle Actor", "Chorus/Sing"];

interface Props {
  activeStep: number;
}

export default function RegistrationFormContent({ activeStep }: Props) {
  switch (activeStep) {
    case 0:
      return (
        <>
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            label="Entity Name"
            name="entity_name"
          />
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            select
            label="Entity type"
            name="entity_type"
          >
            {entityTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <Stack
            direction={{ md: "row", xs: "column" }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <TextField fullWidth margin="none" label="FEIN" name="fein" />
            <TextField
              fullWidth
              margin="none"
              label="NYS Unemployment Registration Number"
              name="nys_unemployment_registration_number"
            />
          </Stack>
          <Stack
            direction={{ md: "row", xs: "column" }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <TextField
              fullWidth
              margin="none"
              label="Address Line 1"
              name="address_line_1"
            />
            <TextField
              fullWidth
              margin="none"
              label="Address Line 2"
              name="address_line_2"
            />
          </Stack>
          <Stack
            direction={{ md: "row", xs: "column" }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <TextField fullWidth margin="none" label="City" name="city" />
            <TextField
              fullWidth
              margin="none"
              select
              label="State"
              name="state"
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
            <TextField
              fullWidth
              margin="none"
              label="Zip Code"
              name="zip_code"
            />
            <TextField
              fullWidth
              margin="none"
              label="Phone Number"
              name="phone_number"
            />
          </Stack>
        </>
      );

    case 1:
      return (
        <>
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            label="First Name *"
            name="first_name"
          />
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            label="Last Name *"
            name="last_name"
          />
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            label="Email *"
            name="email"
          />
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            select
            label="Role / Title *"
            name="role"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </>
      );

    case 2:
      return (
        <>
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            select
            label="Pay Frequency"
            name="pay_frequency"
          >
            {payFrequencies.map((freq) => (
              <MenuItem key={freq} value={freq}>
                {freq}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            select
            label="Pay Period"
            name="pay_period"
          >
            {payPeriods.map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="none"
            sx={{ mb: 2 }}
            type="date"
            label="Payroll Start Date"
            name="payroll_start_date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="none"
            label="Check Number"
            name="check_number"
          />
        </>
      );

    default:
      return null;
  }
}
