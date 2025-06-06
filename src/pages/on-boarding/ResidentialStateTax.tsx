import React from 'react';
import { Box, Typography, TextField, MenuItem, Grid, FormHelperText } from '@mui/material';
import { OnboardingFormData } from './types';

interface ResidentialStateTaxProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const ResidentialStateTax: React.FC<ResidentialStateTaxProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onNext 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  // Skip this step if home address state is NY (already handled in NYStateTaxWithholdings)
  if (formData.homeAddress?.state === 'NY') {
    onNext();
    return null;
  }

  const residentialState = formData.homeAddress?.state || '';

  // Render different form fields based on the residential state
  const renderStateSpecificFields = () => {
    switch (residentialState) {
      case 'CT':
        return (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Connecticut (CT) - CT-W4
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Withholding Code"
                  name="stateWithholdingCode"
                  value={formData.stateWithholdingCode || ''}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  <MenuItem value="A">A - Exempt</MenuItem>
                  <MenuItem value="B">B - Filing jointly</MenuItem>
                  <MenuItem value="C">C - Filing jointly, spouse has income</MenuItem>
                  <MenuItem value="D">D - Filing separately</MenuItem>
                  <MenuItem value="E">E - Head of household</MenuItem>
                  <MenuItem value="F">F - Qualifying widow(er)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Additional Withholding Amount"
                  name="stateAdditionalWithholding"
                  type="number"
                  value={formData.stateAdditionalWithholding || ''}
                  onChange={handleChange}
                  margin="normal"
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reduced Withholding Amount"
                  name="stateReducedWithholding"
                  type="number"
                  value={formData.stateReducedWithholding || ''}
                  onChange={handleChange}
                  margin="normal"
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
            </Grid>
          </>
        );
      case 'PA':
        return (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Pennsylvania (PA)
            </Typography>
            <FormHelperText sx={{ mb: 2 }}>
              Pennsylvania does not have a form exactly like the federal W-4 form, since Pennsylvania
              Personal Income Tax is based on a flat tax rate and everyone pays the same rate of 3.07 percent.
            </FormHelperText>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Additional Withholding Amount (Optional)"
                  name="stateAdditionalWithholding"
                  type="number"
                  value={formData.stateAdditionalWithholding || ''}
                  onChange={handleChange}
                  margin="normal"
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
            </Grid>
          </>
        );
      case 'NJ':
        return (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              New Jersey (NJ) - NJ-W4 Form
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Filing Status"
                  name="stateFilingStatus"
                  value={formData.stateFilingStatus || ''}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married/Civil Union Couple Joint">Married/Civil Union Couple Joint</MenuItem>
                  <MenuItem value="Married/Civil Union Partner Separate">Married/Civil Union Partner Separate</MenuItem>
                  <MenuItem value="Head of household">Head of household</MenuItem>
                  <MenuItem value="Qualifying widow(er)">Qualifying widow(er)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Withholding Code"
                  name="stateWithholdingCode"
                  value={formData.stateWithholdingCode || ''}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Number of Allowances"
                  name="stateAllowances"
                  type="number"
                  value={formData.stateAllowances || ''}
                  onChange={handleChange}
                  margin="normal"
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Additional Amount to Deduct"
                  name="stateAdditionalWithholding"
                  type="number"
                  value={formData.stateAdditionalWithholding || ''}
                  onChange={handleChange}
                  margin="normal"
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
            </Grid>
          </>
        );
      default:
        return (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              State Tax Withholding Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="State Filing Status"
                  name="stateFilingStatus"
                  value={formData.stateFilingStatus || ''}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married filing joint return">Married filing joint return</MenuItem>
                  <MenuItem value="Married filing separate return">Married filing separate return</MenuItem>
                  <MenuItem value="Head of household">Head of household</MenuItem>
                  <MenuItem value="Qualifying surviving spouse">Qualifying surviving spouse</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Additional Withholding"
                  name="stateAdditionalWithholding"
                  type="number"
                  value={formData.stateAdditionalWithholding || ''}
                  onChange={handleChange}
                  margin="normal"
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
            </Grid>
          </>
        );
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Residential State Tax Withholdings
      </Typography>

      <Typography variant="body1" paragraph>
        Complete this step to determine tax withholding for your residential state 
        {residentialState ? ` (${residentialState})` : ''}.
      </Typography>

      {renderStateSpecificFields()}
    </Box>
  );
};

export default ResidentialStateTax;