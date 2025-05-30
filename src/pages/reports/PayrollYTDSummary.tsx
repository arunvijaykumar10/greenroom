import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  InputAdornment,
  TableSortLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Order, Payee, UnionReportRow } from "./types";
import { companySummary, payeesReports, unionReports } from "./data";

// Sort helper
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const PayrollYtdSummary: React.FC = () => {
  // Search and sort state for Payees list
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState<keyof Payee>("name");
  const [order, setOrder] = useState<Order>("asc");

  // Filtering example: filter payees by search term (payee name)
  const filteredPayees = useMemo(() => {
    return payeesReports.filter((payee) =>
      payee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleRequestSort = (property: keyof Payee) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPayees = stableSort(
    filteredPayees,
    getComparator(order, orderBy)
  );

  // Union Report search and sort state
  const [unionSearch, setUnionSearch] = useState("");
  const [unionOrderBy, _setUnionOrderBy] = useState<keyof UnionReportRow>("payrollId");
  const [unionOrder, _setUnionOrder] = useState<Order>("asc");

  const filteredUnionReports = useMemo(() => {
    const search = unionSearch.toLowerCase();
    return unionReports.filter((row) =>
      row.unionsPaid.some(union => union.toLowerCase().includes(search))
        || row.payrollId.toLowerCase().includes(search)
        || row.weekEnding.toLowerCase().includes(search)
        || (row.checkDate ? row.checkDate.toLowerCase().includes(search) : false)
    );
  }, [unionSearch]);

  const sortedUnionReports = stableSort(
    filteredUnionReports,
    getComparator(unionOrder, unionOrderBy)
  );

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      {/* Company Summary */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#1976d2" }}
      >
        Company Payroll YTD Summary
      </Typography>
      <Paper sx={{ p: 3, mb: 5, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Company Info
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer sx={{ borderRadius: 2, boxShadow: 1, mb: 2 }}>
          <Table size="small" aria-label="company summary table">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: 220 }}>
                  Entity Name
                </TableCell>
                <TableCell>{companySummary.header.entityName}</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: 220 }}>
                  Production Name
                </TableCell>
                <TableCell>{companySummary.header.productionName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>EIN</TableCell>
                <TableCell>{companySummary.header.EIN}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  First Payroll Date
                </TableCell>
                <TableCell>{companySummary.header.firstPayrollDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Employees Wages
                </TableCell>
                <TableCell>
                  ${companySummary.totalWages.employees.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Loan Outs Wages
                </TableCell>
                <TableCell>
                  ${companySummary.totalWages.loanOuts.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Vendors/Contractors Wages
                </TableCell>
                <TableCell>
                  ${companySummary.totalWages.vendors.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Wages</TableCell>
                <TableCell>
                  $
                  {(
                    companySummary.totalWages.employees +
                    companySummary.totalWages.loanOuts +
                    companySummary.totalWages.vendors
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>FICA</TableCell>
                <TableCell>
                  ${companySummary.employeeFees.fica.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Medicare</TableCell>
                <TableCell>
                  ${companySummary.employeeFees.medicare.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>FUTA</TableCell>
                <TableCell>
                  ${companySummary.employeeFees.futa.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>SUTA</TableCell>
                <TableCell>
                  ${companySummary.employeeFees.suta.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>NYC MCTMT</TableCell>
                <TableCell>
                  ${companySummary.employeeFees.nycMCTMT.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total Employee Fees
                </TableCell>
                <TableCell>
                  $
                  {(
                    companySummary.employeeFees.fica +
                    companySummary.employeeFees.medicare +
                    companySummary.employeeFees.futa +
                    companySummary.employeeFees.suta +
                    companySummary.employeeFees.nycMCTMT
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Union Benefits
                </TableCell>
                <TableCell colSpan={3}>
                  {Object.entries(companySummary.unionBenefits).map(
                    ([union, amount]) => (
                      <span key={union} style={{ marginRight: 24 }}>
                        {union}: <b>${amount.toLocaleString()}</b>
                      </span>
                    )
                  )}
                  <span style={{ marginLeft: 16, fontWeight: 600 }}>
                    Total:{" "}
                    <b>
                      $
                      {Object.values(companySummary.unionBenefits)
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString()}
                    </b>
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Miscellaneous</TableCell>
                <TableCell colSpan={3}>
                  Kit/Box Fee:{" "}
                  <b>
                    ${companySummary.miscellaneous.kitBoxFee.toLocaleString()}
                  </b>{" "}
                  &nbsp;| Reimbursement:{" "}
                  <b>
                    $
                    {companySummary.miscellaneous.reimbursement.toLocaleString()}
                  </b>{" "}
                  &nbsp;| Per Diem:{" "}
                  <b>
                    ${companySummary.miscellaneous.perDiem.toLocaleString()}
                  </b>{" "}
                  &nbsp;| Wellness:{" "}
                  <b>
                    ${companySummary.miscellaneous.wellness.toLocaleString()}
                  </b>
                  <span style={{ marginLeft: 16, fontWeight: 600 }}>
                    Total:{" "}
                    <b>
                      $
                      {(
                        companySummary.miscellaneous.kitBoxFee +
                        companySummary.miscellaneous.reimbursement +
                        companySummary.miscellaneous.perDiem +
                        companySummary.miscellaneous.wellness
                      ).toLocaleString()}
                    </b>
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Handling Fees</TableCell>
                <TableCell colSpan={3}>
                  Greenroom Fees:{" "}
                  <b>
                    $
                    {companySummary.handlingFees.greenroomFees.toLocaleString()}
                  </b>{" "}
                  &nbsp;| Postage:{" "}
                  <b>${companySummary.handlingFees.postage.toLocaleString()}</b>
                  <span style={{ marginLeft: 16, fontWeight: 600 }}>
                    Total:{" "}
                    <b>
                      $
                      {(
                        companySummary.handlingFees.greenroomFees +
                        companySummary.handlingFees.postage
                      ).toLocaleString()}
                    </b>
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Payee Report */}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#1976d2" }}
      >
        Payee Report
      </Typography>
      <Paper sx={{ p: 3, mb: 5, borderRadius: 3, boxShadow: 2 }}>
        <TextField
          fullWidth
          label="Search Payee Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <TableContainer sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table size="small" aria-label="payee table">
            <TableHead sx={{ background: "#e3f2fd" }}>
              <TableRow>
                <TableCell
                  sortDirection={orderBy === "name" ? order : false}
                  sx={{ fontWeight: "bold" }}
                >
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    Payee Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>SSN</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Work Dates</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Union</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Work State</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Residential State
                </TableCell>
                <TableCell
                  sortDirection={orderBy === "wages" ? order : false}
                  sx={{ fontWeight: "bold" }}
                >
                  <TableSortLabel
                    active={orderBy === "wages"}
                    direction={orderBy === "wages" ? order : "asc"}
                    onClick={() => handleRequestSort("wages")}
                  >
                    Wages
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Reimbursements
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Allowances</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Greenroom Fee</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={13}
                  sx={{
                    background: "#f8f8f8",
                    fontWeight: 600,
                    color: "#1976d2",
                    textAlign: "center",
                  }}
                >
                  Employee Deductions & Employer Fringe (see details in payee
                  details page)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPayees.map((payee) => (
                <TableRow
                  key={payee.id}
                  hover
                  sx={{ transition: "background 0.2s" }}
                >
                  <TableCell>{payee.name}</TableCell>
                  <TableCell>{payee.ssn}</TableCell>
                  <TableCell>{payee.workDates}</TableCell>
                  <TableCell>{payee.type}</TableCell>
                  <TableCell>{payee.union}</TableCell>
                  <TableCell>{payee.jobTitle}</TableCell>
                  <TableCell>{payee.department}</TableCell>
                  <TableCell>{payee.workState}</TableCell>
                  <TableCell>{payee.residentialState}</TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: 500 }}>
                    ${payee.wages.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    ${payee.reimbursements.toLocaleString()}
                  </TableCell>
                  <TableCell>${payee.allowances.toLocaleString()}</TableCell>
                  <TableCell>${payee.greenroomFee.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Union Report */}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#1976d2" }}
      >
        Union Report
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
        <TextField
          fullWidth
          label="Search Union Name"
          value={unionSearch}
          onChange={(e) => setUnionSearch(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <TableContainer sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table size="small" aria-label="union report table">
            <TableHead sx={{ background: "#e3f2fd" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Week Ending</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Check Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Unions Paid</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Payroll ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUnionReports.map((row, idx) => (
                <TableRow key={row.payrollId || idx} hover sx={{ transition: "background 0.2s" }}>
                  <TableCell>{row.weekEnding}</TableCell>
                  <TableCell>{row.checkDate || '-'}</TableCell>
                  <TableCell>{row.unionsPaid?.join(', ')}</TableCell>
                  <TableCell>{row.payrollId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PayrollYtdSummary;
