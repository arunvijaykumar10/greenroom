import { UnionReport } from '../components/payrollTypes';

export const mockUnionReports: UnionReport[] = [
  {
    id: 'union-report-1',
    unionName: 'Actors Equity Association',
    companyInfo: {
      name: 'Broadway Productions LLC',
      address: '123 Theater Way, New York, NY 10001',
      contact: 'John Producer (212) 555-1234',
      paymentDetails: 'ACH Transfer - Wells Fargo #12345678'
    },
    payees: [
      {
        employeeId: 'e1',
        name: 'John Smith',
        ssn: '***-**-1234',
        jobTitle: 'Lead Actor',
        salary: 2500,
        adjustments: 250,
        sickVacation: 0,
        grossSalary: 2750,
        dues: 68.75,
        health: 150,
        pension: 165,
        k401: 250,
        deferralRate: 10
      },
      {
        employeeId: 'e2',
        name: 'Sarah Johnson',
        ssn: '***-**-5678',
        jobTitle: 'Supporting Actor',
        salary: 1800,
        adjustments: 100,
        sickVacation: 0,
        grossSalary: 1900,
        dues: 47.50,
        health: 150,
        pension: 114,
        k401: 180,
        deferralRate: 10
      },
      {
        employeeId: 'e3',
        name: 'Michael Williams',
        ssn: '***-**-9012',
        jobTitle: 'Supporting Actor',
        salary: 2200,
        adjustments: 0,
        sickVacation: 220,
        grossSalary: 2420,
        dues: 60.50,
        health: 150,
        pension: 132,
        k401: 0,
        deferralRate: 0
      }
    ],
    jobTitleTotals: {
      'Lead Actor': {
        salary: 2500,
        adjustments: 250,
        sickVacation: 0,
        grossSalary: 2750,
        dues: 68.75,
        health: 150,
        pension: 165,
        k401: 250
      },
      'Supporting Actor': {
        salary: 4000,
        adjustments: 100,
        sickVacation: 220,
        grossSalary: 4320,
        dues: 108,
        health: 300,
        pension: 246,
        k401: 180
      }
    },
    unionTotals: {
      salary: 6500,
      adjustments: 350,
      sickVacation: 220,
      grossSalary: 7070,
      dues: 176.75,
      health: 450,
      pension: 411,
      k401: 430
    },
    reviewed: false
  },
  {
    id: 'union-report-2',
    unionName: 'IATSE',
    companyInfo: {
      name: 'Broadway Productions LLC',
      address: '123 Theater Way, New York, NY 10001',
      contact: 'John Producer (212) 555-1234',
      paymentDetails: 'ACH Transfer - Wells Fargo #12345678'
    },
    payees: [
      {
        employeeId: 'e4',
        name: 'Robert Wilson',
        ssn: '***-**-3456',
        jobTitle: 'Sound Designer',
        salary: 2000,
        adjustments: 0,
        sickVacation: 0,
        grossSalary: 2000,
        dues: 50,
        health: 150,
        pension: 120,
        k401: 0,
        deferralRate: 0
      },
      {
        employeeId: 'e5',
        name: 'Lisa Thompson',
        ssn: '***-**-7890',
        jobTitle: 'Lighting Designer',
        salary: 1750,
        adjustments: 175,
        sickVacation: 0,
        grossSalary: 1925,
        dues: 48.13,
        health: 150,
        pension: 105,
        k401: 175,
        deferralRate: 10
      }
    ],
    jobTitleTotals: {
      'Sound Designer': {
        salary: 2000,
        adjustments: 0,
        sickVacation: 0,
        grossSalary: 2000,
        dues: 50,
        health: 150,
        pension: 120,
        k401: 0
      },
      'Lighting Designer': {
        salary: 1750,
        adjustments: 175,
        sickVacation: 0,
        grossSalary: 1925,
        dues: 48.13,
        health: 150,
        pension: 105,
        k401: 175
      }
    },
    unionTotals: {
      salary: 3750,
      adjustments: 175,
      sickVacation: 0,
      grossSalary: 3925,
      dues: 98.13,
      health: 300,
      pension: 225,
      k401: 175
    },
    reviewed: false
  }
];