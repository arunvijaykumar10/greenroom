import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  TableContainer,
  TextField,
  Grid,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface OneTimeBill {
  id: string;
  businessName: string;
  address: string;
  ein: string;
  paymentInstructions: string;
  amount: number;
  code: string;
  class: string;
}

interface Step3OneTimeBillsProps {
  bills: OneTimeBill[];
  onUpdate: (bills: OneTimeBill[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const Step3OneTimeBills: React.FC<Step3OneTimeBillsProps> = ({ bills, onUpdate, onBack, onNext }) => {
  const [oneTimeBills, setOneTimeBills] = useState<OneTimeBill[]>(bills);
  const [newBill, setNewBill] = useState<Omit<OneTimeBill, 'id'>>({ 
    businessName: '',
    address: '',
    ein: '',
    paymentInstructions: '',
    amount: 0,
    code: '',
    class: ''
  });

  const handleAddBill = () => {
    const billToAdd = {
      ...newBill,
      id: `bill-${Date.now()}`
    };
    const updatedBills = [...oneTimeBills, billToAdd];
    setOneTimeBills(updatedBills);
    onUpdate(updatedBills);
    setNewBill({ 
      businessName: '',
      address: '',
      ein: '',
      paymentInstructions: '',
      amount: 0,
      code: '',
      class: ''
    });
  };

  const handleRemoveBill = (id: string) => {
    const updatedBills = oneTimeBills.filter(bill => bill.id !== id);
    setOneTimeBills(updatedBills);
    onUpdate(updatedBills);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBill(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        One-Time Bills
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Add any one-time payments to vendors that don't require formal onboarding.
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Business Name"
              name="businessName"
              value={newBill.businessName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={newBill.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="EIN"
              name="ein"
              value={newBill.ein}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Payment Instructions"
              name="paymentInstructions"
              value={newBill.paymentInstructions}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={newBill.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              fullWidth
              label="Code"
              name="code"
              value={newBill.code}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              fullWidth
              label="Class"
              name="class"
              value={newBill.class}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddBill}
              disabled={!newBill.businessName || !newBill.amount}
            >
              Add Bill
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {oneTimeBills.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Business Name</TableCell>
                <TableCell>EIN</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {oneTimeBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.businessName}</TableCell>
                  <TableCell>{bill.ein}</TableCell>
                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  <TableCell>{bill.code}</TableCell>
                  <TableCell>{bill.class}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveBill(bill.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back: Vendors & Contractors
        </Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          sx={{ ml: 1 }}
        >
          Next: Review & Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Step3OneTimeBills;