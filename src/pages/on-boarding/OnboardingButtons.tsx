import React from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import { PayeeType } from './types';

interface OnboardingButtonsProps {
  payeeType: PayeeType;
  isManualOnboarding: boolean;
  onManualClick: () => void;
  onSelfClick: () => void;
}

const OnboardingButtons: React.FC<OnboardingButtonsProps> = ({
  payeeType,
  isManualOnboarding,
  onManualClick,
  onSelfClick
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
      <Button
        variant={isManualOnboarding ? "contained" : "outlined"}
        onClick={onManualClick}
        sx={{
          borderRadius: 2,
          minWidth: 180,
          boxShadow: isManualOnboarding ? 2 : 0,
        }}
      >
        Manual Onboarding
      </Button>
      
      <Tooltip title={payeeType === "Employee" ? "Employees must be onboarded manually" : ""}>
        <span>
          <Button
            variant={!isManualOnboarding ? "contained" : "outlined"}
            onClick={onSelfClick}
            disabled={payeeType === "Employee"}
            sx={{
              borderRadius: 2,
              minWidth: 180,
              boxShadow: !isManualOnboarding ? 2 : 0,
            }}
          >
            Self-Onboarding
          </Button>
        </span>
      </Tooltip>
      
      {payeeType === "Employee" && (
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
          Employee onboarding requires manual entry
        </Typography>
      )}
    </Box>
  );
};

export default OnboardingButtons;