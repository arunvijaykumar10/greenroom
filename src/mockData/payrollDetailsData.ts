import { Payee, PayeeSummary, DepartmentTotal, CompanyTotal } from '../components/payrollTypes';

export const mockEmployees: Payee[] = [
  {
    id: 'e1',
    name: 'John Smith',
    type: 'employee',
    status: 'onboarded',
    union: 'Actors Equity Association',
    jobTitle: 'Lead Actor',
    department: 'Cast',
    rateType: 'weekly',
    rate: 2500,
    adjustments: [
      { id: 'adj1', rate: 250, unit: 'flat', code: 'PERF', class: 'BONUS' }
    ],
    increments: [
      { id: 'inc1', name: 'Performance Bonus', rate: 150, unit: 'flat', code: 'PERF', class: 'BONUS' }
    ],
    deductions: [
      { id: 'ded1', name: 'Union Dues', amount: 62.5, type: 'union-dues' },
      { id: 'ded2', name: '401k', amount: 250, type: '401k' },
      { id: 'ded3', name: 'Federal Tax', amount: 625, type: 'tax' }
    ],
    allowances: [
      { id: 'all1', name: 'Per Diem', amount: 75, taxable: false }
    ],
    reimbursements: [],
    selected: true,
    timesheetApproved: true,
    sickVacationPay: 0,
    deferralRate: 10
  },
  {
    id: 'e2',
    name: 'Sarah Johnson',
    type: 'employee',
    status: 'onboarded',
    union: 'Actors Equity Association',
    jobTitle: 'Supporting Actor',
    department: 'Cast',
    rateType: 'weekly',
    rate: 1800,
    adjustments: [],
    increments: [
      { id: 'inc2', name: 'Performance Bonus', rate: 100, unit: 'flat', code: 'PERF', class: 'BONUS' }
    ],
    deductions: [
      { id: 'ded4', name: 'Union Dues', amount: 45, type: 'union-dues' },
      { id: 'ded5', name: '401k', amount: 180, type: '401k' },
      { id: 'ded6', name: 'Federal Tax', amount: 450, type: 'tax' }
    ],
    allowances: [],
    reimbursements: [],
    selected: true,
    timesheetApproved: true,
    sickVacationPay: 0,
    deferralRate: 10
  },
  {
    id: 'e3',
    name: 'Michael Brown',
    type: 'employee',
    status: 'onboarded',
    jobTitle: 'Stage Manager',
    department: 'Production',
    rateType: 'weekly',
    rate: 1500,
    adjustments: [
      { id: 'adj2', rate: 150, unit: 'flat', code: 'OT', class: 'OVERTIME' }
    ],
    increments: [],
    deductions: [
      { id: 'ded7', name: 'Federal Tax', amount: 375, type: 'tax' },
      { id: 'ded8', name: 'State Tax', amount: 150, type: 'tax' }
    ],
    allowances: [
      { id: 'all2', name: 'Transportation', amount: 100, taxable: true }
    ],
    reimbursements: [
      { id: 'reim1', amount: 75, code: 'SUPPLIES', class: 'PROD', note: 'Production supplies' }
    ],
    selected: true,
    timesheetApproved: true,
    sickVacationPay: 0,
    deferralRate: 0
  },
  {
    id: 'e4',
    name: 'Emily Davis',
    type: 'employee',
    status: 'onboarded',
    jobTitle: 'Lighting Designer',
    department: 'Technical',
    rateType: 'weekly',
    rate: 1700,
    adjustments: [],
    increments: [],
    deductions: [
      { id: 'ded9', name: 'Federal Tax', amount: 425, type: 'tax' },
      { id: 'ded10', name: 'State Tax', amount: 170, type: 'tax' }
    ],
    allowances: [],
    reimbursements: [],
    selected: true,
    timesheetApproved: true,
    sickVacationPay: 0,
    deferralRate: 0
  },
  {
    id: 'e5',
    name: 'Robert Wilson',
    type: 'loan-out',
    status: 'onboarded',
    union: 'IATSE',
    jobTitle: 'Sound Designer',
    department: 'Technical',
    rateType: 'weekly',
    rate: 2000,
    adjustments: [],
    increments: [],
    deductions: [
      { id: 'ded11', name: 'Union Dues', amount: 50, type: 'union-dues' }
    ],
    allowances: [],
    reimbursements: [
      { id: 'reim2', amount: 250, code: 'EQUIPMENT', class: 'TECH', note: 'Sound equipment rental' }
    ],
    selected: true,
    timesheetApproved: true,
    sickVacationPay: 0,
    deferralRate: 0
  }
];

export const mockPayeeSummary: PayeeSummary[] = [
  {
    name: 'John Smith',
    jobTitle: 'Lead Actor',
    department: 'Cast',
    wages: 2750, // Base + adjustments
    deductions: 937.5, // Union dues + 401k + taxes
    taxes: 625,
    netPay: 1812.5,
    employerFringe: 350 // Health + pension
  },
  {
    name: 'Sarah Johnson',
    jobTitle: 'Supporting Actor',
    department: 'Cast',
    wages: 1900, // Base + increments
    deductions: 675, // Union dues + 401k + taxes
    taxes: 450,
    netPay: 1225,
    employerFringe: 300
  },
  {
    name: 'Michael Brown',
    jobTitle: 'Stage Manager',
    department: 'Production',
    wages: 1650, // Base + adjustments
    deductions: 525, // Taxes
    taxes: 525,
    netPay: 1125,
    employerFringe: 0
  },
  {
    name: 'Emily Davis',
    jobTitle: 'Lighting Designer',
    department: 'Technical',
    wages: 1700,
    deductions: 595, // Taxes
    taxes: 595,
    netPay: 1105,
    employerFringe: 0
  },
  {
    name: 'Robert Wilson',
    jobTitle: 'Sound Designer',
    department: 'Technical',
    wages: 2000,
    deductions: 50, // Union dues
    taxes: 0, // Loan-out company handles taxes
    netPay: 1950,
    employerFringe: 150 // Health fund only
  }
];

export const mockDepartmentTotals: DepartmentTotal[] = [
  {
    department: 'Cast',
    wages: 4650,
    adjustments: 250,
    contributions: 650,
    taxes: 1075
  },
  {
    department: 'Production',
    wages: 1650,
    adjustments: 150,
    contributions: 0,
    taxes: 525
  },
  {
    department: 'Technical',
    wages: 3700,
    adjustments: 0,
    contributions: 150,
    taxes: 595
  }
];

export const mockCompanyTotal: CompanyTotal = {
  totalNetPays: 7217.5,
  totalTaxes: 2195,
  totalReimbursements: 325,
  totalAllowances: 175,
  totalBenefits: 800,
  totalDeductions: 2782.5,
  greenroomFee: 50.75, // 0.5% of total payroll
  postage: 25 // $5 per check for 5 employees
};