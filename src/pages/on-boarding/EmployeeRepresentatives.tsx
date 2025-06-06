import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Grid, 
  Button,
  Divider,
  Paper
} from '@mui/material';
import { OnboardingFormData } from './types';

interface EmployeeRepresentativesProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
}

const EmployeeRepresentatives: React.FC<EmployeeRepresentativesProps> = ({ 
  formData, 
  onFormChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? undefined : Number(value);
    onFormChange({ [name]: numValue });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employee Representatives
      </Typography>

      {/* Agent Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.hasAgent || false}
              onChange={handleChange}
              name="hasAgent"
            />
          }
          label="This worker has an Agent"
        />

        {formData.hasAgent && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Agent Email"
                  name="agentEmail"
                  type="email"
                  value={formData.agentEmail || ''}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.receivedAgentCheckAuth || false}
                      onChange={handleChange}
                      name="receivedAgentCheckAuth"
                    />
                  }
                  label="I have received a Check Authorization form for this Agent"
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Checking this box will remove the percentage fields and indicate that all wages will be paid directly to the agency (100%).
                </Typography>
              </Grid>

              {!formData.receivedAgentCheckAuth && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Agent Fee (Rehearsal) %"
                      name="agentFeeRehearsal"
                      type="number"
                      value={formData.agentFeeRehearsal === undefined ? '' : formData.agentFeeRehearsal}
                      onChange={handleNumberChange}
                      inputProps={{ min: 0, max: 100 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Agent Fee (Performance) %"
                      name="agentFeePerformance"
                      type="number"
                      value={formData.agentFeePerformance === undefined ? '' : formData.agentFeePerformance}
                      onChange={handleNumberChange}
                      inputProps={{ min: 0, max: 100 }}
                      required
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agentAuthorization || false}
                      onChange={handleChange}
                      name="agentAuthorization"
                    />
                  }
                  label="I confirm that this agent is authorized to use Greenroom upon worker's behalf"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Agent Onboarding Options
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button variant="outlined" size="small">
                    Continue Agent Onboarding Manually
                  </Button>
                  <Button variant="contained" size="small">
                    Invite Agent to Self-Onboard
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Manager Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.hasManager || false}
              onChange={handleChange}
              name="hasManager"
            />
          }
          label="This worker has a Manager"
        />

        {formData.hasManager && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Manager Email"
                  name="managerEmail"
                  type="email"
                  value={formData.managerEmail || ''}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Manager Fee (Rehearsal) %"
                  name="managerFeeRehearsal"
                  type="number"
                  value={formData.managerFeeRehearsal === undefined ? '' : formData.managerFeeRehearsal}
                  onChange={handleNumberChange}
                  inputProps={{ min: 0, max: 100 }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Manager Fee (Performance) %"
                  name="managerFeePerformance"
                  type="number"
                  value={formData.managerFeePerformance === undefined ? '' : formData.managerFeePerformance}
                  onChange={handleNumberChange}
                  inputProps={{ min: 0, max: 100 }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.managerAuthorization || false}
                      onChange={handleChange}
                      name="managerAuthorization"
                    />
                  }
                  label="I confirm that this manager is authorized to use Greenroom upon worker's behalf"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Manager Onboarding Options
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button variant="outlined" size="small">
                    Continue Manager Onboarding Manually
                  </Button>
                  <Button variant="contained" size="small">
                    Invite Manager to Self-Onboard
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default EmployeeRepresentatives;