import React, { useState } from "react";
import {
  Paper,
  Stack,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const payFrequencies = ["Weekly", "Bi-weekly", "Monthly"];
const payPeriods = ["Current", "1 week in arrears", "2 weeks in arrears"];

const PayrollSetupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    payFrequency: "",
    payPeriod: "",
    payScheduleStart: "",
    timesheetDue: "",
    checkNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h6">Payroll & Taxes Configuration</Typography>

        <TextField
          select
          label="Pay Frequency"
          name="payFrequency"
          value={formData.payFrequency}
          onChange={handleChange}
        >
          {payFrequencies.map((freq) => (
            <MenuItem key={freq} value={freq}>
              {freq}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Pay Period"
          name="payPeriod"
          value={formData.payPeriod}
          onChange={handleChange}
        >
          {payPeriods.map((period) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Pay Schedule Start Date"
          type="date"
          name="payScheduleStart"
          value={formData.payScheduleStart}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Timesheet Due Date"
          type="date"
          name="timesheetDue"
          value={formData.timesheetDue}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Check Number"
          name="checkNumber"
          value={formData.checkNumber}
          onChange={handleChange}
        />
      </Stack>
    </Paper>
  );
};

export default PayrollSetupForm;
