import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  Grid,
} from "@mui/material";

interface Payee {
  role: string;
  name: string;
  ssn: string;
  salary: number;
  adjustments: number;
  grossSalary: number;
  pensionableSalary: number;
  dues: number;
  health: number;
  pension: number;
  k401Employer: number;
  k401: number;
  participantDeferral: number;
  k401Voluntary: number;
  notes: string;
}

interface UnionReport {
  id: string;
  fromEntity: {
    companyName: string;
    address: string;
    ein: string;
    managerName: string;
    phone: string;
    email: string;
  };
  toEntity: {
    unionName: string;
    address: string;
  };
  workWeekEnding: string;
  payrollWeekEnding: string;
  agreementNumber: string;
  employerId: string;
  payees: Payee[];
}

const mockUnionReports: UnionReport[] = [
  {
    id: "UR001",
    fromEntity: {
      companyName: "Broadway Theater Co.",
      address: "123 Main St, New York, NY 10001",
      ein: "12-3456789",
      managerName: "Alice Cooper",
      phone: "555-123-4567",
      email: "alice@broadwayco.com",
    },
    toEntity: {
      unionName: "Actors Union AEA",
      address: "456 Stage Ln, New York, NY 10003",
    },
    workWeekEnding: "2024-06-01",
    payrollWeekEnding: "2024-06-07",
    agreementNumber: "AGR-0001",
    employerId: "EMP-98765",
    payees: [
      {
        role: "Principals",
        name: "John Performer",
        ssn: "XXX-XX-1234",
        salary: 2000,
        adjustments: 100,
        grossSalary: 2100,
        pensionableSalary: 2000,
        dues: 52.5,
        health: 150,
        pension: 120,
        k401Employer: 20,
        k401: 60,
        participantDeferral: 80,
        k401Voluntary: 20,
        notes: "On time",
      },
      {
        role: "Stage Managers",
        name: "Sarah Stage",
        ssn: "XXX-XX-5678",
        salary: 1800,
        adjustments: 80,
        grossSalary: 1880,
        pensionableSalary: 1800,
        dues: 47,
        health: 150,
        pension: 108,
        k401Employer: 18,
        k401: 54,
        participantDeferral: 70,
        k401Voluntary: 15,
        notes: "Late adjustment",
      },
    ],
  },
  {
    id: "UR002",
    fromEntity: {
      companyName: "Film Production Inc.",
      address: "789 Cinema Blvd, Los Angeles, CA 90001",
      ein: "98-7654321",
      managerName: "Bob Director",
      phone: "555-987-6543",
      email: "ur002file@gmail.com",
    },
    toEntity: {
      unionName: "Actors Union AEA",
      address: "456 Stage Ln, New York, NY 10003",
    },
    workWeekEnding: "2024-06-01",
    payrollWeekEnding: "2024-06-07",
    agreementNumber: "AGR-0002",
    employerId: "XXXXXXXXX",
    payees: [
      {
        role: "Principals",
        name: "John Performer",
        ssn: "XXX-XX-1234",
        salary: 2000,
        adjustments: 100,
        grossSalary: 2100,
        pensionableSalary: 2000,
        dues: 52.5,
        health: 150,
        pension: 120,
        k401Employer: 20,
        k401: 60,
        participantDeferral: 80,
        k401Voluntary: 20,
        notes: "On time",
      },
      {
        role: "Stage Managers",
        name: "Sarah Stage",
        ssn: "XXX-XX-5678",
        salary: 1800,
        adjustments: 80,
        grossSalary: 1880,
        pensionableSalary: 1800,
        dues: 47,
        health: 150,
        pension: 108,
        k401Employer: 18,
        k401: 54,
        participantDeferral: 70,
        k401Voluntary: 15,
        notes: "Late adjustment",
      },
    ],
  },
];

const UnionReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<UnionReport | null>(
    null
  );

  return (
    <Box p={2}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: 700 }}
      >
        Union Reports
      </Typography>
      {!selectedReport ? (
        <Grid container spacing={2}>
          {mockUnionReports.map((report) => (
            <Grid item xs={12} md={6} key={report.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  bgcolor: "#f5faff",
                  mb: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#1565c0", fontWeight: 600 }}
                  >
                    {report.toEntity.unionName}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1 }}>
                    Payroll Week Ending: <b>{report.payrollWeekEnding}</b>
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 2 }}>
                    Agreement Number: <b>{report.agreementNumber}</b>
                  </Typography>
                  <Button
                    onClick={() => setSelectedReport(report)}
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      bgcolor: "#1976d2",
                      "&:hover": {
                        bgcolor: "#1565c0",
                      },
                    }}
                  >
                    View Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Button
            onClick={() => setSelectedReport(null)}
            variant="contained"
            sx={{
              mb: 2,
              borderRadius: 2,
              bgcolor: "#1976d2",
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            Back to Reports
          </Button>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#1565c0", fontWeight: 700 }}
          >
            Report for {selectedReport.toEntity.unionName}
          </Typography>
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              bgcolor: "#fafdff",
              boxShadow: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>From:</strong> {selectedReport.fromEntity.companyName}
                  ,{selectedReport.fromEntity.address}
                </Typography>
                <Typography>
                  <strong>Manager:</strong>{" "}
                  {selectedReport.fromEntity.managerName}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedReport.fromEntity.email}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {selectedReport.fromEntity.phone}
                </Typography>
                <Typography>
                  <strong>EIN:</strong> {selectedReport.fromEntity.ein}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>To:</strong> {selectedReport.toEntity.unionName},
                  {selectedReport.toEntity.address}
                </Typography>
                <Typography>
                  <strong>Employer ID:</strong> {selectedReport.employerId}
                </Typography>
                <Typography>
                  <strong>Agreement Number:</strong>{" "}
                  {selectedReport.agreementNumber}
                </Typography>
                <Typography>
                  <strong>Work Week Ending:</strong>{" "}
                  {selectedReport.workWeekEnding}
                </Typography>
                <Typography>
                  <strong>Payroll Week Ending:</strong>{" "}
                  {selectedReport.payrollWeekEnding}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Divider sx={{ my: 2 }} />
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 3, boxShadow: 2 }}
          >
            <Table size="small">
              <TableHead sx={{ background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>AEA Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>SSN</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Salary</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Adjustments</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Gross</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Pensionable</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Dues (2.5%)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Health ($150)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Pension (6%)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>401K Emp (1%)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>401K (3%)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Deferral</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>401K Vol (1%)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedReport.payees.map((payee, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{ transition: "background 0.2s" }}
                  >
                    <TableCell>{payee.role}</TableCell>
                    <TableCell>{payee.name}</TableCell>
                    <TableCell>{payee.ssn}</TableCell>
                    <TableCell>${payee.salary.toLocaleString()}</TableCell>
                    <TableCell>${payee.adjustments.toLocaleString()}</TableCell>
                    <TableCell>${payee.grossSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      ${payee.pensionableSalary.toLocaleString()}
                    </TableCell>
                    <TableCell>${payee.dues.toLocaleString()}</TableCell>
                    <TableCell>${payee.health.toLocaleString()}</TableCell>
                    <TableCell>${payee.pension.toLocaleString()}</TableCell>
                    <TableCell>
                      ${payee.k401Employer.toLocaleString()}
                    </TableCell>
                    <TableCell>${payee.k401.toLocaleString()}</TableCell>
                    <TableCell>
                      ${payee.participantDeferral.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      ${payee.k401Voluntary.toLocaleString()}
                    </TableCell>
                    <TableCell>{payee.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default UnionReports;
