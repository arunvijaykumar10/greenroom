import React, { useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  StepConnector, 
  stepConnectorClasses,
  styled,
  StepIconProps,
  Paper
} from '@mui/material';
import {
  AssessmentOutlined,
  BusinessCenterOutlined,
  CheckCircleOutlineOutlined
} from '@mui/icons-material';
import Step4_1Details from './Step4_1Details';
import Step4_2UnionReports from './Step4_2UnionReports';
import Step4_3FinalReview from './Step4_3FinalReview';
import { Payee } from './payrollTypes';

interface Step4ReviewProps {
  employees: Payee[];
  vendors: Payee[];
  oneTimeBills: any[];
  onBack: () => void;
  onSubmit: () => void;
}

const steps = [
  {
    label: 'Payroll Details',
    description: 'Review payee information and department totals',
    icon: AssessmentOutlined
  },
  {
    label: 'Union Reports',
    description: 'Review and approve union reports',
    icon: BusinessCenterOutlined
  },
  {
    label: 'Final Review',
    description: 'Confirm payment method and submit payroll',
    icon: CheckCircleOutlineOutlined
  }
];

// Custom connector for the stepper
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #4dabf5 0%, #1976d2 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #4dabf5 0%, #1976d2 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

// Custom step icon
const ColorlibStepIcon = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #4dabf5 0%, #1976d2 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(136deg, #4dabf5 0%, #1976d2 100%)',
  }),
}));

// Step icon component
function StepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  const icons: { [index: string]: React.ReactElement } = {
    1: <AssessmentOutlined />,
    2: <BusinessCenterOutlined />,
    3: <CheckCircleOutlineOutlined />,
  };

  return (
    <ColorlibStepIcon
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIcon>
  );
}

const Step4Review: React.FC<Step4ReviewProps> = ({ 
  employees, 
  vendors, 
  oneTimeBills, 
  onBack, 
  onSubmit 
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [unionReportsReviewed, setUnionReportsReviewed] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUnionReportReview = (unionId: string, reviewed: boolean) => {
    setUnionReportsReviewed(prev => ({
      ...prev,
      [unionId]: reviewed
    }));
  };

  const allUnionReportsReviewed = () => {
    // In a real app, we would check against actual union reports
    return Object.values(unionReportsReviewed).every(reviewed => reviewed);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: 'primary.50' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          Review & Submit Payroll
        </Typography>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel 
          connector={<ColorlibConnector />}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel 
                StepIconComponent={StepIcon}
                optional={
                  <Typography variant="caption" color="text.secondary">
                    {step.description}
                  </Typography>
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      
      {activeStep === 0 && (
        <Step4_1Details 
          employees={employees} 
          vendors={vendors} 
          oneTimeBills={oneTimeBills} 
          onNext={handleNext}
          onBack={onBack}
        />
      )}
      
      {activeStep === 1 && (
        <Step4_2UnionReports 
          employees={employees}
          onReview={handleUnionReportReview}
          onBack={handleBack}
          onNext={handleNext}
          allReviewed={allUnionReportsReviewed()}
        />
      )}
      
      {activeStep === 2 && (
        <Step4_3FinalReview 
          employees={employees}
          vendors={vendors}
          oneTimeBills={oneTimeBills}
          onBack={handleBack}
          onSubmit={onSubmit}
          canSubmit={allUnionReportsReviewed()}
        />
      )}
    </Box>
  );
};

export default Step4Review;