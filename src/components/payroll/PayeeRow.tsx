import React, { useState } from 'react';
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Checkbox,
  Divider,
  Paper,
  Grid
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  AttachFile as AttachFileIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface Rate {
  amount: number;
  unit: string;
  type: string;
}

interface Adjustment {
  id: number;
  type: string;
  amount: number;
  code: string;
  class?: string;
  note?: string;
  receipt?: File | null;
}

interface Payee {
  name: string;
  onboarded?: boolean;
  included: boolean;
  union?: string;
  jobTitle?: string;
  payType?: string;
  timesheetApproved?: boolean;
  timesheetSubmitted?: boolean;
  rates: Rate[];
  selectedRateIndex: number;
  increments: Adjustment[];
  deductions: Adjustment[];
  allowances: Adjustment[];
  reimbursements: Adjustment[];
}

interface PayeeRowProps {
  payee: Payee;
  onUpdate: (payee: Payee) => void;
  payeeType: string;
}

const PayeeRow: React.FC<PayeeRowProps> = ({ payee, onUpdate, payeeType }) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [localPayee, setLocalPayee] = useState(payee);

  // Handle changes to payee data
  const handleChange = (field: string, value: boolean | Adjustment[]) => {
    setLocalPayee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle rate selection
  const handleRateChange = (rateIndex: string | number) => {
    setLocalPayee(prev => ({
      ...prev,
      selectedRateIndex: typeof rateIndex === 'string' ? parseInt(rateIndex, 10) : rateIndex
    }));
  };

  // Define allowed adjustment keys
  type AdjustmentKey = 'increments' | 'deductions' | 'allowances' | 'reimbursements';
  
  // Handle adding a new adjustment
  const handleAddAdjustment = (type: AdjustmentKey) => {
    const newAdjustment: Adjustment = {
      id: Date.now(),
      type,
      amount: 0,
      code: '',
      class: '',
      note: '',
      receipt: null
    };
  
    setLocalPayee(prev => ({
      ...prev,
      [type]: [...prev[type], newAdjustment]
    }));
  };

  // Handle saving changes
  const handleSave = () => {
    onUpdate(localPayee);
    setEditMode(false);
  };

  // Calculate totals
  const totalIncrements = localPayee.increments.reduce((sum, inc) => sum + inc.amount, 0);
  const totalDeductions = localPayee.deductions.reduce((sum, ded) => sum + ded.amount, 0);
  const totalAllowances = localPayee.allowances.reduce((sum, all) => sum + all.amount, 0);
  const totalReimbursements = localPayee.reimbursements.reduce((sum, reim) => sum + reim.amount, 0);
  const totalGross = localPayee.rates[localPayee.selectedRateIndex].amount + totalIncrements;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={localPayee.included}
            onChange={(e) => handleChange('included', e.target.checked)}
          />
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Typography>
              {localPayee.name}
              {!localPayee.onboarded && (
                <Typography variant="caption" color="error" ml={1}>
                  (Not Onboarded)
                </Typography>
              )}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>{payeeType}</TableCell>
        <TableCell>{localPayee.union || 'Non-Union'}</TableCell>
        <TableCell>{localPayee.jobTitle}</TableCell>
        <TableCell>
          {editMode ? (
            <FormControl fullWidth size="small">
              <Select
                value={localPayee.selectedRateIndex}
                onChange={(e) => handleRateChange(e.target.value)}
              >
                {localPayee.rates.map((rate, index) => (
                  <MenuItem key={index} value={index}>
                    {`$${rate.amount}/${rate.unit}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            `$${localPayee.rates[localPayee.selectedRateIndex].amount}/${localPayee.rates[localPayee.selectedRateIndex].unit}`
          )}
        </TableCell>
        <TableCell>${totalIncrements.toFixed(2)}</TableCell>
        <TableCell>${totalGross.toFixed(2)}</TableCell>
        <TableCell>${totalDeductions.toFixed(2)}</TableCell>
        <TableCell>${(totalAllowances + totalReimbursements).toFixed(2)}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Grid container spacing={3}>
                {/* Rates Section */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6">Rates</Typography>
                    <Divider sx={{ my: 1 }} />
                    {localPayee.rates.map((rate, index) => (
                      <Box key={index} mb={1}>
                        <Typography>
                          {`$${rate.amount}/${rate.unit}`} - {rate.type}
                          {index === localPayee.selectedRateIndex && ' (Selected)'}
                        </Typography>
                      </Box>
                    ))}
                    {/* Add Rate button removed because rates are not handled as adjustments */}
                  </Paper>
                </Grid>

                {/* Increments Section */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6">Increments</Typography>
                    <Divider sx={{ my: 1 }} />
                    {localPayee.increments.length > 0 ? (
                      localPayee.increments.map((inc, index) => (
                        <Box key={inc.id} mb={1}>
                          {editMode ? (
                            <Box display="flex" alignItems="center" gap={1}>
                              <TextField
                                size="small"
                                type="number"
                                value={inc.amount}
                                onChange={(e) => {
                                  const newIncrements = [...localPayee.increments];
                                  newIncrements[index].amount = parseFloat(e.target.value);
                                  handleChange('increments', newIncrements);
                                }}
                              />
                              <TextField
                                size="small"
                                label="Code"
                                value={inc.code}
                                onChange={(e) => {
                                  const newIncrements = [...localPayee.increments];
                                  newIncrements[index].code = e.target.value;
                                  handleChange('increments', newIncrements);
                                }}
                              />
                              <IconButton
                                onClick={() => {
                                  const newIncrements = localPayee.increments.filter((_, i) => i !== index);
                                  handleChange('increments', newIncrements);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <Typography>
                              {inc.code}: ${inc.amount.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2">No increments</Typography>
                    )}
                    {editMode && (
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddAdjustment('increments')}
                      >
                        Add Increment
                      </Button>
                    )}
                  </Paper>
                </Grid>

                {/* Deductions Section */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6">Deductions</Typography>
                    <Divider sx={{ my: 1 }} />
                    {localPayee.deductions.length > 0 ? (
                      localPayee.deductions.map((ded, index) => (
                        <Box key={ded.id} mb={1}>
                          {editMode ? (
                            <Box display="flex" alignItems="center" gap={1}>
                              <TextField
                                size="small"
                                type="number"
                                value={ded.amount}
                                onChange={(e) => {
                                  const newDeductions = [...localPayee.deductions];
                                  newDeductions[index].amount = parseFloat(e.target.value);
                                  handleChange('deductions', newDeductions);
                                }}
                              />
                              <FormControl size="small">
                                <InputLabel>Type</InputLabel>
                                <Select
                                  value={ded.type}
                                  onChange={(e) => {
                                    const newDeductions = [...localPayee.deductions];
                                    newDeductions[index].type = e.target.value;
                                    handleChange('deductions', newDeductions);
                                  }}
                                >
                                  <MenuItem value="tax">Tax</MenuItem>
                                  <MenuItem value="union">Union Dues</MenuItem>
                                  <MenuItem value="agent">Agent Fee</MenuItem>
                                  <MenuItem value="401k">401k</MenuItem>
                                  <MenuItem value="other">Other</MenuItem>
                                </Select>
                              </FormControl>
                              <IconButton
                                onClick={() => {
                                  const newDeductions = localPayee.deductions.filter((_, i) => i !== index);
                                  handleChange('deductions', newDeductions);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <Typography>
                              {ded.type}: ${ded.amount.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2">No deductions</Typography>
                    )}
                    {editMode && (
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddAdjustment('deductions')}
                      >
                        Add Deduction
                      </Button>
                    )}
                  </Paper>
                </Grid>

                {/* Allowances & Reimbursements Section */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6">Allowances & Reimbursements</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2">Allowances</Typography>
                    {localPayee.allowances.length > 0 ? (
                      localPayee.allowances.map((all, index) => (
                        <Box key={all.id} mb={1}>
                          {editMode ? (
                            <Box display="flex" alignItems="center" gap={1}>
                              <TextField
                                size="small"
                                type="number"
                                value={all.amount}
                                onChange={(e) => {
                                  const newAllowances = [...localPayee.allowances];
                                  newAllowances[index].amount = parseFloat(e.target.value);
                                  handleChange('allowances', newAllowances);
                                }}
                              />
                              <TextField
                                size="small"
                                label="Code"
                                value={all.code}
                                onChange={(e) => {
                                  const newAllowances = [...localPayee.allowances];
                                  newAllowances[index].code = e.target.value;
                                  handleChange('allowances', newAllowances);
                                }}
                              />
                              <IconButton
                                onClick={() => {
                                  const newAllowances = localPayee.allowances.filter((_, i) => i !== index);
                                  handleChange('allowances', newAllowances);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <Typography>
                              {all.code}: ${all.amount.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2">No allowances</Typography>
                    )}

                    <Typography variant="subtitle2" mt={2}>Reimbursements</Typography>
                    {localPayee.reimbursements.length > 0 ? (
                      localPayee.reimbursements.map((reim, index) => (
                        <Box key={reim.id} mb={1}>
                          {editMode ? (
                            <Box display="flex" alignItems="center" gap={1}>
                              <TextField
                                size="small"
                                type="number"
                                value={reim.amount}
                                onChange={(e) => {
                                  const newReimbursements = [...localPayee.reimbursements];
                                  newReimbursements[index].amount = parseFloat(e.target.value);
                                  handleChange('reimbursements', newReimbursements);
                                }}
                              />
                              <TextField
                                size="small"
                                label="Code"
                                value={reim.code}
                                onChange={(e) => {
                                  const newReimbursements = [...localPayee.reimbursements];
                                  newReimbursements[index].code = e.target.value;
                                  handleChange('reimbursements', newReimbursements);
                                }}
                              />
                              <IconButton
                                component="label"
                                onClick={() => {
                                  // Handle receipt attachment
                                }}
                              >
                                <AttachFileIcon />
                                <input type="file" hidden />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  const newReimbursements = localPayee.reimbursements.filter((_, i) => i !== index);
                                  handleChange('reimbursements', newReimbursements);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <Typography>
                              {reim.code}: ${reim.amount.toFixed(2)}
                              {reim.receipt && (
                                <IconButton size="small">
                                  <AttachFileIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Typography>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2">No reimbursements</Typography>
                    )}
                    {editMode && (
                      <Box display="flex" gap={1} mt={1}>
                        <Button
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => handleAddAdjustment('allowances')}
                        >
                          Add Allowance
                        </Button>
                        <Button
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => handleAddAdjustment('reimbursements')}
                        >
                          Add Reimbursement
                        </Button>
                      </Box>
                    )}
                  </Paper>
                </Grid>

                {/* Timesheets Section (for hourly employees) */}
                {payeeType === 'employee' && localPayee.payType === 'hourly' && (
                  <Grid item xs={12}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6">Timesheets</Typography>
                      <Divider sx={{ my: 1 }} />
                      {localPayee.timesheetApproved ? (
                        <Typography color="success.main">Timesheet approved</Typography>
                      ) : localPayee.timesheetSubmitted ? (
                        <Typography color="warning.main">Timesheet submitted but not approved</Typography>
                      ) : (
                        <Typography color="error.main">Timesheet not submitted</Typography>
                      )}
                      <Button size="small" sx={{ mt: 1 }}>
                        View Timesheet
                      </Button>
                    </Paper>
                  </Grid>
                )}
              </Grid>

              <Box display="flex" justifyContent="flex-end" mt={2}>
                {editMode ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setLocalPayee(payee);
                        setEditMode(false);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outlined" onClick={() => setEditMode(true)}>
                    Edit Payee
                  </Button>
                )}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default PayeeRow;