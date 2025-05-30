import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Divider,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

interface DblPflRecord {
  employeeName: string;
  gender: "Female" | "Non-Female";
  wages: number;
  dblAmount: number;
  pflAmount: number;
}

const dummyData: DblPflRecord[] = [
  {
    employeeName: "Jane Doe",
    gender: "Female",
    wages: 4000,
    dblAmount: 20,
    pflAmount: 35,
  },
  {
    employeeName: "Emily Smith",
    gender: "Female",
    wages: 4500,
    dblAmount: 25,
    pflAmount: 40,
  },
  {
    employeeName: "John Carter",
    gender: "Non-Female",
    wages: 4700,
    dblAmount: 22,
    pflAmount: 37,
  },
  {
    employeeName: "Alex Johnson",
    gender: "Non-Female",
    wages: 5000,
    dblAmount: 24,
    pflAmount: 39,
  },
];

const groupTotals = dummyData.reduce(
  (totals, record) => {
    if (record.gender === "Female") {
      totals.female.wages += record.wages;
      totals.female.dbl += record.dblAmount;
      totals.female.pfl += record.pflAmount;
    } else {
      totals.nonFemale.wages += record.wages;
      totals.nonFemale.dbl += record.dblAmount;
      totals.nonFemale.pfl += record.pflAmount;
    }
    return totals;
  },
  {
    female: { wages: 0, dbl: 0, pfl: 0 },
    nonFemale: { wages: 0, dbl: 0, pfl: 0 },
  }
);

const NewYorkDblPflReport: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", py: 6, px: 1 }}>
      <Paper
        elevation={4}
        sx={{ borderRadius: 4, p: { xs: 2, sm: 4 }, boxShadow: 6, mb: 4 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AssignmentTurnedInIcon
            color="primary"
            sx={{ fontSize: 38, mr: 2 }}
          />
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            New York DBL / PFL Report
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "primary.main", mb: 1 }}
        >
          Group Totals by Gender
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" gap={4}>
          <Paper
            elevation={1}
            sx={{ p: 2, borderRadius: 2, minWidth: 200, bgcolor: "#f8fafc" }}
          >
            <Typography variant="body1" fontWeight={700} color="secondary.main">
              Female
            </Typography>
            <Typography variant="body2">
              Total Wages: <b>${groupTotals.female.wages.toLocaleString()}</b>
            </Typography>
            <Typography variant="body2">
              DBL Paid: <b>${groupTotals.female.dbl.toLocaleString()}</b>
            </Typography>
            <Typography variant="body2">
              PFL Paid: <b>${groupTotals.female.pfl.toLocaleString()}</b>
            </Typography>
          </Paper>
          <Paper
            elevation={1}
            sx={{ p: 2, borderRadius: 2, minWidth: 200, bgcolor: "#f8fafc" }}
          >
            <Typography variant="body1" fontWeight={700} color="secondary.main">
              Non-Female
            </Typography>
            <Typography variant="body2">
              Total Wages:{" "}
              <b>${groupTotals.nonFemale.wages.toLocaleString()}</b>
            </Typography>
            <Typography variant="body2">
              DBL Paid: <b>${groupTotals.nonFemale.dbl.toLocaleString()}</b>
            </Typography>
            <Typography variant="body2">
              PFL Paid: <b>${groupTotals.nonFemale.pfl.toLocaleString()}</b>
            </Typography>
          </Paper>
        </Box>
      </Paper>
      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.light" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Employee Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Wages</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>DBL Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>PFL Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((record, index) => {
              return (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    transition: "background 0.2s",
                    "&:hover": { backgroundColor: blueGrey[100] },
                  }}
                >
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.gender}</TableCell>
                  <TableCell>${record.wages.toLocaleString()}</TableCell>
                  <TableCell>${record.dblAmount.toFixed(2)}</TableCell>
                  <TableCell>${record.pflAmount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NewYorkDblPflReport;
