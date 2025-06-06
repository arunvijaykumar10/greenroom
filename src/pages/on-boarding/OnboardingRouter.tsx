import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OnboardingSelection from './OnboardingSelection';
import OnboardingPage from './OnboardingPage';
import SelfOnboardingPage from './SelfOnboardingPage';
import ManualOnboardingPage from './ManualOnboardingPage';

const OnboardingRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<OnboardingSelection />} />
      <Route path="/manual" element={<OnboardingPage />} />
      <Route path="/self/:token" element={<SelfOnboardingPage />} />
      <Route path="/admin" element={<ManualOnboardingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default OnboardingRouter;