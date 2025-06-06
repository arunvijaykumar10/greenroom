import React, { useState } from "react";
import {
  Paper,
  TextField,
  MenuItem,
  Stack,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

const bankList = [
  {
    name: "Bank of America",
    routingACH: "011000138",
    routingWire: "026009593",
  },
  { name: "Wells Fargo", routingACH: "121000248", routingWire: "121000248" },
  { name: "Chase", routingACH: "021000021", routingWire: "021000021" },
];

const accountTypes = ["Checking", "Savings"] as const;

const isNineDigit = (value: string) => /^\d{9}$/.test(value);
const isOnlyDigits = (value: string) => /^\d*$/.test(value);

const LinkBankAccountForm: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isManualBank, setIsManualBank] = useState(false);
  const [form, setForm] = useState({
    bankName: "",
    routingACH: "",
    routingWire: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountType: "",
    authorize: false,
  });

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    const bank = bankList.find((b) => b.name === bankName);
    if (bank) {
      setIsManualBank(false);
      setForm((prev) => ({
        ...prev,
        bankName: bank.name,
        routingACH: bank.routingACH,
        routingWire: bank.routingWire,
      }));
    } else if (bankName === "Enter Manually") {
      setIsManualBank(true);
      setForm((prev) => ({
        ...prev,
        bankName: "",
        routingACH: "",
        routingWire: "",
      }));
    } else {
      setIsManualBank(true);
      setForm((prev) => ({
        ...prev,
        bankName: bankName,
        routingACH: "",
        routingWire: "",
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      (name === "accountNumber" || name === "confirmAccountNumber") &&
      !isOnlyDigits(value)
    ) {
      return;
    }

    if ((name === "routingACH" || name === "routingWire") && value.length > 9) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, authorize: e.target.checked }));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Stack spacing={3}>
        <TextField
          select
          fullWidth
          label="Select Bank or Enter Manually"
          value={selectedBank}
          onChange={(e) => handleBankSelect(e.target.value)}
        >
          {[...bankList.map((b) => b.name), "Enter Manually"].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Bank Name"
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
          disabled={!isManualBank}
        />

        <TextField
          fullWidth
          label="Routing Number (ACH)"
          name="routingACH"
          value={form.routingACH}
          onChange={handleChange}
          inputProps={{ maxLength: 9, onPaste: (e) => e.preventDefault() }}
          disabled={!isManualBank}
          error={
            isManualBank && !!form.routingACH && !isNineDigit(form.routingACH)
          }
          helperText={
            isManualBank && !!form.routingACH && !isNineDigit(form.routingACH)
              ? "Must be 9 digits"
              : ""
          }
        />

        <TextField
          fullWidth
          label="Routing Number (Wire)"
          name="routingWire"
          value={form.routingWire}
          onChange={handleChange}
          inputProps={{ maxLength: 9, onPaste: (e) => e.preventDefault() }}
          disabled={!isManualBank}
          error={
            isManualBank && !!form.routingWire && !isNineDigit(form.routingWire)
          }
          helperText={
            isManualBank && !!form.routingWire && !isNineDigit(form.routingWire)
              ? "Must be 9 digits"
              : ""
          }
        />

        <TextField
          fullWidth
          label="Account Number"
          name="accountNumber"
          value={form.accountNumber}
          onChange={handleChange}
          inputProps={{
            inputMode: "numeric",
            onPaste: (e) => e.preventDefault(),
          }}
        />

        <TextField
          fullWidth
          label="Confirm Account Number"
          name="confirmAccountNumber"
          value={form.confirmAccountNumber}
          onChange={handleChange}
          inputProps={{
            inputMode: "numeric",
            onPaste: (e) => e.preventDefault(),
          }}
          error={
            !!form.confirmAccountNumber &&
            form.accountNumber !== form.confirmAccountNumber
          }
          helperText={
            !!form.confirmAccountNumber &&
            form.accountNumber !== form.confirmAccountNumber
              ? "Account numbers must match"
              : ""
          }
        />

        <TextField
          select
          fullWidth
          label="Account Type"
          name="accountType"
          value={form.accountType}
          onChange={handleChange}
        >
          {accountTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              checked={form.authorize}
              onChange={handleCheckboxChange}
            />
          }
          label="I authorize credit/debit transactions for this account"
        />

        {!form.authorize && (
          <Typography variant="body2" color="error">
            You must authorize to proceed.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default LinkBankAccountForm;
