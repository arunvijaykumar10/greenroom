import { Typography, Stack, Button, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import PayrollYtdSummary from "./PayrollYTDSummary";
import PayrollRegisterReport from "./PayrollRegisterReports";
import PayeePayStub from "./PayeePayStubs";
import CheckRegister from "./ChecksRegister";
import NewYorkDblPflReport from "./NewYorkDblPflReport";

export const ExportButtons = () => (
  <Stack direction="row" spacing={1}>
    <Button variant="outlined" size="small" color="primary">
      Export PDF
    </Button>
    <Button variant="outlined" size="small" color="primary">
      Export Excel
    </Button>
  </Stack>
);

const tabOptions = [
  { label: "Payroll YTD Summary", value: "ytd" },
  { label: "Payroll Register", value: "register" },
  // { label: "Payee Pay Stubs", value: "paystubs" },
  { label: "Checks Register", value: "checks" },
  { label: "New York DBL PFL Report", value: "nydblpfl" },
];

const PayrollReports = () => {
  const [tab, setTab] = useState(
    localStorage.getItem("payrollReportTab") || "ytd"
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    localStorage.setItem("payrollReportTab", newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 5 }}>
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 6,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ width: "100%", mb: 3 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="standard"
            scrollButtons={false}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: "100%",
              minHeight: 56,
              "& .MuiTab-root": {
                flex: 1,
                fontSize: { xs: 13, sm: 15, md: 17 },
                fontWeight: 600,
                minWidth: 0,
                px: { xs: 1, sm: 2 },
              },
            }}
          >
            {tabOptions.map((t) => (
              <Tab
                key={t.value}
                label={t.label}
                value={t.value}
                sx={{
                  textTransform: "none",
                  color: "text.primary",
                  borderRadius: 2,
                  transition: "background 0.2s",
                  "&.Mui-selected": {
                    color: "#1976d2",
                    background: "rgba(25, 118, 210, 0.08)",
                  },
                  "&:hover": {
                    background: "rgb(176, 174, 174)",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
        {tab === "ytd" && (
          <Box p={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              mb={1}
            >
              <Typography variant="h6" fontWeight={700}>
                Payroll YTD Summary
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Displays year-to-date payrolls consolidated summary including
              company summary, wages breakdown, fees, benefits, and
              miscellaneous
            </Typography>
            <PayrollYtdSummary />
          </Box>
        )}
        {tab === "register" && (
          <Box p={2}>
            <Typography variant="h6" fontWeight={700}>
              Payroll Register
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              List payrolls run in a date range with details, searchable by
              payee name.
            </Typography>
            <PayrollRegisterReport />
          </Box>
        )}
        {tab === "paystubs" && (
          <Box p={2}>
            <Typography variant="h6" fontWeight={700}>
              Payee Pay Stubs
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Prints single payroll single payee pay stub, including agents,
              managers, and trusts.
            </Typography>
            <PayeePayStub />
          </Box>
        )}
        {tab === "checks" && (
          <Box p={2}>
            <Typography variant="h6" fontWeight={700}>
              Checks Register
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              List checks used in payrolls filtered by date or check number
              range with detailed check info.
            </Typography>
            <CheckRegister />
          </Box>
        )}
        {tab === "nydblpfl" && (
          <Box p={2}>
            <Typography variant="h6" fontWeight={700}>
              New York DBL PFL Report
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Disability and Paid Family Leave reports broken down by gender
              (female vs non-female).
            </Typography>
            <NewYorkDblPflReport />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PayrollReports;
