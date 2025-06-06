import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Grid, 
  FormControlLabel, 
  Checkbox,
  Divider,
  Slider,
  InputAdornment,
  Paper
} from '@mui/material';
import { OnboardingFormData } from './types';
import AddressForm from '../AddressForm';

interface PaymentDetailsProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  formData,
  onFormChange,
  onBack,
  onSubmit,
}) => {
  const [showEmployeePayment, setShowEmployeePayment] = useState(
    !formData.hasAgent || !formData.receivedAgentCheckAuth
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddressChange = (address: any, type: string) => {
    if (type === 'mailing') {
      onFormChange({ mailingAddress: address });
    } else if (type === 'agent') {
      onFormChange({ agentMailingAddress: address });
    } else if (type === 'manager') {
      onFormChange({ managerMailingAddress: address });
    } else if (type === 'childTrust') {
      onFormChange({ childTrustMailingAddress: address });
    }
  };

  const handleChildTrustPercentageChange = (_event: Event, newValue: number | number[]) => {
    onFormChange({ childTrustPercentage: newValue as number });
  };

  const renderPaymentSection = (
    title: string,
    paymentMethodName: string,
    routingNumberName: string,
    accountNumberName: string,
    accountRepeatName: string,
    accountTypeName: string,
    addressType: string,
    paymentMethodValue?: string,
    routingNumberValue?: string,
    accountNumberValue?: string,
    accountTypeValue?: string,
    addressValue?: any
  ) => {
    return (
      <Box sx={{ mt: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Payment Method"
              name={paymentMethodName}
              value={paymentMethodValue || ""}
              onChange={handleChange}
              required
            >
              <MenuItem value="direct_deposit">Direct Deposit</MenuItem>
              <MenuItem value="check">Check</MenuItem>
            </TextField>
          </Grid>

          {paymentMethodValue === "direct_deposit" && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Routing Number"
                  name={routingNumberName}
                  value={routingNumberValue || ""}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name={accountNumberName}
                  value={accountNumberValue || ""}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Repeat Account Number"
                  name={accountRepeatName}
                  onChange={(e) => {
                    // Validate that repeated account number matches
                    if (e.target.value !== accountNumberValue) {
                      e.target.setCustomValidity("Account numbers don't match");
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Account Type"
                  name={accountTypeName}
                  value={accountTypeValue || ""}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="checking">Checking</MenuItem>
                  <MenuItem value="savings">Savings</MenuItem>
                </TextField>
              </Grid>
            </>
          )}

          {paymentMethodValue === "check" && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                You will need to write a physical check to this payee each pay day. The platform will calculate and withhold appropriate taxes.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Mailing Address
              </Typography>
              <AddressForm
                address={addressValue}
                onChange={(address) => handleAddressChange(address, addressType)}
                required
              />
            </Grid>
          )}
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>

      <Typography variant="body1">
        Please provide payment information for all applicable parties.
      </Typography>

      {/* Child Trust Section (if applicable) */}
      {formData.payeeType === "Employee" && (
        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.hasChildTrust || false}
                onChange={handleChange}
                name="hasChildTrust"
              />
            }
            label="This employee has a Child Trust"
          />

          {formData.hasChildTrust && (
            <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Child Trust Percentage
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Specify what percentage of wages will be deposited to the Trust's account (minimum 15%)
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={formData.childTrustPercentage ?? 15}
                  onChange={handleChildTrustPercentageChange}
                  aria-labelledby="child-trust-percentage-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks={[
                    { value: 15, label: "15%" },
                    { value: 50, label: "50%" },
                    { value: 100, label: "100%" },
                  ]}
                  min={15}
                  max={100}
                />
              </Box>
              <TextField
                fullWidth
                label="Child Trust Percentage"
                name="childTrustPercentage"
                type="number"
                value={formData.childTrustPercentage ?? 15}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                inputProps={{ min: 15, max: 100 }}
                sx={{ mt: 2 }}
              />

              {renderPaymentSection(
                "Child Trust Payment Details",
                "childTrustPaymentMethod",
                "childTrustRoutingNumber",
                "childTrustAccountNumber",
                "childTrustAccountNumberRepeat",
                "childTrustAccountType",
                "childTrust",
                formData.childTrustPaymentMethod,
                formData.childTrustRoutingNumber,
                formData.childTrustAccountNumber,
                formData.childTrustAccountType,
                formData.childTrustMailingAddress
              )}
            </Paper>
          )}
        </Box>
      )}

      {/* Agent Payment Section (if applicable) */}
      {formData.hasAgent && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Agent Payment Details
          </Typography>

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

          {formData.receivedAgentCheckAuth ? (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              All wages will be paid directly to the agency (100%).
            </Typography>
          ) : (
            renderPaymentSection(
              "Agent Payment Details",
              "agentPaymentMethod",
              "agentRoutingNumber",
              "agentAccountNumber",
              "agentAccountNumberRepeat",
              "agentAccountType",
              "agent",
              formData.agentPaymentMethod,
              formData.agentRoutingNumber,
              formData.agentAccountNumber,
              formData.agentAccountType,
              formData.agentMailingAddress
            )
          )}
        </Box>
      )}

      {/* Manager Payment Section (if applicable) */}
      {formData.hasManager && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Manager Payment Details
          </Typography>
          {renderPaymentSection(
            "Manager Payment Details",
            "managerPaymentMethod",
            "managerRoutingNumber",
            "managerAccountNumber",
            "managerAccountNumberRepeat",
            "managerAccountType",
            "manager",
            formData.managerPaymentMethod,
            formData.managerRoutingNumber,
            formData.managerAccountNumber,
            formData.managerAccountType,
            formData.managerMailingAddress
          )}
        </Box>
      )}

      {/* Employee/Loanout Payment Section (if applicable) */}
      {(formData.payeeType === "Employee" || formData.payeeType === "Loanout") &&
        (showEmployeePayment || !formData.receivedAgentCheckAuth) &&
        (!formData.hasChildTrust || !formData.childTrustPercentage || formData.childTrustPercentage < 100) && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              {formData.payeeType === "Employee" ? "Employee" : "Loanout"} Payment Details
            </Typography>
            {renderPaymentSection(
              `${formData.payeeType === "Employee" ? "Employee" : "Loanout"} Payment Details`,
              "paymentMethod",
              "routingNumber",
              "accountNumber",
              "accountNumberRepeat",
              "accountType",
              "mailing",
              formData.paymentMethod,
              formData.routingNumber,
              formData.accountNumber,
              formData.accountType,
              formData.mailingAddress
            )}
          </Box>
        )}

      {/* Vendor/Contractor Payment Section */}
      {formData.payeeType === "Vendor/Contractor" && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Vendor/Contractor Payment Details
          </Typography>
          {renderPaymentSection(
            "Vendor/Contractor Payment Details",
            "paymentMethod",
            "routingNumber",
            "accountNumber",
            "accountNumberRepeat",
            "accountType",
            "mailing",
            formData.paymentMethod,
            formData.routingNumber,
            formData.accountNumber,
            formData.accountType,
            formData.mailingAddress
          )}
        </Box>
      )}

      {/* Audit Trail Acknowledgement */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Divider />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.adminAcknowledgement || false}
              onChange={handleChange}
              name="adminAcknowledgement"
              required
            />
          }
          label="I confirm I have received this information from the party"
        />
        {formData.adminAcknowledgement && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            This acknowledgement will be recorded in the audit log with timestamp.
          </Typography>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button 
          type="button" 
          onClick={onSubmit}
          disabled={!formData.adminAcknowledgement}
        >
          Complete Onboarding
        </button>
      </Box>
    </Box>
  );
};

export default PaymentDetails;