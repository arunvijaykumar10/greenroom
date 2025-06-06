import React, { useState } from 'react';
import { CompanyInfo } from './companyTypes';

interface CompanySelectorProps {
  companies: {
    active: CompanyInfo[];
    inactive: CompanyInfo[];
  };
  currentCompany: CompanyInfo;
  onCompanyChange: (company: CompanyInfo) => void;
  onCreateNewCompany: () => void;
  onReactivateCompany: (company: CompanyInfo) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  currentCompany,
  onCompanyChange,
  onCreateNewCompany,
  onReactivateCompany
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInactiveCompanies, setShowInactiveCompanies] = useState(false);

  const styles = {
    companySelector: {
      position: 'relative' as const,
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      zIndex: 1000,
    },
    currentCompany: {
      display: 'flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      padding: '12px 18px',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500' as const,
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
      minWidth: '200px',
      transition: 'all 0.2s ease',
    },
    dropdownIcon: {
      marginLeft: '10px',
      fontSize: '12px',
      transition: 'transform 0.3s ease',
    },
    rotatedIcon: {
      transform: 'rotate(180deg)',
    },
    companyDropdown: {
      position: 'absolute' as const,
      top: 'calc(100% + 5px)',
      right: '0',
      width: '280px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
      zIndex: 1000,
      overflow: 'hidden' as const,
      border: '1px solid #eaeaea',
      animation: 'fadeIn 0.2s ease',
    },
    dropdownSection: {
      padding: '15px',
    },
    sectionHeader: {
      margin: '0 0 12px 0',
      fontSize: '14px',
      color: '#7f8c8d',
      borderBottom: '1px solid #eee',
      paddingBottom: '8px',
      fontWeight: '600' as const,
    },
    companyItem: {
      padding: '10px 12px',
      cursor: 'pointer',
      borderRadius: '5px',
      margin: '4px 0',
      transition: 'all 0.2s',
      fontSize: '14px',
    },
    companyItemHover: {
      backgroundColor: '#f8f9fa',
    },
    selectedCompany: {
      backgroundColor: '#e6f7ff',
      color: '#3498db',
      fontWeight: '500' as const,
      borderLeft: '3px solid #3498db',
    },
    inactiveCompany: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      color: '#95a5a6',
    },
    createCompanyBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '0',
      cursor: 'pointer',
      fontWeight: '500' as const,
      fontSize: '14px',
      transition: 'background-color 0.2s',
    },
    inactiveToggle: {
      cursor: 'pointer',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      color: '#7f8c8d',
      fontWeight: '600' as const,
    },
    reactivateBtn: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    divider: {
      height: '1px',
      backgroundColor: '#ecf0f1',
      margin: '8px 0',
    },
    companyIcon: {
      marginRight: '8px',
      fontSize: '14px',
    },
    companyCount: {
      backgroundColor: '#ecf0f1',
      color: '#7f8c8d',
      borderRadius: '10px',
      padding: '2px 8px',
      fontSize: '12px',
      marginLeft: '5px',
    }
  };

  return (
    <div style={styles.companySelector}>
      <div 
        style={styles.currentCompany}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>🏢 {currentCompany.name}</span>
        <span style={{
          ...styles.dropdownIcon,
          ...(showDropdown ? styles.rotatedIcon : {})
        }}>▼</span>
      </div>
      
      {showDropdown && (
        <div style={styles.companyDropdown}>
          <div style={styles.dropdownSection}>
            <h4 style={styles.sectionHeader}>
              Active Companies
              <span style={styles.companyCount}>{companies.active.length}</span>
            </h4>
            {companies.active.map((company, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.companyItem,
                  ...(currentCompany.name === company.name ? styles.selectedCompany : {})
                }}
                onClick={() => {
                  onCompanyChange(company);
                  setShowDropdown(false);
                }}
              >
                <span style={styles.companyIcon}>🏢</span>
                {company.name}
              </div>
            ))}
          </div>
          
          <button 
            style={styles.createCompanyBtn}
            onClick={() => {
              onCreateNewCompany();
              setShowDropdown(false);
            }}
          >
            + Create New Company
          </button>
          
          {companies.inactive.length > 0 && (
            <div style={styles.dropdownSection}>
              <h4 
                style={styles.inactiveToggle}
                onClick={() => setShowInactiveCompanies(!showInactiveCompanies)}
              >
                <span>Previous Companies</span>
                <span>{showInactiveCompanies ? '▲' : '▼'}</span>
              </h4>
              
              {showInactiveCompanies && (
                <>
                  <div style={styles.divider}></div>
                  {companies.inactive.map((company, index) => (
                    <div key={index} style={{...styles.companyItem, ...styles.inactiveCompany}}>
                      <span>
                        <span style={styles.companyIcon}>📁</span>
                        {company.name}
                      </span>
                      <button 
                        style={styles.reactivateBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          onReactivateCompany(company);
                        }}
                      >
                        Reactivate
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanySelector;