import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import PayeesLanding from './PayeesLanding';
import { Payee } from './payeeTypes';

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
      id={`payees-tabpanel-${index}`}
      aria-labelledby={`payees-tab-${index}`}
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
    id: `payees-tab-${index}`,
    'aria-controls': `payees-tabpanel-${index}`,
  };
}

const PayeesPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [selectedPayee, setSelectedPayee] = useState<Payee | null>(null);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePayeeSelect = (payee: Payee) => {
    setSelectedPayee(payee);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Payees
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="payees tabs">
          <Tab label="Employees & Loan Outs" {...a11yProps(0)} />
          <Tab label="Vendors & Contractors" {...a11yProps(1)} />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <PayeesLanding 
          payeeType="employee" 
          onPayeeSelect={handlePayeeSelect}
          selectedPayee={selectedPayee}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PayeesLanding 
          payeeType="vendor" 
          onPayeeSelect={handlePayeeSelect}
          selectedPayee={selectedPayee}
        />
      </TabPanel>
    </Box>
  );
};

export default PayeesPage;