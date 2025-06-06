import React from 'react';
import { Box, Typography, TextField, MenuItem, Grid, FormHelperText } from '@mui/material';
import { OnboardingFormData } from './types';

interface VendorTaxpayerInfoProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const VendorTaxpayerInfo: React.FC<VendorTaxpayerInfoProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onNext 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Taxpayer Information (W-9)
      </Typography>

      <Typography variant="body1" paragraph>
        This information is required for tax reporting purposes.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={formData.payeeType === 'Vendor/Contractor' && formData.entityName ? 'Entity Name' : 'Name'}
            name="entityName"
            value={formData.entityName || formData.legalFirstName + ' ' + formData.legalLastName || ''}
            onChange={handleChange}
            required
            disabled={!!formData.legalFirstName && !!formData.legalLastName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Federal Tax Classification"
            name="federalTaxClassification"
            value={formData.federalTaxClassification || ''}
            onChange={handleChange}
            required
          >
            <MenuItem value="individual">Individual/sole proprietor</MenuItem>
            <MenuItem value="c-corporation">C Corporation</MenuItem>
            <MenuItem value="s-corporation">S Corporation</MenuItem>
            <MenuItem value="partnership">Partnership</MenuItem>
            <MenuItem value="trust-estate">Trust/estate</MenuItem>
            <MenuItem value="llc-c">LLC - C Corporation</MenuItem>
            <MenuItem value="llc-s">LLC - S Corporation</MenuItem>
            <MenuItem value="llc-p">LLC - Partnership</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Exempt Payee Code (if any)"
            name="exemptPayeeCode"
            value={formData.exemptPayeeCode || ''}
            onChange={handleChange}
          />
          <FormHelperText>
            Exemption codes apply only to certain entities, not individuals
          </FormHelperText>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Exemption from FATCA Reporting Code (if any)"
            name="fatcaExemptionCode"
            value={formData.fatcaExemptionCode || ''}
            onChange={handleChange}
          />
          <FormHelperText>
            Applies to accounts maintained outside the U.S.
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Business Address
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            name="businessAddress.address1"
            value={formData.businessAddress?.address1 || ''}
            onChange={(e) => onFormChange({
              businessAddress: {
                ...formData.businessAddress,
                address1: e.target.value
              }
            })}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Apt or Suite No."
            name="businessAddress.address2"
            value={formData.businessAddress?.address2 || ''}
            onChange={(e) => onFormChange({
              businessAddress: {
                ...formData.businessAddress,
                address2: e.target.value
              }
            })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="businessAddress.city"
            value={formData.businessAddress?.city || ''}
            onChange={(e) => onFormChange({
              businessAddress: {
                ...formData.businessAddress,
                city: e.target.value
              }
            })}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="State"
            name="businessAddress.state"
            value={formData.businessAddress?.state || ''}
            onChange={(e) => onFormChange({
              businessAddress: {
                ...formData.businessAddress,
                state: e.target.value
              }
            })}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="ZIP Code"
            name="businessAddress.zipCode"
            value={formData.businessAddress?.zipCode || ''}
            onChange={(e) => onFormChange({
              businessAddress: {
                ...formData.businessAddress,
                zipCode: e.target.value
              }
            })}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={formData.payeeType === 'Vendor/Contractor' && formData.entityName ? 'EIN' : 'SSN or EIN'}
            name={formData.payeeType === 'Vendor/Contractor' && formData.entityName ? 'ein' : 'ssn'}
            value={formData.ein || formData.ssn || ''}
            onChange={handleChange}
            placeholder={formData.payeeType === 'Vendor/Contractor' && formData.entityName ? '12-3456789' : '123-45-6789 or 12-3456789'}
            required
          />
          <FormHelperText>
            {formData.payeeType === 'Vendor/Contractor' && formData.entityName 
              ? 'Enter your Employer Identification Number' 
              : 'Enter your Social Security Number or Employer Identification Number'}
          </FormHelperText>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorTaxpayerInfo;