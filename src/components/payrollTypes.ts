import { Key, ReactNode } from "react";

export interface Payroll {
  id: string;
  payPeriod: string;
  payDate: string;
  status: 'draft' | 'submitted' | 'approved' | 'completed' | 'corrected';
  numberOfPayees: number;
  employerTaxes: number;
  grossTotal: number;
}

export interface Payee {
  id: string;
  name: string;
  type: 'employee' | 'loan-out' | 'vendor' | 'contractor' | 'agent' | 'manager' | 'child-trust';
  status: 'onboarded' | 'not-onboarded';
  union?: string;
  jobTitle?: string;
  department?: string;
  rateType?: 'hourly' | 'daily' | 'weekly' | 'salary';
  rate?: number;
  adjustments: Adjustment[];
  increments: Increment[];
  deductions: Deduction[];
  allowances: Allowance[];
  reimbursements: Reimbursement[];
  timesheetApproved?: boolean;
  paymentMethod?: 'ach' | 'check';
  bankDetails?: BankDetails;
  selected?: boolean;
}

export interface Adjustment {
  id: string;
  rate: number;
  unit: string;
  code: string;
  class: string;
  note?: string;
}

export interface Increment {
  id: string;
  name: string;
  rate: number;
  unit: string;
  code: string;
  class: string;
}

export interface Deduction {
  id: string;
  name: string;
  amount: number;
  type: 'tax' | 'union-dues' | 'agent-fee' | 'manager-fee' | '401k' | 'other';
}

export interface Allowance {
  id: string;
  name: string;
  amount: number;
  taxable: boolean;
}

export interface Reimbursement {
  id: string;
  amount: number;
  code: string;
  class: string;
  note: string;
  receipt?: File;
}

export interface BankDetails {
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
}

export interface UnionReport {
  id: string;
  jobTitleTotals(jobTitleTotals: any): unknown;
  unionTotals: any;
  unionId: string;
  unionName: string;
  companyInfo: CompanyInfo;
  payees: UnionPayee[];
  totals: UnionTotals;
  reviewed: boolean;
}

export interface CompanyInfo {
  name: string;
  address: string;
  contact: string;
  paymentDetails: string;
}

export interface UnionPayee {
  employeeId: Key | null | undefined;
  jobTitle: ReactNode;
  name: string;
  ssn: string;
  salary: number;
  adjustments: number;
  sickVacation: number;
  grossSalary: number;
  dues: number;
  health: number;
  pension: number;
  k401: number;
  deferralRate: number;
}

export interface UnionTotals {
  salary: number;
  adjustments: number;
  sickVacation: number;
  grossSalary: number;
  dues: number;
  health: number;
  pension: number;
  k401: number;
}

export interface PayrollSummary {
  payees: PayeeSummary[];
  departmentTotals: DepartmentTotal[];
  companyTotals: CompanyTotal;
}

export interface PayeeSummary {
  name: string;
  jobTitle: string;
  department: string;
  wages: number;
  deductions: number;
  taxes: number;
  netPay: number;
  employerFringe: number;
}

export interface DepartmentTotal {
  department: string;
  wages: number;
  adjustments: number;
  contributions: number;
  taxes: number;
}

export interface CompanyTotal {
  totalNetPays: number;
  totalTaxes: number;
  totalReimbursements: number;
  totalAllowances: number;
  totalBenefits: number;
  totalDeductions: number;
  greenroomFee: number;
  postage: number;
}