export type Payee = {
  id: number;
  name: string;
  ssn: string;
  workDates: string;
  type: string;
  union: string;
  jobTitle: string;
  department: string;
  workState: string;
  residentialState: string;
  wages: number;
  reimbursements: number;
  allowances: number;
  greenroomFee: number;
  deductions: {
    federalTax: number;
    fica: number;
    socialSecurity: number;
    medicare: number;
    nysTax: number;
    nycTax: number;
    nysPFL: number;
    nysSDI: number;
    k401: number;
    dues: number;
    agentManager: number;
  };
  employerFringe: {
    fica: number;
    socialSecurity: number;
    medicare: number;
    futa: number;
    nySUTA: number;
    nycMCTMT: number;
    health: number;
    pension: number;
    k401Annuity: number;
  };
  gender: "Male" | "Female" | "Other";
  ageGroup: "18-25" | "26-35" | "36-45" | "46-60" | "60+";
  unemployment: boolean;
};

export interface UnionReportRow {
  weekEnding: string;
  checkDate: string | null;
  unionsPaid: string[];
  payrollId: string;
}

export interface Payroll {
  id: string;
  payPeriod: string;
  payDate: string;
  employees: {
    name: string;
    rate: number;
    increments: number;
    reimbursements: number;
    allowances: number;
    gross: number;
    deductions: number;
  }[];
  vendors: {
    name: string;
    rate: number;
    increments: number;
    reimbursements: number;
    gross: number;
  }[];
}

export type Order = "asc" | "desc";

export interface ReportPayee {
  role: string;
  name: string;
  ssn: string;
  salary: number;
  adjustments: number;
  grossSalary: number;
  pensionableSalary: number;
  dues: number;
  health: number;
  pension: number;
  k401Employer: number;
  k401: number;
  participantDeferral: number;
  k401Voluntary: number;
  notes: string;
}

export interface UnionReport {
  id: string;
  fromEntity: {
    companyName: string;
    address: string;
    ein: string;
    managerName: string;
    phone: string;
    email: string;
  };
  toEntity: {
    unionName: string;
    address: string;
  };
  workWeekEnding: string;
  payrollWeekEnding: string;
  agreementNumber: string;
  employerId: string;
  payees: ReportPayee[];
}
