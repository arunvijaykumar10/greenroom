import React from 'react';
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
  PeopleOutlined,
  BusinessOutlined,
  ReceiptOutlined,
  AssessmentOutlined
} from '@mui/icons-material';

interface PayrollStepperProps {
  activeStep: number;
  showAllSteps?: boolean;
}

const steps = [
  {
    label: 'Employees & Loan Outs',
    description: 'Select employees and loan outs',
    icon: PeopleOutlined
  },
  {
    label: 'Vendors & Contractors',
    description: 'Select vendors and contractors',
    icon: BusinessOutlined
  },
  {
    label: 'One-Time Bills',
    description: 'Add one-time payments',
    icon: ReceiptOutlined
  },
  {
    label: 'Review & Submit',
    description: 'Review and submit payroll',
    icon: AssessmentOutlined
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
    1: <PeopleOutlined />,
    2: <BusinessOutlined />,
    3: <ReceiptOutlined />,
    4: <AssessmentOutlined />,
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

const PayrollStepper: React.FC<PayrollStepperProps> = ({ 
  activeStep,
  showAllSteps = true
}) => {
  // If not showing all steps, only show the current step and the next step
  const visibleSteps = showAllSteps 
    ? steps 
    : steps.slice(Math.max(0, activeStep - 1), Math.min(steps.length, activeStep + 2));

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel 
        connector={<ColorlibConnector />}
      >
        {visibleSteps.map((step, index) => {
          // Adjust the index if not showing all steps
          const stepIndex = showAllSteps ? index : Math.max(0, activeStep - 1) + index;
          
          return (
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
          );
        })}
      </Stepper>
    </Paper>
  );
};

export default PayrollStepper;