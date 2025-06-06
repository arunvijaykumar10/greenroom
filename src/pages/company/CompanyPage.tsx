import React, { useState } from 'react';
import { CompanyInfo } from '../../components/companyTypes';
import CompanySelector from '../../components/CompanySelector';
import CompanyRegistrationFlow from '../../components/CompanyRegistrationFlow';

const CompanyPage: React.FC = () => {
  // Mock data - in a real app, this would come from API/Redux
  const [companies, setCompanies] = useState<{
    active: CompanyInfo[];
    inactive: CompanyInfo[];
  }>({
    active: [
      { name: 'ABC Productions', address: '123 Main St', contact: 'info@abc.com', paymentDetails: 'Bank: ABC' },
      { name: 'XYZ Studios', address: '456 Oak Ave', contact: 'contact@xyz.com', paymentDetails: 'Bank: XYZ' }
    ],
    inactive: [
      { name: 'Old Company Ltd', address: '789 Pine Rd', contact: 'old@company.com', paymentDetails: 'Bank: Old' }
    ]
  });
  
  const [currentCompany, setCurrentCompany] = useState<CompanyInfo>(companies.active[0]);
  const [isRegistrationFlowOpen, setIsRegistrationFlowOpen] = useState(false);

  const handleCompanyChange = (company: CompanyInfo) => {
    setCurrentCompany(company);
  };

  const handleCreateNewCompany = () => {
    setIsRegistrationFlowOpen(true);
  };

  const handleCompanyCreated = (newCompany: CompanyInfo) => {
    setCompanies(prev => ({
      ...prev,
      active: [...prev.active, newCompany]
    }));
    setCurrentCompany(newCompany);
  };

  const handleReactivateCompany = (company: CompanyInfo) => {
    // Move company from inactive to active
    setCompanies(prev => ({
      active: [...prev.active, company],
      inactive: prev.inactive.filter(c => c.name !== company.name)
    }));
    setCurrentCompany(company);
  };

  const styles = {
    companyPage: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '25px',
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)',
    },
    companyHeader: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      marginBottom: '35px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e9ecef',
    },
    headerTitle: {
      margin: 0,
      color: '#2c3e50',
      fontSize: '28px',
      fontWeight: '600' as const,
      letterSpacing: '-0.5px',
    },
    dashboardTitle: {
      marginBottom: '25px',
      color: '#3498db',
      fontSize: '22px',
      fontWeight: '500' as const,
      position: 'relative' as const,
      paddingLeft: '15px',
      borderLeft: '4px solid #3498db',
    },
    dashboardContent: {
      display: 'grid' as const,
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '25px',
    },
    companyInfoCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      padding: '25px',
      transition: 'all 0.3s ease',
      border: '1px solid #eaeaea',
      overflow: 'hidden' as const,
      borderTop: '4px solid #3498db',
    },
    onboardingCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      padding: '25px',
      transition: 'all 0.3s ease',
      border: '1px solid #eaeaea',
      overflow: 'hidden' as const,
      borderTop: '4px solid #2ecc71',
    },
    timesheetCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      padding: '25px',
      transition: 'all 0.3s ease',
      border: '1px solid #eaeaea',
      overflow: 'hidden' as const,
      borderTop: '4px solid #e74c3c',
    },
    payrollCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      padding: '25px',
      transition: 'all 0.3s ease',
      border: '1px solid #eaeaea',
      overflow: 'hidden' as const,
      borderTop: '4px solid #f39c12',
    },
    cardTitle: {
      marginTop: 0,
      color: '#2c3e50',
      borderBottom: '1px solid #eee',
      paddingBottom: '12px',
      marginBottom: '18px',
      fontSize: '18px',
      fontWeight: '600' as const,
      display: 'flex' as const,
      alignItems: 'center' as const,
    },
    cardText: {
      margin: '10px 0',
      color: '#555',
      fontSize: '15px',
      lineHeight: '1.6',
    },
    cardLabel: {
      fontWeight: 'bold' as const,
      color: '#7f8c8d',
      marginRight: '5px',
    },
    cardValue: {
      color: '#2c3e50',
    },
    iconInfo: {
      marginRight: '10px',
      color: '#3498db',
      fontSize: '18px',
    },
    iconOnboarding: {
      marginRight: '10px',
      color: '#2ecc71',
      fontSize: '18px',
    },
    iconTimesheet: {
      marginRight: '10px',
      color: '#e74c3c',
      fontSize: '18px',
    },
    iconPayroll: {
      marginRight: '10px',
      color: '#f39c12',
      fontSize: '18px',
    },
    progressBar: {
      height: '8px',
      backgroundColor: '#ecf0f1',
      borderRadius: '4px',
      overflow: 'hidden' as const,
      marginTop: '15px',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#2ecc71',
      width: '65%',
    },
    statusBadge: {
      display: 'inline-block' as const,
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold' as const,
      color: 'white',
      backgroundColor: '#3498db',
      marginLeft: '10px',
    },
    pendingBadge: {
      backgroundColor: '#f39c12',
    },
    completeBadge: {
      backgroundColor: '#2ecc71',
    }
  };

  return (
    <div style={styles.companyPage}>
      <header style={styles.companyHeader}>
        <h1 style={styles.headerTitle}>Company Management</h1>
        <CompanySelector
          companies={companies}
          currentCompany={currentCompany}
          onCompanyChange={handleCompanyChange}
          onCreateNewCompany={handleCreateNewCompany}
          onReactivateCompany={handleReactivateCompany}
        />
      </header>

      <div>
        <h2 style={styles.dashboardTitle}>Dashboard for {currentCompany.name}</h2>
        <div style={styles.dashboardContent}>
          <div style={styles.companyInfoCard}>
            <h3 style={styles.cardTitle}>
              <span style={styles.iconInfo}>📋</span>
              Company Information
            </h3>
            <p style={styles.cardText}>
              <span style={styles.cardLabel}>Name:</span>
              <span style={styles.cardValue}>{currentCompany.name}</span>
            </p>
            <p style={styles.cardText}>
              <span style={styles.cardLabel}>Address:</span>
              <span style={styles.cardValue}>{currentCompany.address}</span>
            </p>
            <p style={styles.cardText}>
              <span style={styles.cardLabel}>Contact:</span>
              <span style={styles.cardValue}>{currentCompany.contact}</span>
            </p>
            <p style={styles.cardText}>
              <span style={styles.cardLabel}>Payment Details:</span>
              <span style={styles.cardValue}>{currentCompany.paymentDetails}</span>
            </p>
          </div>
          
          <div style={styles.onboardingCard}>
            <h3 style={styles.cardTitle}>
              <span style={styles.iconOnboarding}>👥</span>
              Onboarding Progress
              <span style={{...styles.statusBadge, ...styles.pendingBadge}}>In Progress</span>
            </h3>
            <p style={styles.cardText}>5 employees pending onboarding</p>
            <p style={styles.cardText}>12 employees completed</p>
            <div style={styles.progressBar}>
              <div style={styles.progressFill}></div>
            </div>
          </div>
        </div>
      </div>

      <CompanyRegistrationFlow
        isOpen={isRegistrationFlowOpen}
        onClose={() => setIsRegistrationFlowOpen(false)}
        onCreateCompany={handleCompanyCreated}
      />
    </div>
  );
};

export default CompanyPage;