import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
} from "@mui/material";

interface TaxReport {
  id: string;
  filingDate: string;
  type: "Federal" | "NY" | "NJ" | "CT" | "PA";
  period: string;
  form: string;
}

const mockTaxReports: TaxReport[] = [
  {
    id: "TR001",
    filingDate: "2024-04-15",
    type: "Federal",
    period: "Q1 2024",
    form: "Form 941",
  },
  {
    id: "TR002",
    filingDate: "2024-01-31",
    type: "NY",
    period: "Year 2023",
    form: "Form NYS-45",
  },
  {
    id: "TR003",
    filingDate: "2024-07-10",
    type: "PA",
    period: "Q2 2024",
    form: "Form REV-1667",
  },
];

const typeOptions = ["All", "Federal", "NY", "NJ", "CT", "PA"];
const periodOptions = ["All", "Quarterly", "Yearly"];

const TaxReportsPage: React.FC = () => {
  const [yearFrom, setYearFrom] = useState("2023");
  const [yearTo, setYearTo] = useState("2024");
  const [type, setType] = useState("All");
  const [period, setPeriod] = useState("All");

  const filteredReports = mockTaxReports.filter((report) => {
    const reportYear = parseInt(report.period.match(/\d{4}/)?.[0] || "0", 10);
    const matchesType = type === "All" || report.type === type;
    const matchesPeriod =
      period === "All" ||
      (period === "Quarterly" && report.period.includes("Q")) ||
      (period === "Yearly" && report.period.toLowerCase().includes("year"));
    return (
      reportYear >= parseInt(yearFrom) &&
      reportYear <= parseInt(yearTo) &&
      matchesType &&
      matchesPeriod
    );
  });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", fontWeight: 700 }}>
        Company Tax Reports
      </Typography>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: 2, bgcolor: "#f5faff" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField
              label="Year From"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Year To"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              select
              fullWidth
            >
              {typeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              select
              fullWidth
            >
              {periodOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Table size="small">
          <TableHead sx={{ background: "#e3f2fd" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Filing Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Period</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Form</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id} hover sx={{ transition: "background 0.2s" }}>
                <TableCell>{report.filingDate}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.period}</TableCell>
                <TableCell>{report.form}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: 2, bgcolor: "#1976d2", color: "#fff" }}
                  >
                    View Form
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredReports.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No reports found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaxReportsPage;
