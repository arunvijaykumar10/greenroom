import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  Typography, 
  Button, 
  Divider, 
  MenuItem, 
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Payee } from './payrollTypes';

interface PayeeRowProps {
  payee: Payee;
  onUpdate: (updatedPayee: Payee) => void;
  payeeType: 'employee' | 'vendor' | 'contractor';
}

const PayeeRow: React.FC<PayeeRowProps> = ({ payee, onUpdate, payeeType }) => {
  // const [editing, setEditing] = useState(false);
  const [newAdjustment, setNewAdjustment] = useState({
    rate: 0,
    unit: '',
    code: '',
    class: '',
    note: ''
  });
  // const [newIncrement, setNewIncrement] = useState({
  //   name: '',
  //   rate: 0,
  //   unit: '',
  //   code: '',
  //   class: ''
  // });
  // const [newDeduction, setNewDeduction] = useState({
  //   name: '',
  //   amount: 0,
  //   type: 'other' as const
  // });
  // const [newAllowance, setNewAllowance] = useState({
  //   name: '',
  //   amount: 0,
  //   taxable: false
  // });
  const [newReimbursement, setNewReimbursement] = useState({
    amount: 0,
    code: '',
    class: '',
    note: '',
    receipt: null as File | null
  });

  const handleAddAdjustment = () => {
    const updatedPayee = {
      ...payee,
      adjustments: [
        ...(payee.adjustments || []),
        {
          id: `adj-${Date.now()}`,
          ...newAdjustment
        }
      ]
    };
    onUpdate(updatedPayee);
    setNewAdjustment({
      rate: 0,
      unit: '',
      code: '',
      class: '',
      note: ''
    });
  };

  const handleRemoveAdjustment = (id: string) => {
    const updatedPayee = {
      ...payee,
      adjustments: (payee.adjustments || []).filter(adj => adj.id !== id)
    };
    onUpdate(updatedPayee);
  };

  // Similar handlers for increments, deductions, allowances, reimbursements...

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setNewReimbursement({
  //       ...newReimbursement,
  //       receipt: e.target.files[0]
  //     });
  //   }
  // };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {payeeType === 'employee' && (
          <>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Rates</Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={payee.rateType}
                onChange={(e) => onUpdate({ ...payee, rateType: e.target.value as any })}
                sx={{ mb: 1 }}
              >
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="salary">Salary</MenuItem>
              </TextField>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Rate Amount"
                value={payee.rate || ''}
                onChange={(e) => onUpdate({ ...payee, rate: parseFloat(e.target.value) || 0 })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Payment Method</Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={payee.paymentMethod || 'ach'}
                onChange={(e) => onUpdate({ ...payee, paymentMethod: e.target.value as any })}
              >
                <MenuItem value="ach">ACH</MenuItem>
                <MenuItem value="check">Check</MenuItem>
              </TextField>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">Adjustments</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Rate</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(payee.adjustments || []).map((adj) => (
                <TableRow key={adj.id}>
                  <TableCell>${adj.rate}</TableCell>
                  <TableCell>{adj.unit}</TableCell>
                  <TableCell>{adj.code}</TableCell>
                  <TableCell>{adj.class}</TableCell>
                  <TableCell>{adj.note}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleRemoveAdjustment(adj.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              size="small"
              type="number"
              label="Rate"
              value={newAdjustment.rate}
              onChange={(e) => setNewAdjustment({ ...newAdjustment, rate: parseFloat(e.target.value) || 0 })}
            />
            <TextField
              size="small"
              label="Unit"
              value={newAdjustment.unit}
              onChange={(e) => setNewAdjustment({ ...newAdjustment, unit: e.target.value })}
            />
            <TextField
              size="small"
              label="Code"
              value={newAdjustment.code}
              onChange={(e) => setNewAdjustment({ ...newAdjustment, code: e.target.value })}
            />
            <TextField
              size="small"
              label="Class"
              value={newAdjustment.class}
              onChange={(e) => setNewAdjustment({ ...newAdjustment, class: e.target.value })}
            />
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<AddIcon />}
              onClick={handleAddAdjustment}
            >
              Add
            </Button>
          </Box>
        </Grid>

        {/* Similar sections for Increments, Deductions, Allowances, Reimbursements */}

        {payeeType === 'employee' && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">Timesheet</Typography>
            {payee.timesheetApproved ? (
              <Typography color="success.main">Timesheet approved</Typography>
            ) : (
              <Typography color="error.main">Timesheet not approved</Typography>
            )}
            <Button variant="outlined" size="small" sx={{ mt: 1 }}>
              {payee.timesheetApproved ? 'View Timesheet' : 'Add/Approve Timesheet'}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PayeeRow;