import React, { useState, useEffect } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  TextField,
  Grid,
  Alert,
  Card,
  CardHeader,
  CardContent,
  Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { Payee, UnionReport, UnionPayee, UnionTotals } from './payrollTypes';
import { mockUnionReports } from '../mockData/unionReportsData';

interface Step4_2UnionReportsProps {
  employees: Payee[];
  onReview: (unionId: string, reviewed: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  allReviewed: boolean;
}

interface UnionJobTotal {
  salary: number;
  adjustments: number;
  sickVacation: number;
  grossSalary: number;
  dues: number;
  health: number;
  pension: number;
  k401: number;
}

const Step4_2UnionReports: React.FC<Step4_2UnionReportsProps> = ({ 
  employees, 
  onReview, 
  onBack, 
  onNext,
  allReviewed
}) => {
  const [unionReports, setUnionReports] = useState<UnionReport[]>([]);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Generate union reports from employees data or use mock data
  useEffect(() => {
    if (employees.length > 0 && employees.some(emp => emp.union)) {
      // Group employees by union
      const unionGroups = employees.reduce((acc, employee) => {
        if (!employee.union) return acc;
        
        if (!acc[employee.union]) {
          acc[employee.union] = {
            unionName: employee.union,
            employees: [],
            jobTitleTotals: {},
            totals: {
              salary: 0,
              adjustments: 0,
              sickVacation: 0,
              grossSalary: 0,
              dues: 0,
              health: 0,
              pension: 0,
              k401: 0
            }
          };
        }
        
        const salary = employee.rate || 0;
        const adjustments = employee.adjustments?.reduce((sum, adj) => sum + adj.rate, 0) || 0;
        const dues = employee.deductions?.find(d => d.type === 'union-dues')?.amount || 0;
        const health = employee.deductions?.find(d => d.type === 'health')?.amount || 0;
        const pension = employee.deductions?.find(d => d.type === 'pension')?.amount || 0;
        const k401 = employee.deductions?.find(d => d.type === '401k')?.amount || 0;
        
        // Add employee to union group
        acc[employee.union].employees.push({
          employeeId: employee.id,
          name: employee.name,
          ssn: '***-**-****', // Masked for security
          jobTitle: employee.jobTitle || '',
          salary,
          adjustments,
          sickVacation: 0, // Would come from time off data
          grossSalary: salary + adjustments,
          dues,
          health,
          pension,
          k401,
          deferralRate: 0 // Would come from employee settings
        });
        
        // Update job title totals
        const jobTitle = employee.jobTitle || 'Other';
        if (!acc[employee.union].jobTitleTotals[jobTitle]) {
          acc[employee.union].jobTitleTotals[jobTitle] = {
            salary: 0,
            adjustments: 0,
            sickVacation: 0,
            grossSalary: 0,
            dues: 0,
            health: 0,
            pension: 0,
            k401: 0
          };
        }
        
        acc[employee.union].jobTitleTotals[jobTitle].salary += salary;
        acc[employee.union].jobTitleTotals[jobTitle].adjustments += adjustments;
        acc[employee.union].jobTitleTotals[jobTitle].grossSalary += salary + adjustments;
        acc[employee.union].jobTitleTotals[jobTitle].dues += dues;
        acc[employee.union].jobTitleTotals[jobTitle].health += health;
        acc[employee.union].jobTitleTotals[jobTitle].pension += pension;
        acc[employee.union].jobTitleTotals[jobTitle].k401 += k401;
        
        // Update union totals
        acc[employee.union].totals.salary += salary;
        acc[employee.union].totals.adjustments += adjustments;
        acc[employee.union].totals.grossSalary += salary + adjustments;
        acc[employee.union].totals.dues += dues;
        acc[employee.union].totals.health += health;
        acc[employee.union].totals.pension += pension;
        acc[employee.union].totals.k401 += k401;
        
        return acc;
      }, {} as Record<string, {
        unionName: string;
        employees: UnionPayee[];
        jobTitleTotals: Record<string, UnionJobTotal>;
        totals: UnionTotals;
      }>);
      
      // Convert to UnionReport array
      const reports = Object.values(unionGroups).map((group, index) => ({
        id: `union-report-${index}`,
        unionName: group.unionName,
        companyInfo: {
          name: "Production Company Inc.", // Would come from company settings
          address: "123 Broadway, New York, NY",
          contact: "payroll@company.com",
          paymentDetails: "ACH #123456789"
        },
        payees: group.employees,
        jobTitleTotals: group.jobTitleTotals,
        unionTotals: group.totals,
        reviewed: false
      }));
      
      setUnionReports(reports);
    } else {
      // Use mock data when no employees with unions are available
      setUnionReports(mockUnionReports);
    }
  }, [employees]);

  const handleReportToggle = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  const handleReviewToggle = (reportId: string, reviewed: boolean) => {
    const updatedReports = unionReports.map(report => 
      report.id === reportId ? { ...report, reviewed } : report
    );
    setUnionReports(updatedReports);
    onReview(reportId, reviewed);
  };

  const filteredReports = unionReports.filter(report =>
    report.unionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Union Reports Review
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review and approve all union reports before final payroll submission.
      </Typography>
      
      {!allReviewed && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          All union reports must be reviewed before proceeding to the final review.
        </Alert>
      )}
      
      <Card sx={{ mb: 3, bgcolor: 'background.default' }}>
        <CardHeader 
          title="Review Status" 
          titleTypographyProps={{ variant: 'subtitle1' }}
          sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
        />
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                flex: 1, 
                bgcolor: 'success.50', 
                borderLeft: 4, 
                borderColor: 'success.main' 
              }}
            >
              <Typography variant="subtitle2" gutterBottom>Reviewed</Typography>
              <Typography variant="h4">
                {Object.values(unionReports).filter(r => r.reviewed).length}
              </Typography>
            </Paper>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                flex: 1, 
                bgcolor: 'warning.50', 
                borderLeft: 4, 
                borderColor: 'warning.main' 
              }}
            >
              <Typography variant="subtitle2" gutterBottom>Pending</Typography>
              <Typography variant="h4">
                {Object.values(unionReports).filter(r => !r.reviewed).length}
              </Typography>
            </Paper>
          </Stack>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search unions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>
      
      <Box sx={{ mb: 3 }}>
        {filteredReports.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography>No union reports to display</Typography>
          </Paper>
        ) : (
          filteredReports.map((report) => (
            <Accordion 
              key={report.id}
              expanded={expandedReport === report.id}
              onChange={() => handleReportToggle(report.id)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: report.reviewed ? 'success.50' : 'warning.50',
                  borderLeft: 4,
                  borderColor: report.reviewed ? 'success.main' : 'warning.main',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 2 }}>
                      {report.unionName} Report
                    </Typography>
                    <Chip 
                      label={report.reviewed ? 'Reviewed' : 'Pending Review'} 
                      color={report.reviewed ? 'success' : 'warning'} 
                      size="small"
                      sx={{ mr: 2 }}
                    />
                  </Box>
                  <Button
                    variant={report.reviewed ? "outlined" : "contained"}
                    color={report.reviewed ? "success" : "warning"}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReviewToggle(report.id, !report.reviewed);
                    }}
                    startIcon={report.reviewed ? <CheckIcon /> : null}
                    sx={{ minWidth: 120 }}
                  >
                    {report.reviewed ? 'Reviewed' : 'Mark as Reviewed'}
                  </Button>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    mb: 3, 
                    bgcolor: report.reviewed ? 'success.50' : 'warning.50',
                    border: 1,
                    borderColor: report.reviewed ? 'success.light' : 'warning.light',
                    borderRadius: 1
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2">
                      Review Status: <strong>{report.reviewed ? 'Reviewed' : 'Pending Review'}</strong>
                    </Typography>
                    <Button
                      variant={report.reviewed ? "outlined" : "contained"}
                      color={report.reviewed ? "success" : "warning"}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReviewToggle(report.id, !report.reviewed);
                      }}
                      startIcon={report.reviewed ? <CheckIcon /> : null}
                    >
                      {report.reviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
                    </Button>
                  </Stack>
                </Paper>
                
                <Card sx={{ mb: 3 }}>
                  <CardHeader 
                    title="Company Information" 
                    titleTypographyProps={{ variant: 'subtitle2' }}
                    sx={{ bgcolor: 'primary.50', py: 1 }}
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Company:</strong> {report.companyInfo.name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Address:</strong> {report.companyInfo.address}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Contact:</strong> {report.companyInfo.contact}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Payment Details:</strong> {report.companyInfo.paymentDetails}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                <Card sx={{ mb: 3 }}>
                  <CardHeader 
                    title="Payees by Job Title" 
                    titleTypographyProps={{ variant: 'subtitle2' }}
                    sx={{ bgcolor: 'primary.50', py: 1 }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: 'grey.100' }}>
                            <TableCell>Name</TableCell>
                            <TableCell>SSN</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Adjustments</TableCell>
                            <TableCell>Gross Salary</TableCell>
                            <TableCell>Dues</TableCell>
                            <TableCell>Health</TableCell>
                            <TableCell>Pension</TableCell>
                            <TableCell>401K</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {report.payees.map((payee) => (
                            <TableRow key={payee.employeeId}>
                              <TableCell>{payee.name}</TableCell>
                              <TableCell>{payee.ssn}</TableCell>
                              <TableCell>{payee.jobTitle}</TableCell>
                              <TableCell>${payee.salary.toFixed(2)}</TableCell>
                              <TableCell>${payee.adjustments.toFixed(2)}</TableCell>
                              <TableCell>${payee.grossSalary.toFixed(2)}</TableCell>
                              <TableCell>${payee.dues.toFixed(2)}</TableCell>
                              <TableCell>${payee.health.toFixed(2)}</TableCell>
                              <TableCell>${payee.pension.toFixed(2)}</TableCell>
                              <TableCell>${payee.k401.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
                
                <Card sx={{ mb: 3 }}>
                  <CardHeader 
                    title="Job Title Totals" 
                    titleTypographyProps={{ variant: 'subtitle2' }}
                    sx={{ bgcolor: 'primary.50', py: 1 }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: 'grey.100' }}>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Adjustments</TableCell>
                            <TableCell>Gross Salary</TableCell>
                            <TableCell>Dues</TableCell>
                            <TableCell>Health</TableCell>
                            <TableCell>Pension</TableCell>
                            <TableCell>401K</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(report.jobTitleTotals).map(([jobTitle, totals]) => (
                            <TableRow key={jobTitle}>
                              <TableCell>{jobTitle}</TableCell>
                              <TableCell>${totals.salary.toFixed(2)}</TableCell>
                              <TableCell>${totals.adjustments.toFixed(2)}</TableCell>
                              <TableCell>${totals.grossSalary.toFixed(2)}</TableCell>
                              <TableCell>${totals.dues.toFixed(2)}</TableCell>
                              <TableCell>${totals.health.toFixed(2)}</TableCell>
                              <TableCell>${totals.pension.toFixed(2)}</TableCell>
                              <TableCell>${totals.k401.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader 
                    title="Union Totals" 
                    titleTypographyProps={{ variant: 'subtitle2' }}
                    sx={{ bgcolor: 'primary.50', py: 1 }}
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TableContainer>
                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell><strong>Total Salary</strong></TableCell>
                                <TableCell>${report.unionTotals.salary.toFixed(2)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell><strong>Total Adjustments</strong></TableCell>
                                <TableCell>${report.unionTotals.adjustments.toFixed(2)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell><strong>Total Gross Salary</strong></TableCell>
                                <TableCell>${report.unionTotals.grossSalary.toFixed(2)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell><strong>Total Dues</strong></TableCell>
                                <TableCell>${report.unionTotals.dues.toFixed(2)}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TableContainer>
                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell><strong>Total Health</strong></TableCell>
                                <TableCell>${report.unionTotals.health.toFixed(2)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell><strong>Total Pension</strong></TableCell>
                                <TableCell>${report.unionTotals.pension.toFixed(2)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell><strong>Total 401K</strong></TableCell>
                                <TableCell>${report.unionTotals.k401.toFixed(2)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ bgcolor: 'primary.50' }}>
                                <TableCell><strong>GRAND TOTAL</strong></TableCell>
                                <TableCell><strong>${(report.unionTotals.grossSalary + report.unionTotals.health + report.unionTotals.pension).toFixed(2)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onBack}>
          Back: Payroll Details
        </Button>
        <Button 
          variant="contained" 
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