import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Grid,
  Divider,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Settings: React.FC = () => {
  const [editSection, setEditSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    legalFirstName: "Jane",
    legalLastName: "Smith",
    gender: "Male",
    ssn: "123-45-6789",
    dob: "1990-01-01",
    email: "john.doe@example.com",
    streetAddress: "456 Theater Rd",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    unionMember: false,
    union: "Actor's Equity Association",
    jobTitle: "Actor",
    roleName: "Lead",
    department: "Cast",
    jobStartDate: "2024-06-01",
    jobEndDate: "------",
    payAmount: "$ 2638",
    payPeriod: "Week",
    costCode: "ACT001",
    earningCode: "Salary Performance",
    agentEmail: "agent@example.com",
    hasAgent: true,
    agentFeeRehearsal: "10",
    agentFeePerformance: "15",
    managerEmail: "manager@example.com",
    hasManager: true,
    managerFeeRehearsal: "5",
    managerFeePerformance: "10",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Section saved:", editSection, formData);
    setEditSection(null);
  };

  const renderField = (label: string, name: string, value: string) =>
    editSection ? (
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        name={name}
        value={formData[name as keyof typeof formData] || ""}
        onChange={handleChange}
      />
    ) : (
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    );

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage your employee information, union status, employment terms, and
        representatives.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Section: Employee Info */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Employee Info</Typography>
          <IconButton
            onClick={() =>
              setEditSection(editSection === "employee" ? null : "employee")
            }
          >
            {" "}
            <EditIcon />{" "}
          </IconButton>
        </Box>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={6}>
            {renderField(
              "Legal First Name",
              "legalFirstName",
              formData.legalFirstName
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField(
              "Legal Last Name",
              "legalLastName",
              formData.legalLastName
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField("Gender", "gender", formData.gender)}
          </Grid>
          <Grid item xs={6}>
            {renderField("SSN", "ssn", formData.ssn)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Date of Birth", "dob", formData.dob)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Email", "email", formData.email)}
          </Grid>
          <Grid item xs={6}>
            {renderField(
              "Street Address",
              "streetAddress",
              formData.streetAddress
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField("City", "city", formData.city)}
          </Grid>
          <Grid item xs={6}>
            {renderField("State", "state", formData.state)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Zip Code", "zipCode", formData.zipCode)}
          </Grid>
        </Grid>
        {editSection === "employee" && (
          <Box textAlign="right" mt={2}>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        )}
      </Box>

      {/* Section: Union Participation */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Union Participation</Typography>
          <IconButton
            onClick={() =>
              setEditSection(editSection === "union" ? null : "union")
            }
          >
            {" "}
            <EditIcon />{" "}
          </IconButton>
        </Box>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={6}>
            {renderField("Union", "union", formData.union)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Job Title", "jobTitle", formData.jobTitle)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Role Name", "roleName", formData.roleName)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Department", "department", formData.department)}
          </Grid>
        </Grid>
        {editSection === "union" && (
          <Box textAlign="right" mt={2}>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        )}
      </Box>

      {/* Section: Employment */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Employment</Typography>
          <IconButton
            onClick={() =>
              setEditSection(editSection === "employment" ? null : "employment")
            }
          >
            {" "}
            <EditIcon />{" "}
          </IconButton>
        </Box>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={6}>
            {renderField(
              "Job Start Date",
              "jobStartDate",
              formData.jobStartDate
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField("Job End Date", "jobEndDate", formData.jobEndDate)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Pay Amount", "payAmount", formData.payAmount)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Pay Period", "payPeriod", formData.payPeriod)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Cost Code", "costCode", formData.costCode)}
          </Grid>
          <Grid item xs={6}>
            {renderField("Earning Code", "earningCode", formData.earningCode)}
          </Grid>
        </Grid>
        {editSection === "employment" && (
          <Box textAlign="right" mt={2}>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        )}
      </Box>

      {/* Section: Representatives */}
      <Divider sx={{ my: 3 }} />
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Representatives</Typography>
          <IconButton
            onClick={() =>
              setEditSection(editSection === "reps" ? null : "reps")
            }
          >
            {" "}
            <EditIcon />{" "}
          </IconButton>
        </Box>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={6}>
            {renderField("Agent Email", "agentEmail", formData.agentEmail)}
          </Grid>
          <Grid item xs={6}>
            {renderField(
              "Agent Fee Rehearsal %",
              "agentFeeRehearsal",
              formData.agentFeeRehearsal
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField(
              "Agent Fee Performance %",
              "agentFeePerformance",
              formData.agentFeePerformance
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField(
              "Manager Email",
              "managerEmail",
              formData.managerEmail
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField(
              "Manager Fee Rehearsal %",
              "managerFeeRehearsal",
              formData.managerFeeRehearsal
            )}
          </Grid>
          <Grid item xs={6}>
            {renderField(
              "Manager Fee Performance %",
              "managerFeePerformance",
              formData.managerFeePerformance
            )}
          </Grid>
        </Grid>
        {editSection === "reps" && (
          <Box textAlign="right" mt={2}>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Settings;
