import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { mockPayrolls } from "./data";
import { Payroll } from "./types";

const PayrollRegisterReport: React.FC = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredPayrolls, setFilteredPayrolls] =
    useState<Payroll[]>(mockPayrolls);
  const [selectedPayroll, setSelectedPayroll] = useState<any | null>(null);

  const handleFilter = () => {
    if (!dateFrom && !dateTo) {
      setFilteredPayrolls(mockPayrolls);
      setSelectedPayroll(null);
      return;
    }
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;
    const filtered = mockPayrolls.filter((p) => {
      const payDate = new Date(p.payDate);
      if (from && to) return payDate >= from && payDate <= to;
      if (from) return payDate >= from;
      if (to) return payDate <= to;
      return true;
    });
    setFilteredPayrolls(filtered);
    setSelectedPayroll(filtered[0] || null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" color="primary" gutterBottom>
        Payroll Register Report
      </Typography>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Filter by Date</Typography>
          <Box display="flex" gap={2} mt={2}>
            <TextField
              label="Date From"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <TextField
              label="Date To"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
            <Button variant="contained" onClick={handleFilter}>
              Apply
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payroll ID</TableCell>
              <TableCell>Pay Period</TableCell>
              <TableCell>Pay Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayrolls.map((p) => (
              <TableRow
                key={p.id}
                hover
                selected={selectedPayroll?.id === p.id}
              >
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.payPeriod}</TableCell>
                <TableCell>{p.payDate}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => setSelectedPayroll(p)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPayroll && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Payroll Details
          </Typography>
          <Typography>Pay Period: {selectedPayroll.payPeriod}</Typography>
          <Typography>Pay Date: {selectedPayroll.payDate}</Typography>

          <Typography mt={3} variant="subtitle1">
            Employees
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Increments</TableCell>
                  <TableCell>Reimbursements</TableCell>
                  <TableCell>Allowances</TableCell>
                  <TableCell>Gross</TableCell>
                  <TableCell>Deductions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPayroll.employees.map((emp: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.rate}</TableCell>
                    <TableCell>{emp.increments}</TableCell>
                    <TableCell>{emp.reimbursements}</TableCell>
                    <TableCell>{emp.allowances ?? "-"}</TableCell>
                    <TableCell>{emp.gross}</TableCell>
                    <TableCell>{emp.deductions ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography mt={3} variant="subtitle1">
            Vendors / Contractors
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Increments</TableCell>
                  <TableCell>Reimbursements</TableCell>
                  <TableCell>Gross</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPayroll.vendors.map((vendor: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.rate}</TableCell>
                    <TableCell>{vendor.increments}</TableCell>
                    <TableCell>{vendor.reimbursements}</TableCell>
                    <TableCell>{vendor.gross}</TableCell>
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

export default PayrollRegisterReport;
