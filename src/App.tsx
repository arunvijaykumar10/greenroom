import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  CssBaseline,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Collapse,
  SelectChangeEvent,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Bell, DollarSign, SettingsIcon } from "lucide-react";

// Pages
import DashboardSetup from "./pages/DashboardSetup";
import AdminTimesheetEntry from "./pages/AdminTimesheetEntry";
import AccountActivation from "./pages/AccountActivation";
import MFAScreen from "./pages/MFAScreen";
import TermsReview from "./pages/TermsReview";
import UnionSetup from "./pages/UnionSetup";
import SignatureSetup from "./pages/SignatureSetup";
import BankSetup from "./pages/BankSetup";
import UnionSetupTable from "./pages/UnionSetupTable";
import LoginScreen from "./pages/LoginScreen";
import TaxCalculator from "./pages/Taxes";
import ReviewPage from "./pages/ReviewPage";
import PaystubReports from "./pages/PaystubReports";
import CompanySettings from "./pages/settings/CompanySettings";
import UnionSettings from "./pages/settings/UnionSettings";
import UserManagementSettings from "./pages/settings/UserManagementSettings";
import OnboardingPage from "./pages/on-boarding/OnboardingPage";
import PayrollPage from "./components/PayrollPage";
import OnboardingDocuments from "./pages/settings/OnboardingDocuments";
import PayrollSetup from "./pages/settings/PayrollSetup";
import TaxSetup from "./pages/settings/TaxSetup";
import PayrollReports from "./pages/reports/PayrollReports";
import UnionReports from "./pages/reports/UnionReports";
import TaxReports from "./pages/reports/TaxReports";
import CheckDetails from "./pages/reports/CheckDetails";
import PayeesPage from "./pages/payee/PayeesPage";
import RegisterPage from "./pages/register/RegisterPage";
import Settings from "./pages/Settings";
import CompaniesPage from "./pages/company/CompaniesPage";
import { CompanyProvider, useCompany } from "./contexts/CompanyContext";

type NavigationItem =
  | {
      label: string;
      icon: React.ReactNode;
      path: string;
      children?: undefined;
    }
  | {
      label: string;
      icon: React.ReactNode;
      children: {
        label: string;
        path: string;
      }[];
      path?: undefined;
    };

const drawerWidth = 240;

const adminNavItems: NavigationItem[] = [
  { label: "Company", icon: <AccountBalanceIcon />, path: "/company" },
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Payees", icon: <PeopleIcon />, path: "/payees" },
  { label: "Payroll", icon: <DollarSign />, path: "/payroll-page" },
  { label: "Taxes", icon: <AccountBalanceIcon />, path: "/taxes" },
  {
    label: "Reports",
    icon: <AssessmentIcon />,
    children: [
      { label: "Payroll Reports", path: "/payroll_reports" },
      { label: "Union Reports", path: "/union_reports" },
      { label: "Tax Reports", path: "/tax_reports" },
    ],
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    children: [
      { label: "Company Settings", path: "/settings/company" },
      { label: "Unions", path: "/settings/unions" },
      { label: "User Management", path: "/settings/users" },
      { label: "Onboarding Documents", path: "/settings/onboarding-documents" },
      { label: "Payroll Setup", path: "/settings/payroll-setup" },
      { label: "Tax Setup", path: "/settings/tax-setup" },
    ],
  },
];

const employeeNavItems: NavigationItem[] = [
  { label: "Company", icon: <AccountBalanceIcon />, path: "/company" },
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  const showDrawer =
    currentPathname !== "/login" && currentPathname !== "/register";

  const {
    companies: userCompanyData,
    selectedCompany,
    setSelectedCompany,
    currentRole,
  } = useCompany();

  const companies = userCompanyData
    .filter((company) => company.isActive)
    .map((c) => c.company);

  console.log("companies", userCompanyData);

  const appNavItems = useMemo(
    () => (currentRole === "Admin" ? adminNavItems : employeeNavItems),
    [currentRole]
  );
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const match = appNavItems.find((item) =>
      item.children
        ? item.children.some((child) => child.path === currentPathname)
        : item.path === currentPathname
    );

    if (match?.children) {
      const childMatch = match.children.find(
        (child) => child.path === currentPathname
      );
      setSelectedTab(childMatch?.label ?? match.label);
      setOpenSections({ [match.label]: true });
    } else {
      setSelectedTab(match?.label ?? null);
    }
  }, [currentPathname, appNavItems]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => {
      const isOpen = !!prev[label];
      const newState: Record<string, boolean> = {};
      if (!isOpen) newState[label] = true;
      return newState;
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const newCompany = event.target.value;
    setSelectedCompany(newCompany);

    navigate("/company");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {showDrawer && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#fff",
            color: "text.primary",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Toolbar
            sx={{
              gap: 3,
              px: 3,
              py: 1.5,
            }}
          >
            {/* Brand */}
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              Green Room Payroll
            </Typography>

            {/* Company Select & Role */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel id="company-select-label">Company</InputLabel>
                <Select
                  labelId="company-select-label"
                  id="company-select"
                  value={selectedCompany}
                  name="company"
                  label="Company"
                  onChange={handleChange}
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                Role: {currentRole}
              </Typography>
            </Box>

            {/* Push next section to right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Notification and User Info */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton color="inherit">
                <Bell size={20} />
              </IconButton>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 36,
                    height: 36,
                    fontSize: 14,
                  }}
                >
                  JS
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Jane Smith
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {currentRole}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      )}

      {showDrawer && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f9f9f9",
              borderRight: "1px solid #e0e0e0",
              mt: 1,
            },
          }}
        >
          <Toolbar />
          <List>
            {appNavItems.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openSections[item.label] || false;

              return (
                <React.Fragment key={item.label}>
                  <ListItem
                    onClick={() => {
                      if (hasChildren) {
                        toggleSection(item.label);
                      } else if (item.path) {
                        handleNavigation(item.path);
                      }
                    }}
                    sx={{
                      backgroundColor:
                        selectedTab === item.label && !hasChildren
                          ? "#e3f2fd"
                          : "inherit",
                      color:
                        selectedTab === item.label && !hasChildren
                          ? "#1976d2"
                          : "inherit",
                      "& .MuiListItemIcon-root": {
                        color:
                          selectedTab === item.label && !hasChildren
                            ? "#1976d2"
                            : "inherit",
                        minWidth: 0,
                        marginRight: 2,
                      },
                      pl: 2,
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={isOpen} timeout={300} unmountOnExit>
                      <List component="div" disablePadding>
                        {item?.children?.map((child) => {
                          const isSelected = selectedTab === child.label;
                          return (
                            <ListItem
                              key={child.label}
                              onClick={() => handleNavigation(child.path)}
                              sx={{
                                backgroundColor: isSelected
                                  ? "#e3f2fd"
                                  : "inherit",
                                color: isSelected ? "#1976d2" : "inherit",
                                pl: 8,
                              }}
                            >
                              <ListItemText primary={child.label} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              currentRole === "Admin" ? <DashboardSetup /> : <OnboardingPage />
            }
          />
          <Route path="/payees" element={<PayeesPage />} />
          <Route path="/timesheets" element={<AdminTimesheetEntry />} />
          <Route path="/taxes" element={<TaxCalculator />} />
          <Route path="/account-activation" element={<AccountActivation />} />
          <Route path="/mfa" element={<MFAScreen />} />
          <Route path="/terms" element={<TermsReview />} />
          <Route path="/union-setup" element={<UnionSetup />} />
          <Route path="/signature-setup" element={<SignatureSetup />} />
          <Route path="/bank-setup" element={<BankSetup />} />
          <Route path="/unionconfiguration" element={<UnionSetupTable />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/payroll_reports" element={<PayrollReports />} />
          <Route path="/union_reports" element={<UnionReports />} />
          <Route path="/tax_reports" element={<TaxReports />} />
          <Route path="/pay_stubs" element={<PaystubReports />} />
          <Route path="/settings/company" element={<CompanySettings />} />
          <Route path="/settings/unions" element={<UnionSettings />} />
          <Route path="/settings/users" element={<UserManagementSettings />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/payroll-page" element={<PayrollPage />} />
          <Route
            path="/settings/onboarding-documents"
            element={<OnboardingDocuments />}
          />
          <Route path="/settings/payroll-setup" element={<PayrollSetup />} />
          <Route path="/settings/tax-setup" element={<TaxSetup />} />
          <Route
            path="/reports/check-register/:payrollId"
            element={<CheckDetails />}
          />
          <Route path="/company" element={<CompaniesPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
};

const RootApp: React.FC = () => (
  <Router>
    <CompanyProvider>
      <App />
    </CompanyProvider>
  </Router>
);

export default RootApp;
