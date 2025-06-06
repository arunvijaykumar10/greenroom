import React, { useState } from "react";
import {
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";

const unionOptions = ["Non-Union", "Union"] as const;

const agreementOptions = [
  "Equity/League Production Contract",
  "Off-Broadway Agreement",
  "Development Agreement (Work Session)",
  "29 Hour Reading",
] as const;

const musicalOrDramaticOptions = ["Musical", "Dramatic"] as const;
const tierOptions = ["Tier 1", "Tier 2", "Tier 3"] as const;
const unions = ["Actor’s Equity Association"];

export const UnionConfigurationForm: React.FC = () => {
  const [unionStatus, setUnionStatus] = useState<string>("Non-Union");
  const [agreementType, setAgreementType] = useState<string>("");
  const [form, setForm] = useState({
    musicalOrDramatic: "",
    union: "",
    tier: "",
    aeaEmployerId: "",
    aeaProductionTitle: "",
    aeaBusinessRep: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showAEAFields =
    unionStatus === "Union" &&
    form.union === "Actor’s Equity Association" &&
    agreementType !== "29 Hour Reading";

  const showMusicalOrDramatic =
    agreementType === "Equity/League Production Contract" ||
    agreementType === "Off-Broadway Agreement";

  const showTier = agreementType === "Development Agreement (Work Session)";

  return (
    <Paper sx={{ p: 4 }}>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel>Is this a union production?</FormLabel>
        <RadioGroup
          row
          value={unionStatus}
          onChange={(e) => {
            setUnionStatus(e.target.value);
            setAgreementType("");
            setForm({
              musicalOrDramatic: "",
              union: "",
              tier: "",
              aeaEmployerId: "",
              aeaProductionTitle: "",
              aeaBusinessRep: "",
            });
          }}
        >
          {unionOptions.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {unionStatus === "Union" && (
        <TextField
          select
          fullWidth
          label="Union"
          name="union"
          value={form.union}
          onChange={handleChange}
          sx={{ mb: 3 }}
        >
          {unions.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      )}

      {unionStatus === "Union" &&
        form.union === "Actor’s Equity Association" && (
          <TextField
            select
            fullWidth
            label="Agreement Type *"
            value={agreementType}
            onChange={(e) => {
              setAgreementType(e.target.value);
              setForm({
                musicalOrDramatic: "",
                tier: "",
                union: form.union,
                aeaEmployerId: "",
                aeaProductionTitle: "",
                aeaBusinessRep: "",
              });
            }}
            sx={{ mb: 3 }}
          >
            {agreementOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}

      {showMusicalOrDramatic && (
        <TextField
          select
          fullWidth
          label="Musical or Dramatic"
          name="musicalOrDramatic"
          value={form.musicalOrDramatic}
          onChange={handleChange}
          sx={{ mb: 3 }}
        >
          {musicalOrDramaticOptions.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      )}

      {showTier && (
        <TextField
          select
          fullWidth
          label="Tier"
          name="tier"
          value={form.tier}
          onChange={handleChange}
          sx={{ mb: 3 }}
        >
          {tierOptions.map((tier) => (
            <MenuItem key={tier} value={tier}>
              {tier}
            </MenuItem>
          ))}
        </TextField>
      )}

      {showAEAFields && (
        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="AEA Employer ID"
            name="aeaEmployerId"
            value={form.aeaEmployerId}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="AEA Production Title"
            name="aeaProductionTitle"
            value={form.aeaProductionTitle}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="AEA Business Representative"
            name="aeaBusinessRep"
            value={form.aeaBusinessRep}
            onChange={handleChange}
          />
        </Stack>
      )}
    </Paper>
  );
};
