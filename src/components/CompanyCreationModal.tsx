import React, { useState } from 'react';
import { CompanyInfo } from './companyTypes';

interface CompanyCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCompany: (company: CompanyInfo) => void;
}

const CompanyCreationModal: React.FC<CompanyCreationModalProps> = ({
  isOpen,
  onClose,
  onCreateCompany
}) => {
  const [companyData, setCompanyData] = useState<CompanyInfo>({
    name: '',
    address: '',
    contact: '',
    paymentDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCompany(companyData);
    onClose();
  };

  if (!isOpen) return null;

  const styles = {
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      zIndex: 1500,
      backdropFilter: 'blur(3px)',
      animation: 'fadeIn 0.3s ease',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      width: '450px',
      maxWidth: '90%',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      animation: 'slideIn 0.3s ease',
      position: 'relative' as const,
    },
    title: {
      margin: '0 0 25px 0',
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '15px',
      fontSize: '22px',
      fontWeight: '600' as const,
      display: 'flex' as const,
      alignItems: 'center' as const,
    },
    titleIcon: {
      marginRight: '10px',
      color: '#3498db',
      fontSize: '24px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block' as const,
      marginBottom: '8px',
      fontWeight: '500' as const,
      color: '#34495e',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '15px',
      boxSizing: 'border-box' as const,
      transition: 'border 0.2s, box-shadow 0.2s',
      backgroundColor: '#f8f9fa',
    },
    inputFocus: {
      border: '1px solid #3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
      outline: 'none',
    },
    modalActions: {
      display: 'flex' as const,
      justifyContent: 'flex-end' as const,
      marginTop: '30px',
      gap: '15px',
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500' as const,
      transition: 'all 0.2s',
    },
    submitButton: {
      padding: '10px 25px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500' as const,
      boxShadow: '0 2px 5px rgba(52, 152, 219, 0.3)',
      transition: 'all 0.2s',
    },
    closeButton: {
      position: 'absolute' as const,
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#95a5a6',
    },
    requiredMark: {
      color: '#e74c3c',
      marginLeft: '3px',
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={styles.title}>
          <span style={styles.titleIcon}>🏢</span>
          Create New Company
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">
              Company Name
              <span style={styles.requiredMark}>*</span>
            </label>
            <input
              style={{
                ...styles.input,
                ':focus': styles.inputFocus
              }}
              type="text"
              id="name"
              name="name"
              value={companyData.name}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="address">
              Company Address
              <span style={styles.requiredMark}>*</span>
            </label>
            <input
              style={{
                ...styles.input,
                ':focus': styles.inputFocus
              }}
              type="text"
              id="address"
              name="address"
              value={companyData.address}
              onChange={handleChange}
              placeholder="Enter company address"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="contact">
              Contact Information
              <span style={styles.requiredMark}>*</span>
            </label>
            <input
              style={{
                ...styles.input,
                ':focus': styles.inputFocus
              }}
              type="text"
              id="contact"
              name="contact"
              value={companyData.contact}
              onChange={handleChange}
              placeholder="Enter contact information"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="paymentDetails">
              Payment Details
              <span style={styles.requiredMark}>*</span>
            </label>
            <input
              style={{
                ...styles.input,
                ':focus': styles.inputFocus
              }}
              type="text"
              id="paymentDetails"
              name="paymentDetails"
              value={companyData.paymentDetails}
              onChange={handleChange}
              placeholder="Enter payment details"
              required
            />
          </div>
          
          <div style={styles.modalActions}>
            <button 
              type="button" 
              style={styles.cancelButton} 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={styles.submitButton}
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreationModal;