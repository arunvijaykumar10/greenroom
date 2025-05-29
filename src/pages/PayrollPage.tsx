import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';
import PayrollLanding from '../components/payroll/PayrollLanding';
import PayrollHistory from './PayrollHistory';
import OtherPayrollOptions from '../components/payroll/ OtherPayrollOptions';
import PaySettings from '../components/payroll/PaySettings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payroll-tabpanel-${index}`}
      aria-labelledby={`payroll-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `payroll-tab-${index}`,
    'aria-controls': `payroll-tabpanel-${index}`,
  };
}

const PayrollPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [payrollSetupCompleted] = useState(true);
  const [currentPayroll, setCurrentPayroll] = useState<any>(null);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRunPayroll = () => {
    setCurrentPayroll({ id: 'new', status: 'draft' });
    setValue(0); // Switch to landing tab where RunPayroll component will handle the rest
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Payroll
      </Typography>
      
      {!payrollSetupCompleted && (
        <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: 'warning.light' }}>
          <Typography>
            It's not possible to run a payroll before the payroll setup is completed.
          </Typography>
        </Paper>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="payroll tabs">
          <Tab label="Payroll" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
          <Tab label="Pay Settings" {...a11yProps(2)} />
          <Tab label="Other Options" {...a11yProps(3)} />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <PayrollLanding 
          payrollSetupCompleted={payrollSetupCompleted} 
          onRunPayroll={handleRunPayroll}
          currentPayroll={currentPayroll}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PayrollHistory />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PaySettings />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OtherPayrollOptions />
      </TabPanel>
    </Box>
  );
};

export default PayrollPage;