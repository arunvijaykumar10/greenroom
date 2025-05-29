import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Collapse,
  IconButton,
  FormControlLabel
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Check as ReviewedIcon
} from '@mui/icons-material';

interface Employee {
  id: string;
  name: string;
  ssn?: string;
  jobTitle: string;
  union?: string;
  rates: { amount: number }[];
  increments?: { amount: number }[];
  deductions?: { type: string; amount: number }[];
}

interface Step4_2UnionReportsProps {
  employees: Employee[];
  onReview: (unionName: string, reviewed: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  allReviewed: boolean;
}

const Step4_2UnionReports: React.FC<Step4_2UnionReportsProps> = ({ employees, onReview, onBack, onNext, allReviewed }) => {
  // Group employees by union
  type UnionGroup = {
    name: string;
    employees: Employee[];
    reviewed: boolean;
    expanded: boolean;
    notes: string;
  };
  const unionGroups = employees.reduce<Record<string, UnionGroup>>((acc, employee) => {
    if (employee.union) {
      if (!acc[employee.union]) {
        acc[employee.union] = {
          name: employee.union,
          employees: [],
          reviewed: false,
          expanded: false,
          notes: ''
        };
      }
      acc[employee.union].employees.push(employee);
    }
    return acc;
  }, {});

  const [unions, setUnions] = useState(unionGroups);
  const [showAll, setShowAll] = useState(false);

  const handleToggleExpand = (unionName: string) => {
    setUnions(prev => ({
      ...prev,
      [unionName]: {
        ...prev[unionName],
        expanded: !prev[unionName].expanded
      }
    }));
  };

  const handleToggleReview = (unionName: string) => {
    const newStatus = !unions[unionName].reviewed;
    setUnions(prev => ({
      ...prev,
      [unionName]: {
        ...prev[unionName],
        reviewed: newStatus
      }
    }));
    onReview(unionName, newStatus);
  };

  const handleNoteChange = (unionName: string, note: string) => {
    setUnions(prev => ({
      ...prev,
      [unionName]: {
        ...prev[unionName],
        notes: note
      }
    }));
  };

  const toggleShowAll = () => {
    const newExpandedState = !showAll;
    setShowAll(newExpandedState);
    
    const updatedUnions: Record<string, UnionGroup> = {};
    Object.keys(unions).forEach(unionName => {
      updatedUnions[unionName] = {
        ...unions[unionName],
        expanded: newExpandedState
      };
    });
    setUnions(updatedUnions);
  };

  // Calculate union totals
  const calculateUnionTotals = (unionEmployees: any[]) => {
    return unionEmployees.reduce((totals: { gross: any; dues: number; pension: number; health: number; deferral: any; count: number; }, employee: { rates: { amount: any; }[]; increments: any[]; deductions: any[]; }) => {
      const gross = employee.rates[0].amount + 
                   (employee.increments?.reduce((sum: any, inc: { amount: any; }) => sum + inc.amount, 0) || 0);
      const dues = gross * 0.025; // Standard 2.5% union dues
      const pension = gross * 0.06; // Standard 6% pension
      const health = 150; // Standard weekly health contribution
      const deferral = employee.deductions?.filter((d: { type: string; }) => d.type === '401k').reduce((sum: any, d: { amount: any; }) => sum + d.amount, 0) || 0;

      return {
        gross: totals.gross + gross,
        dues: totals.dues + dues,
        pension: totals.pension + pension,
        health: totals.health + health,
        deferral: totals.deferral + deferral,
        count: totals.count + 1
      };
    }, { gross: 0, dues: 0, pension: 0, health: 0, deferral: 0, count: 0 });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Union Reports Review
      </Typography>
      <Typography variant="body1" paragraph>
        Please review all union reports before proceeding. You must review each union's report before submitting payroll.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={allReviewed}
              disabled
              color="primary"
            />
          }
          label={`${Object.values(unions).filter(u => u.reviewed).length} of ${Object.keys(unions).length} unions reviewed`}
        />
        <Button onClick={toggleShowAll}>
          {showAll ? 'Collapse All' : 'Expand All'}
        </Button>
      </Box>
      
      <Divider sx={{ my: 2 }} />

      {Object.keys(unions).length === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">No Union Members in This Payroll</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            There are no employees associated with any unions in this payroll run.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {Object.values(unions).map((union) => (
            <Grid item xs={12} key={union.name}>
              <Paper elevation={3}>
                <Box sx={{ 
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: union.reviewed ? '#e8f5e9' : '#fff3e0'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleReview(union.name)}
                      color={union.reviewed ? 'success' : 'default'}
                    >
                      {union.reviewed ? <ReviewedIcon /> : <Checkbox />}
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {union.name} Union Report
                    </Typography>
                    {union.reviewed && (
                      <Typography variant="caption" color="success.main" sx={{ ml: 1 }}>
                        Reviewed
                      </Typography>
                    )}
                  </Box>
                  <IconButton
                    onClick={() => handleToggleExpand(union.name)}
                  >
                    {union.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={union.expanded}>
                  <Box sx={{ p: 2 }}>
                    {/* Union and Company Information */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Union Information
                          </Typography>
                          <Typography variant="body2">Name: {union.name}</Typography>
                          <Typography variant="body2">Address: 123 Union St, Union City</Typography>
                          <Typography variant="body2">Contact: (555) 123-4567</Typography>
                          <Typography variant="body2">Payment Due: 30 days</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Company Information
                          </Typography>
                          <Typography variant="body2">Name: Production Company Inc.</Typography>
                          <Typography variant="body2">Address: 456 Production Ave, NY</Typography>
                          <Typography variant="body2">Contact: (555) 987-6543</Typography>
                          <Typography variant="body2">Pay Period: Current Week</Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Payees Table */}
                    <TableContainer component={Paper} elevation={2} sx={{ mb: 3 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>SSN</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Adjustments</TableCell>
                            <TableCell align="right">Gross</TableCell>
                            <TableCell align="right">Dues (2.5%)</TableCell>
                            <TableCell align="right">Health</TableCell>
                            <TableCell align="right">Pension (6%)</TableCell>
                            <TableCell align="right">401K</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {union.employees.map((employee) => {
                            const gross = employee.rates[0].amount + 
                                         (employee.increments?.reduce((sum, inc) => sum + inc.amount, 0) || 0);
                            const dues = gross * 0.025;
                            const pension = gross * 0.06;
                            const health = 150;
                            const deferral = employee.deductions?.filter(d => d.type === '401k').reduce((sum, d) => sum + d.amount, 0) || 0;

                            return (
                              <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>***-**-{employee.ssn?.slice(-4) || 'XXXX'}</TableCell>
                                <TableCell>{employee.jobTitle}</TableCell>
                                <TableCell align="right">${employee.rates[0].amount.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                  ${(employee.increments?.reduce((sum, inc) => sum + inc.amount, 0) || 0).toFixed(2)}
                                </TableCell>
                                <TableCell align="right">${gross.toFixed(2)}</TableCell>
                                <TableCell align="right">${dues.toFixed(2)}</TableCell>
                                <TableCell align="right">${health.toFixed(2)}</TableCell>
                                <TableCell align="right">${pension.toFixed(2)}</TableCell>
                                <TableCell align="right">${deferral.toFixed(2)}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* Union Totals */}
                    <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {union.name} Union Totals
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(calculateUnionTotals(union.employees)).map(([key, value]) => (
                          <Grid item xs={6} sm={4} md={2} key={key}>
                            <Typography variant="body2">
                              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong><br />
                              {typeof value === 'number' ? `$${value.toFixed(2)}` : String(value)}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>

                    {/* Notes */}
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Notes for this union report"
                      value={union.notes}
                      onChange={(e) => handleNoteChange(union.name, e.target.value)}
                      sx={{ mb: 2 }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleReview(union.name)}
                        startIcon={union.reviewed ? <ReviewedIcon /> : null}
                      >
                        {union.reviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
                      </Button>
                    </Box>
                  </Box>
                </Collapse>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          endIcon={<NextIcon />}
          onClick={onNext}
          disabled={!allReviewed}
        >
          Next: Final Review
        </Button>
      </Box>
    </Box>
  );
};

export default Step4_2UnionReports;