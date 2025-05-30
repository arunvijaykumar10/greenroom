import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CheckRegisterRow {
  payrollId: string;
  weekEnding: string;
  numberOfChecks: number;
  checkRange: string;
  amount: string;
}

const dummyData: CheckRegisterRow[] = [
  {
    payrollId: "PR-001",
    weekEnding: "2025-05-24",
    numberOfChecks: 5,
    checkRange: "1001 - 1005",
    amount: "$12,000",
  },
  {
    payrollId: "PR-002",
    weekEnding: "2025-05-17",
    numberOfChecks: 3,
    checkRange: "2001- 2003",
    amount: "$7,500",
  },
];

const CheckRegister: React.FC = () => {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    checkFrom: "",
    checkTo: "",
  });
  const [filteredData, setFilteredData] = useState(dummyData);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    let filtered = dummyData;
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (row) => new Date(row.weekEnding) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (row) => new Date(row.weekEnding) <= new Date(filters.dateTo)
      );
    }
    if (filters.checkFrom) {
      const from = parseInt(filters.checkFrom, 10);
      filtered = filtered.filter((row) => {
        const [start] = row.checkRange
          .split("-")
          .map((s) => parseInt(s.trim(), 10));
        return start >= from;
      });
    }
    if (filters.checkTo) {
      const to = parseInt(filters.checkTo, 10);
      filtered = filtered.filter((row) => {
        const [, end] = row.checkRange
          .split("-")
          .map((s) => parseInt(s.trim(), 10));
        return end <= to;
      });
    }
    setFilteredData(filtered);
  };

  const handleRowClick = (payrollId: string) => {
    navigate(`/reports/check-register/${payrollId}`);
  };

  return (
    <Box p={3} sx={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Check Register
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Filters
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <TextField
            label="Date From"
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Date To"
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Check Number From"
            name="checkFrom"
            type="number"
            value={filters.checkFrom}
            onChange={handleInputChange}
          />
          <TextField
            label="Check Number To"
            name="checkTo"
            type="number"
            value={filters.checkTo}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Payroll ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Week Ending</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. of Checks</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Check Range</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.payrollId}
                hover
                onClick={() => handleRowClick(row.payrollId)}
                sx={{ cursor: "pointer", transition: "background 0.2s" }}
              >
                <TableCell>{row.payrollId}</TableCell>
                <TableCell>{row.weekEnding}</TableCell>
                <TableCell>{row.numberOfChecks}</TableCell>
                <TableCell>{row.checkRange}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CheckRegister;
