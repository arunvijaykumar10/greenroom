import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import {
  mockBankAccount,
  mockCompanyInfo,
  mockPayrollSetup,
  mockSignatureConfig,
  mockUnionConfig,
} from "./mockdata";

const renderField = (label: string, value?: string | boolean) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">
      {value !== undefined && value !== "" ? String(value) : "-"}
    </Typography>
  </Grid>
);

const SendToReview: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 900, margin: "auto", p: 2 }}>
      <CardHeader title="Setup Summary" />
      <CardContent>
        {/* Company Information */}
        <Typography variant="h6" gutterBottom>
          Company Information
        </Typography>
        <Grid container spacing={2}>
          {renderField("Entity Name", mockCompanyInfo.entity_name)}
          {renderField("Entity Type", mockCompanyInfo.entity_type)}
          {renderField("FEIN", mockCompanyInfo.fein)}
          {renderField(
            "NYS Unemployment No",
            mockCompanyInfo.nys_unemployment_registration_number
          )}
          {renderField("Address Line 1", mockCompanyInfo.address_line_1)}
          {renderField("Address Line 2", mockCompanyInfo.address_line_2)}
          {renderField("City", mockCompanyInfo.city)}
          {renderField("State", mockCompanyInfo.state)}
          {renderField("Zip Code", mockCompanyInfo.zip_code)}
          {renderField("Phone", mockCompanyInfo.phone_number)}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Union Configuration */}
        <Typography variant="h6" gutterBottom>
          Union Configuration
        </Typography>
        <Grid container spacing={2}>
          {renderField(
            "Union Production",
            mockUnionConfig.isUnionProduction ? "Yes" : "No"
          )}
          {renderField("Union", mockUnionConfig.union)}
          {renderField("Agreement Type", mockUnionConfig.agreementType)}
          {renderField("Production Type", mockUnionConfig.productionType)}
          {renderField("Tier", mockUnionConfig.tier)}
          {renderField("Employer ID", mockUnionConfig.employerId)}
          {renderField("Production Title", mockUnionConfig.productionTitle)}
          {renderField("Business Rep", mockUnionConfig.businessRep)}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Bank Account */}
        <Typography variant="h6" gutterBottom>
          Bank Account
        </Typography>
        <Grid container spacing={2}>
          {renderField("Bank Name", mockBankAccount.bankName)}
          {renderField(
            "Routing Number (ACH)",
            mockBankAccount.routingNumberACH
          )}
          {renderField(
            "Routing Number (Wire)",
            mockBankAccount.routingNumberWire
          )}
          {renderField("Account Number", mockBankAccount.accountNumber)}
          {renderField("Account Type", mockBankAccount.accountType)}
          {renderField(
            "Authorized Transactions",
            mockBankAccount.isAuthorized ? "Yes" : "No"
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Signature Configuration */}
        <Typography variant="h6" gutterBottom>
          Signature Configuration
        </Typography>
        <Grid container spacing={2}>
          {renderField("Signature Policy", mockSignatureConfig.signaturePolicy)}
          {renderField("Signature 1 Type", mockSignatureConfig.signature1.type)}
          {renderField(
            "Signature 2 Type",
            mockSignatureConfig.signature2?.type || "N/A"
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Payroll Setup */}
        <Typography variant="h6" gutterBottom>
          Payroll Setup
        </Typography>
        <Grid container spacing={2}>
          {renderField("Pay Frequency", mockPayrollSetup.payFrequency)}
          {renderField("Pay Period", mockPayrollSetup.payPeriod)}
          {renderField("Schedule Start", mockPayrollSetup.payScheduleStart)}
          {renderField("Timesheet Due", mockPayrollSetup.timesheetDue)}
          {renderField("Check Number", mockPayrollSetup.checkNumber)}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SendToReview;
