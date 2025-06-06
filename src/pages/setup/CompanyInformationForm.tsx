import React, { useState } from "react";
import { MenuItem, TextField, Paper, Stack } from "@mui/material";

const entityTypes = ["LLC", "Corporation", "Sole Proprietor", "Partnership"];
const states = ["NY", "CA", "TX", "FL"];

const CompanyInformationForm: React.FC = () => {

  const [formValues, setFormValues] = useState({
    entity_name: "Wayne Enterprises",
    entity_type: "Corporation",
    fein: "",
    nys_unemployment_registration_number: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <TextField
        fullWidth
        label="Entity Name *"
        name="entity_name"
        value={formValues.entity_name}
        onChange={handleChange}
        margin="none"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        select
        label="Entity type *"
        name="entity_type"
        value={formValues.entity_type}
        onChange={handleChange}
        margin="none"
        sx={{ mb: 2 }}
      >
        {entityTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      <Stack direction={{ md: "row", xs: "column" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="FEIN *"
          name="fein"
          value={formValues.fein}
          onChange={handleChange}
          margin="none"
        />
        <TextField
          fullWidth
          label="NYS Unemployment Registration Number *"
          name="nys_unemployment_registration_number"
          value={formValues.nys_unemployment_registration_number}
          onChange={handleChange}
          margin="none"
        />
      </Stack>

      <Stack direction={{ md: "row", xs: "column" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Address Line 1 *"
          name="address_line_1"
          value={formValues.address_line_1}
          onChange={handleChange}
          margin="none"
        />
        <TextField
          fullWidth
          label="Address Line 2 *"
          name="address_line_2"
          value={formValues.address_line_2}
          onChange={handleChange}
          margin="none"
        />
      </Stack>

      <Stack direction={{ md: "row", xs: "column" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="City *"
          name="city"
          value={formValues.city}
          onChange={handleChange}
          margin="none"
        />
        <TextField
          fullWidth
          select
          label="State *"
          name="state"
          value={formValues.state}
          onChange={handleChange}
          margin="none"
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
          label="Zip Code *"
          name="zip_code"
          value={formValues.zip_code}
          onChange={handleChange}
          margin="none"
        />
        <TextField
          fullWidth
          label="Phone Number *"
          name="phone_number"
          value={formValues.phone_number}
          onChange={handleChange}
          margin="none"
        />
      </Stack>
    </Paper>
  );
};

export default CompanyInformationForm;
