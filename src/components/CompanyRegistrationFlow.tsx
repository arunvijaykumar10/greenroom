import React, { useState } from 'react';
import { CompanyInfo, CompanyRegistrationData, RegistrationStep } from './companyTypes';

interface CompanyRegistrationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCompany: (company: CompanyInfo) => void;
}

const CompanyRegistrationFlow: React.FC<CompanyRegistrationFlowProps> = ({
  isOpen,
  onClose,
  onCreateCompany
}) => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('companyInfo');
  const [registrationData, setRegistrationData] = useState<CompanyRegistrationData>({
    companyName: '',
    companyAddress: '',
    companyContact: '',
    companyType: '',
    industry: '',
    taxId: '',
    paymentMethod: '',
    payrollFrequency: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 'companyInfo') {
      setCurrentStep('payrollDetails');
    } else if (currentStep === 'payrollDetails') {
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'payrollDetails') {
      setCurrentStep('companyInfo');
    } else if (currentStep === 'review') {
      setCurrentStep('payrollDetails');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert registration data to company info format
    const newCompany: CompanyInfo = {
      name: registrationData.companyName,
      address: registrationData.companyAddress,
      contact: registrationData.companyContact,
      paymentDetails: `Bank: ${registrationData.bankName || 'N/A'}, Account: ${registrationData.accountNumber ? '****' + registrationData.accountNumber.slice(-4) : 'N/A'}`
    };
    
    onCreateCompany(newCompany);
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
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      width: '600px',
      maxWidth: '90%',
      maxHeight: '90vh',
      overflowY: 'auto' as const,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    },
    header: {
      borderBottom: '2px solid #3498db',
      paddingBottom: '15px',
      marginBottom: '25px',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
    },
    title: {
      margin: 0,
      color: '#2c3e50',
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
    stepper: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      marginBottom: '30px',
      position: 'relative' as const,
    },
    stepperLine: {
      position: 'absolute' as const,
      top: '14px',
      left: '10%',
      right: '10%',
      height: '2px',
      backgroundColor: '#e0e0e0',
      zIndex: 1,
    },
    step: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      position: 'relative' as const,
      zIndex: 2,
    },
    stepCircle: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
      display: 'flex' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginBottom: '8px',
      color: '#fff',
      fontWeight: 'bold' as const,
    },
    activeStep: {
      backgroundColor: '#3498db',
    },
    completedStep: {
      backgroundColor: '#2ecc71',
    },
    stepLabel: {
      fontSize: '12px',
      color: '#7f8c8d',
      fontWeight: '500' as const,
    },
    activeStepLabel: {
      color: '#3498db',
      fontWeight: 'bold' as const,
    },
    formGroup: {
      marginBottom: '20px',
    },
    formRow: {
      display: 'flex' as const,
      gap: '15px',
      marginBottom: '20px',
    },
    formColumn: {
      flex: '1',
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
      backgroundColor: '#f8f9fa',
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      fontSize: '15px',
      boxSizing: 'border-box' as const,
      backgroundColor: '#f8f9fa',
      appearance: 'none' as const,
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 15px top 50%',
      backgroundSize: '12px auto',
    },
    requiredMark: {
      color: '#e74c3c',
      marginLeft: '3px',
    },
    actions: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      marginTop: '30px',
      borderTop: '1px solid #eee',
      paddingTop: '20px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500' as const,
      transition: 'all 0.2s',
    },
    backButton: {
      backgroundColor: '#f5f5f5',
      border: '1px solid #d9d9d9',
      color: '#333',
    },
    nextButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      boxShadow: '0 2px 5px rgba(52, 152, 219, 0.3)',
    },
    submitButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      boxShadow: '0 2px 5px rgba(46, 204, 113, 0.3)',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#95a5a6',
    },
    reviewSection: {
      marginBottom: '25px',
    },
    reviewTitle: {
      fontSize: '16px',
      fontWeight: '600' as const,
      color: '#2c3e50',
      marginBottom: '10px',
      paddingBottom: '5px',
      borderBottom: '1px solid #eee',
    },
    reviewItem: {
      display: 'flex' as const,
      marginBottom: '8px',
    },
    reviewLabel: {
      width: '40%',
      fontWeight: '500' as const,
      color: '#7f8c8d',
    },
    reviewValue: {
      width: '60%',
      color: '#2c3e50',
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            <span style={styles.titleIcon}>🏢</span>
            Create New Company
          </h2>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div style={styles.stepper}>
          <div style={styles.stepperLine}></div>
          <div style={styles.step}>
            <div style={{
              ...styles.stepCircle,
              ...(currentStep === 'companyInfo' ? styles.activeStep : 
                 currentStep === 'payrollDetails' || currentStep === 'review' ? styles.completedStep : {})
            }}>
              {currentStep === 'payrollDetails' || currentStep === 'review' ? '✓' : '1'}
            </div>
            <span style={{
              ...styles.stepLabel,
              ...(currentStep === 'companyInfo' ? styles.activeStepLabel : {})
            }}>Company Info</span>
          </div>
          <div style={styles.step}>
            <div style={{
              ...styles.stepCircle,
              ...(currentStep === 'payrollDetails' ? styles.activeStep : 
                 currentStep === 'review' ? styles.completedStep : {})
            }}>
              {currentStep === 'review' ? '✓' : '2'}
            </div>
            <span style={{
              ...styles.stepLabel,
              ...(currentStep === 'payrollDetails' ? styles.activeStepLabel : {})
            }}>Payroll Details</span>
          </div>
          <div style={styles.step}>
            <div style={{
              ...styles.stepCircle,
              ...(currentStep === 'review' ? styles.activeStep : {})
            }}>3</div>
            <span style={{
              ...styles.stepLabel,
              ...(currentStep === 'review' ? styles.activeStepLabel : {})
            }}>Review</span>
          </div>
        </div>

        {currentStep === 'companyInfo' && (
          <form>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="companyName">
                  Company Name<span style={styles.requiredMark}>*</span>
                </label>
                <input
                  style={styles.input}
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={registrationData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="companyType">
                  Company Type<span style={styles.requiredMark}>*</span>
                </label>
                <select
                  style={styles.select}
                  id="companyType"
                  name="companyType"
                  value={registrationData.companyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="soleProprietorship">Sole Proprietorship</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="companyAddress">
                Company Address<span style={styles.requiredMark}>*</span>
              </label>
              <input
                style={styles.input}
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={registrationData.companyAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="companyContact">
                  Contact Information<span style={styles.requiredMark}>*</span>
                </label>
                <input
                  style={styles.input}
                  type="text"
                  id="companyContact"
                  name="companyContact"
                  value={registrationData.companyContact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="industry">
                  Industry<span style={styles.requiredMark}>*</span>
                </label>
                <select
                  style={styles.select}
                  id="industry"
                  name="industry"
                  value={registrationData.industry}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="taxId">
                Tax ID / EIN<span style={styles.requiredMark}>*</span>
              </label>
              <input
                style={styles.input}
                type="text"
                id="taxId"
                name="taxId"
                value={registrationData.taxId}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={{...styles.button, ...styles.backButton}}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                style={{...styles.button, ...styles.nextButton}}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {currentStep === 'payrollDetails' && (
          <form>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="paymentMethod">
                  Payment Method<span style={styles.requiredMark}>*</span>
                </label>
                <select
                  style={styles.select}
                  id="paymentMethod"
                  name="paymentMethod"
                  value={registrationData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select method</option>
                  <option value="directDeposit">Direct Deposit</option>
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="payrollFrequency">
                  Payroll Frequency<span style={styles.requiredMark}>*</span>
                </label>
                <select
                  style={styles.select}
                  id="payrollFrequency"
                  name="payrollFrequency"
                  value={registrationData.payrollFrequency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="semimonthly">Semi-monthly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {registrationData.paymentMethod === 'directDeposit' && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="bankName">
                    Bank Name<span style={styles.requiredMark}>*</span>
                  </label>
                  <input
                    style={styles.input}
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={registrationData.bankName || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <label style={styles.label} htmlFor="accountNumber">
                      Account Number<span style={styles.requiredMark}>*</span>
                    </label>
                    <input
                      style={styles.input}
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={registrationData.accountNumber || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={styles.formColumn}>
                    <label style={styles.label} htmlFor="routingNumber">
                      Routing Number<span style={styles.requiredMark}>*</span>
                    </label>
                    <input
                      style={styles.input}
                      type="text"
                      id="routingNumber"
                      name="routingNumber"
                      value={registrationData.routingNumber || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="payrollStartDate">
                Payroll Start Date
              </label>
              <input
                style={styles.input}
                type="date"
                id="payrollStartDate"
                name="payrollStartDate"
                value={registrationData.payrollStartDate || ''}
                onChange={handleChange}
              />
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={{...styles.button, ...styles.backButton}}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                style={{...styles.button, ...styles.nextButton}}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {currentStep === 'review' && (
          <form onSubmit={handleSubmit}>
            <div style={styles.reviewSection}>
              <h3 style={styles.reviewTitle}>Company Information</h3>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Company Name:</div>
                <div style={styles.reviewValue}>{registrationData.companyName}</div>
              </div>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Company Type:</div>
                <div style={styles.reviewValue}>{registrationData.companyType}</div>
              </div>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Address:</div>
                <div style={styles.reviewValue}>{registrationData.companyAddress}</div>
              </div>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Contact:</div>
                <div style={styles.reviewValue}>{registrationData.companyContact}</div>
              </div>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Industry:</div>
                <div style={styles.reviewValue}>{registrationData.industry}</div>
              </div>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Tax ID / EIN:</div>
                <div style={styles.reviewValue}>{registrationData.taxId}</div>
              </div>
            </div>

            <div style={styles.reviewSection}>
              <h3 style={styles.reviewTitle}>Payroll Details</h3>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Payment Method:</div>
                <div style={styles.reviewValue}>{registrationData.paymentMethod}</div>
              </div>
              <div style={styles.reviewItem}>
                <div style={styles.reviewLabel}>Payroll Frequency:</div>
                <div style={styles.reviewValue}>{registrationData.payrollFrequency}</div>
              </div>
              {registrationData.paymentMethod === 'directDeposit' && (
                <>
                  <div style={styles.reviewItem}>
                    <div style={styles.reviewLabel}>Bank Name:</div>
                    <div style={styles.reviewValue}>{registrationData.bankName}</div>
                  </div>
                  <div style={styles.reviewItem}>
                    <div style={styles.reviewLabel}>Account Number:</div>
                    <div style={styles.reviewValue}>
                      {registrationData.accountNumber ? '****' + registrationData.accountNumber.slice(-4) : ''}
                    </div>
                  </div>
                </>
              )}
              {registrationData.payrollStartDate && (
                <div style={styles.reviewItem}>
                  <div style={styles.reviewLabel}>Payroll Start Date:</div>
                  <div style={styles.reviewValue}>{registrationData.payrollStartDate}</div>
                </div>
              )}
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={{...styles.button, ...styles.backButton}}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="submit"
                style={{...styles.button, ...styles.submitButton}}
              >
                Create Company
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanyRegistrationFlow;