import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";

interface CheckDetail {
  checkNumber: number;
  checkDate: string;
  recipient: string;
  amount: string;
}

const dummyCheckDetails: Record<
  string,
  { weekEnding: string; checks: CheckDetail[] }
> = {
  "PR-001": {
    weekEnding: "2025-05-24",
    checks: [
      {
        checkNumber: 1001,
        checkDate: "2025-05-25",
        recipient: "John Doe",
        amount: "$3,000",
      },
      {
        checkNumber: 1002,
        checkDate: "2025-05-25",
        recipient: "Jane Smith",
        amount: "$2,500",
      },
      {
        checkNumber: 1003,
        checkDate: "2025-05-25",
        recipient: "Tom Clark",
        amount: "$1,800",
      },
      {
        checkNumber: 1004,
        checkDate: "2025-05-25",
        recipient: "Sara Brown",
        amount: "$2,200",
      },
      {
        checkNumber: 1005,
        checkDate: "2025-05-25",
        recipient: "Mike Wilson",
        amount: "$2,500",
      },
    ],
  },
  "PR-002": {
    weekEnding: "2025-05-17",
    checks: [
      {
        checkNumber: 2001,
        checkDate: "2025-05-18",
        recipient: "Alice Johnson",
        amount: "$2,000",
      },
      {
        checkNumber: 2002,
        checkDate: "2025-05-18",
        recipient: "Bob Lee",
        amount: "$1,700",
      },
      {
        checkNumber: 2003,
        checkDate: "2025-05-18",
        recipient: "Charlie Kim",
        amount: "$1,800",
      },
    ],
  },
};

const CheckDetails: React.FC = () => {
  const { payrollId } = useParams<{ payrollId: string }>();
  const payroll = dummyCheckDetails[payrollId || ""] || {
    weekEnding: "",
    checks: [],
  };

  const totalAmount = payroll.checks.reduce((sum, check) => {
    const numeric =
      parseFloat(check.amount.replace("$", "").replace(/,/g, "")) || 0;
    return sum + numeric;
  }, 0);

  return (
    <Box p={3}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Check Details - {payrollId}
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Payroll Summary
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            mb: 1,
          }}
        >
          <Typography variant="body1">
            <b>Week Ending:</b> {payroll.weekEnding}
          </Typography>
          <Typography variant="body1">
            <b>Total Checks:</b> {payroll.checks.length}
          </Typography>
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Check Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Check Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Recipient</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payroll.checks.map((check) => (
              <TableRow
                key={check.checkNumber}
                hover
                sx={{ transition: "background 0.2s" }}
              >
                <TableCell>{check.checkNumber}</TableCell>
                <TableCell>{check.checkDate}</TableCell>
                <TableCell>{check.recipient}</TableCell>
                <TableCell>{check.amount}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  fontWeight: "bold",
                  background: "#f5f5f5",
                }}
              >
                Total
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  background: "#f5f5f5",
                  color: "#1976d2",
                }}
              >
                ${totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CheckDetails;
