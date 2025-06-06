export interface CompanyInfo {
  name: string;
  address: string;
  contact: string;
  paymentDetails: string;
}

export interface CompanyRegistrationData {
  // Company Information
  companyName: string;
  companyAddress: string;
  companyContact: string;
  companyType: string;
  industry: string;
  taxId: string;
  
  // Payroll Details
  paymentMethod: string;
  payrollFrequency: string;
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  payrollStartDate?: string;
}

export type RegistrationStep = 'companyInfo' | 'payrollDetails' | 'review';