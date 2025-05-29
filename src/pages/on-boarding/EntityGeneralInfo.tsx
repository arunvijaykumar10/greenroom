import React from 'react';
import { Box, Typography, TextField, MenuItem, Grid, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { OnboardingFormData } from './types';
import AddressForm from '../AddressForm';

interface EntityGeneralInfoProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isManualOnboarding?: boolean;
}

const EntityGeneralInfo: React.FC<EntityGeneralInfoProps> = ({ 
  formData, 
  onFormChange, 
  onNext,
  isManualOnboarding = true
}) => {
  const isLoanout = formData.payeeType === 'Loanout';
  const isVendor = formData.payeeType === 'Vendor/Contractor';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddressChange = (address: any) => {
    onFormChange({ businessAddress: address });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {isLoanout ? 'Loanout' : 'Vendor/Contractor'} General Information
      </Typography>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Entity Name"
              name="entityName"
              value={formData.entityName || ''}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="EIN"
              name="ein"
              value={formData.ein || ''}
              onChange={handleChange}
              placeholder="XX-XXXXXXX"
              required={isManualOnboarding}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={isVendor ? "Contact Email" : "Email Address"}
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
          Business Address
        </Typography>
        <AddressForm 
          address={formData.businessAddress} 
          onChange={handleAddressChange} 
          required={isManualOnboarding}
        />
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={onNext}
          disabled={!formData.entityName || !formData.email}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default EntityGeneralInfo;