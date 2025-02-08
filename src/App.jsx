import React from 'react';
import TranscriptionPanel from './components/TranscriptionPanel/TranscriptionPanel';
import QASection from './components/QASection/QASection';
import DocumentUploader from './components/DocumentUploader/DocumentUploader';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';

const App = () => {
  return (
    <DashboardLayout>
      <TranscriptionPanel />
      <QASection />
      <DocumentUploader />
    </DashboardLayout>
  );
};

export default App;