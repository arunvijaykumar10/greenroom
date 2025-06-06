import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Grid, 
  FormControlLabel, 
  Checkbox,
  Button,
  Paper
} from '@mui/material';
import { OnboardingFormData } from './types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface WorkAuthorizationProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const WorkAuthorization: React.FC<WorkAuthorizationProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onNext 
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(formData.documentFile || null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      onFormChange({ documentFile: file });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Work Authorization (I-9)
      </Typography>

      <Typography variant="body1" paragraph>
        This information is required to verify employment eligibility.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Legal First Name"
            name="legalFirstName"
            value={formData.legalFirstName || ''}
            onChange={handleChange}
            required
            disabled={!!formData.legalFirstName}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Legal Last Name"
            name="legalLastName"
            value={formData.legalLastName || ''}
            onChange={handleChange}
            required
            disabled={!!formData.legalLastName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            disabled={!!formData.dateOfBirth}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="SSN"
            name="ssn"
            value={formData.ssn || ''}
            onChange={handleChange}
            placeholder="999-99-9999"
            required
            disabled={!!formData.ssn}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            disabled={!!formData.email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Address
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            name="homeAddress.address1"
            value={formData.homeAddress?.address1 || ''}
            onChange={(e) => onFormChange({
              homeAddress: {
                ...formData.homeAddress,
                address1: e.target.value
              }
            })}
            required
            disabled={!!formData.homeAddress?.address1}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Apt or Suite No."
            name="homeAddress.address2"
            value={formData.homeAddress?.address2 || ''}
            onChange={(e) => onFormChange({
              homeAddress: {
                ...formData.homeAddress,
                address2: e.target.value
              }
            })}
            disabled={!!formData.homeAddress?.address2}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="homeAddress.city"
            value={formData.homeAddress?.city || ''}
            onChange={(e) => onFormChange({
              homeAddress: {
                ...formData.homeAddress,
                city: e.target.value
              }
            })}
            required
            disabled={!!formData.homeAddress?.city}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="State"
            name="homeAddress.state"
            value={formData.homeAddress?.state || ''}
            onChange={(e) => onFormChange({
              homeAddress: {
                ...formData.homeAddress,
                state: e.target.value
              }
            })}
            required
            disabled={!!formData.homeAddress?.state}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="ZIP Code"
            name="homeAddress.zipCode"
            value={formData.homeAddress?.zipCode || ''}
            onChange={(e) => onFormChange({
              homeAddress: {
                ...formData.homeAddress,
                zipCode: e.target.value
              }
            })}
            required
            disabled={!!formData.homeAddress?.zipCode}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Legal Status"
            name="legalStatus"
            value={formData.legalStatus || ''}
            onChange={handleChange}
            required
          >
            <MenuItem value="citizen">Citizen of the United States</MenuItem>
            <MenuItem value="noncitizen-national">Noncitizen national of the United States</MenuItem>
            <MenuItem value="permanent-resident">Lawful permanent resident</MenuItem>
            <MenuItem value="noncitizen">Noncitizen</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Validation Document"
            name="validationDocument"
            value={formData.validationDocument || ''}
            onChange={handleChange}
            required
          >
            <MenuItem value="passport">Passport</MenuItem>
            <MenuItem value="resident-card">Resident Card</MenuItem>
            <MenuItem value="foreign-passport">Foreign Passport</MenuItem>
            <MenuItem value="license-ssn">Combination of driver's license and SSN</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Document Number"
            name="documentNumber"
            value={formData.documentNumber || ''}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Document Issuing Authority"
            name="issuingAuthority"
            value={formData.issuingAuthority || ''}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Document Expiration Date"
            name="documentExpiration"
            type="date"
            value={formData.documentExpiration || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            disabled={formData.documentDoesNotExpire}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.documentDoesNotExpire || false}
                onChange={handleChange}
                name="documentDoesNotExpire"
              />
            }
            label="Document does not expire"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              border: '1px dashed #ccc', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 150
            }}
          >
            <input
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              id="document-upload"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="document-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload Document
              </Button>
            </label>
            
            {uploadedFile && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <AttachFileIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {uploadedFile.name}
                </Typography>
              </Box>
            )}
            
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
              Upload a scan or photo of your identification document
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkAuthorization;