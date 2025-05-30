import React, { useState } from "react";
import {
  Box,
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
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { mockUnionReports } from "./data";
import { UnionReport, ReportPayee as Payee } from "./types";

const unionOptions = [
  ...Array.from(new Set(mockUnionReports.map((r) => r.toEntity.unionName))),
];

const UnionReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<UnionReport | null>(
    null
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");

  // Filter reports by date and union
  const filteredReports = mockUnionReports.filter((report) => {
    const pwDate = new Date(report.payrollWeekEnding);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;
    const unionMatch = selectedUnion
      ? report.toEntity.unionName === selectedUnion
      : true;
    const dateMatch = (!from || pwDate >= from) && (!to || pwDate <= to);
    return unionMatch && dateMatch;
  });

  // Group payees by role
  function groupPayees(payees: Payee[]) {
    const groups: { [role: string]: Payee[] } = {};
    payees.forEach((p) => {
      if (!groups[p.role]) groups[p.role] = [];
      groups[p.role].push(p);
    });
    return groups;
  }

  // Calculate totals for columns
  function getTotals(payees: Payee[]) {
    return {
      salary: payees.reduce((a, b) => a + b.salary, 0),
      adjustments: payees.reduce((a, b) => a + b.adjustments, 0),
      grossSalary: payees.reduce((a, b) => a + b.grossSalary, 0),
      pensionableSalary: payees.reduce((a, b) => a + b.pensionableSalary, 0),
      dues: payees.reduce((a, b) => a + b.dues, 0),
      health: payees.reduce((a, b) => a + b.health, 0),
      pension: payees.reduce((a, b) => a + b.pension, 0),
      k401Employer: payees.reduce((a, b) => a + b.k401Employer, 0),
      k401: payees.reduce((a, b) => a + b.k401, 0),
      participantDeferral: payees.reduce(
        (a, b) => a + b.participantDeferral,
        0
      ),
      k401Voluntary: payees.reduce((a, b) => a + b.k401Voluntary, 0),
    };
  }

  return (
    <Box p={2}>
      {!selectedReport && (
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: 700 }}
        >
          Union Reports
        </Typography>
      )}
      {/* Filter Section */}
      {!selectedReport && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            bgcolor: "#fafdff",
            boxShadow: 1,
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Date From"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              sx={{ minWidth: 160 }}
            />
            <TextField
              label="Date To"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              sx={{ minWidth: 160 }}
            />
            <TextField
              select
              label="Union"
              size="small"
              value={selectedUnion}
              onChange={(e) => setSelectedUnion(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Unions</MenuItem>
              {unionOptions.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Paper>
      )}
      {/* List or Details */}
      {!selectedReport ? (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Table size="small" sx={{ minWidth: 600 }}>
            <TableHead sx={{ background: "#e3f2fd" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Union</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Payroll Week Ending
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Agreement Number</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Employer ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} hover sx={{ cursor: "pointer" }}>
                  <TableCell>{report.toEntity.unionName}</TableCell>
                  <TableCell>{report.payrollWeekEnding}</TableCell>
                  <TableCell>{report.agreementNumber}</TableCell>
                  <TableCell>{report.employerId}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setSelectedReport(report)}
                      sx={{
                        borderRadius: 2,
                        bgcolor: "#1976d2",
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      See Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2, flexWrap: "wrap", gap: 2 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "#1565c0",
                fontWeight: 700,
                mb: 0,
                flex: 1,
                minWidth: 200,
              }}
            >
              Report for {selectedReport.toEntity.unionName}
            </Typography>
            <Button
              onClick={() => setSelectedReport(null)}
              variant="contained"
              sx={{
                borderRadius: 2,
                bgcolor: "#1976d2",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
                minWidth: 160,
              }}
            >
              Back to Reports
            </Button>
          </Stack>
          <Paper
            sx={{
              p: { xs: 1, sm: 2, md: 3 },
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
          {/* Payees by Role */}
          {Object.entries(groupPayees(selectedReport.payees)).map(
            ([role, payees]) => (
              <Box key={role} mb={3}>
                <Typography
                  variant="h6"
                  sx={{ color: "#1976d2", fontWeight: 600, mb: 1 }}
                >
                  {role}
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 2,
                    mb: 2,
                    width: "100%",
                    overflowX: "auto",
                  }}
                >
                  <Table size="small" sx={{ minWidth: 800 }}>
                    <TableHead sx={{ background: "#e3f2fd" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>AEA Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>SSN</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Salary</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Adjustments
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Gross</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Pensionable
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Dues (2.5%)
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Health ($150)
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Pension (6%)
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          401K Emp (1%)
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          401K (3%)
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Deferral</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          401K Vol (1%)
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payees.map((payee, idx) => (
                        <TableRow
                          key={idx}
                          hover
                          sx={{ transition: "background 0.2s" }}
                        >
                          <TableCell>{payee.name}</TableCell>
                          <TableCell>{payee.ssn}</TableCell>
                          <TableCell>
                            ${payee.salary.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            ${payee.adjustments.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            ${payee.grossSalary.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            ${payee.pensionableSalary.toLocaleString()}
                          </TableCell>
                          <TableCell>${payee.dues.toLocaleString()}</TableCell>
                          <TableCell>
                            ${payee.health.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            ${payee.pension.toLocaleString()}
                          </TableCell>
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
                      {/* Subtotals */}
                      <TableRow sx={{ background: "#f1f8e9" }}>
                        <TableCell sx={{ fontWeight: 700 }}>Subtotal</TableCell>
                        <TableCell />
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).salary.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).adjustments.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).grossSalary.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          $
                          {getTotals(payees).pensionableSalary.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).dues.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).health.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).pension.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).k401Employer.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).k401.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          $
                          {getTotals(
                            payees
                          ).participantDeferral.toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          ${getTotals(payees).k401Voluntary.toLocaleString()}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )
          )}
          {/* Grand Totals */}
          <Paper
            sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: 3,
              bgcolor: "#e3fcec",
              boxShadow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#218838", fontWeight: 700, mb: 1 }}
            >
              Grand Totals
            </Typography>
            {(() => {
              const allPayees = selectedReport.payees;
              const totals = getTotals(allPayees);
              return (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <b>Salary:</b> ${totals.salary.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>Adjustments:</b> ${totals.adjustments.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>Gross Salary:</b> $
                      {totals.grossSalary.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>Pensionable Salary:</b> $
                      {totals.pensionableSalary.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <b>Dues:</b> ${totals.dues.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>Health:</b> ${totals.health.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>Pension:</b> ${totals.pension.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>401K Emp:</b> ${totals.k401Employer.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>401K:</b> ${totals.k401.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>Deferral:</b> $
                      {totals.participantDeferral.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>401K Vol:</b> ${totals.k401Voluntary.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })()}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default UnionReports;
