export interface Payee {
  id: string;
  name: string;
  type: 'employee' | 'loan-out' | 'vendor' | 'contractor' | 'agent' | 'manager';
  union?: string;
  jobTitle: string;
  department?: string;
  status: 'onboarded' | 'not-onboarded';
  startDate: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  paymentInfo: {
    method: 'ach' | 'check';
    accountDetails?: {
      accountNumber: string;
      routingNumber: string;
      accountType: 'checking' | 'savings';
    };
  };
  documents?: {
    id: string;
    name: string;
    type: string;
    dateUploaded: string;
  }[];
}

export interface EmployeePayee {
  onboardingStatus: string;
  id: string;
  name: string;
  type: 'employee' | 'loan-out';
  email: string;
  phone?: string;
  union?: string;
  jobTitle?: string;
  department?: string;
  startDate: string;
  ssn?: string;
  paymentMethod?: 'ach' | 'check';
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    accountType: string;
  };
}